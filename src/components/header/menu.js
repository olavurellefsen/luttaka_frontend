import { useAuth0 } from '@auth0/auth0-react'
import { faTimes, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { navigate } from 'gatsby'
import React from 'react'
import styled, { css, keyframes } from 'styled-components'

const Menu = ({ menuOpen, setMenuOpen }) => {
  const { logout, user, isAuthenticated, isLoading } = useAuth0()

  const menuItems = [
    {
      name: user.name,
      onClick: () => navigate()
    },
    {
      name: `Um vísindavøkuna`,
      onClick: () => navigate()
    },
    {
      name: "Mín skrá",
      onClick: () => navigate()
    },
    {
      name: `Rita út`,
      onClick: () => logout({})
    }
  ]
  if (!isAuthenticated || isLoading) return null

  return (
    <ContainerStyle menuOpen={menuOpen} >

      {menuItems.map((item, index) => {

        return <MenuItemStyle onClick={item.onClick} key={index}>{index === 0 ? <IconStyle icon={faUser} /> : null}<TextStyle>{item.name}</TextStyle></MenuItemStyle>
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
  z-index: 10;
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
        animation-duration: 3s;
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
  right: 5px;
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
