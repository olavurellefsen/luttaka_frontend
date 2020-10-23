import React from 'react';
import styled, { css } from 'styled-components';
const ContentBox = ({item}) => {
  return (
    <ContainerStyle>
      <ImageStyle src={item.image} alt={item.title} isAvatar={item.title === `Ymiskt putl` ? true : false}/>
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

const ImageStyle = styled.img`
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
