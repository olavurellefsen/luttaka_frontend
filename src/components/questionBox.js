import { faEnvelope, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { media } from '../utils/mediaTemplate'

const QuestionBox = ({ opened, setOpened, large_screen }) => {

  return (
    <ContainerStyle opened={opened}>
      <ExitButton large_screen={large_screen ? "true" : "false"} opened={opened.toString()} icon={faTimes} onClick={() => setOpened(!opened)} />
      <CircleStyle name="circle info" opened={opened} large_screen={large_screen ? "true" : "false"}>
        <TextStyle>Hevur tú hugskot</TextStyle>
        <TextStyle>til granskingarevni</TextStyle>
        <TextStyle>ella vilt tú spyrja ein</TextStyle>
        <TextStyle>granskara eitthvørt?</TextStyle>
        <br />
        <TextStyle>Skriva til okkara</TextStyle>
        <a href="mailto:annika@gransking.fo" aria-label="email link"><EmailButton aria-label="email icon" icon={faEnvelope}/></a>
      </CircleStyle>
    </ContainerStyle>
  )
}

const ContainerStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  display: ${props => props.opened ? "flex" : "none"};
`

const CircleStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 290px;
  height: 290px;
  border-radius: 145px;
  border: green solid 1px;
  background-color: white;
  position: absolute;
  top: 20%;
  z-index: 9;
  opacity: 0;
  ${({ large_screen }) =>
    large_screen === "true" && css`
    top: 30%;
  `}

  ${({ opened }) =>
    opened && css`
    animation: ${fade};
    animation-duration: 1s;
    animation-fill-mode: forwards;

  `}

`

const TextStyle = styled.div`
  font-size: 20px;
`

const fade = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const ExitButton = styled(FontAwesomeIcon)`
  position: absolute;
  top: -15%;
  right: 5%;
  cursor: pointer;
  font-size: 20px;
  ${({ large_screen }) =>
    large_screen && css`
    top: 5%;
  `}
   ${({ opened }) =>
    opened && css
      `
    animation: ${fade};
    animation-duration: 1s;
    animation-fill-mode: forwards;
  `}
`

const EmailButton = styled(FontAwesomeIcon)`
  color: green;
  font-size: 30px;
  margin-top: 30px;
`
export default QuestionBox
