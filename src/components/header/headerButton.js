import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import Menu from './menu'
import { media } from './../../utils/mediaTemplate';

const HeaderButton = ({ isAuthenticated, askQuestionedOpened }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <ContainerStyle name="HeaderButton" askQuestionedOpened={askQuestionedOpened}>
      <IconStyle onClick={() => setMenuOpen(!menuOpen)} isauthenticated={isAuthenticated ? `true` : `false`} icon={faBars} size="2x" />
      {menuOpen && <Menu setMenuOpen={setMenuOpen} menuOpen={menuOpen} />}
    </ContainerStyle>
  )
}

const slideInLeft = keyframes`
   from {
      right: -20px;
  }
  to {
      right: 5%;
  }
`;

const ContainerStyle = styled.div`
  position: absolute;
  z-index: 9;
  ${media.tablet`
    right: 15px;
  `}
  top: 50px;
  right: -0px;
  width: 100%;
  display: ${props => props.askQuestionedOpened ? "none" : "block" };
  
`

const IconStyle = styled(FontAwesomeIcon)`
  color: #74AB58;
  position: absolute;
  cursor: pointer;
  animation: ${slideInLeft };
  animation-duration: 0.8s;
  animation-timing-function: ease-in;
  animation-fill-mode: forwards;

`

export default HeaderButton;
