import { graphql, navigate } from 'gatsby'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import PetalMenu from '../components/front_page_large_screens/petalMenu'
import MenuContainer from '../components/header/menuContainer'
import Layout from '../components/layout'
import { media } from '../utils/mediaTemplate'

const Evauluation = ({data}) => {
  const content = data.allStrapiEftirmeting.nodes[0]?.tilfar

  return (
    <ContainerStyle>
      <Layout>
        <MenuContainer />
        <PetalContainer name="petal container">
          <PetalMenu />
        </PetalContainer>
        <BackgroundStyle>
          <DescriptionStyle source={content} />
          <button onClick={() => navigate(`/survey`)}>Nøgdsemiskanning</button>
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
  max-width: 1000px;
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

const ButtonStyle = styled.button`
  
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
