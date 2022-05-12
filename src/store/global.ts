import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type GlobalState = {
  isLoading: boolean;
  initalDataFetched: boolean;
};

export const globalSlice = createSlice({
  name: "globalConfig",
  initialState: {
    isLoading: false,
    initalDataFetched: false,
  } as GlobalState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setInitialFetch: (state, action: PayloadAction<boolean>) => {
      state.initalDataFetched = action.payload;
    },
  },
});

export const selectGlobalConfig = (state: RootState) => {
  return state.globalConfig;
};

export const { setIsLoading, setInitialFetch } = globalSlice.actions;

export default globalSlice.reducer;
