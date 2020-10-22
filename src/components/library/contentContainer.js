import React from 'react';
import styled from 'styled-components';
import ContentBox from './contentBox';
import movies from './images/movies.jpg'
import lecture from './images/lecture.jpg'
import magazine from './images/magazine.png'
import award from './images/award.jpg'
import mediaImage from './images/media.png'
import avatar from '../../images/Vitanarfróði einlittur.png'
import { Link } from 'gatsby';
// import SearchBar from '../searchBar';

const ContentContainer = () => {

  const content = [
    {
      image: movies,
      title: "Filmar",
      to: "/videos"
    },
    {
      image: lecture,
      title: "Framløgur",
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
      image: mediaImage,
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
      {/* <SearchBar /> */}
      <RowContainer>
        {content.map((item, index) => {
          return (
            <LinkStyle to={item.to}>
              <ContentBox key={index} item={item} />
            </LinkStyle>
          )
        })}
      </RowContainer>
    </ContainerStyle>
  );
};


const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1300px;
`

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`

const LinkStyle = styled(Link)`
 text-decoration: none;
  &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
  }
`

export default ContentContainer;
