import { useAuth0 } from '@auth0/auth0-react'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled, { css, keyframes } from 'styled-components'

const Menu = ({ menuOpen, setMenuOpen }) => {
  const { logout } = useAuth0()

  const menuItems = [
    {
      name: `user name`,
      onClick: () => logout({})
    },
    {
      name: `Um vísindavøkuna`,
      onClick: () => logout({})
    },
    {
      name: "Mín skrá",
      onClick: () => logout({})
    },
    {
      name: `Rita út`,
      onClick: () => logout({})
    }
  ]
  return (
    <ContainerStyle menuOpen={menuOpen} >
      <ExitButton icon={faTimes} onClick={() => {
         setMenuOpen(!menuOpen)
         }} />
      {menuItems.map((item, index) => {

        return <MenuItemStyle onClick={item.onClick} key={index}><TextStyle>{item.name}</TextStyle></MenuItemStyle>
      })}
    </ContainerStyle>
  )
}

const slideInLeft = keyframes`
   from {
    right: -320px;

  }

  to {
      right: 0px;

  }
`;


const ContainerStyle = styled.div`
  position: absolute;
  background-color: #FFFEFB;
  width: 240px;
  ${({ menuOpen }) =>
    menuOpen && css
      `
        animation: ${slideInLeft};
        animation-duration: 3s;
        animation-fill-mode: forwards;

  `}

`

const MenuItemStyle = styled.div`
  display: flex;
  top: -10px;
  flex: 1;
  width: 240px;
  cursor: pointer;
`

const TextStyle = styled.div`
  margin: 10px;
`

const ExitButton = styled(FontAwesomeIcon)`
  position: absolute;
  top: 5px;
  right: 5px;
`
export default Menu
