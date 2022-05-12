import { useSelector } from "react-redux";
import { selectCurrentCurrency } from "src/store/currency";

export const useCurrency = () => {
  const selectedCurrency = useSelector(selectCurrentCurrency);

  return { selectedCurrency };
};
