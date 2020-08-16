// Libraries
import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

// Components
import Layout from "../components/Layout"
import PostLink from "../components/post-link"

const BlogsPage = ({
  data: {
    allMdx: { edges },
  },
}) => {
  return (
    <Layout fullMenu>
      <section id="wrapper">
        <header>
          <div className="inner">
            <h2>Blog Posts from Jimmy</h2>
            <p>
              These blog posts more or less will be occupied by various topic
              and resources I&apos;ve struggled to find concrete information
              about in a timely manner. These blog posts are not meant to be
              unique, nor are they trying to be entirely original. They will
              attempt to log information that was less than easy for me to find
              on my own, and to reference back on it as I please.
            </p>
          </div>
        </header>

        <div className="wrapper">
          <div className="inner">
            {edges
              .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
              .map(edge => (
                <PostLink post={edge.node} key={edge.node.id} />
              ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

BlogsPage.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }).isRequired,
  }).isRequired,
}

export default BlogsPage

export const pageQuery = graphql`
  query {
    allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
