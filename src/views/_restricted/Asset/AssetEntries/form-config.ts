export const formConfig = {
  title: "Add Asset",
  config: [
    {
      name: "date",
      label: "Date",
      config: {
        inputType: "datePicker",
        validation: {
          required: true,
        },
      },
    },
    {
      name: "quantity",
      label: "Quantity",
      config: {
        inputType: "input",
        validation: {
          required: true,
        },
      },
    },
    {
      name: "value",
      label: "Value",
      config: {
        inputType: "input",
        validation: {
          required: true,
        },
      },
    },
    {
      name: "is_purchase",
      label: "Type",
      config: {
        inputType: "select",
        validation: {
          required: true,
        },
        props: {
          options: [
            { value: "Purchase", label: "Purchase" },
            { value: "Sell", label: "Sell" },
          ],
        },
      },
    },
  ],
};
