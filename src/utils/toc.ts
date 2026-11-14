import type { MarkdownHeading } from 'astro'

/**
 * The theme's TOC expects body headings to start at h2 and throws on a page whose
 * shallowest heading is h3 or deeper. Drop h1 and shift depths so the shallowest
 * remaining heading becomes h2.
 */
export function normalizeTocHeadings(headings: MarkdownHeading[]): MarkdownHeading[] {
  const body = headings.filter(({ depth }) => depth > 1)
  if (!body.length) return []
  const shift = Math.min(...body.map(({ depth }) => depth)) - 2
  return body.map((h) => ({ ...h, depth: h.depth - shift }))
}
