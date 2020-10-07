import React from "react"
import Layout from "../components/layout"
import styled from "styled-components"
import { Auth0Provider } from "@auth0/auth0-react"
import { navigate } from "@reach/router"
import LoginView from "../components/LoginView"

const onRedirectCallback = appState => {
  navigate(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  )
}

const IndexPage = () => {
  return (
    <Auth0Provider
      domain={process.env.GATSBY_AUTH0_DOMAIN}
      clientId={process.env.GATSBY_AUTH0_CLIENTID}
      redirectUri={process.env.GATSBY_REDIRECT_URI}
      onRedirectCallback={onRedirectCallback}
      // audience="hasura"
    >
      <Background>
        <Layout>
          <LoginView />
        </Layout>
      </Background>
    </Auth0Provider>
  )
}

const Background = styled.div`
  display: flex;
  flex: 1;
  width: 100vw;
  height: 100vh;
`


export default IndexPage
