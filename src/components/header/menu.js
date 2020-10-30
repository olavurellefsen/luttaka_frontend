import { useAuth0 } from '@auth0/auth0-react'
import { faTimes, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { navigate } from 'gatsby'
import React, { useRef } from 'react'
import styled, { css, keyframes } from 'styled-components'
import useOutsideClick from '../../utils/useOutsideClick'
import { useLocation } from '@reach/router';

const Menu = ({ menuOpen, setMenuOpen }) => {
  const { logout, loginWithRedirect, user, isAuthenticated } = useAuth0()
  const ref = useRef()
  const location = useLocation()

  const menuItems = [
    {
      name: isAuthenticated ? user.name : "Ikki innritaður",
      onClick: () => navigate(),
      onlyShowIfAuth: false
    },
    {
      name: `Um vísindavøkuna`,
      onClick: () => navigate("/about"),
      onlyShowIfAuth: false
    },
    {
      name: isAuthenticated ? `Eftirmeting` : null,
      onClick: () => navigate("/evaluation"),
      onlyShowIfAuth: true
    },
    // {
    //   name: "Mín skrá",
    //   onClick: () => navigate(),
    //   onlyShowIfAuth: false
    // },
    {
      name: isAuthenticated ? `Rita út` : "Rita inn",
      onClick: isAuthenticated ? () => logout({returnTo: location.origin}) : () => loginWithRedirect({redirectUri: location.origin}),
      onlyShowIfAuth: false
    }
  ]
  useOutsideClick(ref, () => {
    setMenuOpen(!menuOpen)
  })

  return (
    <ContainerStyle  ref={ref} menuOpen={menuOpen} >

      {menuItems.map((item, index) => {
        if (!item.onlyShowIfAuth || isAuthenticated)
          return <MenuItemStyle onClick={() => item.onClick()} key={index}>{index === 0 ? <IconStyle icon={faUser} /> : null}<TextStyle>{item.name}</TextStyle></MenuItemStyle>
        else
          return null
      })}
      <ExitButton icon={faTimes} onClick={() => {
        setMenuOpen(!menuOpen)
      }} />
    </ContainerStyle>
  )
}

const slideInLeft = keyframes`
   from {
    right: -300px;
    top: -50px;

  }

  to {
      right: -5px;
      top: -50px;
  }
`;


const ContainerStyle = styled.div`
  position: absolute;
  z-index: 30;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  width: 250px;
  div:not(:first-child){
    border-top: gray solid 0.1px;
    padding: 5px;
   }
  div:first-child {
    padding: 10px;
   }
  ${({ menuOpen }) =>
    menuOpen && css
      `
        animation: ${slideInLeft};
        animation-timing-function: ease-in-out;
        animation-duration: .7s;
        animation-fill-mode: forwards;

  `}

`

const MenuItemStyle = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  width: 240px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`

const TextStyle = styled.p`
  margin: 10px;
`

const ExitButton = styled(FontAwesomeIcon)`
  position: absolute;
  top: 5px;
  right: 25px;
  cursor: pointer;
  font-size: 20px;
  &:hover {
    opacity: 0.7;
  }
`

const IconStyle = styled(FontAwesomeIcon)`
  cursor: pointer;
`
export default Menu
