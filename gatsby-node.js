/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`);

const makeRequest = (graphql, request) => new Promise((resolve, reject) => {
  // Query for article nodes to use in creating pages.
  resolve(
    graphql(request).then(result => {
      if (result.errors) {
        reject(result.errors)
      }

      return result;
    })
  )
});


// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const getArticles = makeRequest(graphql, `
{
  allStrapiArticle {
    edges {
      node {
        id
      }
    }
  }
}
    `).then(result => {
    // Create pages for each article.
    result.data.allStrapiArticle.edges.forEach(({ node }) => {
      createPage({
        path: `news/${node.id}`,
        component: path.resolve(`src/templates/article.js`),
        context: {
          id: node.id,
        },
      })
    })
  });


  const getMovies = makeRequest(graphql, `
 {
  allStrapiVideo {
    edges {
      node {
        id
      }
    }
  }
}
    `).then(result => {
    // Create pages for each Movie.
    result.data.allStrapiVideo.edges.forEach(({ node }) => {
      createPage({
        path: `videos/${node.id}`,
        component: path.resolve(`src/templates/video.js`),
        context: {
          id: node.id,
        },
      })
    })
  });


  // Queries for articles and authors nodes to use in creating pages.
  return Promise.all([
    getArticles,
    getMovies
  ])
};
