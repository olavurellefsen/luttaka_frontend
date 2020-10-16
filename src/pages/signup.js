import React from 'react'
import styled from 'styled-components'
import PetalMenu from '../components/front_page_large_screens/petalMenu'
import MenuContainer from '../components/header/menuContainer'
import Layout from '../components/layout'
import SignupForm from '../components/signup/signupForm'
import { media } from "../utils/mediaTemplate"
import { ProtectedRoute } from '../utils/protectedRoute'

const Signup = () => {
  return (
    <ProtectedRoute>
      <Background>
        <Layout>
          <MenuContainer />
          <PetalContainer name="petal container">
            <PetalMenu />
          </PetalContainer>
          <SignupForm />
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
export default Signup
