import { FormBuilderProps, ValidationType } from "react-mount-form";

const formProps: FormBuilderProps = {
  title: "Register",
  config: [
    {
      name: "name",
      label: "Name",
      config: {
        inputType: "input",
        validation: {
          required: true,
        },
      },
    },
    {
      name: "email",
      label: "Email",
      config: {
        inputType: "input",

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
    {
      name: "repeatPassword",
      label: "Repeat password",
      config: {
        inputType: "input",
        style: {
          cols: 6,
        },
        validation: {
          required: true,
          type: ValidationType.PASSWORD,
          callback: (value, values) => {
            const error = values.password !== value;
            const message = error ? "Must be equal to password" : "";

            return {
              error,
              message,
            };
          },
        },
        props: {
          type: "password",
        },
      },
    },
  ],
};

export default formProps;
