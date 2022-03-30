export const formConfig = {
  title: "Add Currency",
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
    {
      name: "decimal",
      label: "Decimal",
      config: {
        inputType: "input",
        validation: {
          required: true,
        },
      },
    },
  ],
};
