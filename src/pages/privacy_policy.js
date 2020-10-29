import { graphql } from 'gatsby'
import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import PetalMenu from '../components/front_page_large_screens/petalMenu'
import MenuContainer from '../components/header/menuContainer'
import Layout from '../components/layout'
import { media } from "../utils/mediaTemplate"
import { useLocation, navigate  } from '@reach/router'
import SEO from '../components/seo'

const PrivacyPolicy = ({ data }) => {
  const [accepted, setAccepted] = useState(false)

  const PrivacyPolicyText = data.allStrapiPrivacyPolicy.nodes[0]?.content
  const location = useLocation()
  return (
    <ContainerStyle>
      <Layout>
        <SEO title="Privtlívspolitikkur" description="Privatlívspolitkkur hjá vísindavøkuni" />
        <MenuContainer />
        <PetalContainer name="petal container">
          <PetalMenu />
        </PetalContainer>
        <BackgroundStyle>
          <TitleStyle>Leiðreglur um privatlívspolitikk</TitleStyle>
          <DescriptionStyle source={PrivacyPolicyText} />
          <TextStyle>
            Eg havi lisið leiðreglurnar fyri verju av privatum upplýsingum. Eg játti, at visindavoka.fo kann deila upplýsingar um meg við fyriskiparan av tiltakinum.
          </TextStyle>
          <InputStyle type="checkbox" required={true} checked={accepted} value={accepted} onChange={(e) => setAccepted(e.currentTarget.checked)}/>
        <ButtonStyle onClick={() => {
          if(accepted)
            navigate(`http://${process.env.GATSBY_AUTH0_DOMAIN}/continue${location.search}`)

        }}>Víðari</ButtonStyle>
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

const TitleStyle = styled.h1`
  color: #58A449;
  margin: 20px;
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
  width: 100%;

`

const InputStyle = styled.input`
  font-size: 24px;
  width: 24px;
  height: 24px;
`

const TextStyle = styled.div`
  font-size: 22px;
  margin: 20px;
`

const ButtonStyle = styled.button`
  border: none;
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: center;
  background-color: #74AB58;
  color: white;
  &:active{
    opacity: 0.1;
  }
  width: 200px;
  height: 30px;
  margin: 20px;
`
export default PrivacyPolicy

export const PageQuery = graphql`
query fetchPrivacyPolicy {
  allStrapiPrivacyPolicy {
    nodes {
      content
    }
  }
}
`
