import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import FormConfig from "src/components/form";
import Layout from "src/components/layout/templates/base";
import formProps from "./form-config";
import { Wrapper } from "src/components/layout/aux";
import { register } from "src/http-services/auth";
import { Payload } from "react-mount-form";
import { setLogin } from "src/store/auth";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toastAwaiting = useRef<any>(null);

  const notifyAwaiting = () => (toastAwaiting.current = toast("Submiting"));
  const notifyError = () => toast("Failed to register");

  const submit = async (values: Payload) => {
    try {
      notifyAwaiting();
      const { name, email, password } = values;
      const { token } = await register({ name, email, password });
      localStorage.setItem("access_token", token);
      dispatch(setLogin());
      navigate("/");
    } catch (error) {
      notifyError();
    } finally {
      toast.dismiss(toastAwaiting.current);
    }
  };

  return (
    <Layout>
      <Wrapper direction="column" alignItems="center">
        <FormConfig {...formProps} onValid={submit} />
        <a href="/login">Login</a>
        <ToastContainer autoClose={false} />
      </Wrapper>
    </Layout>
  );
};

export default Register;
