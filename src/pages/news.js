import { graphql } from 'gatsby'
import React, { useState } from 'react'
import styled from 'styled-components'
import PetalMenu from '../components/front_page_large_screens/petalMenu'
import MenuContainer from '../components/header/menuContainer'
import Layout from '../components/layout'
import SEO from "../components/seo"
import NewsContainer from '../components/news/newsContainer'
import SearchBar from '../components/searchBar'
import { media } from "../utils/mediaTemplate"


const News = ({ data }) => {
  const [input, setInput] = useState(``)
  return (
    <ContainerStyle>
      <Layout>
        <SEO title="TÍÐINDI" />
        <MenuContainer />
        <PetalContainer name="petal container">
          <PetalMenu />
        </PetalContainer>
        <TitleStyle>TÍÐINDI</TitleStyle>
        <SearchBar setInput={setInput} />
        <NewsContainer nodes={data.allStrapiArticle.nodes} input={input}/>
      </Layout>
    </ContainerStyle>
  )
}

const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`

const PetalContainer = styled.div`
  display: flex;
  font-size: 24px;
  ${media.desktop3`
    display: none;
  `}

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


export default News

export const pageQuery = graphql`
query fetchArticles {
  allStrapiArticle(sort: {fields: date, order: DESC}) {
    nodes {
      id
      title
      date(formatString: "DD-MM-YYYY")
      description
      image {
        childImageSharp {
            fluid(maxWidth: 400, maxHeight: 200) {
              ...GatsbyImageSharpFluid
             }
          }
        }
      }
    }
  }
`
