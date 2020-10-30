
//import Image from 'gatsby-image'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import PetalMenu from '../components/front_page_large_screens/petalMenu'
import MenuContainer from '../components/header/menuContainer'
import Layout from '../components/layout'
import { media } from "../utils/mediaTemplate"
import { graphql } from "gatsby"


const Media = ({ data }) => {

  const media = data.allStrapiMedia2S.edges

  return (
    <Background>
    <Layout>
      <MenuContainer />
      <PetalContainer name="petal container">
        <PetalMenu />
      </PetalContainer>
      <TitleStyle>Í MIÐLUNUM</TitleStyle>
      <ContainerStyle>
        {media.map((mediaItem, index) => {
          return (
            <BackgroundStyle key={index}>
              <LinkStyle target="_blank" href={mediaItem.node.link} key={index}>
                <LinkTitle>{mediaItem.node.title}</LinkTitle>
                <MarkDownContainer>{mediaItem.node.content}</MarkDownContainer>
                <LinkContent>{mediaItem.content}</LinkContent>
              </LinkStyle>
            </BackgroundStyle>
          )
        })}
      </ContainerStyle>
    </Layout>
    </Background>
  )
}
const Background = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`

const ContainerStyle = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-direction: column;
  flex-wrap: no-wrap;
  margin: 20px;
  margin-top: 0px;
  max-width: 500px;
  width: 100%;
`

const PetalContainer = styled.div`
  display: flex;
  font-size: 24px;
  ${media.desktop3`
    display: none;
  `}

`
const BackgroundStyle = styled.div`
  display: flex;
  justify-content:center;
  align-items: stretch;
  flex-direction: column;
  background-color: #FFFFFF;
  margin-top: 10px;
  margin-left: 15px;
  margin-right: 15px;

`

const TitleStyle = styled.h3`
  color: #58A449;
  font-size: 24px;
  ${media.desktop3`
    display: block;
    margin-top: 100px;
  `}
`

const LinkStyle = styled.a`
  display: flex;
  flex: 1;
  flex-direction: column;
  text-decoration: none;
  background-color: #FFFF;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  padding: 20px;
`
const LinkTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  align-self: flex-start;
`
const LinkContent = styled.div`
`

/* const ImageStyle = styled(Image)`
  display: flex;
  flex: 1;
  margin: 20px;
` */

const MarkDownContainer = styled(ReactMarkdown)`
  background-color: white;
  width: 100%;
  color: black;
  p {
    margin: 10px;
  }
`

export default Media

export const PageQuery = graphql`
  query fetchMedia2 {
    allStrapiMedia2S{
      edges {
        node {
          id
          title
          content
          NameAndOrg {
            name
            organisation
          }
          link
          date
        }
      }
    }
  }
`
