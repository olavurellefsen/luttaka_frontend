import React, { useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components"
import MenuContainer from "../components/header/menuContainer"
import PetalMenu from "../components/front_page_large_screens/petalMenu"
import ContentContainer from "../components/library/contentContainer"
import { useAuth0 } from "@auth0/auth0-react"
import { media } from "../utils/mediaTemplate"
import { graphql, Link } from "gatsby"
import SearchBar from "../components/searchBar"

const LibraryPage = ({ data }) => {
  const { isLoading } = useAuth0()
  const [input, setInput] = useState(``)
  const videos = data.allStrapiVideo.nodes
  const media = data.allStrapiMedia2S.nodes
  const mediaAwards = data.allStrapiMediaAwards.nodes
  const magazines = data.allStrapiVideo.nodes
  const diverses = data.allStrapiDiverses.nodes
  const lectures = data.allStrapiLecture.nodes

  if (isLoading) return null

  return (
    <Background>
      <Layout>
        <SEO title="SAVN" />
        <MenuContainer />
        <PetalContainer name="petal container">
          <PetalMenu />
        </PetalContainer>
        <TitleStyle>SAVN</TitleStyle>
        <SearchBar setInput={setInput} />
        {!input ? <ContentContainer /> :
          <ItemContainer>

            <ItemStyle>FILMAR</ItemStyle>
            {videos.filter((videoItem) => videoItem.title?.toLowerCase()
              .match(input.toLowerCase()
                || videoItem.date?.toLowerCase().match(input.toLowerCase())
              )).map((videoItem, index) => (<ExternalLinkStyle to={videoItem?.link} key={index}>{videoItem.title}</ExternalLinkStyle>))}

            <ItemStyle>FRAMLØGUR</ItemStyle>
            {lectures.filter((lectureItem) => lectureItem.title?.toLowerCase()
              .match(input.toLowerCase()
                || lectureItem.date?.toLowerCase().match(input.toLowerCase())
                || lectureItem.lecturer?.name?.match(input.toLowerCase())
                || lectureItem.lecturer?.organization?.match(input.toLowerCase())
              )).map((lectureItem, index) => (<ExternalLinkStyle to={lectureItem.link} key={index}>{lectureItem.title}</ExternalLinkStyle>))}


            <ItemStyle>Í MIÐLINUM</ItemStyle>
            {media.filter((mediaItem) => mediaItem.title?.toLowerCase()
              .match(input.toLowerCase()
                || mediaItem.content?.toLowerCase().match(input.toLowerCase())
                || mediaItem.date?.toLowerCase().match(input.toLowerCase())
              )).map((mediaItem, index) => (<ExternalLinkStyle to={mediaItem.link} key={index}>{mediaItem.title}</ExternalLinkStyle>))}

            <ItemStyle>MIÐLAHEIÐURSLØN</ItemStyle>
            {mediaAwards.filter((awardItem) => awardItem.title.toLowerCase()
              .match(input.toLowerCase())
              || awardItem.date?.toLowerCase().match(input.toLowerCase())
              || awardItem.content?.toLowerCase().match(input.toLowerCase())
            ).map((awardItem, index) => (<LinkStyle to={`/awards/${awardItem.id}`} key={index}>{awardItem.title}</LinkStyle>))}

            <ItemStyle>VÍSINDAVØKUBLØÐ</ItemStyle>
            {magazines.filter((magazineItem) => magazineItem?.title?.toLowerCase()
              .match(input.toLowerCase())
              || magazineItem.content?.toLowerCase().match(input.toLowerCase())
              || magazineItem.date?.toLowerCase().match(input.toLowerCase())
            ).map((magazineItem, index) => (<ExternalLinkStyle to={magazineItem.link} key={index}>{magazineItem.title}</ExternalLinkStyle>))}

            <ItemStyle>YMISKT PUTL</ItemStyle>
            {diverses.filter((diverseItem) => diverseItem.title?.toLowerCase()
              .match(input.toLowerCase())
              || diverseItem.content?.toLowerCase().match(input.toLowerCase())
              || diverseItem.date?.match(input)
            ).map((diverseItem, index) => (<ExternalLinkStyle to={diverseItem.link} key={index}>{diverseItem.title}</ExternalLinkStyle>))}
          </ItemContainer>
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

const PetalContainer = styled.div`
  display: flex;
  ${media.desktop3`
    display: none;
  `}

`
const ItemContainer = styled.div`
  display: flex;
  justify-content:center;
  align-items: stretch;
  flex-direction: column;
  margin-top: 10px;
  margin-left: 15px;
  margin-right: 15px;
  color: #74AB58;
`

const LinkStyle = styled(Link)`
  display: flex;
  flex: 1;
  flex-direction: column;
  text-decoration: none;
  background-color: #FFFFFF;
  color: black;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  font-size: 18px;
  padding: 20px;
  margin: 10px;
`

const ExternalLinkStyle = styled.a`
  display: flex;
  flex: 1;
  flex-direction: column;
  text-decoration: none;
  background-color: #FFFFFF;
  color: black;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  font-size: 18px;
  padding: 20px;
  margin: 10px;

`

const TitleStyle = styled.h3`
  color: #58A449;
  display: none;
  font-size: 24px;
  ${media.desktop3`
    display: block;
    margin-top: 100px;
  `}
  `

const ItemStyle = styled.div`
    margin: 20px;
  `

export default LibraryPage

export const PageQuery = graphql`
query fetchLibraryItem {
  allStrapiVideo {
    nodes {
      title
      link

    }
  }
   allStrapiMedia2S {
    nodes {
      title
      link
      NameAndOrg {
        name
        organisation
      }
    }
  }
   allStrapiLecture {
    nodes {
      title
      link
      title
      lecturer {
        name
        organisation
      }
    }
  }
   allStrapiLecture {
    nodes {
      title
      link
      lecturer {
        name
        organisation
      }
    }
  }
   allStrapiDiverses {
    nodes {
      title
      link
      content
      date
    }
  }
  allStrapiMediaAwards {
    nodes {
      id
      link
      title
      content
    }
  }
  allStrapiMagazine {
    nodes {
      id
      link
      title
      date
    }
  }
}

`
