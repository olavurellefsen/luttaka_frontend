import React from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'
import Img from "gatsby-image"
import ReactMarkdown from 'react-markdown'
import MenuContainer from '../components/header/menuContainer'
import Layout from '../components/layout'
import SEO from '../components/seo'

const ArticleTemplate = ({ data }) => {
  const article = data.strapiArticle

  const renderLinks = (value) => {
    return <a style={{ widht: "0" }} target="_blank" href={value.href} without rel="noreferrer">{value.children}</a>
  }

  return (
    <Layout>
      <SEO title={`Tíðindi: ${article?.title}`} description={article?.description} image={article.image?.childImageSharp?.resize} />
      <ContainerStyle>
        <MenuContainer opened={false} />
        <LinkStyle to="/news" ><GreenTitle>Tíðindi</GreenTitle></LinkStyle>
        <StyledContainer>
          <ContentContainer>
            <TitleStyle>{article.title}</TitleStyle>
            <DateStyle>{article.date}</DateStyle>
            {article?.image && <ImageStyle fluid={article.image?.childImageSharp.fluid} alt={article.title} />}
            <MarkDownContainer
              source={article.content}
              renderers={{
                link: renderLinks,
                image: ({ src, alt }) => {
                  const image = article.content_images?.find(
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
                    <p {...props} />
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
  max-width: 900px;
`

const ContentContainer = styled.div`
  margin: 5px 15px;
  background-color: #FFFFFF;
`

const TitleStyle = styled.h2`
  font-size: 18px;
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

const DateStyle = styled.p`
  color: #58A449;
  font-size: 14px;

`


const ImageStyle = styled(Img)`
  // margin: 15px;

`



const MarkDownContainer = styled(ReactMarkdown)`
  flex-direction: column;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  min-height: 100px;
  margin: 5px 0;
`

const ParagraphImageStyle = styled.p`
  /* display: flex; */
  img {
    margin: auto;
  }
`

export default ArticleTemplate

export const query = graphql`
  query ArticleTemplate($id: String!) {
    strapiArticle(id: {eq: $id}) {
      id
      title
      active
      content
      description
      date(formatString: "DD-MM-YYYY")
       image {
        childImageSharp {
            fluid(maxWidth: 895, maxHeight: 406) {
              ...GatsbyImageSharpFluid
               src
             }
            resize(width: 400, height: 300) {
              src
              width
              height
            }
          }
        }
    }
  }
`
