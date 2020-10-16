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
      placeholderImage: file(relativePath: { eq: "Logo.png" }) {
        childImageSharp {
          fluid(maxWidth: 400, maxHeight: 400) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return <ImageStyle
    isauthenticated={isAuthenticated}
    style={{ maxHeight: "100%", position: "absolute"}}
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
    transform: translate(-50%,-75%);
`

const ImageStyle = styled(Img)`
position: absolute;
  width: 300px;
  height: 300px;
  z-index: 1;
  ${({ isauthenticated }) =>
    isauthenticated && css
      `
      animation: ${slideInLeft};
      animation-duration: 3s;
      animation-fill-mode: forwards;

  `}
`
export default SmallLogo
