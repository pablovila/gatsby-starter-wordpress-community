import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import PostCard from "../components/post-card";

const BlogIndex = props => {
  const { data } = props;
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allWordpressPost.edges;
  const { currentPage, numPages } = props.pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = currentPage - 1 === 1 ? "" : (currentPage - 1).toString();
  const nextPage = (currentPage + 1).toString();

  return (
    <Layout>
      <SEO title={siteTitle} keywords={[`gatsby`, `blog`, `wordpress`]} />
      {posts.map(post => (
        <PostCard
          key={post.node.wordpress_id}
          title={post.node.title}
          excerpt={post.node.excerpt}
          slug={post.node.slug}
        />
      ))}
      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          listStyle: "none",
          padding: 0
        }}
      >
        {!isFirst && (
          <Link to={`/${prevPage}`} rel="prev">
            ← Previous Page
          </Link>
        )}
        {Array.from({ length: numPages }, (_, i) => (
          <li
            key={`pagination-number${i + 1}`}
            style={{
              margin: 0
            }}
          >
            <Link
              to={`/${i === 0 ? "" : i + 1}`}
              style={{
                textDecoration: "none",
                color: i + 1 === currentPage ? "#ffffff" : "",
                background: i + 1 === currentPage ? "#007acc" : ""
              }}
            >
              {i + 1}
            </Link>
          </li>
        ))}
        {!isLast && (
          <Link to={`/${nextPage}`} rel="next">
            Next Page →
          </Link>
        )}
      </ul>
    </Layout>
  );
};

export const query = graphql`
  query wordpressPosts($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allWordpressPost(
      filter: { status: { eq: "publish" } }
      sort: { fields: [date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          wordpress_id
          title
          slug
          excerpt
        }
      }
    }
  }
`;

export default BlogIndex;
