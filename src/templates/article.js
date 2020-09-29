import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import ReactMarkDown from 'react-markdown'
import styled from 'styled-components'
import Img from 'gatsby-image'
const ArticleTemplate = ({ data }) => {

  // const article = data.strapiArticle
  // console.log("article", article)

  return (
    <Layout>
      <StyledContainer>
        <h1>{article.title}</h1>
        {article.sections.map((section, index) => {
          return (
            <MarkDownContainer
              source={section.content}
              renderers={{
                image: ({ src, alt }) => {
                  const image = article.content_images?.find(
                    element => element.url === src
                  )
                  return (
                    <>
                      {image && image.formats?.hey ? (
                        <Img
                          fluid={image.url}
                          alt={alt}
                        />
                      ) : (
                          <img src={src} alt={"alt"} />
                        )}
                    </>
                  )
                },
                paragraph: props =>
                  props.children[0].type.name === "image" ? (
                    <div {...props} />
                  ) : (
                      <ParagraphImageStyle {...props} />
                    ),
              }}
            />
          )
        })}
      </StyledContainer>
    </Layout>
  )
}


const StyledContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #E3E3E3 0% 0% no-repeat padding-box;
`

const MarkDownContainer = styled(ReactMarkDown)`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  min-height: 100px;
  align-self: stretch;
  margin: 20px;
  text-align: left;
`
const ParagraphImageStyle = styled.p`
  display: flex;
  img {
    align-items: center;
    justify-content: center;
    margin: 0 10px;
  }
`

export default ArticleTemplate

// export const query = graphql`
//   query ArticleTemplate($id: String!) {
//     strapiArticle(id: {eq: $id}) {
//       id
//     }
//   }
// `
