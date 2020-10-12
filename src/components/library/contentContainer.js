import React from 'react';
import styled from 'styled-components';
import ContentBox from './contentBox';
import movies from './images/movies.jpg'
import lecture from './images/lecture.jpg'
import magazine from './images/magazine.png'
import award from './images/award.jpg'
import media from './images/media.jpg'
import avatar from '../../images/Vitanarfróði einlittur.png'
import { Link } from 'gatsby';

const ContentContainer = () => {

  const content = [
    {
      image: movies,
      title: "Filmar",
      to: "/movies"
    },
    {
      image: lecture,
      title: "Fyrilestrar",
      to: "/lectures"
    },
    {
      image: magazine,
      title: "Vísindavøkubløð",
      to: "/magazines"
    },
    {
      image: award,
      title: "Miðlaheiðursløn",
      to: "/award"
    },
    {
      image: media,
      title: "Í miðlunum",
      to: "/media"
    },
    {
      image: avatar,
      title: "Ymiskt putl",
      to: "/diverse"
    },
  ]
  return (
    <ContainerStyle>
      {content.map((item, index) => {
        return (
          <LinkStyle to={item.to}>
            <ContentBox key={index} item={item} />
          </LinkStyle>
        )
      })}
    </ContainerStyle>
  );
};


const ContainerStyle = styled.div`
  display: flex;
  flex-idrection: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1300px;

`

const LinkStyle = styled(Link)`
 text-decoration: none;
  &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
  }
`

export default ContentContainer;
