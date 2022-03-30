import { Dispatch } from "redux";
import { Portfolio } from "src/entities/portfolio";
import {
  createPortfolio,
  editPortfolio,
  deletePortfolio,
} from "src/http-services/portfolio";
import {
  addPortfolio,
  updatePortfolio,
  removePortfolio,
} from "src/store/portfolio";

export const createPorfolioService = async (
  dispatch: Dispatch,
  payload: Portfolio,
  notify: any
) => {
  try {
    const result = await createPortfolio(payload);
    dispatch(addPortfolio(result));
  } catch (error) {
    notify("Failed to create");
  }
};

export const updatePortfolioService = async (
  dispatch: Dispatch,
  payload: Portfolio,
  notify: any
) => {
  try {
    const result = await editPortfolio(payload);
    dispatch(updatePortfolio(result));
  } catch (error) {
    notify("Failed to update");
  }
};

export const deletePortfolioService = async (
  dispatch: Dispatch,
  payload: Portfolio,
  notify: any
) => {
  try {
    await deletePortfolio(payload.id);
    dispatch(removePortfolio(payload));
  } catch (error) {
    notify("Failed to delete");
  }
};
