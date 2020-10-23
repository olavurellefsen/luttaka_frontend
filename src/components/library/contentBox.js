import React from 'react';
import styled, { css } from 'styled-components';
import Img from "gatsby-image"
const ContentBox = ({item}) => {


  console.log("item", item)
  return (
    <ContainerStyle>
      <ImageStyle fluid={item.image.childImageSharp.fluid} alt={item.title} isAvatar={item.title === `Ymiskt putl` ? true : false}/>
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
  width: 280px;
  height: 224px;
  margin: 8px;
  ${({ isAvatar }) =>
  isAvatar && css
      `
        width: 200px;
        height: 200px;
  `}
`

export default ContentBox;
