import React from 'react';
import { graphql } from 'gatsby'

import Layout from '../components/Layout';

export default function BlogTemplate({
  data,
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark

  return (
    <Layout fullMenu>
      <section id="wrapper">
        <header>
          <div className="inner">
            <h2>{frontmatter.title}</h2>
            <h3>{frontmatter.date}</h3>
            <p>Phasellus non pulvinar erat. Fusce tincidunt nisl eget ipsum.</p>
          </div>
        </header>

        <div className="wrapper">
          <div
            className="inner"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </section>
    </Layout>
  );
}


export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`
