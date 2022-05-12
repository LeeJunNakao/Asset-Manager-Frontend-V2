import { useDispatch, useSelector } from "react-redux";
import { Asset } from "src/entities/asset";
import {
  selectAssets,
  selectAssetCurrentPrice,
  setCurrencyAssetPrices,
  AssetsPrices,
} from "src/store/asset";

export const useAssets = () => {
  const assets = useSelector(selectAssets);
  const getAsset = (id: Asset["id"]) => assets.find((a) => a.id === id);

  return { assets, getAsset };
};

export const useAssetPrice = () => {
  const dispatch = useDispatch();

  const assetsPrices = useSelector(selectAssetCurrentPrice);
  const setAssetPricesByCurrency = (assetPrices: AssetsPrices) =>
    dispatch(setCurrencyAssetPrices(assetPrices));

  return { assetsPrices, setAssetPricesByCurrency };
};
