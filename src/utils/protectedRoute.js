
import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useAuth0 } from '@auth0/auth0-react'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0()
  useEffect(() => {
    const asyncLogin = async () => {
      await loginWithRedirect({
        appState: { targetUrl: window.location.pathname },
      })
    }
    if (isAuthenticated) {
      return children
    }

    if(!isAuthenticated  && !isLoading)
      asyncLogin()

  }, [isAuthenticated, children, loginWithRedirect])

  return children
}

ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export { ProtectedRoute }
