import Axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";

function makeService<T, U>(client: AxiosInstance) {
  return {
    async get(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<AxiosResponse> {
      return client.get(url, config);
    },
    async post(url: string, data: T): Promise<AxiosResponse> {
      return client.post(url, data);
    },
    async put(url: string, data: U): Promise<AxiosResponse> {
      return client.put(url, data);
    },
    async del(url: string): Promise<AxiosResponse> {
      return client.delete(url);
    },
    client(): AxiosInstance {
      return client;
    },
  };
}

const authAxios = Axios.create({
  baseURL: process.env.REACT_APP_AUTH_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

const entityAxios = Axios.create({
  baseURL: process.env.REACT_APP_ENTITITES_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    user_id: localStorage.getItem("user_id") || "",
    access_token: localStorage.getItem("access_token") || "",
  },
});

const searchAssetPriceAxios = Axios.create({
  baseURL: process.env.REACT_APP_SEARCH_ASSET_PRICE,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

entityAxios.interceptors.request.use(function (config: AxiosRequestConfig) {
  const token = localStorage.getItem("access_token") as string;
  const userId = localStorage.getItem("user_id") as string;
  (config.headers as AxiosRequestHeaders).access_token = token;
  (config.headers as AxiosRequestHeaders).user_id = userId;
  return config;
});

export const authClient = makeService(authAxios);
export const client = makeService(entityAxios);
export const searchAssetPriceClient = makeService(searchAssetPriceAxios);
