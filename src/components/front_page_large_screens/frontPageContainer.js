import React from 'react'
import styled from 'styled-components'
import Description from './description'
import PetalMenu from './petalMenu'
import { media } from '../../utils/mediaTemplate'
import AvatarLargeScreens from '../gatsby_images/avatarLargeScreens'
import QuestionBox from '../questionBox'

const FrontPageContainer = ({ opened, setOpened }) => {
  return (
    <ContainerStyle>
      <PetalMenu />
      <ContentContainer>
        <AvatarLargeScreens opened={opened} setOpened={setOpened} />
        <Description opened={opened} />
      </ContentContainer>
      <QuestionBox opened={opened} setOpened={setOpened} largeScreen={true} />
    </ContainerStyle>
  )
}
const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  margin: 20px;
 ${media.desktop3`
     display: none;
  `}
`
const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`

export default FrontPageContainer;
