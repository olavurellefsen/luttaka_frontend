/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import "./layout.css"
import styled from "styled-components"

const Layout = ({ children }) => {


  return (
    <BackgroundStyle>
      <Container>
        {children}
      </Container>
    </BackgroundStyle>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

const BackgroundStyle = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  width: 100vw;
  height: 100vh;
`

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  border-radius: 300px
`

export default Layout
