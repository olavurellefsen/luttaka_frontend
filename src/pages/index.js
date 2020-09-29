import React from "react"
import Layout from "../components/layout"
import styled from "styled-components"

const IndexPage = () => {
    return (
    <Background>
      <Layout>
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
