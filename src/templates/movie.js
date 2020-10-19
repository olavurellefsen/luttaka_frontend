import { graphql } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

const Movie = ({ data }) => {
  return (
    <ContainerStyle>

    </ContainerStyle>
  )
}
const ContainerStyle = styled.div``

export default Movie

export default PageQuery = graphql`
  query MovieTemplate($id: String!) {
    strapiMovie(id: {eq: $id}) {
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
`
