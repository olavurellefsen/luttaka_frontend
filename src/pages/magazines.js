
import React, { useState } from 'react'
import styled from 'styled-components'
import PetalMenu from '../components/front_page_large_screens/petalMenu'
import MenuContainer from '../components/header/menuContainer'
import Layout from '../components/layout'
import SEO from "../components/seo"
import { media } from "../utils/mediaTemplate"
import { graphql } from 'gatsby'
import SearchBar from '../components/searchBar'


const Magazines = ({ data }) => {
console.log("data: ", data)
  const magazines = data.allStrapiMagazine.nodes
  const [input, setInput] = useState(``)
  return (
    <Background>
    <Layout>
      <SEO title="VÍSINDAVØKUBLØÐ" description="Yvirlit yvir vísindavøkubløð"/>
      <MenuContainer />
      <PetalContainer name="petal container">
        <PetalMenu />
      </PetalContainer>
      <TitleStyle>VÍSINDAVØKUBLØÐ</TitleStyle>
      <SearchBar setInput={setInput}/>
      <ContainerStyle name="MAgizeContainer">
        {magazines.filter((magazine) => magazine.title.toLowerCase().match(input.toLowerCase())).map((magazine, index) => {
          return (
            <BackgroundStyle key={index}>
              <LinkStyle target="_blank" href={magazine.link} key={index}>
                {magazine.title}
              </LinkStyle>
            </BackgroundStyle>
          )
        })}
      </ContainerStyle>
      {
        magazines.filter((magazine) => magazine.title.toLowerCase().match(input.toLowerCase())).length === 0
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
  font-size: 18px;
  padding: 20px;
`

const EmptySearch = styled.div`
  font-size: 20px;
`

export default Magazines

export const PageQuery = graphql`
 query fetchMagazines {
   allStrapiMagazine(sort: {fields: date, order: DESC}) {
      nodes {
        id
        title
        link
        date
      }
   }
 }

 `
