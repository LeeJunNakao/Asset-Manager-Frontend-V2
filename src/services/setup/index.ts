import { setInterceptor } from "src/http-services/interceptors";
import { client } from "src/http-services/client";
import { getAsset } from "src/http-services/asset";
import { getCurrency } from "src/http-services/currency";
import { getPortfolio } from "src/http-services/portfolio";
import { getAssetEntry } from "src/http-services/asset/asset-entry";
import {
  setAssetEntries,
  setAssets,
  addAssetCurrentPrice,
} from "src/store/asset";
import { setCurrencies, setSelectedCurrency } from "src/store/currency";
import { setPortfolios } from "src/store/portfolio";
import { getPrice } from "src/http-services/asset/consult-asset-price";
import store from "src/store/store";

setInterceptor(store, client.client());

export const requestData = async (dispatch: any, setIsLoading: any) => {
  const fetchAssetsPrice = async (assetCode: string) => {
    try {
      const price = await getPrice(assetCode);
      dispatch(addAssetCurrentPrice({ code: assetCode, price }));
    } catch (error) {
      dispatch(addAssetCurrentPrice({ code: assetCode, price: null }));
    }
  };

  const fetchAssets = async () => {
    const response = await getAsset();
    dispatch(setAssets(response));

    const promises = response.map((asset: any) => fetchAssetsPrice(asset.code));

    await Promise.all(promises);
  };

  const fetchCurrency = async () => {
    const response = await getCurrency();
    const [defaultCurrency] = response.sort((a, b) => a.id - b.id);
    dispatch(setSelectedCurrency(defaultCurrency));
    dispatch(setCurrencies(response));
  };

  const fetchPortfolio = async () => {
    const response = await getPortfolio();
    dispatch(setPortfolios(response));
  };

  const fetchAssetEntry = async () => {
    const response = await getAssetEntry();
    dispatch(setAssetEntries(response));
  };

  try {
    setIsLoading(true);
    await fetchAssets();
    await fetchCurrency();
    await fetchPortfolio();
    await fetchAssetEntry();
  } finally {
    setIsLoading(false);
  }
};
