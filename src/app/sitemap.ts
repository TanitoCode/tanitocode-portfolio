import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'

const siteUrl = 'https://tanitocode.dev'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const postEntries = posts.map(post => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/contacto`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    ...postEntries,
  ]
}
