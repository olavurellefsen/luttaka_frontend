import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import styled, { keyframes, css } from "styled-components"

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
      placeholderImage: file(relativePath: { eq: "Logo_1.png" }) {
        childImageSharp {
          fluid(maxWidth: 100, maxHeight: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return <ImageStyle
    isAuthenticated={isAuthenticated}
    style={{ maxHeight: "100%" }}
    // imgStyle={{ objectFit: "contain" }}
    fluid={data.placeholderImage.childImageSharp.fluid}
  />

}

const slideInLeft = keyframes`
  from {
    transform: translate(100%, 250%);
  }

  to {
    // -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate(10px, 10px);
`

const ImageStyle = styled(Img)`
  width: 100px;
  height: 100px;
  z-index: 1;
  ${({ isAuthenticated }) =>
    isAuthenticated && css
      `
      animation: ${slideInLeft};
      animation-duration: 3s;
      animation-fill-mode: forwards;

  `}
`
export default SmallLogo
