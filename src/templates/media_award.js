import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'
import Img from "gatsby-image"
import ReactMarkdown from 'react-markdown'
import MenuContainer from '../components/header/menuContainer'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { media } from '../utils/mediaTemplate'


const AwardTemplate = ({ data }) => {
  const award = data.strapiMediaAwards
  const imageSrc = {src: award.content.split("(")[1]?.split(")")[0], height: 300, width: 400}

  return (
    <Layout>
      <SEO title="MIÐLAHEIÐURSLØN" description={`Miðlaheiðursløn: ${award.title}`} image={imageSrc} />
      <ContainerStyle>
        <MenuContainer opened={false} />
        <LinkStyle to="/awards" ><GreenTitle>MIÐLAHEIÐURSLØN</GreenTitle></LinkStyle>
        <StyledContainer>
          <ContentContainer>
            <TitleStyle>{award.title}</TitleStyle>
            <MarkDownContainer
              source={award.content}
              renderers={{
                image: ({ src, alt }) => {
                  const image = award.content_images?.find(
                    element => element.url === src
                  )
                  return (
                    <>
                      {image && image.formats?.large.childImageSharp.fluid ? (
                        <Img
                          fluid={image.url}
                          alt={alt}
                          imgStyle={{width: "100%"}}
                        />
                      ) : (
                          <img src={src} alt={alt} style={{width: "100%"}} />
                        )}
                    </>
                  )
                },
                paragraph: props =>
                  props.children[0].type.name === "image" ? (
                    <div {...props} />
                  ) : (
                      <ParagraphImageStyle name={props.children[0].type.name} {...props} />
                    ),
              }}
            />
          </ContentContainer>

        </StyledContainer>
      </ContainerStyle>
    </Layout>
  )
}

const ContainerStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 20px;
  width: 100%;
`

const StyledContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: row;
  margin: 20px;
  background-color: #FFFFFF;
  max-width: 800px;

`

const ContentContainer = styled.div`
  margin: 5px 15px;
`

const TitleStyle = styled.h3`
  diplay: none;
  color: #58A449;
  font-size: 24px;
  ${media.desktop3`
    display: block;
    margin-top: 100px;
  `}
`

const GreenTitle = styled(TitleStyle)`
  font-size: 28px;
  height: 70px;
  color: #58A449;
`

const LinkStyle = styled(Link)`
  text-decoration: none;
`

const MarkDownContainer = styled(ReactMarkdown)`
  background: #FFFFFF 0% 0% no-repeat padding-box;
  min-height: 100px;
  margin: 5px 0;
  text-align: left;
`

const ParagraphImageStyle = styled.p`
  display: flex;
  margin: 20px;

`

export default AwardTemplate

export const query = graphql`
  query MediaAwardsTemplate($id: String!) {
    strapiMediaAwards(id: {eq: $id}) {
      id
      title
      content
    }
  }
`
