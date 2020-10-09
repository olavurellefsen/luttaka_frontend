import { faEnvelope, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled, { keyframes, css } from 'styled-components'
const QuestionBox = ({ opened, setOpened, largeScreen }) => {
  return (
    <ContainerStyle opened={opened}>
      <ExitButton largeScreen={largeScreen} opened={opened.toString()} icon={faTimes} onClick={() => setOpened(!opened)}/>
      <CircleStyle name="circle info" opened={opened} largeScreen={largeScreen}>
        <TextStyle>Hevur tú hugskot</TextStyle>
        <TextStyle>til granskingarevni</TextStyle>
        <TextStyle>ella vilt tú spyrja ein</TextStyle>
        <TextStyle>granskara eitthvørt?</TextStyle>
        <br/>
        <TextStyle>Skriva til okkara</TextStyle>
        <EmailButton icon={faEnvelope}/>
      </CircleStyle>
    </ContainerStyle>
  )
}

const SlideRight = keyframes`
  from {
    right: 250%;
  }
  to {
      right: 17%;
  }
`

const SlideRightLarge = keyframes`
  from {
    right: 250%;
  }
  to {
      right: 39%;
  }
`

const ContainerStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  display: ${props => props.opened ? "block" : "none"}
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
  top: 22%;
  z-index: 9;
  ${({ largeScreen }) =>
  largeScreen && css`
    top: 40%;

  `}

  ${({ opened, largeScreen }) =>
    opened && css`
    animation: ${!largeScreen ? SlideRight : SlideRightLarge};
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
  top: -15%;;
  right: 20px;
  cursor: pointer;
  font-size: 20px;
  ${({ largeScreen }) =>
    largeScreen && css`
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
