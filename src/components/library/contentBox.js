import React from 'react';
import styled from 'styled-components';
import Img from "gatsby-image"

const ContentBox = ({ item }) => {

  return (
    <ContainerStyle>
      <ImageStyle fluid={item.image?.childImageSharp.fluid} alt={item.title} />
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

export default ContentBox;
