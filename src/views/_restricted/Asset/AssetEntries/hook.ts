import { AssetEntry } from "src/entities/asset";
import { Currency } from "src/entities/currency";
import { Nullable } from "src/utils/ts/types";

export const formatValue = (
  v: number,
  selectedCurrency: Nullable<Currency>
) => {
  const decimal = selectedCurrency?.decimal;
  if (decimal) {
    return `${String((v / 10 ** decimal).toFixed(decimal))}`;
  }
  return String(v);
};

export const parseAssetEntry = (
  assetEntries: AssetEntry[],
  selectedCurrency: Nullable<Currency>
) =>
  assetEntries.map((a) => ({
    ...a,
    value: formatValue(a.value, selectedCurrency),
    is_purchase: a.is_purchase ? "Purchase" : "Sell",
  }));
