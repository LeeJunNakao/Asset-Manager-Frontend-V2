import React from "react";
import { Link, useLocation } from "react-router-dom";
import Base from "src/components/layout/templates/base";
import { HiCurrencyDollar } from "react-icons/hi";
import { RiStockLine } from "react-icons/ri";
import { BsFillCollectionFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { Wrapper } from "src/components/layout/aux";
import { Panel, LinkWrapper } from "./styles";
import CurrencySelection from "./components/CurrencySelection";

type Props = {
  children?: React.ReactElement;
};

const Layout = (props: Props) => {
  const location = useLocation();

  return (
    <Base>
      <Wrapper direction="column">
        <CurrencySelection />
        <Panel>
          <LinkWrapper selected={location.pathname === "/"}>
            <Link className="item" to="/">
              <AiFillHome />
              <span>Home</span>
            </Link>
          </LinkWrapper>

          <LinkWrapper selected={location.pathname === "/asset"}>
            <Link className="item" to="/asset">
              <RiStockLine />
              <span>Asset</span>
            </Link>
          </LinkWrapper>

          <LinkWrapper selected={location.pathname === "/currency"}>
            <Link className="item" to="/currency">
              <HiCurrencyDollar />
              <span>Currency</span>
            </Link>
          </LinkWrapper>

          <LinkWrapper selected={location.pathname === "/portfolio"}>
            <Link className="item" to="/portfolio">
              <BsFillCollectionFill />
              <span>Portfolio</span>
            </Link>
          </LinkWrapper>
        </Panel>
        {props.children}
      </Wrapper>
    </Base>
  );
};

export default Layout;
