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
  console.log("articles", data)
  return (
    <ContainerStyle>
      <TitleStyle>NÝGGJASTU TÌÐINDI</TitleStyle>
      {articles.nodes.map((item, key) => (
        <div></div>
      ))}
    </ContainerStyle>
  )
}
const ContainerStyle = styled.div`
  background: #F5F5F5 0% 0% no-repeat padding-box;
`

const TitleStyle = styled.div`
  font-size: 22px;
`

const NewsItemContainer = styled.div`

`

export default NewsBox
