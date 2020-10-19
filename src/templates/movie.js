import { graphql } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import PetalMenu from '../components/front_page_large_screens/petalMenu'
import MenuContainer from '../components/header/menuContainer'
import Layout from '../components/layout'
import { media } from '../utils/mediaTemplate'

const Movie = ({ data }) => {

  return (
    <ContainerStyle>
      <Layout>
        <MenuContainer opened={false} />
        <PetalContainer name="petal container">
          <PetalMenu />
        </PetalContainer>
        <BackgroundStyle>
          <VideoStyle poster={data.strapiMovie.thumbnail.publicURL} controls>
            <source src={data.strapiMovie.video.publicURL} type="video/mp4" />
            <source src={data.strapiMovie.video.publicURL} type="video/ogg" />
            <source src={data.strapiMovie.video.publicURL} type="video/webm" />
            <track kind="captions" />
          </VideoStyle>
        </BackgroundStyle>
      </Layout>
    </ContainerStyle >
  )
}
const ContainerStyle = styled.div`
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
  margin-top: 60px;
  ${media.desktop3`
    margin-top: 200px;
  `}
`

const VideoStyle = styled.video`
  margin: 20px;
  width: 600px;
  height: 300px;
  ${media.desktop3`
     width: 300px;
     height: 150px;
  `}
`
export default Movie

export const PageQuery = graphql`
  query MovieTemplate($id: String!) {
    strapiMovie(id: {eq: $id}) {
      id
      title
      thumbnail {
        publicURL
      }
      video {
        publicURL
      }
  }
}
`
