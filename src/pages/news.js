import { graphql } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import PetalMenu from '../components/front_page_large_screens/petalMenu'
import MenuContainer from '../components/header/menuContainer'
import Layout from '../components/layout'
import NewsContainer from '../components/news/newsContainer'
import { media } from "../utils/mediaTemplate"


const News = ({ data }) => {
  return (
    <ContainerStyle>
      <Layout>
        <MenuContainer />
        <PetalContainer name="petal container">
          <PetalMenu />
        </PetalContainer>
        <TitleStyle>TÍÐINDI</TitleStyle>
        <NewsContainer nodes={data.allStrapiArticle.nodes} />
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
  ${media.desktop3`
    display: none;
  `}

`

const TitleStyle = styled.h3`
  color: #58A449;
  display: none;
  ${media.desktop3`
    display: block;
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
