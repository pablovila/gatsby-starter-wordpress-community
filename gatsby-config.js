require("dotenv").config({
  path: `.env`
});

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: "gatsby-source-wordpress",
      options: {
        baseUrl: "coderscantabria.com",
        protocol: "https",
        hostingWPCOM: true,
        useACF: false,
        auth: {
          wpcom_app_clientId: process.env.WORDPRESS_CLIENT_ID,
          wpcom_app_clientSecret: process.env.WORDPRESS_CLIENT_SECRET,
          wpcom_user: process.env.WORDPRESS_USER,
          wpcom_pass: process.env.WORDPRESS_PASSWORD
        }
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-purgecss`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png` // This path is relative to the root of the site.
      }
    },
    "gatsby-plugin-offline",
    `gatsby-plugin-netlify` // make sure to put last in the array
  ]
};
