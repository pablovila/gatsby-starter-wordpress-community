import React from "react";
import { graphql, Link } from "gatsby";
import dayjs from "dayjs";

import SEO from "../components/seo";
import SimpleLayout from "../components/simple-layout";

export default props => {
  const post = props.data.wordpressPost;
  const siteTitle = props.data.site.siteMetadata.title;
  const { previous, next } = props.pageContext;

  const date = dayjs(post.date).format("DD MMMM YYYY");

  return (
    <SimpleLayout title={siteTitle}>
      <SEO title={post.title} keywords={[`gatsby`, `blog`, `wordpress`]} />
      <section className="section has-text-centered">
        <span className="is-uppercase">
          {date} |{" "}
          {post.categories.map((c, index) => (
            <span key={index}>{c.name}</span>
          ))}
        </span>
        <h1
          className="title is-size-2 has-text-weight-bold is-bold-light"
          dangerouslySetInnerHTML={{ __html: post.title }}
        />
      </section>
      <section className="section">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </section>
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
              ← Previous
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={`/${next.slug}`} rel="next">
              Next →
            </Link>
          )}
        </li>
      </ul>
    </SimpleLayout>
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
