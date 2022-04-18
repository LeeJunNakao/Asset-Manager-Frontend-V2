import { useSelector } from "react-redux";
import Page from "src/components/layout/templates/generic-page";
import { Portfolio } from "src/entities/portfolio";
import { selectPortfolios } from "src/store/portfolio";
import { selectAssets } from "src/store/asset";
import {
  createPorfolioService,
  updatePortfolioService,
  deletePortfolioService,
} from "src/services/portfolio";
import { configForm } from "./form-config";
import { Asset } from "src/entities/asset";
import Stamp from "src/components/stamp";
import { useNavigate } from "react-router-dom";
import { HiOutlineViewList } from "react-icons/hi";
import { Nullable } from "src/utils/ts/types";
import { useState } from "react";
import { ChildProps } from "src/components/bars/action-bar";

const PortfolioPage = () => {
  const navigate = useNavigate();

  const [portfolioId, setPorfolioId] = useState<Nullable<number>>(null);
  const currencies: Portfolio[] = useSelector(selectPortfolios);
  const assets: Asset[] = useSelector(selectAssets);
  const tableFields = ["name"];

  const onChangeItem = (portfolio: Nullable<Portfolio>) => {
    setPorfolioId(portfolio?.id || null);
  };

  const PorfolioStamp = (props: ChildProps) => {
    const onClick = () => {
      navigate(`/portfolio/${portfolioId}`);
    };

    return (
      <Stamp
        text="details"
        icon={HiOutlineViewList}
        onClick={onClick}
        dataRole="table-related"
        disabled={!Boolean(portfolioId)}
      />
    );
  };

  return (
    <Page
      formConfig={configForm(
        assets.map((a) => ({ value: a.id, label: a.code }))
      )}
      items={currencies}
      tableFields={tableFields}
      createService={createPorfolioService}
      updateService={updatePortfolioService}
      deleteService={deletePortfolioService}
      onChangeItem={onChangeItem}
      actionStamps={PorfolioStamp}
    />
  );
};

export default PortfolioPage;
