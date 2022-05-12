import { useDispatch, useSelector } from "react-redux";
import {
  selectAssets,
  selectAssetCurrentPrice,
  setCurrencyAssetPrices,
  AssetsPrices,
} from "src/store/asset";

export const useAssets = () => {
  const assets = useSelector(selectAssets);

  return { assets };
};

export const useAssetPrice = () => {
  const dispatch = useDispatch();

  const assetsPrices = useSelector(selectAssetCurrentPrice);
  const setAssetPricesByCurrency = (assetPrices: AssetsPrices) =>
    dispatch(setCurrencyAssetPrices(assetPrices));

  return { assetsPrices, setAssetPricesByCurrency };
};
