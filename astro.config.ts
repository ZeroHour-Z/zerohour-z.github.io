import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import vercel from '@astrojs/vercel'
import AstroPureIntegration from 'astro-pure'
import { defineConfig } from 'astro/config'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

// Others
// import { visualizer } from 'rollup-plugin-visualizer'

// Local integrations
// Local rehype & remark plugins
import rehypeAutolinkHeadings from './src/plugins/rehype-auto-link-headings.ts'
// Shiki
import {
  addCopyButton,
  addLanguage,
  addTitle,
  transformerNotationDiff,
  transformerNotationHighlight,
  updateStyle
} from './src/plugins/shiki-transformers.ts'
import config from './src/site.config.ts'

const isGitHub = process.env.DEPLOY_TARGET === 'github'

// https://astro.build/config
export default defineConfig({
  // Top-Level Options
  site: isGitHub ? 'https://zerohour-z.github.io' : 'https://zerohour.fun',
  trailingSlash: 'never',

  // Adapter: Vercel serverless by default, static for GitHub Pages
  ...(isGitHub ? {} : { adapter: vercel(), output: 'server' as const }),

  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },

  integrations: [
    // astro-pure will automatically add sitemap, mdx & unocss
    // sitemap(),
    // mdx(),
    AstroPureIntegration(config)
    // (await import('@playform/compress')).default({
    //   SVG: false,
    //   Exclude: ['index.*.js']
    // }),

    // Temporary fix vercel adapter
    // static build method is not needed
  ],
  // root: './my-project-directory',

  // Prefetch Options
  prefetch: true,
  // Server Options
  server: {
    host: true
  },
  // Markdown Options
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      [rehypeKatex, {}],
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: { className: ['anchor'] },
          content: { type: 'text', value: '#' }
        }
      ]
    ],
    // https://docs.astro.build/en/guides/syntax-highlighting/
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark'
      },
      transformers: [
        transformerNotationDiff(),
        transformerNotationHighlight(),
        updateStyle(),
        addTitle(),
        addLanguage(),
        addCopyButton(2000)
      ]
    }
  },
  experimental: {
    contentIntellisense: true
  },
  vite: {
    plugins: [
      //   visualizer({
      //     emitFile: true,
      //     filename: 'stats.html'
      //   })
    ],
    server: {
      watch: {
        ignored: ['**/.astro/**', '**/.vercel/**', '**/dist/**', '**/node_modules/**'],
        usePolling: true,
        interval: 2000 // 增加到2秒，减少CPU占用
      }
    }
  }
})
