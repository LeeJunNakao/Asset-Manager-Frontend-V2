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

type AssetEntryFormData = {
  date: string;
  quantity: string;
  value: string;
  is_purchase: boolean;
  user_id: number;
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
): T & Pick<AssetEntry, "asset_id" | "currency_id" | "value" | "quantity"> => {
  const value = (Number(payload.value) * 10 ** currency.decimal).toFixed(0);
  return {
    ...payload,
    date: payload.date.split("/").join("-"),
    value: Number(value),
    quantity: Number(payload.quantity),
    asset_id,
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
    assetEntryId: Nullable<AssetEntry["id"]>
  ) =>
  async (dispatch: Dispatch, payload: AssetEntryFormData, notify: any) => {
    try {
      if (selectedCurrency && assetEntryId) {
        const parsedPayload = formatPayload(
          { ...payload, id: assetEntryId },
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
