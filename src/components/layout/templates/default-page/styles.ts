import styled from "styled-components";

export const CurrencyWrapper = styled.div`
  .form-builder {
    padding: 10px 0;

    .form-builder__title-wrapper {
      display: none;
    }
  }
`;

export const Panel = styled.div`
  border: 1px solid black;

  width: 100%;
`;

type LinkWrapperProps = {
  selected: boolean;
};

export const LinkWrapper = styled.div<LinkWrapperProps>`
  background-color: ${(props) => (props.selected ? "black" : "white")};
  color: ${(props) => (props.selected ? "white" : "black")};

  &:not(:last-child) {
    border-bottom: 1px solid black;
  }

  .item {
    padding: 10px;
    display: flex;
    align-items: center;
    color: inherit;

    &:hover {
      cursor: pointer;
      background-color: #d1d1d180;
      color: ${(props) => (props.selected ? "white" : "black")};
    }

    svg {
      width: 20px;
      height: 20px;
    }

    span {
      margin-left: 20px;
    }

    a {
      color: inherit;
    }
  }
`;
