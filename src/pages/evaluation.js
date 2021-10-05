import { graphql, navigate } from 'gatsby'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import PetalMenu from '../components/front_page_large_screens/petalMenu'
import MenuContainer from '../components/header/menuContainer'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { media } from '../utils/mediaTemplate'

const Evauluation = ({data}) => {
  const content = data.allStrapiEftirmeting.nodes[0]?.tilfar

  return (
    <ContainerStyle>
      <Layout>
        <SEO title={"Eftirmeting av vísindavøkuni"} description={content?.replace("#", "")}/>
        <MenuContainer />
        <PetalContainer name="petal container">
          <PetalMenu />
        </PetalContainer>
        <BackgroundStyle>
          <DescriptionStyle source={content} />
          <SubmitButton onClick={() => {
            navigate(`/survey`)
          }}>Nøgdsemiskanning</SubmitButton>
        </BackgroundStyle>
      </Layout>
    </ContainerStyle>
  )
}

const ContainerStyle = styled.div`
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

const BackgroundStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  margin-top: 60px;
  background-color: white;
  ${media.desktop3`
    margin-top: 200px;
  `}
   div > * {
    margin: 20px;
  }
`

const DescriptionStyle = styled(ReactMarkdown)`
  margin: 20px;
  h1 {
    color: #58A449;
  }
`

const SubmitButton = styled.button`
  background-color: #74AB58;
  color: white;
  font-size: 16px;
  width: 200px;
  height: 40px;
  margin: 5px 0;
  border: none;
  /* pointer-events: none; */
  &:active {
    opacity: 0.1;
  }
  cursor: pointer;
`
export default Evauluation

export const PageQuery = graphql`
query fetchEvalutation {
  allStrapiEftirmeting {
    nodes {
      tilfar
    }
  }
}
`
