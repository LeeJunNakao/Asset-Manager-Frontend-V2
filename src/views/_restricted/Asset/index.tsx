import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineViewList } from "react-icons/hi";
import Page from "src/components/layout/templates/generic-page";
import { Asset } from "src/entities/asset";
import { selectAssets } from "src/store/asset";
import {
  createAssetService,
  updateAssetService,
  deleteAssetService,
} from "src/services/asset";
import { ChildProps } from "src/components/bars/action-bar";
import Stamp from "src/components/stamp";
import { formConfig } from "./form-config";
import { useNavigate } from "react-router-dom";

const AssetPage = () => {
  const navigate = useNavigate();

  const assets: Asset[] = useSelector(selectAssets);
  const tableFields = ["name", "code"];

  const [assetId, setAssetId] = useState<number | null>(null);

  const onChangeItem = (asset: Asset | null) => {
    setAssetId(asset?.id || null);
  };

  const AssetEntriesStamp = (props: ChildProps) => {
    const onClick = () => {
      navigate(`/asset/${assetId}`);
    };

    return (
      <Stamp
        text="entries"
        icon={HiOutlineViewList}
        onClick={onClick}
        dataRole="table-related"
        disabled={!Boolean(assetId)}
      />
    );
  };

  return (
    <Page
      formConfig={formConfig}
      items={assets}
      tableFields={tableFields}
      createService={createAssetService}
      updateService={updateAssetService}
      deleteService={deleteAssetService}
      actionStamps={AssetEntriesStamp}
      onChangeItem={onChangeItem}
    />
  );
};

export default AssetPage;
