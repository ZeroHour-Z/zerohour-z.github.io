import type { AstroGlobal, ImageMetadata } from 'astro'
import { getImage } from 'astro:assets'
import type { CollectionEntry } from 'astro:content'
import rss from '@astrojs/rss'
import type { Root } from 'mdast'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'
import config from 'virtual:config'

import { getBlogCollection, sortMDByDate } from 'astro-pure/server'

// Get dynamic import of images as a map collection
const imagesGlob = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/blog/**/*.{jpeg,jpg,png,gif,avif,webp}'
)

const isRemoteURL = (url: string) =>
  /^(?:[a-z][a-z\d+.-]*:)?\/\//i.test(url) || url.startsWith('data:')

const getLocalImageImporter = (postId: string, imageURL: string) => {
  const [cleanURL] = imageURL.split(/[?#]/)
  const relativePath = decodeURI(cleanURL.replace(/^\.\//, ''))
  const parentDir = postId.split('/').slice(0, -1).join('/')
  const candidateDirs = Array.from(new Set([postId, parentDir].filter(Boolean)))

  return candidateDirs
    .map((dir) => imagesGlob[`/src/content/blog/${dir}/${relativePath}`])
    .find(Boolean)
}

const renderContent = async (post: CollectionEntry<'blog'>, site: URL) => {
  // Replace image links with the correct path
  function remarkReplaceImageLink() {
    /**
     * @param {Root} tree
     */
    return async function (tree: Root) {
      const promises: Promise<void>[] = []
      visit(tree, 'image', (node) => {
        if (isRemoteURL(node.url)) return

        if (node.url.startsWith('/')) {
          node.url = new URL(node.url, site).href
        } else {
          const importer = getLocalImageImporter(post.id, node.url)
          const promise = importer?.().then(async (res) => {
            const imagePath = res?.default
            if (imagePath) {
              node.url = new URL((await getImage({ src: imagePath })).src, site).href
            }
          })
          if (promise) promises.push(promise)
        }
      })
      await Promise.all(promises)
    }
  }

  const file = await unified()
    .use(remarkParse)
    .use(remarkReplaceImageLink)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(post.body)

  return String(file)
}

const GET = async (context: AstroGlobal) => {
  const allPostsByDate = sortMDByDate(await getBlogCollection()) as CollectionEntry<'blog'>[]
  const siteUrl = context.site ?? new URL(import.meta.env.SITE)

  return rss({
    // Basic configs
    trailingSlash: false,
    xmlns: { h: 'http://www.w3.org/TR/html4/' },
    stylesheet: '/scripts/pretty-feed-v3.xsl',

    // Contents
    title: config.title,
    description: config.description,
    site: siteUrl.href,
    items: await Promise.all(
      allPostsByDate.map(async (post) => {
        const heroImageSrc = post.data.heroImage?.src
        const heroImageURL = heroImageSrc
          ? new URL(typeof heroImageSrc === 'string' ? heroImageSrc : heroImageSrc.src, siteUrl)
              .href
          : undefined

        return {
          pubDate: post.data.publishDate,
          link: new URL(`/blog/${post.id}`, siteUrl).href,
          customData: heroImageURL
            ? `<h:img src="${heroImageURL}" />
          <enclosure url="${heroImageURL}" />`
            : '',
          content: await renderContent(post, siteUrl),
          ...post.data
        }
      })
    )
  })
}

export { GET }
