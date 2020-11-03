import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'
import { useAuth0 } from '@auth0/auth0-react'
import PropTypes from "prop-types"
import fetch from 'isomorphic-fetch'
import ws from "ws"

export const GraphQLProvider = ({ children }) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()
  const httpLink = new HttpLink({
    uri: process.env.GATSBY_X_HASURA_HTTPS_URI || ``,
    fetch,
  })

  const wsForNode = typeof window === "undefined" ? ws : null

  const wsLink = new WebSocketLink({
    uri: process.env.GATSBY_X_HASURA_WSS_URI || ``,
    options: {
      reconnect: true,
      connectionParams: async () => {
        if (isAuthenticated) {
          const token = await getAccessTokenSilently()
          return {
            headers: {
              Authorization: token ? `Bearer ${token}` : ``,
              "Content-Type": "application/json"
            },
          }

        }
      },
    },
    wsForNode
  })

  const splitLink = split( //only create the split in the browser
    // split based on operation type
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink,
  )

  const authLink = setContext(async (_, { headers }) => {
    if (isAuthenticated) {
      const token = await getAccessTokenSilently()
      return {
        headers: {
          Authorization: token ? `Bearer ${token}` : ``,
          "Content-Type": "application/json"

        },
      }

    }
  })

  const client = new ApolloClient({
    link: authLink.concat(splitLink),
    cache: new InMemoryCache(),
    connectToDevTools: true
  })
  GraphQLProvider.propTypes = {
    children: PropTypes.any.isRequired
  }
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
