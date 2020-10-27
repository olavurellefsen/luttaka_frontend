import React from "react"
import styled from 'styled-components'
import { StaticQuery, graphql } from "gatsby"
import MenuContainer from '../components/header/menuContainer'
import PetalMenu from '../components/front_page_large_screens/petalMenu'
import Layout from "../components/layout"
import SEO from "../components/seo"
import ScheduleItem from './../components/schedule/ScheduleItem';
import { media } from "../utils/mediaTemplate"
const backend_schedule = graphql`
  query {
  allStrapiScheduleItem(sort: {fields: start_time, order: ASC}) {
    nodes {
      id
      start_time
      title
      lecturer {
        name
        organisation
      }
      description
      FullyBooked
    }
  }
}`


const Schedule = () => (
  <Background>
    <Layout>
      <SEO title="SKRÁ 2020" />

      <MenuContainer />
      <PetalContainer name="petal container">
            <PetalMenu />
          </PetalContainer>
          <TitleStyle>SKRÁ 2020</TitleStyle>
      <StaticQuery
        query={backend_schedule}
        render={
          data=>(
            <ScheduleItemList>
              <Location>Kongshøll</Location>
              {data.allStrapiScheduleItem.nodes.map(item => {
                return(
                <ScheduleItem
                  key={item.id}
                  title={item.title}
                  start_time={item.start_time}
                  lecturer_name={item.lecturer?.name}
                  lecturer_organisation={item.lecturer?.organisation}
                  description={item.description}
                  includeCheckbox={false}
                  FullyBooked={item.FullyBooked}
                />
              )})}
            </ScheduleItemList>
          )
        }
      />
    </Layout>
  </Background>
)
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
  display: none;
  font-size: 24px;
  ${media.desktop3`
    display: block;
    margin-top: 100px;
  `}
`

const Location = styled.div`
  font-size: 20px;
  font-weight: bold;
  background: white;
  padding: 10px;
  margin: 0 20px;
`

const ScheduleItemList = styled.div`
  margin: 20px;
  background-color: #FFFF;

`
export default Schedule
