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
import Image from 'gatsby-image'
import ReactMarkdown from "react-markdown"
import { searchArchives } from "../utils/searchFunctions"


const LibraryPage = ({ data }) => {
  const { isLoading } = useAuth0()
  const [input, setInput] = useState(``)
  const videos = data.allStrapiVideo.nodes
  const media = data.allStrapiMedia2S.nodes
  const mediaAwards = data.allStrapiMediaAwards.nodes
  const magazines = data.allStrapiMagazine.nodes
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
            diverses.filter((item) => searchArchives(item, input)).length === 0
              && media.filter((item) => searchArchives(item, input)).length === 0
              && mediaAwards.filter((item) => searchArchives(item, input)).length === 0
              && magazines.filter((item) => searchArchives(item, input)).length === 0
              && lectures.filter((item) => searchArchives(item, input)).length === 0
              && videos.filter((item) => searchArchives(item, input)).length === 0
            ? <EmptySearch>Leitingin gav einki úrslit</EmptySearch> :
          <ItemContainer>
            <ItemStyle>FILMAR</ItemStyle>
            {videos.filter((videoItem) => searchArchives(videoItem, input)
            ).map((videoItem, index) => (<ExternalLinkStyle target="_blank" href={videoItem?.link} key={index}>
                {videoItem.title}
                <ImageStyle
                  fluid={videoItem.thumbnail.childImageSharp.fluid}
                  alt={videoItem.title} />
              </ExternalLinkStyle>))}

            <ItemStyle>FRAMLØGUR</ItemStyle>
            {lectures.filter((lectureItem) => searchArchives(lectureItem, input)).map((lectureItem, index) => (<ExternalLinkStyle target="_blank" href={lectureItem.link} key={index}>
                <HeaderTitleStyle source={lectureItem.title} />
                <ContentStyle>
                  <div>{lectureItem.Date}</div>
                  <LecturedContainer>
                    <div>{lectureItem.lecturer.name}</div><div>{lectureItem.lecturer.organisation}</div>
                  </LecturedContainer>
                </ContentStyle>
              </ExternalLinkStyle>))}

            <ItemStyle>VÍSINDAVØKUBLØÐ</ItemStyle>
            {magazines.filter((magazineItem) => searchArchives(magazineItem, input)).map((magazineItem, index) => (<ExternalLinkStyle target="_blank" href={magazineItem.link} key={index}>{magazineItem.title}</ExternalLinkStyle>))}

            <ItemStyle>MIÐLAHEIÐURSLØN</ItemStyle>
            {mediaAwards.filter((awardItem) => searchArchives(awardItem, input)).map((awardItem, index) => (<LinkStyle to={`/awards/${awardItem.id}`} key={index}>{awardItem.title}</LinkStyle>))}

            <ItemStyle>Í MIÐLINUM</ItemStyle>
            {media.filter((mediaItem) => searchArchives(mediaItem, input)).map((mediaItem, index) => (<ExternalLinkStyle target="_blank" href={mediaItem.link} key={index}>
                <DateStyle>{mediaItem.date}</DateStyle>
                <HeaderTitleStyle source={mediaItem.title} />
                <MarkDownContainer>{mediaItem.content}</MarkDownContainer>
              </ExternalLinkStyle>))}

            <ItemStyle>YMISKT</ItemStyle>
            {diverses.filter((diverseItem) => searchArchives(diverseItem, input)).map((diverseItem, index) => (<ExternalLinkStyle target="_blank" href={diverseItem.link} key={index}>
              <DateStyle>{diverseItem.date}</DateStyle>
              <HeaderTitleStyle source={diverseItem.title} />
              <MarkDownContainer>{diverseItem.content}</MarkDownContainer>
              </ExternalLinkStyle>))}
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
  color: #58A449;
  width: 100%;
  max-width: 450px;

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
  cursor: pointer;
`
const ContentStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
const LecturedContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 50%;
`

const HeaderTitleStyle = styled(ReactMarkdown)`
  p {
    font-weight: bold;
  }
`
const MarkDownContainer = styled(ReactMarkdown)`
  background-color: white;
  width: 100%;
  color: black;
  p {
    margin-bottom: 10px;
  }
`

const ImageStyle = styled(Image)`
  width: 100%;
`
const DateStyle = styled.div`
  align-self: flex-start;
  color: #58A449;
  font-size: 14px;
`

const TitleStyle = styled.h3`
  color: #58A449;
  font-size: 24px;
  ${media.desktop3`
    margin-top: 100px;
  `}
  `

const ItemStyle = styled.div`
    margin: 20px;
    font-weight: bold;
  `

const EmptySearch = styled.div`
  font-size: 20px;
`
export default LibraryPage

export const PageQuery = graphql`
query fetchLibraryItem {
 allStrapiVideo(sort: {fields: date, order: DESC}) {
    nodes {
      title
      link
      date(formatString: "DD-MM-YYYY")
      thumbnail {
        childImageSharp {
          fluid(maxWidth: 850, maxHeight: 425) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
  allStrapiMedia2S(sort: {fields: date, order: DESC}) {
    nodes {
      title
      link
      date(formatString: "DD-MM-YYYY")
      content
      NameAndOrg {
        name
        organisation
      }
    }
  }
   allStrapiLecture(sort: {fields: Date, order:DESC}) {
    nodes {
      title
      link
      title
      Date(formatString: "DD-MM-YYYY")
      lecturer {
        name
        organisation
      }
    }
  }
   allStrapiDiverses(sort: {fields: date, order:DESC}) {
    nodes {
      title
      link
      content
      date
    }
  }
  allStrapiMediaAwards(sort: {fields: date, order:DESC}) {
    nodes {
      id
      link
      title
      content
      date
    }
  }
  allStrapiMagazine(sort: {fields: date, order:DESC}) {
    nodes {
      id
      link
      title
      date
    }
  }
}

`
