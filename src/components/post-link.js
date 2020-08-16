import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const PostLink = ({ post }) => (
  <div>
    <h2>
      <Link to={post.fields.slug}>
        {post.frontmatter.title} ({post.frontmatter.date})
      </Link>
    </h2>
    <div>{post.frontmatter.description}</div>
  </div>
)

PostLink.propTypes = {
  post: PropTypes.shape({
    fields: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }).isRequired,
    frontmatter: PropTypes.shape({
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default PostLink
