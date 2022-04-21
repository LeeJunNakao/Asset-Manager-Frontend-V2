import Layout from "src/components/layout/templates/default-page";
import { usePortfolios } from "src/hooks/portfolio";
import PieChart from "src/components/charts/Pie";
import { Wrapper } from "./styles";

const HomePage = () => {
  const portfolios = usePortfolios();

  const parsedPortfolios = portfolios.map((p) => ({
    title: p.name,
    value: p.assets.reduce((acc, curr) => acc + curr.total, 0),
    id: p.name,
    label: p.name,
  }));

  return (
    <Layout>
      <Wrapper>
        <PieChart
          title="Portfolios by purchase price"
          data={parsedPortfolios}
        />
      </Wrapper>
    </Layout>
  );
};

export default HomePage;
