
import React from 'react'
import styled from 'styled-components'
import PetalMenu from '../components/front_page_large_screens/petalMenu'
import MenuContainer from '../components/header/menuContainer'
import Layout from '../components/layout'
import { media } from "../utils/mediaTemplate"
import { graphql } from 'gatsby'


const Magazines = ({ data }) => {

  const magazines = data.allStrapiMagazine.edges

  return (
    <Layout>
      <MenuContainer />
      <PetalContainer name="petal container">
        <PetalMenu />
      </PetalContainer>
      <TitleStyle>VÍSINDAVØKUBLØÐ</TitleStyle>
      <ContainerStyle>
        {magazines.map((magazine, index) => {
          return (
            <BackgroundStyle key={index}>
              <LinkStyle href={magazine.node.link} key={index}>
                {magazine.node.title}
              </LinkStyle>
            </BackgroundStyle>
          )
        })}
      </ContainerStyle>
    </Layout>
  )
}

const ContainerStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 20px;
  max-width: 1200px;
  width: 100%;
  ${media.desktop3`
    max-width: 600px;

    flex-direction: column;
  `}
`

const PetalContainer = styled.div`
  display: flex;
  ${media.desktop3`
    display: none;
  `}

`
const BackgroundStyle = styled.div`
  display: flex;
  justify-content:center;
  align-items: center;
  flex-direction: column;
  margin: 20px;
  background-color: #FFFFFF;
  max-width: 350px;
  width: 100%;
`

const TitleStyle = styled.h3`
  color: #58A449;
  font-size: 24px;
`

const LinkStyle = styled.a`
  display: flex;
  flex: 1;
  flex-direction: column;
  text-decoration: none;
  background-color: #FFFF;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin: 20px;
`

export default Magazines

export const PageQuery = graphql`
 query fetchMagazines {
   allStrapiMagazine {
     edges {
       node {
         id
         title
         link
       }
     }
   }
 }

 `
