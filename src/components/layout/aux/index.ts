import styled from "styled-components";

type WrapperProps = {
  direction: string;
  justifyContent: string;
  alignItems: string;
};

export const Wrapper = styled.div<Partial<WrapperProps>>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
`;

export const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
