import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'
import Img from "gatsby-image"
import ReactMarkdown from 'react-markdown'
import MenuContainer from '../components/header/menuContainer'
import Layout from '../components/layout'


const AwardTemplate = ({ data }) => {
  const award = data.strapiMediaAwards

  return (
    <Layout>
      <ContainerStyle>
        <MenuContainer opened={false} />
        <LinkStyle to="/awards" ><GreenTitle>Savn</GreenTitle></LinkStyle>
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
                      {image && image.formats?.large.childImageSharp.fixed ? (
                        <Img
                          fixed={image.url}
                          alt={alt}
                        />
                      ) : (
                          <img src={src} alt={alt} />
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
  max-width: 1100px;

`

const ContentContainer = styled.div`
  margin: 5px 15px;
`

const TitleStyle = styled.h2`
  font-size: 18px;
  height: 70px;
  overflow: hidden;
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

  img {
    width: 100%;
  }

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
