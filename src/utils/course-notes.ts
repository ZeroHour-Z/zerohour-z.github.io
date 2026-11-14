export type PostLike = {
  id: string
  data?: {
    title?: string
  }
}

export type CourseInfo = {
  slug: string
  title: string
  description: string
}

export const courses: CourseInfo[] = [
  {
    slug: 'automatic_control_theory',
    title: '自动控制原理',
    description: '线性系统建模、时域分析、根轨迹与频域分析。'
  },
  {
    slug: 'computer_network',
    title: '计算机网络',
    description: '数据通信、网络体系结构、局域网、网络设备与因特网基础。'
  },
  {
    slug: 'intelligent_control',
    title: '智能控制',
    description: '模糊控制、神经网络、Hopfield 网络、SOM 与遗传算法。'
  },
  {
    slug: 'mobile_robotics',
    title: '移动机器人',
    description: '运动、运动学、感知、定位、规划导航与课程复习资料。'
  },
  {
    slug: 'motion_control_system',
    title: '运动控制系统',
    description: '直流调速、双闭环控制、交流拖动与变压变频调速。'
  }
]

const courseBySlug = new Map(courses.map((course) => [course.slug, course]))
const courseSlugs = new Set(courses.map((course) => course.slug))

export function getCourseSlug(post: PostLike) {
  return post.id.split('/')[0]
}

export function isCourseNote(post: PostLike) {
  return courseSlugs.has(getCourseSlug(post))
}

export function isRegularBlogPost(post: PostLike) {
  return !isCourseNote(post)
}

export function getCourseInfo(slug: string) {
  return courseBySlug.get(slug)
}

export function getCourseUrl(postOrSlug: PostLike | string) {
  const slug = typeof postOrSlug === 'string' ? postOrSlug : getCourseSlug(postOrSlug)
  return `/notes/${slug}`
}

/** Chapter part of a course note id, e.g. `第-1-章-绪论` for `automatic_control_theory/第-1-章-绪论`. */
export function getChapterSlug(post: PostLike) {
  // A course's own `index.md` has the bare course id; give it a stable chapter slug
  return post.id.split('/').slice(1).join('/') || 'overview'
}

/** Docs-style URL of a course note: `/notes/<course>/<chapter>`. */
export function getNoteUrl(post: PostLike) {
  return `/notes/${getCourseSlug(post)}/${getChapterSlug(post)}`
}

export function getCourseGroups<T extends PostLike>(posts: T[]) {
  return courses
    .map((course) => ({
      course,
      posts: sortCoursePosts(posts.filter((post) => getCourseSlug(post) === course.slug))
    }))
    .filter((group) => group.posts.length > 0)
}

function getPostSlug(post: PostLike) {
  return post.id.split('/').at(-1) ?? post.id
}

function getPostTitle(post: PostLike) {
  return post.data?.title ?? getPostSlug(post)
}

function getChapterNumber(post: PostLike) {
  const slug = getPostSlug(post).toLowerCase()
  const title = getPostTitle(post).toLowerCase()
  const text = `${slug} ${title}`

  const match =
    text.match(/(?:^|\/)(\d{1,2})(?:-|$)/) ??
    text.match(/\bch(\d{1,2})\b/) ??
    text.match(/source-ch(\d{1,2})/) ??
    text.match(/第\s*(\d{1,2})\s*章/)

  return match ? Number(match[1]) : undefined
}

function getCoursePostRank(post: PostLike) {
  const slug = getPostSlug(post).toLowerCase()
  const title = getPostTitle(post).toLowerCase()
  const text = `${slug} ${title}`

  // `<course>/index.md` has the bare course id
  const isCourseIndex = !post.id.includes('/')
  if (isCourseIndex || slug === 'index' || text.includes('course-overview') || text.includes('章节目录')) {
    return -20
  }
  if (text.includes('内容总结')) {
    return -10
  }

  const chapter = getChapterNumber(post)
  if (chapter !== undefined) {
    return text.includes('source-ch') ? 100 + chapter : chapter
  }

  if (text.includes('绪论') || text.includes('introduction') || text.includes('intro')) {
    return 0
  }

  if (
    text.includes('homework') ||
    text.includes('期末') ||
    text.includes('final') ||
    text.includes('exam') ||
    text.includes('速背') ||
    text.includes('复习')
  ) {
    return 800
  }
  if (text.includes('courseware') || text.includes('原始课件')) {
    return 900
  }

  return 500
}

export function sortCoursePosts<T extends PostLike>(posts: T[]) {
  return [...posts].sort((a, b) => {
    const rankDiff = getCoursePostRank(a) - getCoursePostRank(b)
    if (rankDiff !== 0) return rankDiff

    return getPostTitle(a).localeCompare(getPostTitle(b), 'zh-CN', {
      numeric: true,
      sensitivity: 'base'
    })
  })
}

const sectionLabels: [maxRank: number, label: string][] = [
  [-1, '课程总览'],
  [99, '章节笔记'],
  [199, '课件摘要'],
  [599, '其他'],
  [899, '复习资料'],
  [Infinity, '原始课件']
]

function getSectionLabel(post: PostLike) {
  const rank = getCoursePostRank(post)
  return sectionLabels.find(([max]) => rank <= max)![1]
}

export type CourseSection<T> = { label: string; posts: T[] }

/**
 * Split an already sorted course into labelled sections (overview, chapter notes,
 * slide summaries, review material...), keeping the sorted order. A course whose notes
 * all fall into one section returns a single section with an empty label.
 */
export function getCourseSections<T extends PostLike>(sortedPosts: T[]): CourseSection<T>[] {
  const sections: CourseSection<T>[] = []
  for (const post of sortedPosts) {
    const label = getSectionLabel(post)
    const last = sections.at(-1)
    if (last?.label === label) last.posts.push(post)
    else sections.push({ label, posts: [post] })
  }
  if (sections.length === 1) sections[0].label = ''
  return sections
}
