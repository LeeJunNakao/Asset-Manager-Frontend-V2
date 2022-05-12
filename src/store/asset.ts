import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Asset, AssetEntryRequestPayload } from "src/entities/asset";
import deepcopy from "deepcopy";
import { sortAssetEntries } from "src/services/asset/asset-entries";

type AssetsPrices = {
  [currencyCode: string]: {
    [assetCode: string]: number;
  };
};

type State = {
  assets: Asset[];
  assetEntries: AssetEntryRequestPayload;
  assetsCurrentPrice: AssetsPrices;
};

export const assetSlice = createSlice({
  name: "asset",
  initialState: {
    assets: [],
    assetEntries: {},
    assetsCurrentPrice: {},
  } as State,
  reducers: {
    setAssets: (state, action) => {
      state.assets = action.payload;
    },
    updateAsset: (state, action) => {
      const id = action.payload.id;
      const index = state.assets.findIndex((i) => i.id === id);
      const assets = [...state.assets];

      assets.splice(index, 1, action.payload);

      state.assets = assets;
    },
    addAsset: (state, action) => {
      state.assets = [...state.assets, action.payload];
    },
    removeAsset: (state, action) => {
      const id = action.payload.id;
      const index = state.assets.findIndex((i) => i.id === id);
      const assets = [...state.assets];

      assets.splice(index, 1);

      state.assets = assets;
    },
    addAssetCurrentPrice: (
      state,
      action: PayloadAction<{
        currencyCode: string;
        assetCode: string;
        price: number;
      }>
    ) => {
      const { currencyCode, assetCode, price } = action.payload;
      const updatedAssetPrice = {
        ...state.assetsCurrentPrice,
        [currencyCode]: {
          ...state.assetsCurrentPrice[currencyCode],
          [assetCode]: price,
        },
      };

      state.assetsCurrentPrice = updatedAssetPrice;
    },
    setAssetEntries: (state, action) => {
      const entries: AssetEntryRequestPayload = deepcopy(action.payload);

      state.assetEntries = sortAssetEntries(entries);
    },
    addAssetEntry: (state, action) => {
      const assetId = action.payload.asset_id;
      const assetEntries = state.assetEntries[assetId];
      if (assetEntries) {
        assetEntries.push(action.payload);
        state.assetEntries = sortAssetEntries(state.assetEntries);
      } else state.assetEntries[assetId] = [action.payload];
    },
    updateAssetEntry: (state, action) => {
      const id = action.payload.id;
      const assetId = action.payload.asset_id;
      const assetEntries = state.assetEntries[assetId];
      const index = assetEntries.findIndex((i) => i.id === id);

      assetEntries.splice(index, 1, action.payload);
      state.assetEntries = sortAssetEntries(state.assetEntries);
    },
    removeAssetEntry: (state, action) => {
      const id = action.payload.id;
      const assetId = action.payload.asset_id;
      const assetEntries = state.assetEntries[assetId];
      const index = assetEntries.findIndex((i) => i.id === id);

      assetEntries.splice(index, 1);
    },
  },
});

export const selectAssets = (state: any) => (state.asset as State).assets;

export const selectAssetEntries = (state: any) =>
  (state.asset as State).assetEntries;

export const selectAssetCurrentPrice =
  (state: any) => (assetCode: Asset["code"]) => {
    return (state.asset as State).assetsCurrentPrice[assetCode];
  };

export const {
  setAssets,
  updateAsset,
  addAsset,
  removeAsset,
  addAssetCurrentPrice,
  setAssetEntries,
  addAssetEntry,
  updateAssetEntry,
  removeAssetEntry,
} = assetSlice.actions;
export default assetSlice.reducer;
