import { Dispatch } from "redux";
import { Asset } from "src/entities/asset";
import { createAsset, editAsset, deleteAsset } from "src/http-services/asset";
import { addAsset, updateAsset, removeAsset } from "src/store/asset";

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
