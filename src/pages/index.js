import React from "react"
import Layout from "../components/layout"
import styled from "styled-components"
import FrontPageComponent from "../components/header/frontPageComponent"

const IndexPage = () => {
  return (
    <Background>
      <Layout>
        <FrontPageComponent />
      </Layout>
    </Background>
  )
}

const Background = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  // min-height: 800px;
`


export default IndexPage
