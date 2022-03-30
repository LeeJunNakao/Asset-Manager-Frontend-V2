import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ActionMode } from "src/components/bars/action-bar";
import { Payload } from "react-mount-form";

export const handleSetMode =
  (setMode: (mode: ActionMode) => void, mode: ActionMode) => () =>
    setMode(mode);

export const notifyError = (message: string) =>
  toast.error(message, { autoClose: 6000 });

type onSubmitArgs = {
  mode: ActionMode;
  createService: any;
  updateService: any;
  dispatch: any;
  setMode: (mode: ActionMode) => void;
  setItem: (item: null) => void;
};

export const onSubmitHook =
  <T>(args: onSubmitArgs) =>
  async (v: Payload) => {
    const userId = localStorage.getItem("user_id");
    const payload = {
      ...v,
      user_id: Number(userId),
    } as unknown as T;

    if (args.mode === ActionMode.ADD)
      args.createService(args.dispatch, payload, notifyError);
    if (args.mode === ActionMode.EDIT)
      args.updateService(args.dispatch, payload, notifyError);

    args.setMode(ActionMode.INITIAL);
    args.setItem(null);
  };

type HandleDeleteArgs<T> = {
  deleteService: any;
  dispatch: any;
  item: T;
  setMode: (mode: ActionMode) => void;
  setItem: (item: null) => void;
};

export const handleDeleteHook =
  <T>(args: HandleDeleteArgs<T>) =>
  async () => {
    await args.deleteService(args.dispatch, args.item, notifyError);
    args.setMode(ActionMode.INITIAL);
    args.setItem(null);
  };

type Props<T> = {
  formConfig: any;
  items: T[];
  createService: any;
  updateService: any;
  deleteService: any;
  tableFields: string[];
};

export const GenericHooks = <T>(props: Props<T>) => {
  const [item, setItem] = useState<T | null>(null);
  const [mode, setMode] = useState<ActionMode>(ActionMode.INITIAL);

  const dispatch = useDispatch();

  const items: T[] = props.items;
  const formProps = { ...props.formConfig, formContent: item };

  const onChange = (v: T | null) => {
    setItem(v);
    setMode(ActionMode.INITIAL);
  };

  const onSubmit = onSubmitHook({
    mode,
    createService: props.createService,
    updateService: props.updateService,
    dispatch,
    setMode,
    setItem,
  });

  const handleDelete = handleDeleteHook({
    item,
    deleteService: props.deleteService,
    dispatch,
    setMode,
    setItem,
  });

  return [
    item,
    setItem,
    mode,
    setMode,
    items,
    formProps,
    onChange,
    onSubmit,
    handleDelete,
  ];
};
