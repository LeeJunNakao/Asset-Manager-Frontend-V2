import React, { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Layout from "src/components/layout/templates/base";
import { Wrapper } from "src/components/layout/aux";
import Form from "src/components/form";
import formProps from "./form-config";
import { login, validateToken } from "src/http-services/auth";
import { Payload } from "react-mount-form";
import { setLogin } from "src/store/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [responseError, setResponseError] = useState("");

  const toastAwaiting = useRef<any>(null);
  const notifyAwaiting = () =>
    (toastAwaiting.current = toast("Authenticating"));
  const notifyError = () =>
    toast.error("Email and/or password incorrect", { autoClose: 6000 });

  const submit = async (values: Payload) => {
    try {
      notifyAwaiting();
      const { email, password } = values;
      const { token } = await login({ email, password });
      const { id } = await validateToken({ token });

      localStorage.setItem("access_token", token);
      localStorage.setItem("user_id", String(id));

      dispatch(setLogin());
      navigate("/");
    } catch {
      notifyError();
    } finally {
      toast.dismiss(toastAwaiting.current);
    }
  };

  return (
    <Layout>
      <Wrapper direction="column" alignItems="center">
        <span>{responseError}</span>
        <Form {...formProps} onValid={submit} />
        <a href="/register">Register</a>
        <ToastContainer autoClose={false} />
      </Wrapper>
    </Layout>
  );
};

export default Login;
