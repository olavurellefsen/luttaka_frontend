import React from 'react'
import styled, { keyframes } from 'styled-components'
import schedule from '../flower_components/flower_images/Skráin 2020.svg'
import news from '../flower_components/flower_images/Group 5.svg'
import storage from '../flower_components/flower_images/Group 6.svg'
import join from '../flower_components/flower_images/Group 7.svg'
import { media } from '../../utils/mediaTemplate'

const PetalMenu = () => {
  const petals = [
    {
      title: `Skráin 2020`,
      image: schedule,
    }, {
      title: `Tíðindi`,
      image: news,
    },
    {
      title: "Savn",
      image: storage,

    },
    {
      title: `Tilmelding`,
      image: join,
    }
  ]
  return (
    <ContainerStyle>
      {petals.map((item, index) => {
        return (
          <ImageStyle key={index} src={item.image} alt={item.title} />
        )
      })}
    </ContainerStyle>
  )
}

const SlideUp = keyframes`
  from {
    transform: translateY(100px);
  }
  to {
        transform: translateY(-70px);
  }

`

const FadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
      opacity: 1
  }
`

const ContainerStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 280px;
  animation: ${SlideUp};
  animation-duration: 3s;
  animation-fill-mode: forwards;
  z-index: 1;
  ${media.desktop2`
   margin: 0 200px;
  `}
`

const ImageStyle = styled.img`
  opacity: 0;
  animation: ${FadeIn};
  animation-duration: 3s;
  animation-fill-mode: forwards;
  z-index: 1;
`

export default PetalMenu;
