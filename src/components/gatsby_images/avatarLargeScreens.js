import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import Img from "gatsby-image"

const AvatarLargeScreens = () => {

  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "Vitanarfróði einlittur.png" }) {
        childImageSharp {
          fluid(maxWidth: 240, maxHeight: 260) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return <ImageStyle
    style={{ maxHeight: "100%" }}
    // imgStyle={{ objectFit: "contain" }}
    fluid={data.placeholderImage.childImageSharp.fluid}
    name="Fróði avatar"
  />

}


const ImageStyle = styled(Img)`
  width: 130px;
  height: 170px;
`
export default AvatarLargeScreens