import React from "react";
import { PageWrapper, Body, Banner } from "./styles";

type Props = {
  children?: React.ReactElement;
};

export const BasePage = (props: Props) => {
  return (
    <PageWrapper>
      <Body>
        <Banner>Asset Manager</Banner>
        {props.children}
      </Body>
    </PageWrapper>
  );
};

export default BasePage;
