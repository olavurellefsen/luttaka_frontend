import React from "react"
import Layout from "../components/layout"
import styled from "styled-components"
import FrontPageComponent from "../components/header/frontPageComponent"
import SEO from "../components/seo"

const IndexPage = () => {
  return (
    <Background>
      <Layout>
        <SEO title="Vísindavøkan" description="Vísindavøka byggir brýr millum granskarar og almenning"/>
        <FrontPageComponent />
      </Layout>
    </Background>
  )
}

const Background = styled.div`
  display: flex;
  flex: 1;
  width: 100vw;
  height: 100vh;
  ${'' /* min-height: 800px; */}
  overflow: hidden;
`


export default IndexPage
