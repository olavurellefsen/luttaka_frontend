import React from 'react';
import styled from 'styled-components';
import ContentBox from './contentBox';
import { graphql, Link, useStaticQuery } from 'gatsby';
// import SearchBar from '../searchBar';


const ContentContainer = () => {

  const data = useStaticQuery(graphql`
query PhotosQuery {
  images: allFile(filter: {relativeDirectory: {regex: "/library_images/"}}) {
    totalCount
    edges {
      node {
        name
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
      image: data.images.edges.filter((item) => item.node.name === "movies")[0].node,
      title: "Filmar",
      to: "/videos"
    },
    {
      image: data.images.edges.filter((item) => item.node.name === "lecture")[0].node,
      title: "Framløgur",
      to: "/lectures"
    },
    {
      image: data.images.edges.filter((item) => item.node.name === "magazine")[0].node,
      title: "Vísindavøkubløð",
      to: "/magazines"
    },
    {
      image: data.images.edges.filter((item) => item.node.name === "award")[0].node,
      title: "Miðlaheiðursløn",
      to: "/awards"
    },
    {
      image: data.images.edges.filter((item) => item.node.name === "media")[0].node,
      title: "Í miðlunum",
      to: "/media"
    },
    {
      image: data.images.edges.filter((item) => item.node.name === "ymiskt")[0].node,
      title: "Ymiskt",
      to: "/diverse"
    },
  ]
  return (
    <ContainerStyle>
      {/* <SearchBar /> */}
      <RowContainer>
        {content.map((item, index) => {
          return (
            <LinkStyle key={index} to={item.to}>
              <ContentBox item={item} />
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
