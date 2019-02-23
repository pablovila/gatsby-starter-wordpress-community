import React from "react";
import { graphql } from "gatsby";

import SEO from "../components/seo";
import SimpleLayout from "../components/simple-layout";

export default props => {
  const page = props.data.wordpressPage;
  const siteTitle = props.data.site.siteMetadata.title;

  return (
    <SimpleLayout title={siteTitle}>
      <SEO title={page.title} keywords={[`gatsby`, `blog`, `wordpress`]} />
      <h1
        className="title is-size-2 has-text-weight-bold is-bold-light"
        dangerouslySetInnerHTML={{ __html: page.title }}
      />
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
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
    wordpressPage(slug: { eq: $slug }) {
      title
      content
    }
  }
`;
