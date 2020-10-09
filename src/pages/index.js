import React from "react"
import Layout from "../components/layout"
import styled from "styled-components"
import MenuContainer from "../components/header/menuContainer"

const IndexPage = () => {
  return (
    <Background>
      <Layout>
        <MenuContainer />
      </Layout>
    </Background>
  )
}

const Background = styled.div`
  display: flex;
  flex: 1;
  width: 100vw;
  height: 100vh;
`


export default IndexPage
