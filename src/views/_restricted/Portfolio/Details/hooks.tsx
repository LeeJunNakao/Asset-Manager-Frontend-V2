import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectPortfolio } from "src/store/portfolio";
import { selectAssetsByIds, getGroupedEntries } from "src/store/asset";
import { getSelectedCurrency } from "src/store/currency";
import { parseAssetEntries } from "src/services/asset/asset-entries";

export const useAssetDetails = () => {
  const { id } = useParams();

  const portfolio = useSelector(selectPortfolio(Number(id)));
  const selectedCurrency = useSelector(getSelectedCurrency);
  const assets = useSelector(
    selectAssetsByIds(portfolio?.assets_ids.map((id) => Number(id)) || [])
  );

  const groupedEntries = useSelector(getGroupedEntries);

  const parsedAssets = parseAssetEntries(
    assets,
    groupedEntries,
    selectedCurrency
  );

  return { portfolio, selectedCurrency, assets, groupedEntries, parsedAssets };
};
