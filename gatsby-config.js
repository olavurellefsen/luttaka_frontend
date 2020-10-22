module.exports = {
  siteMetadata: {
    title: `Luttaka`,
    description: `Event application`,
    author: `@gatsbyjs & @strapi`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-strapi',
      options: {
        apiURL: process.env.API_URL || `http://localhost:1337`,
        contentTypes: [
          `article`,
          `schedule`,
          `work-place`,
          `lecture`,
          `category`,
          'schedule-item',
          'video',
        ],
        singleTypes: [`about`, `registered-text`, `privacy-policy`],
        markdownImages: {
          typesToParse: {
            article: ['content'],
            about: ['content'],
            "registered-text": ['content'],
            "privacy-policy": ['content']
        },
        queryLimit: 1000,
      }
    }
  },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    `gatsby-plugin-fontawesome-css`,
    {
      resolve: `gatsby-plugin-netlify-functions`,
      options: {
        functionsSrc: `${__dirname}/src/functions`,
        functionsOutput: `${__dirname}/functions`,
      },
    },
    `gatsby-plugin-mailgo`
  ],
}
