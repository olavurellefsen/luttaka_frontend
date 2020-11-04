import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { graphql, Link, useStaticQuery } from 'gatsby'
import React, { useState } from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { media } from '../utils/mediaTemplate'

const NewsBox = () => {
  const [show, setShow] = useState(true)
  const data = useStaticQuery(graphql`
query fetchNews {
  allStrapiArticle(sort: {fields: date, order: DESC}, filter: {active: {eq: true}}) {
    nodes {
      id
      title
      active
      date(formatString: "DD-MM-YYYY")
      description
      image {
        childImageSharp {
          fixed(width: 60, height: 60) {
            ...GatsbyImageSharpFixed
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
    <ContainerStyle show={show ? "flex" : "none"}>
      <TitleStyle>
        <div>NÝGGJASTU TÍÐINDI</div>
        <IconStyle icon={faTimes} onClick={() => { setShow(false) }} />
      </TitleStyle>
      {articles.nodes.map((item, index) => {
        const dateString = item.date?.split("-")
        return (
          <NewsItemContainer key={index} >
            <DateStyle>{dateString[0]}<div style={{ opacity: "0.8" }}>{months[dateString[1] - 1].toUpperCase()}</div></DateStyle>
            <LinkStyle to={`news/${item.id}`}>
              <NewsTitleStyle>{item.title.slice(0, 42) + `...`}</NewsTitleStyle>
              <Img fixed={item.image.childImageSharp.fixed} />
            </LinkStyle>
          </NewsItemContainer>
        )
      })}
    </ContainerStyle>
  )
}


const ContainerStyle = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  background: #F5F5F5 0% 0% no-repeat padding-box;
  max-height: 250px;
  min-height: 250px;
  overflow-y: scroll;
  overflow-x: hidden;
  margin-right: 50px;
  ${media.desktop3`
    display: none;
  `}
  display: ${props => props.show}
`

const TitleStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-self: stretch;
  margin: 10px 30px;
  font-size: 22px;
`

const NewsItemContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  background-color: #FFFF;
  margin: 10px 20px;
  width: 90%;
  margin-top: 0;
`
const DateStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 60px;
  height: 60px;
  min-height: 60px;
  max-height: 60px;
  border-right: 1px solid red;
`

const NewsTitleStyle = styled.div`
  margin: 0 10px;
`

const LinkStyle = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-self: stretch;
  flex-direction: row;
  width: 100%;
  color: black;
  text-decoration: none;
  font-weight: bold;
  &:visited {
    color: gray;
    font-weight: 200;
  }
`
const IconStyle = styled(FontAwesomeIcon)`
cursor: pointer;

`
export default NewsBox
