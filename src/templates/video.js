import { graphql, Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import PetalMenu from '../components/front_page_large_screens/petalMenu'
import MenuContainer from '../components/header/menuContainer'
import Layout from '../components/layout'
import { media } from '../utils/mediaTemplate'

const Video = ({ data }) => {

  return (
    <Layout>
      <ContainerStyle>
        <MenuContainer opened={false} />
        <PetalContainer name="petal container">
          <PetalMenu />
        </PetalContainer>
        <BackgroundStyle>
          <Link to={data.strapiMovie.video.link}><div>{data.strapiMovie.video.title}</div></Link>
        </BackgroundStyle>
      </ContainerStyle >
    </Layout>
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
  background-color: #FFFF;
  width: 100%;
  max-width: 1000px;
  max-height: 500px;
  margin: 20px 60px;
  ${media.desktop3`
    margin-top: 200px;
  `}
`

// const VideoStyle = styled.video`
//   margin: 20px;
//   width: 600px;
//   height: 300px;
//   ${media.desktop3`
//      width: 300px;
//      height: 150px;
//   `}
// `
export default Video

export const PageQuery = graphql`
  query VideoTemplate($id: String!) {
    strapiVideo(id: {eq: $id}) {
      id
      title
      link
  }
}
`
