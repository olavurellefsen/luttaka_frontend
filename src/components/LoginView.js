import React from 'react'
import styled from 'styled-components'
import Image from './image'
import Logo from '../images/Logo_1.png'
import { useAuth0 } from '@auth0/auth0-react';

const LoginView = () => {
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0()

  const handleClick = () => {
    if (isAuthenticated) {
      logout()
    } else {
      loginWithRedirect({})

    }
  }
  return (
    <ContainerStyle>
      <Image image={Logo} />
      {!isAuthenticated && !isLoading? <ButtonStyle backgroundColor={`green`} onClick={handleClick}>Rita inn</ButtonStyle> :`logged in`}
    </ContainerStyle>
  );
};
const ContainerStyle = styled.div``

const ButtonStyle = styled.button`
  border: none;
  background-color: ${props => props.backgroundColor};
  width: 100px;
  height: 30px;
  color: white;
   .gatsby-image-wrapper {
    width: 300px;
}
`

export default LoginView
