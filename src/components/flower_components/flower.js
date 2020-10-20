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
import Avatar from '../gatsby_images/avatar';
import { media } from '../../utils/mediaTemplate'
import QuestionBox from '../questionBox';
import { navigate } from 'gatsby';

const Flower = ({ opened, setOpened }) => {
  const petals = [
    {
      title: `Skráin 2020`,
      color: `green`,
      image: schedule,
      to: () =>navigate("/schedule")
    }, {
      title: `Tíðindi`,
      color: `red`,
      image: news,
      to: () =>navigate("/news")
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
              <Petal navigate={item.to} color={item.color} title={item.title} index={index} imageSource={item.image} opened={opened} />
          )
        })}

      </PetalContainer>
      <StemStyle src={path4} right='50%' opened={opened} />
      <StemStyle src={path6} right='50%' opened={opened} />
      <StemStyle src={path7} right='133px;' opened={opened} />
      <StemStyle src={path8} right='137px' opened={opened} />
      <QuestionBox opened={opened} setOpened={setOpened} />
      <Avatar opened={opened} setOpened={setOpened} />
    </ContainerStyle>
  );
};


const ContainerStyle = styled.div`
  width: 400px;
  height: 600px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  display: none;
   ${media.desktop3`
    display: block;
  `}
  z-index: 100;
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
    left: 20px;
  }
  div:nth-child(4) {
    bottom: 155px;
    right: 20px;
  }
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
`

export default Flower;
