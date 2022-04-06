import React, { useEffect } from "react";
import Layout from "src/components/layout/templates/default-page";
import Form from "src/components/form";
import ActionBar, {
  ActionMode,
  ChildProps,
} from "src/components/bars/action-bar";
import Table, { Props as TableProps } from "src/components/table";
import { Payload } from "react-mount-form";
import { ToastContainer } from "react-toastify";
import { GenericHooks, handleSetMode } from "./hooks";
import { Wrapper } from "./styles";

type Props<T> = Pick<TableProps<T>, "masks" | "headerMasks"> & {
  formConfig: any;
  items: T[];
  createService: any;
  updateService: any;
  deleteService: any;
  tableFields: string[];
  onChangeItem?: (item: T) => void;
  actionStamps?: React.FC<ChildProps>;
  bottomSlot?: JSX.Element;
};

const Page = <T extends Payload>(props: Props<T>) => {
  const [
    item,
    setItem,
    mode,
    setMode,
    items,
    formProps,
    onChange,
    onSubmit,
    handleDelete,
  ] = GenericHooks(props);

  useEffect(() => {
    if (props.onChangeItem) props.onChangeItem(item);
  }, [item]);

  return (
    <Layout>
      <Wrapper deletingMode={mode === ActionMode.DELETE}>
        <ActionBar
          addClick={handleSetMode(setMode, ActionMode.ADD)}
          editClick={handleSetMode(setMode, ActionMode.EDIT)}
          deleteClick={handleSetMode(setMode, ActionMode.DELETE)}
          cancelClick={() => setItem(null)}
          handleDelete={handleDelete}
          item={item}
          mode={mode}
          setMode={setMode}
        >
          {props.actionStamps}
        </ActionBar>
        {(mode === ActionMode.ADD || mode === ActionMode.EDIT) && (
          <Form {...formProps} onValid={onSubmit} />
        )}
        <Table
          fields={props.tableFields}
          data={items}
          hide={mode !== ActionMode.INITIAL && mode !== ActionMode.DELETE}
          onChange={onChange}
          value={item}
          masks={props.masks}
          headerMasks={props.headerMasks}
        />
        <ToastContainer autoClose={false} />
        {props.bottomSlot}
      </Wrapper>
    </Layout>
  );
};

export default Page;
