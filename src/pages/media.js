
// import Image from 'gatsby-image'
import React from 'react'
// import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import PetalMenu from '../components/front_page_large_screens/petalMenu'
import MenuContainer from '../components/header/menuContainer'
import Layout from '../components/layout'
import { media } from "../utils/mediaTemplate"


const Media = ({ data }) => {

  // const media = data.allStrapiAward.edges

  return (
    <Background>
    <Layout>
      <MenuContainer />
      <PetalContainer name="petal container">
        <PetalMenu />
      </PetalContainer>
      {/* <TitleStyle>Miðlaheiðurslønir</TitleStyle> */}
      <TitleStyle>UPS!
      Vit arbeiða við at fylla tilfar á.
      Um eina lítla løtu verður tað heilt skjótt.
</TitleStyle>
      <ContainerStyle>
        {/* {media.map((mediaItem, index) => {
          return (
            <BackgroundStyle>
              <LinkStyle href={mediaItem.node.link} key={index}>{mediaItem.node.title}
                <ImageStyle
                  style={{ width: "100%" }}
                  fluid={mediaItem.node.thumbnail.childImageSharp.fluid}
                  alt={mediaItem.node.title} />
              </LinkStyle>
              <MarkDownContainer source={mediaItem.node.description} />
            </BackgroundStyle>
          )
        })} */}
      </ContainerStyle>
    </Layout>
    </Background>
  )
}
const Background = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`

const ContainerStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 20px;
  margin-top: 0px
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
// const BackgroundStyle = styled.div`
//   display: flex;
//   justify-content:center;
//   align-items: center;
//   flex-direction: column;
//   margin: 20px;
//   background-color: #FFFFFF;
//   width: 450px;
// `

const TitleStyle = styled.h3`
  color: #58A449;
  font-size: 24px;
  ${media.desktop3`
    display: block;
    margin-top: 100px;
  `}
`

// const LinkStyle = styled.a`
//   display: flex;
//   flex: 1;
//   flex-direction: column;
//   text-decoration: none;
//   background-color: #FFFF;
//   color: black;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 18px;
//   margin: 20px;
//   width: 430px;
// `

// const ImageStyle = styled(Image)`
//   display: flex;
//   flex: 1;
//   margin: 20px;
// `

// const MarkDownContainer = styled(ReactMarkdown)`
//   margin: 20px;
//   background-color: white;
//   width: 100%;
//   p {
//     margin: 10px;
//   }
// `

export default Media

// export const PageQuery = graphql`
//  query fetchMedia {
//    allStrapiAward{
//      edges {
//        node {
//          id
//          title
//          description
//          link
//          thumbnail {
//            childImageSharp {
//              fluid(maxWidth: 800, maxHeight: 400) {
//                  ...GatsbyImageSharpFluid
//              }
//            }
//          }
//        }
//      }
//    }
//  }

//  `
