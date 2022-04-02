import { FormBuilderProps, Payload, SelectOption } from "react-mount-form";

export const configForm = (options: SelectOption[]): FormBuilderProps => ({
  title: "Add Portfolio",
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
      name: "assets_ids",
      label: "Assets",
      config: {
        inputType: "multiselect",
        validation: {
          required: true,
        },
        props: {
          options,
        },
      },
    },
  ],
});
