import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface PostMeta {
  slug: string
  title: string
  date: string
  category: string
  summary: string
}

export function getAllPosts(): PostMeta[] {
  const postsDir = path.join(process.cwd(), 'content/posts')
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.mdx'))
  return files
    .map(file => {
      const slug = file.replace('.mdx', '')
      const raw = fs.readFileSync(path.join(postsDir, file), 'utf-8')
      const { data } = matter(raw)
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        category: data.category as string,
        summary: data.summary as string,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): { meta: PostMeta; content: string } {
  const file = path.join(process.cwd(), 'content/posts', `${slug}.mdx`)
  const raw = fs.readFileSync(file, 'utf-8')
  const { data, content } = matter(raw)
  return {
    meta: {
      slug,
      title: data.title as string,
      date: data.date as string,
      category: data.category as string,
      summary: data.summary as string,
    },
    content,
  }
}
