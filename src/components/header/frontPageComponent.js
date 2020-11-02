import React, { useState } from 'react'
import styled from 'styled-components'
import Flower from '../flower_components/flower'
import NewsBox from '../NewsBox'
import MenuContainer from './menuContainer'

const FrontPageComponent = () => {
  const [opened, setOpened] = useState(false)

  return (
    <ContainerStyle>
      <MenuContainer opened={opened} setOpened={setOpened} />
      <Flower opened={opened} setOpened={setOpened} />
      <NewsBox />
    </ContainerStyle>
  )
}

const ContainerStyle = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  // min-height: 800px;
  position: relative;
`

export default FrontPageComponent;
