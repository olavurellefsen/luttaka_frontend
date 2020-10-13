import React from "react"
import styled from "styled-components"

const ScheduleItem = ({title, start_time, lecturer_name, lecturer_organisation}) => (
  <Container>
    <StartTime>{start_time}</StartTime>
    <Title>{title}</Title>
    <Lecturer>
      <LecturerName>{lecturer_name}</LecturerName>
      <LecturerOrganisation>{lecturer_organisation}</LecturerOrganisation>
    </Lecturer>

  </Container>
)

const Container = styled.div`

`
const StartTime = styled.div`

`
const Title = styled.div`

`
const Lecturer = styled.div`

`
const LecturerName = styled.div`

`
const LecturerOrganisation = styled.div`

`

export default ScheduleItem