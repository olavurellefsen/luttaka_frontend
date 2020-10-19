import React, { useState } from 'react'
import styled from 'styled-components'
import Flower from '../flower_components/flower'
import FrontPageContainer from '../front_page_large_screens/frontPageContainer'
import MenuContainer from './menuContainer'

const FrontPageComponent = () => {
  const [opened, setOpened] = useState(false)

  return (
    <ContainerStyle>
      <MenuContainer opened={opened} setOpened={setOpened} />
      <Flower opened={opened} setOpened={setOpened} />
      <FrontPageContainer opened={opened} setOpened={setOpened} />
    </ContainerStyle>
  )
}

const ContainerStyle = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`

export default FrontPageComponent;
