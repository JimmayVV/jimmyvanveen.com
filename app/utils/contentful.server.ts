import * as Contentful from "contentful"

export interface BlogPostFields {
  title: Contentful.EntryFields.Symbol
  author?: Contentful.EntryFields.Symbol
  slug: Contentful.EntryFields.Symbol
  description: Contentful.EntryFields.Text
  image?: Contentful.Asset
  body: Contentful.EntryFields.Text
  publishDate: Contentful.EntryFields.Date
}

export type BlogPost = Contentful.Entry<BlogPostFields>

export interface ProjectFields {
  ghId: Contentful.EntryFields.Symbol
  displayName: Contentful.EntryFields.Symbol
  screenshot?: Contentful.Asset
  priority?: Contentful.EntryFields.Integer
}

export type Project = Contentful.Entry<ProjectFields>

const client = Contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID ?? "",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ?? "",
})

export const getProjects = async () => {
  const { items } = await client.getEntries<ProjectFields>({
    content_type: "project",
  })

  return items
}

export const getAllBlogPosts = async () => {
  const { items } = await client.getEntries<BlogPostFields>({
    content_type: "blogPost",
  })

  return items
}

export const getBlogPostBySlug = async (slug: string) => {
  const { items } = await client.getEntries<BlogPostFields>({
    content_type: "blogPost",
    "fields.slug": slug,
  })

  return items[0]
}
