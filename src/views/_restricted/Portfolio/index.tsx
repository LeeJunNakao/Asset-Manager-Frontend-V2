import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "src/components/layout/templates/default-page";
import Form from "src/components/form";
import ActionBar, { ActionMode } from "src/components/bars/action-bar";
import { selectPortfolios } from "src/store/portfolio";
import Table from "src/components/table";
import { Portfolio } from "src/entities/portfolio";
import { selectAssets } from "src/store/asset";
import { Payload } from "react-mount-form";
import {
  createPorfolioService,
  updatePortfolioService,
  deletePortfolioService,
} from "src/services/portfolio";
import { ToastContainer, toast } from "react-toastify";
import { handleSetMode } from "./hooks";
import { Wrapper } from "./styles";
import { configForm } from "./form-config";

const HomePage = () => {
  const [item, setItem] = useState<Portfolio | null>(null);
  const [mode, setMode] = useState<ActionMode>(ActionMode.INITIAL);

  const dispatch = useDispatch();

  const portfolios: Portfolio[] = useSelector(selectPortfolios);
  const assets = useSelector(selectAssets) || [];
  const formProps = configForm(
    item,
    assets.map((asset) => ({ value: asset.id, label: asset.code }))
  );

  const onChange = (v: Portfolio | null) => {
    setItem(v);
    setMode(ActionMode.INITIAL);
  };

  const notifyError = (message: string) =>
    toast.error(message, { autoClose: 6000 });

  const onSubmit = async (v: Payload) => {
    const userId = localStorage.getItem("user_id");
    const payload = {
      ...v,
      user_id: Number(userId),
    } as Portfolio;

    if (mode === ActionMode.ADD)
      createPorfolioService(dispatch, payload, notifyError);
    if (mode === ActionMode.EDIT)
      updatePortfolioService(dispatch, payload, notifyError);

    setMode(ActionMode.INITIAL);
    setItem(null);
  };

  const handleDelete = async () => {
    await deletePortfolioService(dispatch, item!, notifyError);
    setMode(ActionMode.INITIAL);
    setItem(null);
  };

  const fields = ["name"];

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
        />
        {(mode === ActionMode.ADD || mode === ActionMode.EDIT) && (
          <Form {...formProps} onValid={onSubmit} />
        )}
        <Table
          fields={fields}
          data={portfolios}
          hide={mode !== ActionMode.INITIAL && mode !== ActionMode.DELETE}
          onChange={onChange}
          value={item}
        />
        <ToastContainer autoClose={false} />
      </Wrapper>
    </Layout>
  );
};

export default HomePage;
