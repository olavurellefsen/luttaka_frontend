import React from 'react'
import styled from 'styled-components'
import schedule from '../flower_components/flower_images/Skráin 2020.svg'
import altSchedule from '../flower_components/flower_images/Skráin_green.svg'
import news from '../flower_components/flower_images/Group 5.svg'
import altNews from '../flower_components/flower_images/Tíðindi_red.svg'
import storage from '../flower_components/flower_images/Group 6.svg'
import altStorage from '../flower_components/flower_images/savn_yellow.svg'
import join from '../flower_components/flower_images/Group 7.svg'
import joinAlt from '../flower_components/flower_images/Tilmelding_alt.svg'
import { media } from '../../utils/mediaTemplate'
import { Link } from 'gatsby'
import { useLocation } from '@reach/router'

const PetalMenu = () => {
  const location = useLocation()
  const petals = [
    {
      title: `Skráin 2020`,
      image: schedule,
      to: "/schedule",
      alternaTiveImage: altSchedule

    },
    {
      title: `Tíðindi`,
      image: news,
      to: "/news",
      alternaTiveImage: altNews
    },
    {
      title: "Savn",
      image: storage,
      to: "/library",
      alternaTiveImage: altStorage
    },
    {
      title: `Tilmelding`,
      image: join,
      to: "/signup",
      alternaTiveImage: joinAlt

    }
  ]

   const fetchWindowLocation = (path) => {
    switch(path) {
      case "/schedule":
        return "green"
      case "/news":
        return "red"
      case "/library":
        return "yellow"
      case "/videos":
        return "yellow"
      case "/lectures":
        return "yellow"
      case "/magazines":
        return "yellow"
      case "/awards":
        return "yellow"
      case "/media":
        return "yellow"
      case "/diverse":
        return "yellow"
      case "/signup":
        return "blue"
      default:
        return ""
    }
  }

  return (
    <ContainerStyle>
      {petals.map((item, index) => {
        const color = fetchWindowLocation(location.pathname)
        const toColor = fetchWindowLocation(item.to)
        return (
          <LinkStyle to={item.to} key={"petal" + index} >
            <ImageStyle key={index} src={color === toColor ? item.alternaTiveImage : item.image} alt={item.title} />
          </LinkStyle>
        )
      })}
    </ContainerStyle>
  )
}

// const SlideUp = keyframes`
//   from {
//     transform: translateY(-120%);
//   }
//   to {
//     transform: translateY(15%);
//   }

// `

// const FadeIn = keyframes`
//   from {
//     opacity: 0;
//   }
//   to {
//       opacity: 1
//   }
// `

const ContainerStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 280px;
  ${'' /* animation: ${SlideUp}; */}
  animation-duration: 1.2s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
  z-index: 1;
  ${media.desktop2`
  margin: 0 200px;
  `}
`

const LinkStyle = styled(Link)`

`

const ImageStyle = styled.img`
  position: relative;
  opacity: 1;
  ${'' /* animation: ${FadeIn}; */}
  // animation-duration: 1.2s;
  // animation-fill-mode: forwards;
  z-index: 1;
`

export default PetalMenu;
