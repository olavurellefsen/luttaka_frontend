import React from 'react';
import styled from 'styled-components';
import ContentBox from './contentBox';

import { lectureQuery } from './images/lectureQuery'
import { mediaQuery } from './images/mediaQuery'
import { magazineQuery } from './images/magazineQuery'
import { movieQuery } from './images/movieQuery'
import { graphql, Link, useStaticQuery } from 'gatsby';
// import SearchBar from '../searchBar';

const ContentContainer = () => {

  const images = useStaticQuery(graphql`
  {
  allImageSharp {
    edges {
      node {
        id
        fluid(maxWidth: 200, maxHeight: 200) {
            ...GatsbyImageSharpFluid
        }
      }
    }
  }
}
  `)



  console.log("mages", images)
  const content = [
    {
      image: movieQuery,
      title: "Filmar",
      to: "/videos"
    },
    {
      image: lectureQuery,
      title: "Framløgur",
      to: "/lectures"
    },
    {
      image: magazineQuery,
      title: "Vísindavøkubløð",
      to: "/magazines"
    },
    {
      // image: mediaAwardsQuery,
      title: "Miðlaheiðursløn",
      to: "/awards"
    },
    {
      image: mediaQuery,
      title: "Í miðlunum",
      to: "/media"
    },
    {
      // image: avatar,
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
