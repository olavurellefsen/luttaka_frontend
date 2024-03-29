import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import { media } from "../../utils/mediaTemplate"
import Img from "gatsby-image"
import { searchArchives } from "../../utils/searchFunctions"

const NewsContainer = ({ nodes, input }) => {
  const articles = nodes
  const articlesByInput = articles.filter((article) =>
    searchArchives(article, input)
  )

  return (
    <ContainerStyle>
      <RowContainer>
        {articlesByInput.map((article, index) => {
          return (
            <BackgroundStyle key={index}>
              <LinkStyle to={article.id}>
                <ContentContainer>
                  <TitleStyle>{article.title}</TitleStyle>
                  <DateStyle>{article.date}</DateStyle>
                  {article.image ?
                    <ImageStyle
                      fluid={article.image?.childImageSharp.fluid}
                      alt={article.title} />
                    : null}
                  {/* <Descriptionstyle>
                    {article.description}
                  </Descriptionstyle> */}
                </ContentContainer>
              </LinkStyle>
            </BackgroundStyle>
          )
        })}
      </RowContainer>
      {
        articlesByInput.length === 0
        && <EmptySearch>Leitingin gav einki úrslit</EmptySearch>
      }
    </ContainerStyle>
  )
}

const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1200px;
`
const EmptySearch = styled.div`
  font-size: 20px;
`
const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px;
  margin-top: 0px;
`

const BackgroundStyle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: row;
  margin: 20px;
  background-color: #FFFFFF;
  min-width: 200px;
  max-width: 460px;
  width: 100%;
  ${media.tablet`
    // width: 330px;
  `}
`
const ContentContainer = styled.div`
  margin: 5px 15px;

`
const TitleStyle = styled.h2`
  font-size: 18px;
  height: 70px;
  overflow: hidden;
`

const DateStyle = styled.p`
  color: #58A449;
  font-size: 14px;

`

// const Descriptionstyle = styled.p`
//   font-size: 18px;
//   display: block;
//   ${media.desktop3`
//     display: none;
//   `}
// `

const ImageStyle = styled(Img)`
  // max-width: 400px;
  // height: 200px;
  // width: 100%;

`

const LinkStyle = styled(Link)`
  text-decoration: none;
  color: black;
  width: 100%;
`
export default NewsContainer
