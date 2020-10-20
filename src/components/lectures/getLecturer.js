import { graphql, StaticQuery } from 'gatsby'
import React from 'react'
import styled from 'styled-components'


const RenderDiv = (lecturer) => {

  if (!lecturer) return null

  return (
    <TextStyle>
      {lecturer.node.name}
      , {lecturer.node.work_place.name}
    </TextStyle>
  )
}

const GetLecturer = ({ id }) => {
  return null
  // return <StaticQuery
  //   query={graphql`
  // query fetchLecturers {
  //   allStrapiLecturer {
  //     edges {
  //       node {
  //         id
  //         name
  //         work_place {
  //          id
  //           name
  //         }
  //       }
  //     }
  //   }
  // }

  //   `}
  //   render={(data) => {

  //     const lecturer = data.allStrapiLecturer.edges.find(
  //       lecturer => lecturer.node.id === `Lecturer_${id}`
  //     )
  //     return (RenderDiv(lecturer))
  //   }}
  // />
}

const TextStyle = styled.div`
  margin: 0 20px;
  margin-bottom: 10px;
`
export default GetLecturer;
