import Layout from "src/components/layout/templates/default-page";
import { usePortfolios } from "src/hooks/portfolio";
import PieChart from "src/components/charts/Pie";
import { Wrapper } from "./styles";

const HomePage = () => {
  const portfolios = usePortfolios();

  const parsedPortfolios = portfolios.map((p) => ({
    title: p.name,
    assets: p.assets.map((a) => ({
      id: a.code,
      label: a.code,
      value: a.total,
    })),
  }));

  return (
    <Layout>
      <Wrapper>
        {parsedPortfolios.map((p) => (
          <PieChart title={p.title} data={p.assets} />
        ))}
      </Wrapper>
    </Layout>
  );
};

export default HomePage;
