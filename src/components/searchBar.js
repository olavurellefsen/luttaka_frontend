import React from 'react';
import styled from 'styled-components';
import { media } from "../utils/mediaTemplate"

const SearchBar = () => {

  return (
    <ContainerStyle>
      <InputStyle placeholder="Leita" />
    </ContainerStyle>
  );
};
const ContainerStyle = styled.div`
  margin:20px;
`

const InputStyle = styled.input`
  height: 28px;
  max-width: 940px;
  width: 100%;
  border: 0.5px solid #C9C9C9;
  border-radius: 28px;
  opacity: 1;
`

export default SearchBar;
