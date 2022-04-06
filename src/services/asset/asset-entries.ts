import React from "react";
import { Dispatch } from "redux";
import { Asset, AssetEntry } from "src/entities/asset";
import { Currency } from "src/entities/currency";
import {
  createAssetEntry,
  editAssetEntry,
  deleteAssetEntry,
} from "src/http-services/asset/asset-entry";
import {
  addAssetEntry,
  updateAssetEntry,
  removeAssetEntry,
} from "src/store/asset";
import { Nullable, Override } from "src/utils/ts/types";
import { groupBy } from "src/utils/parser/array";
import AvgPriceCalculator from "src/utils/parser/avg-price-calculator";

type AssetEntryFormData = {
  date: string;
  quantity: string;
  value: string;
  is_purchase: string;
  user_id: number;
};

type GroupedEntries = {
  [currencyId: string | number]: AssetEntry[];
};
type GroupedData<T> = {
  [assetId: string]: T;
};

const formatPayload = <
  T extends Omit<
    Override<AssetEntry, AssetEntryFormData>,
    "id" | "asset_id" | "currency_id"
  >
>(
  payload: T,
  currency: Currency,
  asset_id: Asset["id"]
): T &
  Pick<
    AssetEntry,
    "asset_id" | "currency_id" | "value" | "quantity" | "is_purchase"
  > => {
  const value = (Number(payload.value) * 10 ** currency.decimal).toFixed(0);
  return {
    ...payload,
    date: payload.date.split("/").join("-"),
    value: Number(value),
    quantity: Number(payload.quantity),
    asset_id,
    is_purchase: payload.is_purchase === "Purchase",
    currency_id: currency.id,
  };
};

export const createAssetEntryService =
  (selectedCurrency: Nullable<Currency>, assetId: Asset["id"]) =>
  async (dispatch: Dispatch, payload: AssetEntryFormData, notify: any) => {
    try {
      if (selectedCurrency) {
        const parsedPayload = formatPayload(payload, selectedCurrency, assetId);
        const result = await createAssetEntry(parsedPayload);
        dispatch(addAssetEntry(result));
      }
    } catch (error) {
      notify("Failed to create");
    }
  };

export const updateAssetEntryService =
  (
    selectedCurrency: Nullable<Currency>,
    assetId: Asset["id"],
    assetEntryId: React.MutableRefObject<Nullable<AssetEntry["id"]>>
  ) =>
  async (dispatch: Dispatch, payload: AssetEntryFormData, notify: any) => {
    try {
      if (selectedCurrency && assetEntryId && assetEntryId.current) {
        const parsedPayload = formatPayload(
          { ...payload, id: assetEntryId.current },
          selectedCurrency,
          assetId
        );
        const result = await editAssetEntry(parsedPayload);
        dispatch(updateAssetEntry(result));
      }
    } catch (error) {
      notify("Failed to update");
    }
  };

export const deleteAssetEntryService = async (
  dispatch: Dispatch,
  payload: AssetEntry,
  notify: any
) => {
  try {
    await deleteAssetEntry(payload.id);
    dispatch(removeAssetEntry(payload));
  } catch (error) {
    notify("Failed to delete");
  }
};

export const getAssetQuantity = (entries: AssetEntry[]): number => {
  const total = entries.reduce((acc, curr) => {
    const operatorModificator = curr.is_purchase ? 1 : -1;
    return acc + operatorModificator * curr.quantity;
  }, 0);

  return total;
};

export const getAveragePrice = (entries: AssetEntry[]): number => {
  const parsedEntries = entries.map((e) => ({
    ...e,
    date: new Date(e.date),
    isPurchase: e.is_purchase,
  }));
  const calculator = new AvgPriceCalculator(parsedEntries);

  return Number(calculator.calculate().toFixed(0));
};
