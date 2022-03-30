import styled from "styled-components";

type WrapperProps = {
  hide: boolean;
};

export const Wrapper = styled.div<WrapperProps>`
  border: 1px solid black;
  display: ${(props) => (props.hide ? "none" : "block")};
`;

type HeaderProps = {
  columns: number;
};

export const Header = styled.div<HeaderProps>`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => props.columns},
    calc(100% / ${(props) => props.columns})
  );
  text-transform: uppercase;
  background-color: #f7f5f2;
  padding: 5px;

  &:hover {
    cursor: default;
  }
`;

export const Content = styled.div``;

type RowProps = {
  selected: boolean;
  columns: number;
};

export const Row = styled.div<RowProps>`
  padding: 5px;
  display: grid;
  background-color: ${(props) => (props.selected ? "black" : "white")};
  color: ${(props) => (props.selected ? "white" : "black")};
  grid-template-columns: repeat(
    ${(props) => props.columns},
    calc(100% / ${(props) => props.columns})
  );

  &:hover {
    cursor: pointer;
  }
`;
