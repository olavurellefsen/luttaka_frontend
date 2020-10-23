import React from 'react';
import styled from 'styled-components';
import Img from "gatsby-image"
import { graphql, useStaticQuery } from 'gatsby';
const ContentBox = ({ item }) => {

  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "Vitanarfróði einlittur.png" }) {
        childImageSharp {
          fluid(maxWidth: 80, maxHeight: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <ContainerStyle>
      {item.title !== "Ymiskt putl" ?
        <ImageStyle fluid={item.image.childImageSharp.fluid} alt={item.title} />
        : <AvatarImage fluid={data.placeholderImage.childImageSharp.fluid} alt={"Vitanar fróði"} />}
      {item.title}
    </ContainerStyle>
  );
};

const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 296px;
  height: 312px;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  border-radius: 4px;
  opacity: 1;
  margin: 20px;
  text-align: center;
  font: normal normal 600 24px/29px Lato;
  letter-spacing: 0px;
  color: #222222;
  text-decoration: none;
`

const ImageStyle = styled(Img)`
  width: 270px;
  height: 224px;
`

const AvatarImage = styled(ImageStyle)`
  width: 140px;
  height: 170px;
  margin-bottom 50px
`

export default ContentBox;
