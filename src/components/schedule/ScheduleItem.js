import React, {useState} from "react"
import styled from "styled-components"
import Checkbox from "./Checkbox"
import ReactMarkDown from 'react-markdown';

const ScheduleItem = ({ title, start_time, description, lecturer_name, lecturer_organisation, selectedItems, setSelectedItems}) => {
  const [addDescription, setAddDescription] = useState(false)
  return(
  <Container>
    <Content onClick={()=>{setAddDescription(!addDescription)}}>
      <StartTime>{start_time.substring(0,5)}</StartTime>
      <Title>{title}</Title>
      <Lecturer>
        <LecturerName>{lecturer_name}</LecturerName>
        {lecturer_name && <Seperator>,</Seperator>}
        <LecturerOrganisation>{lecturer_organisation}</LecturerOrganisation>
      </Lecturer>
      {addDescription && <Description source={description} />}
    </Content>
    <CheckboxContainer>
        <Checkbox selectedItems={selectedItems} setSelectedItems={setSelectedItems} title={title}/>
    </CheckboxContainer>
  </Container>
)}

const Container = styled.div`
  display: flex;
  padding: 9px;
  background-color: white;
  justify-content: space-between;
  min-width: 200px;
  margin: 0 20px;
`
const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  max-width: 300px;
  cursor: pointer;
`
const CheckboxContainer = styled.div`
  margin-top: 23px;
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
  flex-wrap: wrap;
`
const LecturerName = styled.div`
  color: #222222;
  font-size: 16px;
`
const LecturerOrganisation = styled.div`
  color: #222222;
  font-size: 16px;
`
const Seperator = styled.div`
  color: #222222;
  font-size: 16px;
  margin-right: 6px;
`
const Description = styled(ReactMarkDown)`
  color: #222222;
  font-size: 16px;
`

export default ScheduleItem
