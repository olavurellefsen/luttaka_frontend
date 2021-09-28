import React, { useState } from "react"
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
  allStrapiSchedule(sort: {fields: [date], order: DESC}) {
    nodes {
      id
      placement
      date
      schedule_items {
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
  }
}
`


const Schedule = () => {
  const [selectedSchedule, setSelectedSchedule] = useState(0)

  return (
    <Background>
      <Layout>
        <SEO title="SKRÁ 2021" description="Skráin fyri vísindavøkuna 2021" />
        <MenuContainer />
        <PetalContainer name="petal container">
          <PetalMenu />
        </PetalContainer>
        <StaticQuery
          query={backend_schedule}
          render={
            data => (<ContainerStyle>
              <label htmlFor="Schedule">Vel ár</label>
              <select id="Shedule" onChange={e => {
                const foundSchedule = data.allStrapiSchedule.nodes.findIndex((item) => item.date === e.target.value)
                setSelectedSchedule(foundSchedule)
              }}>
                {data.allStrapiSchedule.nodes.map((schedule, index) => <option key={index} value={schedule.date} >{new Date(schedule.date).getFullYear()}</option>)}
              </select>

              <TitleStyle>{new Date(data.allStrapiSchedule.nodes[selectedSchedule].date).getFullYear()}</TitleStyle>
              <ScheduleItemList>
                <Location>Kongshøll</Location>
                {data.allStrapiSchedule.nodes[selectedSchedule].schedule_items.sort((a, b) => {
                  const aDate = new Date()
                  aDate.setHours(a.start_time.split(":")[0])
                  aDate.setMinutes(a.start_time.split(":")[1])
                  aDate.setSeconds(a.start_time.split(":")[2])
                  debugger
                  const bDate = new Date()
                  bDate.setHours(b.start_time.split(":")[0])
                  bDate.setMinutes(b.start_time.split(":")[1])
                  bDate.setSeconds(b.start_time.split(":")[2])
                  return aDate.getTime() < bDate.getTime() ? -1 : aDate.getTime() === bDate.getTime() ? 0 : 1
                }).map(item => {
                  return (
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
                  )
                })}
              </ScheduleItemList>
            </ContainerStyle>)
          }
        />
      </Layout>
    </Background>
  )
}
const Background = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`

const ContainerStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 24px;
  label {
    font-size: 18px;
  }
  select{
    padding: 10px;
  }
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
  ${media.desktop3`
    display: block;
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
