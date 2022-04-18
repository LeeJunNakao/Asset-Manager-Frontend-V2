import { selectPortfolios } from "src/store/portfolio";
import {
  selectAssetsByIds,
  selectAssets,
  getGroupedEntries,
} from "src/store/asset";
import { getSelectedCurrency } from "src/store/currency";
import { useSelector } from "react-redux";
import { Asset } from "src/entities/asset";
import { Portfolio } from "src/entities/portfolio";
import { parseAssetEntries } from "src/services/asset/asset-entries";

const useAssetsByIds = (assetsIds: Asset["id"][]) =>
  useSelector(selectAssetsByIds(assetsIds));

const useSetAssets = (p: Portfolio) => {
  const { assets_ids, ...porfolio } = {
    ...p,
    assets: useAssetsByIds(p.assets_ids),
  };

  return porfolio;
};

export const usePortfolios = () => {
  const portfolios = useSelector(selectPortfolios);
  const assets = useSelector(selectAssets);
  const groupedEntries = useSelector(getGroupedEntries);
  const currency = useSelector(getSelectedCurrency);

  const porfoliosWithAssets = portfolios.map(useSetAssets);

  const portfoliosWithEntries = porfoliosWithAssets.map((e) => ({
    ...e,
    assets: e.assets && parseAssetEntries(e.assets, groupedEntries, currency),
  }));

  return portfoliosWithEntries;
};
