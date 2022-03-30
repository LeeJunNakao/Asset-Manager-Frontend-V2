import React from "react";
import { BsPlus } from "react-icons/bs";
import { MdModeEditOutline } from "react-icons/md";
import { FiTrash } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import Stamp from "src/components/stamp";
import { Wrapper } from "./styles";

export enum ActionMode {
  INITIAL = 0,
  ADD = 1,
  EDIT = 2,
  DELETE = 3,
}

type Props = {
  addClick: () => void;
  editClick: () => void;
  deleteClick: () => void;
  cancelClick?: () => void;
  mode: ActionMode;
  setMode: (v: ActionMode) => void;
  handleDelete: () => Promise<void>;
  item: any;
};

export type ChildProps = Props & {
  actionMode: ActionMode;
};

type ActionBarProps = Props & {
  children?: React.FC<ChildProps>;
};

const ActionBar = (props: ActionBarProps) => {
  const actionMode = props.mode || ActionMode.INITIAL;

  const handleAdd = () => {
    props.addClick();
  };

  const handleEdit = () => {
    props.editClick();
  };

  const handleDelete = () => {
    props.deleteClick();
  };

  const handleCancel = () => {
    props.setMode(ActionMode.INITIAL);
    if (props.cancelClick) props.cancelClick();
  };

  return (
    <Wrapper tabIndex={0}>
      {actionMode === ActionMode.ADD ? (
        <Stamp
          text="cancel"
          icon={ImCross}
          onClick={handleCancel}
          className="cancel-stamp"
          dataRole="table-related"
        />
      ) : (
        <Stamp
          text="add"
          icon={BsPlus}
          onClick={handleAdd}
          disabled={props.item}
          dataRole="table-related"
        />
      )}
      {actionMode === ActionMode.EDIT ? (
        <Stamp
          text="cancel"
          icon={ImCross}
          onClick={handleCancel}
          className="cancel-stamp"
          dataRole="table-related"
        />
      ) : (
        <Stamp
          text="edit"
          icon={MdModeEditOutline}
          onClick={handleEdit}
          disabled={!props.item}
          dataRole="table-related"
        />
      )}
      {actionMode === ActionMode.DELETE ? (
        <React.Fragment>
          <Stamp
            text="confirm"
            icon={FiTrash}
            onClick={props.handleDelete}
            className="cancel-confirm-stamp"
            dataRole="table-related"
          />
          <Stamp
            text="cancel"
            icon={ImCross}
            onClick={handleCancel}
            className="cancel-stamp"
            dataRole="table-related"
          />
        </React.Fragment>
      ) : (
        <Stamp
          text="delete"
          icon={FiTrash}
          onClick={handleDelete}
          disabled={!props.item}
          dataRole="table-related"
        />
      )}
      {props.children && props.children({ ...props, actionMode })}
    </Wrapper>
  );
};

export default ActionBar;
