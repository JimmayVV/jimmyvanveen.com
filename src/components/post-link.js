import React from "react"
import { Link } from "gatsby"
const PostLink = ({ post }) => (
  <div>
    <h2><Link to={post.fields.slug}>
      {post.frontmatter.title} ({post.frontmatter.date})
    </Link></h2>
    <div>{post.frontmatter.description}</div>
  </div>
)
export default PostLink