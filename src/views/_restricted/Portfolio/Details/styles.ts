import styled from "styled-components";
import { Header, Content } from "src/components/table/styles";

export const Wrapper = styled.div`
  margin-top: 20px;
  width: 100%;

  ${Header} {
    span:nth-child(2) {
      display: flex;
      justify-content: center;
    }

    span:nth-child(3) {
      display: flex;
      justify-content: flex-end;
    }

    span:nth-child(4) {
      display: flex;
      justify-content: flex-end;
    }
  }

  ${Content} {
    & > div > span:nth-child(2) {
      display: flex;
      justify-content: center;
    }

    & > div > span:nth-child(3) {
      display: flex;
      justify-content: flex-end;
    }

    & > div > span:nth-child(4) {
      display: flex;
      justify-content: flex-end;
    }
  }
`;

export const ChartWrapper = styled.div`
  margin-top: 20px;
`;
