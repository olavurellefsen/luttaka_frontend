import React, {useState} from "react"
import styled from "styled-components"
import Checkbox from "./Checkbox" 
import ReactMarkDown from 'react-markdown';

const ScheduleItem = ({title, start_time, description, lecturer_name, lecturer_organisation}) => {
  const [addDescription, setAddDescription] = useState(false)
  return(
  <Container>
    <Content onClick={()=>{setAddDescription(!addDescription)}}>
      <StartTime>{start_time.substring(0,5)}</StartTime>
      <Title>{title}</Title>
      <Lecturer>
        <LecturerName>{lecturer_name}</LecturerName>
        {lecturer_name && <Seperator>, </Seperator>}
        <LecturerOrganisation> {lecturer_organisation}</LecturerOrganisation>
      </Lecturer>
      {addDescription && <Description source={description} />}
    </Content>
    <CheckboxContainer>
      <Checkbox />
    </CheckboxContainer>
  </Container>
)}

const Container = styled.div`
  display: flex;
 ${'' /*  margin: 10px; */}
  padding: 9px;
  background-color: white;
  ${'' /* border-radius: 7px; */}
  justify-content: space-between;

`
const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  max-width: 300px;
`
const CheckboxContainer = styled.div`
  margin-left: 20px;
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
const Description = styled(ReactMarkDown)`
  color: #222222;
  font-size: 16px;
`

export default ScheduleItem