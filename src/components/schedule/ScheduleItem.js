import React from "react"
import styled from "styled-components"

const ScheduleItem = ({title, start_time, lecturer_name, lecturer_organisation}) => (
  <Container>
    <StartTime>{start_time.substring(0,5)}</StartTime>
    <Title>{title}</Title>
    <Lecturer>
      <LecturerName>{lecturer_name}</LecturerName>
      {lecturer_name && <Seperator>, </Seperator>}
      <LecturerOrganisation> {lecturer_organisation}</LecturerOrganisation>
    </Lecturer>

  </Container>
)

const Container = styled.div`
margin: 10px;
padding: 7px;
background-color: white;
border-radius: 7px;
`
const StartTime = styled.div`
color: #58A449;
font-size: 18px;
`
const Title = styled.div`
color: #222222;
font-size: 18px;
font-weight: bold;
`
const Lecturer = styled.div`
display: flex;
`
const LecturerName = styled.div`
color: #222222;
font-size: 16px;
`
const LecturerOrganisation = styled.div`
color: #222222;
font-size: 16px;
margin-left: 5px;
`
const Seperator = styled.div`
color: #222222;
font-size: 16px;
`

export default ScheduleItem