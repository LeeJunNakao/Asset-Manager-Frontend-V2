import { client } from "src/http-services/client";
import { Asset } from "src/entities/asset";

export const getAsset = async () => {
  const response = await client.get("/asset");
  return response.data;
};

export const editAsset = async (data: Asset) => {
  const response = await client.put(`/asset/${data.id}`, data);
  return response.data;
};

export const createAsset = async (data: Omit<Asset, "id">) => {
  const response = await client.post("/asset", data);
  return response.data;
};

export const deleteAsset = async (id: number) => {
  await client.del(`/asset/${id}`);
};
