/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

const React = require("react")

const { Auth0Provider } = require("@auth0/auth0-react");
const { navigate } = require("gatsby");
const { GraphQLProvider } = require("./apollo");


const onRedirectCallback = appState => {
  navigate(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  )
}

exports.onInitialClientRender = () => {
  window.scrollTo(0, 0)
}

exports.wrapPageElement = ({ element }) => {
  return (
    <Auth0Provider
      domain={process.env.GATSBY_AUTH0_DOMAIN}
      clientId={process.env.GATSBY_AUTH0_CLIENTID}
      redirectUri={process.env.GATSBY_REDIRECT_URI}
      onRedirectCallback={onRedirectCallback}
      audience="hasura"
    >
      <GraphQLProvider>
        {element}
      </GraphQLProvider>
    </Auth0Provider>
  )
}
