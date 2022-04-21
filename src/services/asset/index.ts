import { Dispatch } from "redux";
import {
  Asset,
  AssetEntry,
  AssetEntryRequestPayload,
} from "src/entities/asset";
import { createAsset, editAsset, deleteAsset } from "src/http-services/asset";
import { addAsset, updateAsset, removeAsset } from "src/store/asset";
import { groupBy } from "src/utils/parser/array";
import { GroupedData, GroupedEntries } from "./asset-entries";

export const createAssetService = async (
  dispatch: Dispatch,
  payload: Asset,
  notify: any
) => {
  try {
    const result = await createAsset(payload);
    dispatch(addAsset(result));
  } catch (error) {
    notify("Failed to create");
  }
};

export const updateAssetService = async (
  dispatch: Dispatch,
  payload: Asset,
  notify: any
) => {
  try {
    const result = await editAsset(payload);
    dispatch(updateAsset(result));
  } catch (error) {
    notify("Failed to update");
  }
};

export const deleteAssetService = async (
  dispatch: Dispatch,
  payload: Asset,
  notify: any
) => {
  try {
    await deleteAsset(payload.id);
    dispatch(removeAsset(payload));
  } catch (error) {
    notify("Failed to delete");
  }
};

export const getAssetsByIds = (assets: Asset[], ids: Asset["id"][]) =>
  assets.filter((a: Asset) => ids.includes(a.id));

export const groupEntries = (
  assetEntries: AssetEntryRequestPayload
): GroupedData<GroupedEntries> => {
  const groupedEntries = Object.entries(assetEntries).map(
    ([assetId, entries]) => [assetId, groupBy(entries, "currency_id")]
  );

  return Object.fromEntries(groupedEntries);
};
