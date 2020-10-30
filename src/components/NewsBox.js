import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { graphql, useStaticQuery } from 'gatsby'
import React, { useState } from 'react'
import styled from 'styled-components'
const NewsBox = () => {
  const [show, setShow] = useState(false)
  const data = useStaticQuery(graphql`
query fetchNews {
  allStrapiArticle(sort: {fields: date, order: DESC}) {
    nodes {
      id
      title
      date(formatString: "DD-MM-YYYY")
      description
      image {
        childImageSharp {
            fluid(maxWidth: 400, maxHeight: 200) {
              ...GatsbyImageSharpFluid
             }
          }
        }
      }
    }
  }
  `)
  const articles = data.allStrapiArticle
  const months = [
    `jan`,
    `feb`,
    `mars`,
    `apr`,
    `mai`,
    `juni`,
    `juli`,
    `aug`,
    `sep`,
    `okt`,
    `nov`,
    `des`,
  ]
  return (
    <ContainerStyle>
      <TitleStyle>
        <div>NÝGGJASTU TÌÐINDI</div>
        <IconStyle icon={faTimes}/>
      </TitleStyle>
      {articles.nodes.map((item, index) => {
        const dateString = item.date.split("-")
        return (
          <NewsItemContainer key={index}>
            <DateStyle>{dateString[0]}<div>{months[dateString[1] - 1].toUpperCase()}</div></DateStyle>
            <div>
              <NewsTitleStyle>{item.title}</NewsTitleStyle>
              <Img />
            </div>
          </NewsItemContainer>
        )
      })}
    </ContainerStyle>
  )
}
const ContainerStyle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  background: #F5F5F5 0% 0% no-repeat padding-box;
  height: 325px;
  overflow-y: scroll;
  overflow-x: hidden;
`

const TitleStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-self: stretch;
  margin: 15px 30px;
  font-size: 22px;
`

const NewsItemContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  background-color: white;
  margin: 20px;
  height: 50px;
  width: 90%;
`
const DateStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 50px;
  height: 50px;
  border-right: 1px solid red;
`

const NewsTitleStyle = styled.div`
  margin: 0 10px;
`

const IconStyle = styled(FontAwesomeIcon)`

`
export default NewsBox
