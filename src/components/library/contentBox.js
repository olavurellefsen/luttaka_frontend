import React from 'react';
import styled from 'styled-components';
import Img from "gatsby-image"
import { graphql, useStaticQuery } from 'gatsby';
import {media} from '../../utils/mediaTemplate'

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
        <ImageStyle fluid={item.image?.childImageSharp.fluid} alt={item.title} />
        : <AvatarImage imgStyle={{objectFit: "contain"}} fluid={data.placeholderImage.childImageSharp.fluid} alt={"Vitanar fróði"} />}
      <TitleStyle>{item.title}</TitleStyle>
    </ContainerStyle>
  );
};

const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
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
  margin-top: 14px;
  width: 270px;
  height: 224px;
`

const TitleStyle = styled.div`
  margin-top: auto;
  margin-bottom: auto;
`

const AvatarImage = styled(ImageStyle)`
  width: 100px;
  height: 140px;
  margin-top: 80px
  // ${media.phone1`
  //   width: 110px;
  //   height: 120px;
  // `}
`

export default ContentBox;
