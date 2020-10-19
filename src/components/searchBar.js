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
  width: 504px;
  height: 28px;
  ${media.desktop3`
    width: 180px;
  `}
  border: 0.5px solid #C9C9C9;
  border-radius: 28px;
  opacity: 1;
`

export default SearchBar;
