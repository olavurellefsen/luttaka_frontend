import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
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
    <BackgroundStyle show={show}>
      <ContainerStyle show={show ? "flex" : "none"}>
        <TitleStyle>
          <div>NÝGGJASTU TÍÐINDI</div>
          <IconStyle icon={show ? faChevronDown : faChevronUp} onClick={() => { setShow(!show) }} />
        </TitleStyle>
        {articles.nodes.map((item, index) => {
          const dateString = item.date?.split("-")
          return (
            <NewsItemContainer key={index} show={show ? "flex" : "none"}>
              <DateStyle>{dateString?.length > 0 ? dateString[0] : ``}<div style={{ opacity: "0.8" }}>{dateString?.length > 0 ? months[dateString[1] - 1].toUpperCase() : ``}</div></DateStyle>
              <LinkStyle to={`news/${item.id}`}>
                <NewsTitleStyle>{item.title.slice(0, 42) + `...`}</NewsTitleStyle>
                <ImgStyle fixed={item.image?.childImageSharp?.fixed} />
              </LinkStyle>
            </NewsItemContainer>
          )
        })}
      </ContainerStyle>
    </BackgroundStyle>
  )
}


const ContainerStyle = styled.div`
  display: ${props => props.show}
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  ${media.desktop3`
    display: none;
  `}

`
const BackgroundStyle = styled.div`
  height: ${props => props.show ? `250px` : `40px` };
  overflow-y: ${props => props.show ? `visible` : `hidden`};
  overflow-x: hidden;
  background: #F5F5F5 0% 0% no-repeat padding-box;
  margin-right: 50px;

  ${media.desktop2`
    max-width: 350px;
    max-height: 180px;
  `}
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
  margin: 0 10px 10px 20px;
  align-self: stretch;
`
const DateStyle = styled.div`
  display: flex;
  flex: 1;
  align-self: stretch;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-width: 60px;
  max-width: 60px;
  border-right: 1px solid red;
`

const NewsTitleStyle = styled.div`
  margin: 0 10px;
  ${media.desktop2`
    max-width: 180px;
  `}
`

const LinkStyle = styled(Link)`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  align-self: stretch;
  flex-direction: row;
  color: black;
  text-decoration: none;
  font-weight: bold;
  &:visited {
    color: gray;
    font-weight: 200;
  }
`

const ImgStyle = styled(Img)`
  width: 60px;
  height: 60px;
`
const IconStyle = styled(FontAwesomeIcon)`
cursor: pointer;

`
export default NewsBox
