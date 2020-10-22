import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"
// import styled, { keyframes } from "styled-components"
import styled from "styled-components"
import { media } from '../utils/mediaTemplate'

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

const SmallLogo = ({ isAuthenticated }) => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "Logo.png" }) {
        childImageSharp {
          fluid(maxWidth: 400, maxHeight: 400) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return <LinkStyle to="/" ><ImageStyle
    isauthenticated={isAuthenticated}
    style={{ maxHeight: "100%", position: "absolute" }}
    // imgStyle={{ objectFit: "contain" }}
    fluid={data.placeholderImage.childImageSharp.fluid}
  /></LinkStyle>

}

// const slideInLeft = keyframes`
//   from {
//     transform: translate(100%, 250%);
//   }

//   to {
//     // -webkit-transform: translate3d(-100%, 0, 0);
//     transform: translate(-40%,-65%);
// `
const LinkStyle = styled(Link)`
  width: 300px;
  height: 300px;
  position: absolute;
  z-index: 1;
  top: -195px;
  left: -120px;
  ${media.phone1`
    width: 220px;
    height: 220px;
    top: -143px;
    left: -88px;
  `}
`


const ImageStyle = styled(Img)`
  position: absolute;
  width: 300px;
  height: 300px;
  ${media.phone1`
    width: 220px;
    height: 220px;
  `}
  z-index: 1;
  ${'' /* animation: ${slideInLeft}; */}
  animation-duration: 1.2s;
  animation-fill-mode: forwards;

`
export default SmallLogo
