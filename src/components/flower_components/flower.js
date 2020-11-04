import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import Petal from './petal';
import schedule from './flower_images/Skráin 2020.svg'
import news from './flower_images/Group 5.svg'
import storage from './flower_images/Group 6.svg'
import join from './flower_images/Group 7.svg'
import path4 from './flower_images/Path 4.svg'
import path6 from './flower_images/Path 6.svg'
import path7 from './flower_images/Path 7.svg'
import path8 from './flower_images/Path 8.svg'
import QuestionBox from '../questionBox';
import { navigate } from 'gatsby';
import { media } from '../../utils/mediaTemplate'

const Flower = ({ opened, setOpened }) => {
  const petals = [
    {
      title: `Skráin 2020`,
      color: `green`,
      image: schedule,
      to: () => navigate("/schedule")
    }, {
      title: `Tíðindi`,
      color: `red`,
      image: news,
      to: () => navigate("/news")
    },
    {
      title: "Savn",
      color: "yellow",
      image: storage,
      stem: path7,
      to: () => navigate("/library")
    },
    {
      title: `Tilmelding`,
      color: `blue`,
      image: join,
      to: () => navigate("/signup")
    }
  ]

  return (
    <ContainerStyle>
      <PetalContainer name="petal_container">
        {petals.map((item, index) => {
          return (
            <Petal key={index} navigate={item.to} color={item.color} title={item.title} index={index} imageSource={item.image} opened={opened} />
          )
        })}

      </PetalContainer>
      <StemStyle src={path4} right='50%' opened={opened} altHeight="300px" />
      <StemStyle src={path6} right='50%' opened={opened} altHeight="224px" />
      <StemStyle src={path7} right='113px;' opened={opened} altHeight="280px" altRight="129px" />
      <StemStyle src={path8} right='113px' opened={opened} altheight="180px" altRight="109px"/>
      <QuestionBox opened={opened} setOpened={setOpened} large_screen={false} />
    </ContainerStyle>
  );
};


const ContainerStyle = styled.div`
  width: 355px;
  height: 510px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  z-index: 1;
  ${media.phone1`
    height: 385px;
  `}
`

const PetalContainer = styled.div`
  div:nth-child(1) {
    left: 50px;
    bottom: 380px;
   }
  div:nth-child(2) {
    bottom: 320px;
    left: 200px;
  }
  div:nth-child(3) {
    bottom: 240px;
    left: 0px;
  }
  div:nth-child(4) {
    bottom: 155px;
    right: 0px;
  }


  ${media.phone1`
    div:nth-child(1) {
    left: 50px;
    bottom: 280px;
   }
    div:nth-child(2) {
      bottom: 260px;
      left: 180px;
  }
    div:nth-child(3) {
    bottom: 180px;
    left: 25px;
  }
  div:nth-child(4) {
    bottom: 155px;
    right: 20px;
  }
   `};
`

const fadeAway = keyframes`
 from {
   opacity: 1;
 }
 to {
   opacity: 0.3;
 }
`

const StemStyle = styled.img`
  position: absolute;
  bottom: 0;
  right: ${props => props.right};
    ${({ opened }) =>
    opened && css
      `
    animation: ${fadeAway};
    animation-duration: 2s;
    animation-fill-mode: forwards;
  `}
  ${media.phone1`
    height: ${props => props.altHeight};
    right: ${props => props.altRight};

  `}
`

export default Flower;
