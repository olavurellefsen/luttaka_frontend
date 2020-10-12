import { useAuth0 } from '@auth0/auth0-react'
import React, { useState } from 'react'
import styled from 'styled-components'
import Flower from '../flower_components/flower'
import FrontPageContainer from '../front_page_large_screens/frontPageContainer'
import MenuContainer from './menuContainer'

const FrontPageComponent = () => {
  const { isAuthenticated, isLoading } = useAuth0()
  const [opened, setOpened] = useState(false)

  return (
    <ContainerStyle>
      <MenuContainer opened={opened} setOpened={setOpened} />
      {isAuthenticated && !isLoading && <Flower opened={opened} setOpened={setOpened} />}
      {isAuthenticated && !isLoading && <FrontPageContainer opened={opened} setOpened={setOpened} />}
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