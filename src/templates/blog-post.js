import React from "react";
import { graphql, Link } from "gatsby";
import moment from "moment";

import SEO from "../components/seo";
import Layout from "../components/layout";

export default props => {
  const post = props.data.wordpressPost;
  const siteTitle = props.data.site.siteMetadata.title;
  const { previous, next } = props.pageContext;

  const date = moment(post.date).format("DD MMMM YYYY");

  return (
    <Layout title={siteTitle}>
      <SEO title={post.title} keywords={[`gatsby`, `blog`, `wordpress`]} />
      <span>
        {date} |{" "}
        {post.categories.map((c, index) => (
          <span key={index}>{c.name}</span>
        ))}
      </span>
      <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <ul
        style={{
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          padding: 0
        }}
      >
        <li>
          {previous && (
            <Link to={`/${previous.slug}`} rel="prev">
              ← Anterior
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={`/${next.slug}`} rel="next">
              Siguiente →
            </Link>
          )}
        </li>
      </ul>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    wordpressPost(slug: { eq: $slug }) {
      date
      title
      content
      excerpt
      categories {
        name
      }
      author {
        name
      }
    }
  }
`;
