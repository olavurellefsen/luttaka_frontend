import React, { useState } from "react"
import Layout from "../components/layout"
import styled, { css, keyframes } from "styled-components"
import MenuContainer from "../components/header/menuContainer"
import PetalMenu from "../components/front_page_large_screens/petalMenu"
import SearchBar from "../components/searchBar"
import { media } from "../utils/mediaTemplate"
import { graphql, Link } from "gatsby"
import ReactMarkdown from "react-markdown"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import GetLecturer from "../components/lectures/getLecturer"
const LecturesPage = ({ data }) => {
  const categories = data.allStrapiCategory?.nodes
  const [open, setOpen] = useState(false)
  return (
    <Background>
      <Layout>
        <MenuContainer />
        <PetalContainer name="petal container">
          <PetalMenu />
        </PetalContainer>
        <TitleStyle>VÍSINDAVØKU SAVN - FYRILESTRAR</TitleStyle>
        <SearchBar />
        {categories.map((category, index) => (
          <HeaderContainer key={index}>
            <HeaderStyle onClick={() => setOpen(!open)} >
              <TextStyle>
                {category.title}
              </TextStyle>
              <IconStyle icon={open ? faChevronUp : faChevronDown} />
            </HeaderStyle>
            {category.lectures.map((lecture, lectureIndex) => {
              console.log("lecture: ", lecture)
              return (
                <LinkStyle to={`Lecture_${lecture.id}`}>
                  <ListItemStyle name="listItemstyle" key={lectureIndex} open={open}>
                    <HeaderTitleStyle source={lecture.title} />
                    {/* {lecture.lecturer && <GetLecturer id={lecture.lecturer} />} */}
                    <div>{lecture.lecturer.name}</div>
                    <div>{lecture.lecturer.organisation}</div>
                  </ListItemStyle>
                </LinkStyle>
              )
            })}
          </HeaderContainer>
        ))}
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

const TitleStyle = styled.h1`
  color: #58A449;
  margin-top: 60px;
  ${media.desktop3`
    margin-top: 200px;
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
  height: 65px;
  max-width: 540px;
  width: 100%;
  box-shadow: 0px 0px 5px #00000029
`
const HeaderTitleStyle = styled(ReactMarkdown)`
  margin: 0 20px;
  p {
    font
  }
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
  ${({ open }) =>
    open && css
      `
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
      margin-top: 30px;
      background-color: #FFFFFF;
      height: 65px;
      max-width: 540px;
      width: 100%;


  `}
  `

const LinkStyle = styled(Link)`
  text-decoration: none;
  color: black;
  max-width: 540px;
  width: 100%;
`

export default LecturesPage

export const PageQuery = graphql`
query fetchCategoies {
  allStrapiCategory {
    nodes {
      title
      lectures {
        id
        title
        lecturer {
          name
          organisation
        }
      }
    }
  }
}

`
