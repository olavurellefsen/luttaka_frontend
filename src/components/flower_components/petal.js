import React from 'react'
import styled from 'styled-components'

const Petal = ({ color, index, name, imageSource, stem}) => {
  return (
    <ContainerStyle color={color} index={index}>
      <ImgStyle src={imageSource} alt={name}/>
    </ContainerStyle>
  )
}

const ContainerStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 4;
`

const ImgStyle = styled.img`
  height: 120px;
`

export default Petal;
