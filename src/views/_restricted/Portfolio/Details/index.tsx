import Layout from "src/components/layout/templates/default-page";
import Table from "src/components/table";
import PieChart from "src/components/charts/Pie";
import { useAssetDetails } from "./hooks";
import { Wrapper, ChartWrapper } from "./styles";

export const PorfolioDetails = () => {
  const { parsedAssets } = useAssetDetails();

  const chartData = parsedAssets.map((a) => ({
    id: a.code,
    label: a.code,
    value: a.total,
  }));

  return (
    <Layout>
      <Wrapper>
        <Table
          fields={["code", "quantity", "price", "total"]}
          data={parsedAssets}
          value={null}
          onChange={() => {}}
        />
        {chartData.length > 0 && (
          <ChartWrapper>
            <PieChart data={chartData} title="Current allocation" />
          </ChartWrapper>
        )}
      </Wrapper>
    </Layout>
  );
};

export default PorfolioDetails;
