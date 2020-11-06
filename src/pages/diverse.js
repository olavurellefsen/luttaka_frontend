
//import Image from 'gatsby-image'
import React, {useState} from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import PetalMenu from '../components/front_page_large_screens/petalMenu'
import MenuContainer from '../components/header/menuContainer'
import Layout from '../components/layout'
import SEO from "../components/seo"
import { media } from "../utils/mediaTemplate"
import { graphql } from "gatsby"
import SearchBar from '../components/searchBar'
import { searchArchives } from "../utils/searchFunctions"


const Diverse = ({ data }) => {

  const diverses = data.allStrapiDiverses.nodes
  const diverseIntro = data.allStrapiDiverseIntro.nodes[0]

  const [input, setInput] = useState(``)

  const diversesByInput = diverses.filter((diverse) =>
    searchArchives(diverse, input)
  )

  return (
    <Background>
    <Layout>
        <SEO title="YMISKT PUTL" description={diverseIntro.Description} image={diverseIntro.Image?.childImageSharp.resize} />
      <MenuContainer />
      <PetalContainer name="petal container">
        <PetalMenu />
      </PetalContainer>
      <TitleStyle>YMISKT PUTL</TitleStyle>
     <SearchBar setInput={setInput}/>
      <ContainerStyle>
        {diversesByInput.map((diverseItem, index) => {
          return (
            <BackgroundStyle key={index}>
              <LinkStyle target="_blank" href={diverseItem.link} key={index}>
                <LinkDate>{diverseItem.date}</LinkDate>
                <LinkTitle>{diverseItem.title}</LinkTitle>
                <MarkDownContainer>{diverseItem.content}</MarkDownContainer>
              </LinkStyle>
            </BackgroundStyle>
          )
        })}
      </ContainerStyle>
      {
        diversesByInput.length === 0
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
const EmptySearch = styled.div`
  font-size: 20px;
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
  margin-top: 20px;
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
const LinkDate = styled.div`
  align-self: flex-start;
  color: #58A449;
  font-size: 14px;
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
    margin-bottom: 10px;
  }
`

export default Diverse

export const PageQuery = graphql`
  query fetchDiverses {
    allStrapiDiverses(sort: {fields: date, order: DESC}){
        nodes {
          id
          title
          content
          link
          date(formatString: "DD-MM-YYYY")
        }
    }
    allStrapiDiverseIntro {
      nodes{
        id
        Description
        Image {
          childImageSharp {
            resize {
              src
              height
              width
            }
          }
        }
      }
    }
  }
`
