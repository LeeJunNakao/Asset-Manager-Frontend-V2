import styled from "styled-components";

type WrapperProps = {
  disabled?: boolean;
};

export const Wrapper = styled.div<WrapperProps>`
  border: 5px solid ${(props) => (props.disabled ? "#92A9BD" : "black")};
  border-radius: 5px;
  height: 80px;
  width: 80px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => (props.disabled ? "#92A9BD" : "black")};
  background-color: ${(props) => (props.disabled ? "#EEEEEE" : "white")};

  svg {
    flex-grow: 1;
    width: 100%;
  }

  &:hover {
    cursor: pointer;
  }

  &:active {
    color: ${(props) => (props.disabled ? "92A9BD" : "white")};
    background-color: ${(props) => (props.disabled ? "EEEEEE" : "black")};

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  & > span {
    font-weight: bold;
  }
`;
