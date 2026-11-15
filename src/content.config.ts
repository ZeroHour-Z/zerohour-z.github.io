import { defineCollection, z, type SchemaContext } from 'astro:content'
import { glob } from 'astro/loaders'

function removeDupsAndLowerCase(array: string[]) {
  if (!array.length) return array
  const lowercaseItems = array.map((str) => str.toLowerCase())
  const distinctItems = new Set(lowercaseItems)
  return Array.from(distinctItems)
}

// Shared frontmatter schema for blog posts and course docs
const postSchema = ({ image }: SchemaContext) =>
    z.object({
      // Required
      title: z.string().max(60),
      description: z.string().max(160),
      publishDate: z.coerce.date(),
      // Optional
      updatedDate: z.coerce.date().optional(),
      heroImage: z
        .object({
          src: image(),
          alt: z.string().optional(),
          inferSize: z.boolean().optional(),
          width: z.number().optional(),
          height: z.number().optional(),

          color: z.string().optional()
        })
        .optional(),
      tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
      language: z.string().optional(),
      draft: z.boolean().default(false),
      // Special fields
      comment: z.boolean().default(true)
    })

// Blog posts: `src/content/blog/`
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: postSchema
})

// Course notes, shown as docs: `src/content/docs/<course>/<chapter>.md`
const docs = defineCollection({
  loader: glob({ base: './src/content/docs', pattern: '**/*.{md,mdx}' }),
  schema: postSchema
})

export const collections = { blog, docs }
