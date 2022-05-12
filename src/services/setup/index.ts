import _ from "lodash";
import { setInterceptor } from "src/http-services/interceptors";
import { client } from "src/http-services/client";
import { useFetchData } from "src/hooks/fetch-data";
import store from "src/store/store";

setInterceptor(store, client.client());

type RequestDataArgs = {
  startLoading: () => void;
  endLoading: () => void;
  notifyFetchEnd: () => void;
  fetchServices: ReturnType<typeof useFetchData>;
};

export const requestData = async (args: RequestDataArgs) => {
  const { startLoading, endLoading, fetchServices, notifyFetchEnd } = args;
  const { fetchAssets, fetchCurrency, fetchPortfolio, fetchAssetEntry } =
    fetchServices;

  try {
    startLoading();
    await fetchCurrency();
    await fetchAssets();
    await fetchPortfolio();
    await fetchAssetEntry();
  } finally {
    endLoading();
    notifyFetchEnd();
    console.log("fiiiiiim!!");
  }
};
