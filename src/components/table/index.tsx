import React, { useEffect, useState } from "react";
import { Wrapper, Header, Content, Row, EmptyContent } from "./styles";

export type Props<T> = {
  fields: string[];
  data?: T[];
  hide?: boolean;
  value: T | null;
  onChange: (value: T | null) => void;
  masks?: { [field: string]: (v: any) => string };
};

type Data = {
  [field: string]: any;
};

const Table = <T extends Data>(props: Props<T>) => {
  const headerItems = props.fields.map((i) => <span>{i}</span>);

  const parseRowData = (item: T) => {
    const data = props.fields.map((field) => [field, item[field]]);
    const elementDOM = data.map(([field, value]) => {
      if (props.masks && props.masks[field]) {
        const mask = props.masks[field];
        return <span>{mask(value)}</span>;
      }
      return <span>{value}</span>;
    });

    return (
      <Row
        onClick={() => props.onChange(item)}
        className={props.value === item ? "selected-item" : ""}
        selected={props.value === item}
        columns={props.fields.length}
      >
        {elementDOM}
      </Row>
    );
  };

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const target = event.relatedTarget;
    const isDisabled = target?.attributes.getNamedItem("disabled");

    if (target) {
      const role = (target as HTMLDivElement).dataset?.role;
      if (role !== "table-related") props.onChange(null);
      else if (isDisabled) {
        setTimeout(() => {
          props.onChange(null);
        }, 200);
      }
    } else {
      props.onChange(null);
    }
  };

  const rows = (props.data || []).map(parseRowData);

  return (
    <Wrapper onBlur={handleBlur} tabIndex={0} hide={props.hide || false}>
      <Header columns={props.fields.length}>{headerItems}</Header>
      <Content>
        {props.data?.length ? rows : <EmptyContent>NO DATA</EmptyContent>}
      </Content>
    </Wrapper>
  );
};

export default Table;
