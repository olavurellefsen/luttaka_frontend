import React from 'react'
import styled from 'styled-components'
import Description from './description'
import PetalMenu from './petalMenu'
import { media } from '../../utils/mediaTemplate'
import AvatarLargeScreens from '../gatsby_images/avatarLargeScreens'

const FrontPageContainer = () => {

  return (
    <ContainerStyle>
      <PetalMenu />
      <Description />
      <AvatarLargeScreens />
    </ContainerStyle>
  )
}
const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 120px 20px;
${media.desktop3`
     display: none;
  `}
`

export default FrontPageContainer;
