import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

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

const LargeLogo = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "Logo_1.png" }) {
        childImageSharp {
          fluid(maxWidth: 300, maxHeight: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return <ContainerStyle>
    <Img
      style={{ maxHeight: "100%" }}
      imgStyle={{ objectFit: "contain" }}
      fluid={data.placeholderImage.childImageSharp.fluid}
    />
  </ContainerStyle>
}

const ContainerStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 100%;
 .gatsby-image-wrapper {
    width: 300px;
  }
z-index: 1;
`
export default LargeLogo
