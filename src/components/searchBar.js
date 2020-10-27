import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { media } from './../utils/mediaTemplate';

const SearchBar = ({ setInput}) => {
  return (
    <ContainerStyle>
      <Icon>
        <FontAwesomeIcon icon={faSearch} style={{ color: `#58A449` }} />
      </Icon>
      <InputStyle placeholder="Leita" onChange={(e) => setInput(e.target.value)}>
        
      </InputStyle>
      
    </ContainerStyle>
  );
};
const ContainerStyle = styled.div`
  margin:20px;
  position: relative;
  width: 360px;
  ${media.phone2`
    width: 350px;
  `}
  ${media.phone1`
    width: 250px;
  `}
`

const InputStyle = styled.input`
  height: 40px;
  width: 95%;  
  border-radius: 28px;
  opacity: 1;
  padding-left: 15px;
  outline: none;
  border: none;
  &:focus {
    border: 0.5px solid #C9C9C9;
  }
`

const Icon = styled.div`
  position: absolute;
  top: 15px;
  right: 5%;
`

export default SearchBar;
