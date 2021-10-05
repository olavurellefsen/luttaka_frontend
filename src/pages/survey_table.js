import React, { useEffect, useState } from "react"
import { gql, useSubscription } from '@apollo/client'
import { useAuth0 } from '@auth0/auth0-react'
import styled from 'styled-components'
import Layout from '../components/layout'
import PetalMenu from '../components/front_page_large_screens/petalMenu'
import MenuContainer from '../components/header/menuContainer'
import { media } from '../utils/mediaTemplate'
import { CSVLink } from 'react-csv'

const surveys_query = gql`
subscription GetSurveysJson {
  survey_json {
    id
    email
    input
    schedule_title
  }
}
`

const SurveyTable = () => {
  const { isAuthenticated, user } = useAuth0()
  const { data } = useSubscription(surveys_query)
  const [rows, setRows] = useState([])
  const [values, setValues] = useState([])
  const [headers, setHeaders] = useState([])
  const [title, setTitle] = useState("")
  const emails = ["annika@gransking.fo", "kr@tokni.com", "heg@tokni.com", "dagmar@gransking.fo", "laila@gransking.fo", "maria@gransking.fo", "oe@tokni.com"]

  useEffect(() => {
    if (data) {
      const headerArray = []
      const rowArray = []
      data.survey_json.map((survey, index) => {
        if (index === 0) {
          setTitle(survey.schedule_title)
          for (const key in JSON.parse(survey.input)) {
            headerArray.push(key)
          }
          headerArray.push("email")
        }
        const object = JSON.parse(survey.input)
        object["email"] = survey.email
        rowArray.push(object)
        return ""
      })
      setHeaders([...headerArray])
      setRows(rowArray)
    }
  }, [data])


  useEffect(() => {
    if (rows.length > 0) {
      const array = []
      rows.map((row) => array.push(Object.values(row)))
      setValues([...array])
    }
  }, [rows])

  console.log("data", data)
  return (
    <ContainerStyle>
      <Layout>
        <MenuContainer />
        <PetalContainer name="petal container">
          <PetalMenu />
        </PetalContainer>
        <TitleStyle>EFTIRMETINGAR</TitleStyle>
        {isAuthenticated && emails.includes(user.email) && <TableContainer>
          <h2>{title ? title : ""}</h2>
          <ButtonStyle>
            <CSVLink data={values} headers={headers} filename="eftirmeting.csv" target="_blank">
              Tak eftirmetingar niður sum csv
            </CSVLink>
          </ButtonStyle>
          <TableStyle>
            <thead>
              <tr>
                {headers.map((header, index) => <th key={index + header}>{header}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => {
                const values = Object.values(row)
                return <tr key={row + rowIndex}>{values.map((data, index) => {
                  if (Array.isArray(data)){
                    return <td>{data.map((word) => <div>{word}</div>)}</td>
                  }
                  return <td key={data + index}>{data}</td>
                })}</tr>
              })}
            </tbody>
          </TableStyle>
        </TableContainer>}
      </Layout>
    </ContainerStyle>
  )
}
const ContainerStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const TableContainer = styled.div`
  ${media.desktop3`
    margin-top: 100px;
  `}
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h2 {
    color: #58A449;
  }
`

const ButtonStyle = styled.button`
  display: flex;
  align-self: flex-start;
  border: none;
  background: #58A449;
  padding: 15px;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  a {
    text-decoration: none;
    color: white;
  }
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.3
  }
`

const TableStyle = styled.table`
  border-collapse: collapse;
  font-family: Roboto;
  display: grid;
  width: 700px;
  overflow-y: hidden;
  overflow-x: scroll;
  ${media.desktop3`
    width: 500px;
  `}
  ${media.phone1`
      width: 200px;
  `}
  thead {
    text-align: left;
    background: #F0F0F0;
    color: black;
    width: 100%;
  }
  tr {
    width: 100%;
    margin: 0 10px;
  }
  th {
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 14px;
  }
  th, td {
    height: 35px;
    border-bottom: 1px solid gray;
    min-width: 150px;
    padding-right: 10px;;
  }
  td {
    font-size: 14px;
    line-height: 14px;
    width: 130px;
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
    margin-top: 100px;
  `}
`
export default SurveyTable
