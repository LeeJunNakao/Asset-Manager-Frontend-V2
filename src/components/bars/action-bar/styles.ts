import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 20px 0;
  column-gap: 20px;

  .cancel-confirm-stamp {
    color: ${(props) => props.theme.color.danger};
    border-color: ${(props) => props.theme.color.danger};
  }

  .cancel-stamp {
    svg {
      padding: 5px;
    }
  }
`;
