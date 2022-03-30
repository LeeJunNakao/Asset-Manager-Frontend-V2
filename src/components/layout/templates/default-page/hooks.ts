export const formatProps = (currencyOptions: any[]) => ({
  config: [
    {
      name: "currency",
      label: "SELECTED CURRENCY",
      config: {
        inputType: "select",
        style: {
          cols: 4,
        },
        props: {
          options: currencyOptions,
        },
      },
    },
  ],
});
