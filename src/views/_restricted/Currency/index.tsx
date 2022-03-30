import { useSelector } from "react-redux";
import Page from "src/components/layout/templates/generic-page";
import { Currency } from "src/entities/currency";
import { selectCurrencies } from "src/store/currency";
import {
  createCurrencyService,
  updateCurrencyService,
  deleteCurrencyService,
} from "src/services/currency";
import { formConfig } from "./form-config";

const CurrencyPage = () => {
  const currencies: Currency[] = useSelector(selectCurrencies);
  const tableFields = ["name", "code"];

  return (
    <Page
      formConfig={formConfig}
      items={currencies}
      tableFields={tableFields}
      createService={createCurrencyService}
      updateService={updateCurrencyService}
      deleteService={deleteCurrencyService}
    />
  );
};

export default CurrencyPage;
