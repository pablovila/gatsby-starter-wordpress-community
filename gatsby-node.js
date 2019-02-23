const path = require(`path`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPage = path.resolve(`./src/templates/blog-page.js`);
  const blogList = path.resolve(`./src/templates/blog-list.js`);
  const blogPost = path.resolve(`./src/templates/blog-post.js`);

  return graphql(`
    {
      allWordpressPage {
        edges {
          node {
            slug
          }
        }
      }
      allWordpressPost(
        filter: { status: { eq: "publish" } }
        sort: { fields: [date], order: DESC }
      ) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `).then(result => {
    const pages = result.data.allWordpressPage.edges;
    pages.forEach(page => {
      createPage({
        path: page.node.slug,
        component: blogPage,
        context: { slug: page.node.slug }
      });
    });

    const posts = result.data.allWordpressPost.edges;
    posts.forEach((post, index) => {
      const previous =
        index === posts.length - 1 ? null : posts[index + 1].node;
      const next = index === 0 ? null : posts[index - 1].node;
      createPage({
        path: post.node.slug,
        component: blogPost,
        context: {
          slug: post.node.slug,
          previous,
          next
        }
      });
    });

    const postsPerPage = 5;
    const numPages = Math.ceil(posts.length / postsPerPage);

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/` : `/${i + 1}`,
        component: blogList,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1
        }
      });
    });
  });
};
