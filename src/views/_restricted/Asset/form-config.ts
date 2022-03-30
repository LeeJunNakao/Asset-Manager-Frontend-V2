export const formConfig = {
  title: "Add Asset",
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
      name: "code",
      label: "Code",
      config: {
        inputType: "input",
        validation: {
          required: true,
        },
      },
    },
  ],
};
