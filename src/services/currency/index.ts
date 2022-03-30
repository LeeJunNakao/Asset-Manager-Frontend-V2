import { Dispatch } from "redux";
import { Currency } from "src/entities/currency";
import {
  createCurrency,
  editCurrency,
  deleteCurrency,
} from "src/http-services/currency";
import {
  addCurrency,
  updateCurrency,
  removeCurrency,
} from "src/store/currency";

export const createCurrencyService = async (
  dispatch: Dispatch,
  payload: Currency,
  notify: any
) => {
  try {
    const result = await createCurrency(payload);
    dispatch(addCurrency(result));
  } catch (error) {
    notify("Failed to create");
  }
};

export const updateCurrencyService = async (
  dispatch: Dispatch,
  payload: Currency,
  notify: any
) => {
  try {
    const result = await editCurrency(payload);
    dispatch(updateCurrency(result));
  } catch (error) {
    notify("Failed to update");
  }
};

export const deleteCurrencyService = async (
  dispatch: Dispatch,
  payload: Currency,
  notify: any
) => {
  try {
    await deleteCurrency(payload.id);
    dispatch(removeCurrency(payload));
  } catch (error) {
    notify("Failed to delete");
  }
};
