import { graphql, Link } from 'gatsby'
import Image from 'gatsby-image'
import React from 'react'
import styled from 'styled-components'
import PetalMenu from '../components/front_page_large_screens/petalMenu'
import MenuContainer from '../components/header/menuContainer'
import Layout from '../components/layout'
import { media } from "../utils/mediaTemplate"


const Movies = ({ data }) => {
  console.log("movies", data)

  const movies = data.allStrapiMovie.edges

  return (
    <ContainerStyle>
      <Layout>
        <MenuContainer />
        <PetalContainer name="petal container">
          <PetalMenu />
        </PetalContainer>
          <TitleStyle>Filmar</TitleStyle>
        <BackgroundStyle>
          {movies.map((movie, index) => {

            return (
              <LinkStyle to={movie.node.id} key={index}>{movie.node.title}<Image style={{margin: "20px"}} fixed={movie.node.thumbnail.childImageSharp.fixed}/></LinkStyle>
            )
          })}
        </BackgroundStyle>
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
const BackgroundStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  max-width: 1000px;
  margin-top: 60px;
  ${media.desktop3`
    margin-top: 100px;
  flex-direction: column;

  `}
`

const TitleStyle = styled.h3`
  color: #58A449;
  font-size: 24px;
`

const LinkStyle = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  background-color: #FFFF;
  color: black;
  min-width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
  font-size: 18px;

`

export default Movies

export const PageQuery = graphql`
query FetchMovies {
  allStrapiMovie {
    edges {
      node {
        id
        title
        thumbnail {
           childImageSharp {
            fixed(width: 230, height: 250) {
              ...GatsbyImageSharpFixed
             }
          }
        }
      }
    }
  }
}

`
