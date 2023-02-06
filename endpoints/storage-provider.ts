import { api } from "./axios";
import { ProposalResponse } from "./big-files";

export type CreateStorageProviderDto = {
  address: string;
  contact_info: string;
  name: string;
  description: string;
  reputation_link: string;
  avatar_url: string;
};

export type StorageProviderResponse = {
  created_at: string;
  updated_at: string;
  deleted_at: null;
  address: string;
  name: string;
  description: string;
  reputation_link: string;
  avatar_url: string;
  proposals: ProposalResponse[];
  contact_info: number;
};

export const createStorageProvider = async (data: CreateStorageProviderDto) => {
  console.log("createStorageProvider");

  return await api.AXIOS({
    url: "/storage-provider/create",
    method: "post",
    data,
  });
};

export const getStorageProviderInfo = async (
  spAddress: string
): Promise<StorageProviderResponse> => {
  console.log("getStorageProviderInfo");

  const res = await api.AXIOS({
    url: "/storage-provider",
    method: "get",
    params: {
      address: spAddress,
    },
  });
  return res.data;
};
