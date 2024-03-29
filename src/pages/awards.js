
import React, { useState } from 'react'
// import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import PetalMenu from '../components/front_page_large_screens/petalMenu'
import MenuContainer from '../components/header/menuContainer'
import Layout from '../components/layout'
import SEO from "../components/seo"
import { media } from "../utils/mediaTemplate"
import { graphql } from 'gatsby'
import SearchBar from '../components/searchBar'
import { searchArchives } from "../utils/searchFunctions"


const Awards = ({ data }) => {

  const mediaAwards = data.allStrapiMediaAwards.nodes
  const awardsIntro = data.allStrapiMediaAwardsIntro.nodes[0]
  const [input, setInput] = useState(``)

  const mediaAwardsByInput = mediaAwards.filter((mediaAward) =>
    searchArchives(mediaAward, input)
  )

  return (
    <Background>
    <Layout>
        <SEO title="MIÐLAHEIÐURSLØN" description={awardsIntro.Description} image={awardsIntro.Image?.childImageSharp.resize} />
      <MenuContainer />
      <PetalContainer name="petal container">
        <PetalMenu />
      </PetalContainer>
      <TitleStyle>MIÐLAHEIÐURSLØN</TitleStyle>
      <SearchBar setInput={setInput} />
      <ContainerStyle>
        {mediaAwardsByInput.map((mediaItem, index) => {
          return (
            <BackgroundStyle key={index}>
              <LinkStyle href={`awards/${mediaItem.id}`} key={index}>
                {mediaItem.title}
              </LinkStyle>
              {/* <MarkDownContainer source={mediaItem.node.content} /> */}
            </BackgroundStyle>
          )
        })}
      </ContainerStyle>
      {
        mediaAwardsByInput.length === 0
        && <EmptySearch>Leitingin gav einki úrslit</EmptySearch>
      }
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
  flex-wrap: wrap;
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
  justify-content:flex-start;
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
  align-items: flex-start;
  justify-content: center;
  font-size: 18px;
  padding: 20px;
  ${'' /* max-width: 420px;
  width: 100%;
  min-height: 55px; */}
`
const EmptySearch = styled.div`
  font-size: 20px;
`

// const ImageStyle = styled(Image)`
//   display: flex;
//   flex: 1;
//   margin: 20px;
// `

// const MarkDownContainer = styled(ReactMarkdown)`
//   margin: 20px;
//   background-color: white;
//   width: 100%;
//   p {
//     margin: 10px;
//   }
// `

export default Awards

export const PageQuery = graphql`
query fetchMediaAwards {
  allStrapiMediaAwards(sort: {fields: date, order: DESC}) {
    nodes {
      id
      title
      link
      content
      date
    }
  }
  allStrapiMediaAwardsIntro {
    nodes {
      id
      Description
      Image {
        childImageSharp {
          resize {
            src
            width
            height
          }
        }
      }
    }
  }
}
 `
