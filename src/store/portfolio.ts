import { createSlice } from "@reduxjs/toolkit";
import { Portfolio } from "src/entities/portfolio";
import { RootState } from "./store";

type State = {
  portfolios: Portfolio[];
};

export const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: {
    portfolios: [],
  } as State,
  reducers: {
    setPortfolios: (state, action) => {
      state.portfolios = action.payload;
    },
    updatePortfolio: (state, action) => {
      const id = action.payload.id;
      const index = state.portfolios.findIndex((i) => i.id === id);
      const portfolios = [...state.portfolios];

      portfolios.splice(index, 1, action.payload);

      state.portfolios = portfolios;
    },
    addPortfolio: (state, action) => {
      state.portfolios = [...state.portfolios, action.payload];
    },
    removePortfolio: (state, action) => {
      const id = action.payload.id;
      const index = state.portfolios.findIndex((i) => i.id === id);
      const portfolios = [...state.portfolios];

      portfolios.splice(index, 1);

      state.portfolios = portfolios;
    },
  },
});

export const selectPortfolios = (state: RootState): Portfolio[] =>
  state.portfolio.portfolios;
export const selectPortfolio =
  (portfolioId: Portfolio["id"]) => (state: RootState) =>
    (state.portfolio.portfolios as Portfolio[]).find(
      (p: Portfolio) => p.id === portfolioId
    );

export const { setPortfolios, updatePortfolio, addPortfolio, removePortfolio } =
  portfolioSlice.actions;
export default portfolioSlice.reducer;
