import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { useAuth0 } from '@auth0/auth0-react';
import HeaderButton from './headerButton';
import LargeLogo from '../LargeLogo';
import SmallLogo from '../SmallLogo';

const MenuContainer = () => {
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0()

  const handleClick = () => {
    if (isAuthenticated) {
      logout()
    } else {
      loginWithRedirect({})

    }
  }

  return (
    <ContainerStyle isAuthenticated={isAuthenticated}>
      {isAuthenticated && !isLoading ? <SmallLogo isAuthenticated={isAuthenticated} /> : <LargeLogo />}
      {isAuthenticated && !isLoading && <HeaderButton isAuthenticated={isAuthenticated} />}
      {!isAuthenticated && !isLoading ? <ButtonStyle backgroundColor={`green`} onClick={handleClick}>Rita inn</ButtonStyle> : ``}
    </ContainerStyle>
  );
};


const ContainerStyle = styled.div`
  width: 100%;
  height: 100%;
   ${({ isAuthenticated }) =>
    !isAuthenticated && css
      `
      display: flex;
      align-self: center;
      justify-content: center;
      align-items: center;
  `}

`

const slideDown = keyframes`
  from {
    transform: translateY(0);
  }

  to {
      transform: translateY(170px);
  }
`


const ButtonStyle = styled.button`
  border: none;
  background-color: ${props => props.backgroundColor};
  width: 100px;
  height: 30px;
  color: white;
  margin-top: 20px;
  display: flex;
  align-self: center;
  justify-content: center;
  align-items: center;
  position: absolute;
  transition: all 1.5s ease-out;
  animation: ${slideDown};
  animation-duration: 3s;
  animation-fill-mode: forwards;
  `

export default MenuContainer
