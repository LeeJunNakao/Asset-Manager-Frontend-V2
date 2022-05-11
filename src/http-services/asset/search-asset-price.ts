import { searchAssetPriceClient as client } from "../client";

type AssetPricesResponse = {
  [code: string]: {
    closePrice: number;
    closeDate: string;
    currency: string;
  };
};

type GetPriceArgs = {
  assets: string[];
  source: string;
  date: string;
  currency: string;
};

export const getAssetsPrices = async (
  searchArgs: GetPriceArgs
): Promise<AssetPricesResponse> => {
  const response = await client.get(`/asset-quote/search`, {
    params: { ...searchArgs, assets: `[${String(searchArgs.assets)}]` },
  });
  const result = response.data;

  return result.price;
};
