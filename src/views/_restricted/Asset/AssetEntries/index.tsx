import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Page from "src/components/layout/templates/generic-page";
import { getGroupedEntries, selectAsset } from "src/store/asset";
import { getSelectedCurrency } from "src/store/currency";
import {
  createAssetEntryService,
  updateAssetEntryService,
  deleteAssetEntryService,
} from "src/services/asset/asset-entries";
import { formConfig } from "./form-config";
import { Nullable } from "src/utils/ts/types";
import { useState } from "react";
import { Payload } from "react-mount-form";

const AssetEntriesPage = () => {
  const params = useParams();
  const [assetEntryId, setAssetEntryId] = useState<Nullable<number>>(null);
  const assetId = Number(params.id);

  const selectedCurrency = useSelector(getSelectedCurrency);
  const entriesByCurency = useSelector(getGroupedEntries)[assetId];
  const assetEntries =
    (entriesByCurency ? entriesByCurency[Number(selectedCurrency?.id)] : []) ||
    [];

  const formatValue = (v: number) => {
    const decimal = selectedCurrency?.decimal;
    if (decimal) {
      return `${String((v / 10 ** decimal).toFixed(decimal))}`;
    }
    return String(v);
  };
  const parsedAssetEntries = assetEntries.map((a) => ({
    ...a,
    value: formatValue(a.value),
  }));
  const tableFields = ["date", "quantity", "value", "is_purchase"];
  const tableMasks = {
    is_purchase: (v: boolean) => (v ? "Purchase" : "Sell"),
  };

  const onChangeItem = (assetEntry: Nullable<Payload>) => {
    setAssetEntryId(assetEntry?.id);
  };

  return (
    <Page
      formConfig={formConfig}
      items={parsedAssetEntries}
      tableFields={tableFields}
      createService={createAssetEntryService(selectedCurrency, assetId)}
      updateService={updateAssetEntryService(
        selectedCurrency,
        assetId,
        assetEntryId
      )}
      deleteService={deleteAssetEntryService}
      masks={tableMasks}
      onChangeItem={onChangeItem}
    />
  );
};

export default AssetEntriesPage;
