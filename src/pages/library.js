import React from "react"
import Layout from "../components/layout"
import styled from "styled-components"
import MenuContainer from "../components/header/menuContainer"
import PetalMenu from "../components/front_page_large_screens/petalMenu"
import ContentContainer from "../components/library/contentContainer"
import { useAuth0 } from "@auth0/auth0-react"
import {media} from "../utils/mediaTemplate"

const LibraryPage = () => {
  const { isLoading } = useAuth0()

  if(isLoading) return null
  return (
    <Background>
      <Layout>
        <MenuContainer />
        <PetalContainer name="petal container">
          <PetalMenu />
        </PetalContainer>
        <TitleStyle>Savn</TitleStyle>

        <ContentContainer />
      </Layout>
    </Background>
  )
}

const Background = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`

const PetalContainer = styled.div`
  display: flex;
  ${media.desktop3`
    display: none;
  `}

`

const TitleStyle = styled.h3`
  color: #58A449;
  display: none;
  ${media.desktop3`
    display: block;
    margin-top: 100px;
  `}
  `

export default LibraryPage
