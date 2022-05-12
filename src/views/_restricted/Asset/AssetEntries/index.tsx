import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Page from "src/components/layout/templates/generic-page";
import { selectAssetEntries } from "src/store/asset";
import { selectCurrentCurrency } from "src/store/currency";
import {
  createAssetEntryService,
  updateAssetEntryService,
  deleteAssetEntryService,
  getAssetQuantity,
  getAveragePrice,
} from "src/services/asset/asset-entries";
import { formConfig } from "./form-config";
import { Nullable } from "src/utils/ts/types";
import { useRef } from "react";
import { Payload } from "react-mount-form";
import { fromRawToFormatedWithCode } from "src/utils/parser/currency";
import { parseAssetEntry } from "./hook";
import { Wrapper, TotalWrapper } from "./styles";
import { groupEntries } from "src/services/asset";
import { useAssets } from "src/hooks/assets";

const AssetEntriesPage = () => {
  const params = useParams();
  const { getAsset } = useAssets();
  const assetEntryId = useRef<Nullable<number>>(null);
  const setAssetEntryId = (id: number) => (assetEntryId.current = id);
  const assetId = Number(params.id);
  const asset = getAsset(assetId);

  const selectedCurrency = useSelector(selectCurrentCurrency);
  const entriesByCurency = groupEntries(useSelector(selectAssetEntries))[
    assetId
  ];
  const assetEntries =
    (entriesByCurency ? entriesByCurency[Number(selectedCurrency?.id)] : []) ||
    [];
  const parsedAssetEntries = parseAssetEntry(assetEntries, selectedCurrency);

  const tableFields = ["date", "quantity", "value", "is_purchase"];
  const headerMasks = { is_purchase: (_v: string) => "type" };

  const onChangeItem = (assetEntry: Nullable<Payload>) => {
    setAssetEntryId(assetEntry?.id);
  };

  const quantity = getAssetQuantity(assetEntries);
  const averagePrice = getAveragePrice(assetEntries);
  const total = quantity * averagePrice;

  return (
    <Wrapper>
      <Page
        selectedItemName={asset?.name}
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
        onChangeItem={onChangeItem}
        headerMasks={headerMasks}
        bottomSlot={
          <TotalWrapper>
            <span>TOTAL</span>
            <span>{quantity.toFixed(4)}</span>
            <span>
              {selectedCurrency &&
                fromRawToFormatedWithCode(averagePrice, selectedCurrency)}
            </span>
            <span>
              {selectedCurrency &&
                fromRawToFormatedWithCode(total, selectedCurrency)}
            </span>
          </TotalWrapper>
        }
      />
    </Wrapper>
  );
};

export default AssetEntriesPage;
