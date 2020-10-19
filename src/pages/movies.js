import { graphql, Link } from 'gatsby'
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
        {movies.map((movie, index) => {

          return (
            <LinkStyle to={movie.node.id} key={index}>{movie.node.title}</LinkStyle>
          )
        })}
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

const LinkStyle = styled(Link)`
  text-decoration: none;
  background-color: #FFFF;
  color: black;
  min-width: 200px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
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
            fixed(width: 430, height: 300) {
              ...GatsbyImageSharpFixed
             }
          }
        }
        video {
          childImageSharp {
            fixed(width: 430, height: 300) {
              ...GatsbyImageSharpFixed
             }
          }
        }
      }
    }
  }
}

`
