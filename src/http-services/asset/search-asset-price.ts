import { searchAssetPriceClient as client } from "../client";

type AssetPricesResponse = {
  [code: string]: {
    data: null | {
      closePrice: number;
      closeDate: string;
      currency: string;
    };
    error?: {
      code: string;
      message: string;
    };
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

  return response.data;
};
