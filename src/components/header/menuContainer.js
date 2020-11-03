import React from 'react'
import styled from 'styled-components'
import { useAuth0 } from '@auth0/auth0-react';
import HeaderButton from './headerButton';
import SmallLogo from '../SmallLogo';

const MenuContainer = ({ opened }) => {
  const { isAuthenticated } = useAuth0()


  return (
    <ContainerStyle name="menuContainer" isauthenticated={isAuthenticated}>
      <SmallLogo isAuthenticated={isAuthenticated} />
      <HeaderButton isAuthenticated={isAuthenticated} askQuestionedOpened={opened} />
    </ContainerStyle>
  );
};


const ContainerStyle = styled.div`
  width: 100%;
  ${'' /* display: flex;
  align-self: flex-start;
  justify-content: center;
  align-items: center; */}
`

export default MenuContainer
