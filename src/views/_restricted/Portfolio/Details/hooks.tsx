import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectPortfolio } from "src/store/portfolio";
import { selectAssets, selectAssetEntries } from "src/store/asset";
import { selectCurrentCurrency } from "src/store/currency";
import { parseAssetEntries } from "src/services/asset/asset-entries";
import { getAssetsByIds, groupEntries } from "src/services/asset";

export const useAssetDetails = () => {
  const { id } = useParams();

  const portfolio = useSelector(selectPortfolio(Number(id)));
  const selectedCurrency = useSelector(selectCurrentCurrency);
  const assetsIds = portfolio?.assets_ids.map((id) => Number(id)) || [];
  const assets = getAssetsByIds(useSelector(selectAssets), assetsIds);
  const groupedEntries = groupEntries(useSelector(selectAssetEntries));

  const parsedAssets = parseAssetEntries(
    assets,
    groupedEntries,
    selectedCurrency
  );

  return {
    portfolio,
    selectedCurrency,
    assets,
    groupedEntries,
    parsedAssets,
    assetId: id,
  };
};
