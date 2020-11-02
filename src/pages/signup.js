import { graphql, StaticQuery } from 'gatsby'
import React, { useState } from 'react'
import styled from 'styled-components'
import PetalMenu from '../components/front_page_large_screens/petalMenu'
import MenuContainer from '../components/header/menuContainer'
import Layout from '../components/layout'
import ScheduleItem from '../components/schedule/ScheduleItem'
import SignupForm from '../components/signup/signupForm'
import { media } from "../utils/mediaTemplate"
import { ProtectedRoute } from '../utils/protectedRoute'

const Signup = () => {
  const [selectedItems, setSelectedItems] = useState([])
  const backend_schedule = graphql`
  query {
  allStrapiScheduleItem(sort: {fields: start_time, order: ASC}) {
    nodes {
      id
      start_time
      title
      FullyBooked
      lecturer {
        name
        organisation
      }
      description
    }
  }
}`

  return (
    <ProtectedRoute>
      <Background>
        <Layout>
          <MenuContainer />
          <PetalContainer name="petal container">
            <PetalMenu />
          </PetalContainer>
          <TitleStyle>Tilmelding</TitleStyle>

          <StaticQuery
            query={backend_schedule}
            render={
              data => (
                <ScheduleItemList>
                  <div style={{display: "flex", justifyContent: "center", alignItems: "center", margin: "20px 0"}}>

                    <HeaderStyle>Vel tær framløgur, tú ynskir at hoyra, og skráset upplýsingar í frymlinum niðanfyri. Trýst síðani á ”Skráset”.</HeaderStyle>
                  </div>
                    <Location>Kongshøll</Location>
                  {data.allStrapiScheduleItem.nodes.map(item => {
                    return (
                      <ScheduleItem
                        key={item.id}
                        title={item.title}
                        start_time={item.start_time}
                        lecturer_name={item.lecturer?.name}
                        lecturer_organisation={item.lecturer?.organisation}
                        description={item.description}
                        selectedItems={selectedItems}
                        setSelectedItems={setSelectedItems}
                        includeCheckbox={item.FullyBooked === true ? false : true}
                        FullyBooked={item.FullyBooked}
                      />
                    )
                  })}
                </ScheduleItemList>
              )
            }
          />
          <SignupForm selectedItems={selectedItems} />
        </Layout>
      </Background>
    </ProtectedRoute>
  )
}

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
  ${media.desktop3`
    display: block;
    margin-top: 100px;
  `}
  `

const HeaderStyle = styled.h3`
  display: flex;
  align-self: center;
  color: black;
  width: 70%;
  margin 20px;
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
  max-width: 500px;
`

export default Signup
