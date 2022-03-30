import { FormBuilderProps, ValidationType } from "react-mount-form";

const formProps: FormBuilderProps = {
  title: "Login",
  config: [
    {
      name: "email",
      label: "Email",
      config: {
        inputType: "input",
        style: {
          cols: 6,
        },
        validation: {
          required: true,
          type: ValidationType.EMAIL,
        },
      },
    },
    {
      name: "password",
      label: "Password",
      config: {
        inputType: "input",
        style: {
          cols: 6,
        },
        validation: {
          required: true,
          type: ValidationType.PASSWORD,
        },
        props: {
          type: "password",
        },
      },
    },
  ],
};

export default formProps;
