import React from "react";
import { Wrapper } from "./styles";

export type Props = {
  text: string;
  icon: React.FC;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  dataRole?: string;
};

const Stamp = (props: Props) => {
  const Icon = props.icon;

  const handleClick = () => {
    if (!props.disabled && props.onClick) props.onClick();
  };

  return (
    <Wrapper
      className={props.className || ""}
      disabled={props.disabled}
      onClick={handleClick}
      tabIndex={0}
      data-role={props.dataRole}
    >
      <Icon />
      <span>{props.text}</span>
    </Wrapper>
  );
};

export default Stamp;
