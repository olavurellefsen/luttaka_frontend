import React from 'react';
import styled from 'styled-components';
import ContentBox from './contentBox';
import { graphql, Link, useStaticQuery } from 'gatsby';
// import SearchBar from '../searchBar';
import avatar from '../gatsby_images/avatar'


const ContentContainer = () => {

  const data = useStaticQuery(graphql`
query PhotosQuery {
  images: allFile(filter: {relativeDirectory: {regex: "/library_images/"}}) {
    totalCount
    edges {
      node {
        childImageSharp {
          fluid(maxWidth:  280, maxHeight: 224) {
              ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
}
`)



  const content = [
    {
      image: data.images.edges[1].node,
      title: "Filmar",
      to: "/videos"
    },
    {
      image: data.images.edges[4].node,
      title: "Framløgur",
      to: "/lectures"
    },
    {
      image: data.images.edges[2].node,
      title: "Vísindavøkubløð",
      to: "/magazines"
    },
    {
      image: data.images.edges[3].node,
      title: "Miðlaheiðursløn",
      to: "/awards"
    },
    {
      image: data.images.edges[5].node,
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
