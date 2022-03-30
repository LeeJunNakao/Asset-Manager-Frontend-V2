import styled from "styled-components";

type WrapperProps = {
  deletingMode: boolean;
};

export const Wrapper = styled.div<WrapperProps>`
  .form-builder {
    padding: 0;

    &__title-wrapper .form-builder__title {
      justify-content: flex-start;
      align-items: flex-start;
      margin: 0;
    }
  }

  .selected-item {
    background-color: ${(props) =>
      props.deletingMode ? props.theme.color.danger : "black"};
  }
`;
