import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import { media } from "../../utils/mediaTemplate"
import SearchBar from '../searchBar'
import Img from "gatsby-image"

const NewsContainer = ({ nodes }) => {

  return (
    <ContainerStyle>
      <SearchBar />
      <RowContainer>

        {nodes?.map((article, index) => {
          console.log("image: ", article.image)
          return (
            <BackgroundStyle key={index}>
              <LinkStyle to={article.id}>
                <ContentContainer>
                  <TitleStyle>{article.title}</TitleStyle>
                  <DateStyle>{article.date}</DateStyle>
                  {article.image ? 
                    <ImageStyle 
                      imgStyle={{ "max-width": "80%" }}
                      fluid={article.image?.childImageSharp.fluid} 
                      alt={article.title} /> 
                    : null}
                  <Descriptionstyle>
                    {article.description}
                  </Descriptionstyle>
                </ContentContainer>
              </LinkStyle>
            </BackgroundStyle>
          )
        })}
      </RowContainer>
    </ContainerStyle>
  )
}

const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1000px;
`

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

`

const BackgroundStyle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: row;
  margin: 20px;
  background-color: #FFFFFF;
  width: 460px;
  ${media.tablet`
    width: 380px;
    height: 280px;
  `}
`
const ContentContainer = styled.div`
  margin: 5px 15px;
  width: calc(100% - 20px);
  
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

const Descriptionstyle = styled.p`
  font-size: 18px;
  display: block;
  ${media.desktop3`
    display: none;
  `}
`

const ImageStyle = styled(Img)`
  max-width: 400px;
  height: 200px;
  width: 100%;
`

const LinkStyle = styled(Link)`
  text-decoration: none;
  color: black;
  width: 100%;
`
export default NewsContainer
