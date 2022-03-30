import React from "react";
import { ReactComponent as LoadingIcon } from "src/assets/images/loading-page.svg";
import { PageWrapper } from "src/components/layout/aux";
import { TextWrapper } from "./styles";

const LoadingPage = () => {
  return (
    <PageWrapper>
      <TextWrapper>Loading</TextWrapper>
      <LoadingIcon />
      <TextWrapper>Loading</TextWrapper>
    </PageWrapper>
  );
};

export default LoadingPage;
