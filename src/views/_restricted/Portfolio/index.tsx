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

const PortfolioPage = () => {
  const currencies: Portfolio[] = useSelector(selectPortfolios);
  const assets: Asset[] = useSelector(selectAssets);
  const tableFields = ["name"];

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
    />
  );
};

export default PortfolioPage;
