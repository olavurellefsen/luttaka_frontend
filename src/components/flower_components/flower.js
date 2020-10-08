import React from 'react';
import styled from 'styled-components';
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
const Flower = () => {
  console.log("shce", schedule)
  const petals = [
    {
      title: `Skráin 2020`,
      color: `green`,
      image: schedule,
      stem: path4
    }, {
      title: `Tíðindi`,
      color: `red`,
      image: news,
      stem: path6
    },
    {
      title: "Savn",
      color: "yellow",
      image: storage,
      stem: path7

    },
    {
      title: `Tilmelding`,
      color: `blue`,
      image: join,
      stem: path8
    }
  ]

  return (
    <>
    <ContainerStyle>
      <PetalContainer name="petal_container">
        {petals.map((item, index) => {
          return (
            <Petal key={index} color={item.color} title={item.title} index={index} imageSource={item.image} stem={item.stem} />
          )
        })}

      </PetalContainer>
      <StemStyle src={path4} right='171px' />
      <StemStyle src={path6} right='171px' />
      <StemStyle src={path7} right='111px;' />
      <StemStyle src={path8} right='111px' />
      <Avatar />
    </ContainerStyle>
    </>
  );
};


const ContainerStyle = styled.div`
  width: 400px;
  height: 600px;
  // position: fixed;
   position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
`
const PetalContainer = styled.div`
  div:nth-child(1) {
    left: 60px;
    bottom: 400px;
   }
  div:nth-child(2) {
    bottom: 340px;
    left: 240px;
  }
  div:nth-child(3) {
    bottom: 240px;
    left: 60px;
  }
  div:nth-child(4) {
    bottom: 155px;
    right: 0;
  }
`

const StemContainer = styled.div`

`

const StemStyle = styled.img`
    position: absolute;
    bottom: 0;
    right: ${props => props.right};
`
const StemStyleRotate = styled(StemStyle)`
  transform: rotateY(180deg);
`
export default Flower;
