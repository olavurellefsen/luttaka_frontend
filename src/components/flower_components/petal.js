import React from 'react'
import styled, { css, keyframes } from 'styled-components'

const Petal = ({ color, index, name, imageSource, opened, navigate }) => {
  return (
    <ContainerStyle color={color} index={index} opened={opened} onClick={() => navigate()}>
      <ImgStyle src={imageSource} alt={name}/>
    </ContainerStyle>
  )
}

const fadeAway = keyframes`
 from {
   opacity: 1;
 }
 to {
   opacity: 0;
 }
`

const ContainerStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 4;
  cursor: pointer;
  ${({ opened }) =>
    opened && css
      `
    animation: ${fadeAway};
    animation-duration: 3s;
    animation-fill-mode: forwards;
  `}
`

const ImgStyle = styled.img`
  height: 120px;
`

export default Petal;
