import React, { useState } from "react"
import Layout from "../components/layout"
import styled, { css, keyframes } from "styled-components"
import MenuContainer from "../components/header/menuContainer"
import PetalMenu from "../components/front_page_large_screens/petalMenu"
import SearchBar from "../components/searchBar"
import { media } from "../utils/mediaTemplate"
import { graphql } from "gatsby"
import ReactMarkdown from "react-markdown"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"

const LecturesPage = ({ data }) => {
  const categories = data.allStrapiCategory?.nodes
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState(``)
  const [selCat, setSelCat] = useState(null)

  /* const searchFunction = (item) => {
    let ret = null
    ret = lectureItem.title.toLowerCase().match(input.toLowerCase())
    return ret
  }
 */
  return (
    <Background>
      <Layout>
        <MenuContainer />
        <PetalContainer name="petal container">
          <PetalMenu />
        </PetalContainer>
        <TitleStyle>FRAMLØGUR</TitleStyle>
        <SearchBar setInput={setInput} />
        {categories.map((category, index) => {
            if(category.lectures.filter(
              (lectureItem) => {
              return(
                lectureItem.title.toLowerCase().match(input.toLowerCase()) || 
                lectureItem.lecturer.name.toLowerCase().match(input.toLowerCase()) ||
                lectureItem.lecturer.organisation.toLowerCase().match(input.toLowerCase()) ||
                lectureItem.Date.toLowerCase().match(input.toLowerCase())
                )
              }).length )
          return(
          <HeaderContainer key={index}>
            <HeaderStyle onClick={() => {
              if(selCat === index) {
                  setSelCat(null)
                  setOpen(false)
                }
              else {
                setOpen(true)
                setSelCat(index)
              }
            }} >
              <TextStyle>
                {category.title}
              </TextStyle>
              {!input && <IconStyle icon={open && selCat === index ? faChevronUp : faChevronDown} />}
            </HeaderStyle>
            {category.lectures.filter(
              (lectureItem) => 
                lectureItem.title.toLowerCase().match(input.toLowerCase()) || 
                lectureItem.lecturer.name.toLowerCase().match(input.toLowerCase()) ||
                lectureItem.lecturer.organisation.toLowerCase().match(input.toLowerCase()) ||
                lectureItem.Date.toLowerCase().match(input.toLowerCase())
                ).sort((a, b) => {
                  const [dayA, monthA, yearA] = a.Date.split("-")
                  const aDate = new Date(yearA, monthA-1, dayA)

                  const [dayB, monthB, yearB] = b.Date.split("-")
                  const bDate = new Date(yearB, monthB-1, dayB)

                  return bDate - aDate
                }).map((lecture, lectureIndex) => {
                  return (
                    <LinkStyle key={lectureIndex} href={lecture.link}>
                      <ListItemStyle name="listItemstyle" key={lectureIndex} selected={input || (open && selCat === index)}>
                        <HeaderTitleStyle source={lecture.title} />
                        <ContentStyle>
                          <div>{lecture.Date}</div>
                          <LecturedContainer><div>{lecture.lecturer.name}</div><div>{lecture.lecturer.organisation}</div></LecturedContainer>
                        </ContentStyle>
                      </ListItemStyle>
                    </LinkStyle>
                  )
                })
            }
          </HeaderContainer>
        )
        else
          return(null)
        })}
      </Layout>
    </Background>
  )
}

const Background = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`

const PetalContainer = styled.div`
  display: flex;
  ${media.desktop3`
    display: none;
  `}

`

const TitleStyle = styled.h3`
  color: #58A449;
  font-size: 24px;
  cursor: pointer;
  ${media.desktop3`
    display: block;
    margin-top: 100px;
  `}
`

const HeaderContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 1000px;
  width: 100%;
`

const HeaderStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
  background-color: #FFFFFF;
  max-width: 540px;
  width: 100%;
  box-shadow: 0px 0px 5px #00000029;
  cursor: pointer;
`
const HeaderTitleStyle = styled(ReactMarkdown)`
  margin: 0 20px;
  p {
    font-weight: bold;
  }
`
const ContentStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 20px;
  width: 100%;
`

const LecturedContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 50%;
  margin: 0 20px;
`

const TextStyle = styled.div`
  margin: 20px;
`

const IconStyle = styled(FontAwesomeIcon)`
  margin: 20px;
  font-size: 24px;
`

const slideDown = keyframes`
  from {
    display: none;
    opacity: 0.3;
    transform: translateY(-100%);
  }
  to {
    display: flex;
    opacity: 1;
    transform: translateY(0)
  }
`

const ListItemStyle = styled.div`
  display: none;
  animation: ${slideDown};
  animation-duration: 2s;
  animation-fill-mode: forwards;
  max-width: 540px;
  width: 100%;
  ${({ selected }) =>
    selected && css
      `
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
      margin-top: 30px;
      background-color: #FFFFFF;
      max-width: 540px;
      width: 100%;


  `}
  `

const LinkStyle = styled.a`
  color: black;
  max-width: 540px;
  width: 100%;
  text-decoration: none;
  &:visited {
      color: rgba(128, 128, 128, 0.1);
  }
`

export default LecturesPage

export const PageQuery = graphql`
query fetchCategoies {
  allStrapiCategory(sort: {fields: id, order: ASC}) {
    nodes {
      id
      title
      lectures {
        id
        title
        link
        Date(formatString: "DD-MM-YYYY")
        lecturer{
          id
          name
          organisation
        }
      }
    }
  }
}

`
