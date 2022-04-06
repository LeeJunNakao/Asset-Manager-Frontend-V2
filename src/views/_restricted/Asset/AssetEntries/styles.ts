import styled from "styled-components";
import { Row, Header } from "src/components/table/styles";

export const Wrapper = styled.div`
  ${Header} {
    & > span {
      display: flex;
      justify-content: center;
    }

    /* & > span:last-child {
      justify-content: flex-start;
    } */
  }

  ${Row} {
    & > span {
      display: flex;
      justify-content: center;
    }
    /* 
    & > span:last-child {
      justify-content: flex-start;
    } */
  }
`;

export const TotalWrapper = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  box-sizing: border-box;
  border: 1px solid black;

  span {
    display: flex;
  }

  & > span:first-child {
    background-color: black;
    color: white;
  }

  & > span {
    display: flex;
    justify-content: center;
  }
`;
