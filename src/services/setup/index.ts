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
import { getAssetsPrices } from "src/http-services/asset/search-asset-price";
import store from "src/store/store";
import { Asset } from "src/entities/asset";
import _ from "lodash";
import { toISODate } from "src/utils/parser/date";

setInterceptor(store, client.client());

type AssetInfoArr = [code: string, market?: string, currency?: string];

const groupAssets = (assets: Asset[]) => {
  const assetCodes = assets
    .map((i) => i.code)
    .map((i) => i.split(":") as AssetInfoArr);
  return _.groupBy(assetCodes, 1);
};

export const requestData = async (dispatch: any, setIsLoading: any) => {
  const fetchAssetsPrice = async (
    market: string,
    assetInfoArr: AssetInfoArr[]
  ) => {
    if (market === "undefined") return;

    try {
      const assets = assetInfoArr.map((info) => info[0]);
      const currency = assetInfoArr[0][2] as string;

      const price = await getAssetsPrices({
        assets,
        source: market,
        date: toISODate(new Date()),
        currency,
      });
      console.log("AAAAAAAAAAAAAAAAA", price);
      // dispatch(addAssetCurrentPrice({ code: assetCode, price }));
    } catch (error) {
      // dispatch(addAssetCurrentPrice({ code: assetCode, price: null }));
    }
  };

  const fetchAssets = async () => {
    const response = await getAsset();
    dispatch(setAssets(response));

    const groupedAssets = groupAssets(response);
    const promises = Object.entries(groupedAssets).map(
      ([market, assetInfoArr]) => fetchAssetsPrice(market, assetInfoArr)
    );

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
