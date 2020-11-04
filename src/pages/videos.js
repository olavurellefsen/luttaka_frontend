
import Image from 'gatsby-image'
import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import PetalMenu from '../components/front_page_large_screens/petalMenu'
import MenuContainer from '../components/header/menuContainer'
import Layout from '../components/layout'
import SEO from "../components/seo"
import SearchBar from '../components/searchBar'
import { media } from "../utils/mediaTemplate"
import { graphql } from 'gatsby'

const Videos = ({ data }) => {

  const videos = data.allStrapiVideo.edges
  const [input, setInput] = useState(``)
  return (
    <Background>
      <Layout>
        <SEO title="FILMAR" />
        <MenuContainer />
        <PetalContainer name="petal container">
          <PetalMenu />
        </PetalContainer>
        <TitleStyle>FILMAR</TitleStyle>
        <SearchBar setInput={setInput} />
      <ContainerStyle>
        {videos.filter((video) => {
              return(
                video.node.title.toLowerCase().match(input.toLowerCase()) ||
                video.node.date?.toLowerCase().match(input.toLowerCase()) ||
                video.node.content?.toLowerCase().match(input.toLowerCase())
            )

            }
          ).map((video, index) => {
          return (
            <BackgroundStyle key={index}>
              <LinkStyle target="_blank" href={video.node.link} key={index}>
                <VideoTitle>{video.node.title}</VideoTitle>
                <ImageStyle
                  fluid={video.node.thumbnail.childImageSharp.fluid}
                  alt={video.node.title} />
              </LinkStyle>
              <DateContainer>{video.node.date}</DateContainer>
              <MarkDownContainer source={video.node.description}/>
            </BackgroundStyle>
          )
        })}
      </ContainerStyle>
      {
        videos.filter((video) => {
              return(
                video.node.title.toLowerCase().match(input.toLowerCase()) ||
                video.node.date?.toLowerCase().match(input.toLowerCase()) ||
                video.node.content?.toLowerCase().match(input.toLowerCase())
              )}
          ).length === 0
        && <EmptySearch>Leitingin gav einki úrslit</EmptySearch>
      }
      </Layout>
    </Background>
  )
}

const Background = styled.div`
  display: flex;
  flex-direction: column;
`
const ContainerStyle = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  ${'' /* margin: 20px; */}
  margin-top: 0px;
  max-width: 1200px;
  ${media.desktop3`
    max-width: 600px;

    flex-direction: column;
  `}
`
const EmptySearch = styled.div`
  font-size: 20px;
`

const PetalContainer = styled.div`
  display: flex;
  ${media.desktop3`
    display: none;
  `}
`
const BackgroundStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-direction: column;
  background-color: #FFFFFF;
  max-width: 450px;
  ${media.phone1`
    max-width: 330px;
  `}
  margin: 10px;
`

const TitleStyle = styled.h3`
  display: none;
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
  align-items: center;
  justify-content: center;
  ${'' /* font-size: 18px; */}
  ${'' /* padding-top: 20px; */}
  ${'' /* padding-bottom: 20px; */}
  margin-left: 10px;
  margin-right: 10px;
`
const VideoTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${'' /* height: 20px; */}
  font-size: 20px;
  padding: 20px;
`
const ImageStyle = styled(Image)`
  margin: 20px;
  margin-top: 0px;
  width: 100%;
`

const DateContainer = styled.div`
  display: flex;
  align-self: flex-start;
  margin-left: 10px;
  color: #74AB58;
  height: 30px;

`
const MarkDownContainer = styled(ReactMarkdown)`
  ${'' /* s */}
  padding-bottom: 20px;
  background-color: white;
  width: 100%;
  p {
    margin: 10px;
  }
`

export default Videos

export const PageQuery = graphql`
 query fetchVideos {
   allStrapiVideo(sort: {fields: date, order: ASC}) {
     edges {
       node {
         id
         title
         description
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
   }
 }

 `
