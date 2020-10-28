import React from "react"
import styled from "styled-components"

const Checkbox = ({ selectedItems, setSelectedItems, title }) => {

  const handleChange = (e) => {
    const item =  e.currentTarget.value
    const items = [...selectedItems]

    if(items.indexOf(title) > -1){
      items.splice(items.indexOf(title), 1)
      setSelectedItems(items)
    } else {
      items.push(item)
      setSelectedItems(items)
    }

  }

  return(
    <Container>
      <Box value={title} onChange={handleChange} />
      <Indicator></Indicator>
    </Container>
  )
}

const Container = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 42px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:hover {
    background-color: #ccc;
  }
  &:checked {
    background-color: #2196F3;
  }
`
const Box = styled.input.attrs({type: 'checkbox'})`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 10;
  width: 10;
  margin-left: 30px;

  &:checked {
    display: block;
  }
`
const Indicator = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 28px;
  width: 28px;
  border-radius: 50%;
  background-color: white;
  border: 2px solid #9F9F9F;

  ${Box}:checked + & {
    background-color: white;
  }

  &:after {
    content: "";
    position: absolute;
    top: 3px;
    left: 3px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: white;
    opacity: 0;
    transition: all 400ms;
  }
  ${Box}:checked + &:after {
    background-color: #74AB58;
    opacity: 1;
  }
`


export default Checkbox
