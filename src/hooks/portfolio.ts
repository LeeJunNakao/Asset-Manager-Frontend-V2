import { selectPortfolios } from "src/store/portfolio";
import { selectAssetEntries, selectAssets } from "src/store/asset";
import { selectCurrentCurrency } from "src/store/currency";
import { useSelector } from "react-redux";
import { Asset } from "src/entities/asset";
import { Portfolio } from "src/entities/portfolio";
import { parseAssetEntries } from "src/services/asset/asset-entries";
import { getAssetsByIds, groupEntries } from "src/services/asset";

const useAssetsByIds = (assetsIds: Asset["id"][]) =>
  getAssetsByIds(useSelector(selectAssets), assetsIds);

const useSetAssets = (p: Portfolio) => {
  const { assets_ids, ...porfolio } = {
    ...p,
    assets: useAssetsByIds(p.assets_ids),
  };

  return porfolio;
};

export const usePortfolios = () => {
  const portfolios = useSelector(selectPortfolios);
  const groupedEntries = groupEntries(useSelector(selectAssetEntries));
  const currency = useSelector(selectCurrentCurrency);

  const porfoliosWithAssets = portfolios.map(useSetAssets);

  const portfoliosWithEntries = porfoliosWithAssets.map((e) => ({
    ...e,
    assets: e.assets && parseAssetEntries(e.assets, groupedEntries, currency),
  }));

  return portfoliosWithEntries;
};
