import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import styled, { keyframes, css } from 'styled-components'
import Menu from './menu'

const HeaderButton = ({ isAuthenticated }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <ContainerStyle name="HeaderButton">
      <IconStyle  onClick={() => setMenuOpen(!menuOpen)} isAuthenticated={isAuthenticated} icon={faBars} size="2x" />
      {menuOpen && <Menu setMenuOpen={setMenuOpen} menuOpen={menuOpen} />}
    </ContainerStyle>
  )
}

const slideInLeft = keyframes`
   from {
      right: -20px;

  }

  to {
      right: 20px;
  }
`;

const ContainerStyle = styled.div`
  position: absolute;
  top: 10px;
  width: 100%;
`

const IconStyle = styled(FontAwesomeIcon)`
  color: #74AB58;
  position: absolute;
    ${({ isAuthenticated }) =>
    isAuthenticated && css
      `
        animation: ${slideInLeft };
        animation-duration: 0.8s;
        animation-fill-mode: forwards;

  `}
`

export default HeaderButton;
