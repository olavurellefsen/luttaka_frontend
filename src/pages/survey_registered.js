import { graphql } from 'gatsby'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import PetalMenu from '../components/front_page_large_screens/petalMenu'
import MenuContainer from '../components/header/menuContainer'
import Layout from '../components/layout'
import { media } from '../utils/mediaTemplate'

const SurveyRegistered = ({ data }) => {
  const registrationText = data.allStrapiSurveyRegistered.nodes[0].content

  return (
    <ContainerStyle>
      <Layout>
        <MenuContainer />
        <PetalContainer name="petal container">
          <PetalMenu />
        </PetalContainer>
        <BackgroundStyle>
          <DescriptionStyle source={registrationText} />
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

const BackgroundStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: white;
  width: 100%;
  max-width: 1000px;
  margin-top: 60px;
  ${media.desktop3`
    margin-top: 200px;
  `}
    iv > * {
    margin: 20px;
  }
`


const DescriptionStyle = styled(ReactMarkdown)`
  margin: 20px;
`

const PetalContainer = styled.div`
  display: flex;
  ${media.desktop3`
    display: none;
  `}

`

export default SurveyRegistered;

export const PageQuery = graphql`
query FetchSurveyRegistered {
  allStrapiSurveyRegistered {
    nodes {
      content
    }
  }
}
`
