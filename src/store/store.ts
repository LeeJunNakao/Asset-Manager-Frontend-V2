import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import assetReducer from "./asset";
import currencyReducer from "./currency";
import portfolioReducer from "./portfolio";
import globalConfigReducer from "./global";

const store = configureStore({
  reducer: {
    auth: authReducer,
    asset: assetReducer,
    currency: currencyReducer,
    portfolio: portfolioReducer,
    globalConfig: globalConfigReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
