import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import Img from "gatsby-image"

const AvatarLargeScreens = ({ opened, setOpened }) => {

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

  return <ButtonStyle onClick={() => setOpened(!opened)}><ImageStyle
    style={{ maxHeight: "100%" }}
    // imgStyle={{ objectFit: "contain" }}
    fluid={data.placeholderImage.childImageSharp.fluid}
    name="Fróði avatar"
  /></ButtonStyle>

}


const ImageStyle = styled(Img)`
  width: 130px;
  height: 170px;
`
const ButtonStyle = styled.div`
  width: 130px;
  height: 170px;
  border: none;
  cursor: pointer;
  background-color: #FEF9EC;
  &:active {
    opacity: 0.3;
  }
`
export default AvatarLargeScreens
