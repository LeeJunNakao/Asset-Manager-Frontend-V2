import { Payload } from "react-mount-form";
import { useDispatch, useSelector } from "react-redux";
import Form from "src/components/form";
import {
  selectCurrencies,
  selectCurrentCurrency,
  setSelectedCurrency,
} from "src/store/currency";
import { formatProps } from "../hooks";
import { CurrencyWrapper } from "../styles";

const CurrencySelection = () => {
  const dispatch = useDispatch();

  const currencyOptions = useSelector(selectCurrencies);
  const selectedCurrency = useSelector(selectCurrentCurrency);

  const formatedProps = formatProps(
    currencyOptions.map((c) => ({ value: c.id, label: c.code }))
  );

  const onChangeCurrency = (v: Payload) => {
    const curr = currencyOptions.find(
      (c) => Number(c.id) === Number(v.currency)
    );
    dispatch(setSelectedCurrency(curr!));
  };

  return (
    <CurrencyWrapper>
      <Form
        {...formatedProps}
        formContent={{ currency: selectedCurrency?.id }}
        submitButton={() => <div></div>}
        onChange={onChangeCurrency}
      />
    </CurrencyWrapper>
  );
};

export default CurrencySelection;
