import _ from "lodash";
import { getAsset } from "src/http-services/asset";
import { getCurrency } from "src/http-services/currency";
import { getPortfolio } from "src/http-services/portfolio";
import { getAssetEntry } from "src/http-services/asset/asset-entry";
import { setAssetEntries, setAssets } from "src/store/asset";
import { setCurrencies, setSelectedCurrency } from "src/store/currency";
import { setPortfolios } from "src/store/portfolio";
import { getAssetsPrices } from "src/http-services/asset/search-asset-price";
import { Asset } from "src/entities/asset";
import { toISODate } from "src/utils/parser/date";
import { useCurrency } from "src/hooks/currency";
import { useDispatch } from "react-redux";
import { useAssets } from "./assets";

type AssetInfo = [code: string, market?: string, currency?: string];

export const groupAssets = (assets: Asset[]) => {
  const assetCodes = assets
    .map((i) => i.code)
    .map((i) => i.split(":") as AssetInfo);
  return _.groupBy(assetCodes, 1);
};

export const useFetchData = () => {
  const dispatch = useDispatch();
  const { assets } = useAssets();

  const fetchAssetsPrices = async (currencyCode: string) => {
    const groupedAssets = groupAssets(assets);

    const searchPromises = Object.entries(groupedAssets).map(
      async ([market, assetsInfo]) => {
        if (market === "undefined") return;

        try {
          const assetsCodes = assetsInfo.map((info) => info[0]);
          const date = new Date();
          date.setDate(date.getDate() - 1);

          const price = await getAssetsPrices({
            assets: assetsCodes,
            source: market,
            date: toISODate(date),
            currency: currencyCode,
          });

          return price;
          // dispatch(addAssetCurrentPrice({ code: assetCode, price }));
        } catch (error) {
          // dispatch(addAssetCurrentPrice({ code: assetCode, price: null }));
        }
      }
    );

    const prices = await Promise.all(searchPromises);

    console.log("....................", prices);
    return prices;
  };

  const fetchAssets = async () => {
    const response = await getAsset();
    dispatch(setAssets(response));
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

  return {
    fetchAssetsPrices,
    fetchAssets,
    fetchCurrency,
    fetchPortfolio,
    fetchAssetEntry,
  };
};
