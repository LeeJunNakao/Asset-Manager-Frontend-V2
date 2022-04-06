import styled from "styled-components";

export const TotalWrapper = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  box-sizing: border-box;
  border: 1px solid black;

  & > span:first-child {
    background-color: black;
    color: white;
  }
`;
