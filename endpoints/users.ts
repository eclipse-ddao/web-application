import { api } from "./axios";

export type User = {
  address: string;
  username: string;
  avatar_url: string;
};

export type MutipleUserInfo = {
  addresses: string[];
};

export type DaoResponse = {
  contract_address: "dao1";
  created_at: string;
  updated_at: string;
  deleted_at: null | null;
  name: string;
  description: string;
  avatar_url: string;
  members: MemberResponse[] | null;
  files: FileResponse[] | null;
};

export type FileResponse = {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  name: string;
  uploaded_by: string;
  image_url: string;
  dao_contract_address: string;
  cid: string;
  file_type: string;
};

export type MemberResponse = {
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  address: string;
  username: string;
  avatar_url: string;
  daos: null;
};

export type SingleUserInfoResponse = {
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  address: string;
  username: string;
  avatar_url: string;
  daos: DaoResponse[];
};

export const getMultipleUserInfo = async (data: MutipleUserInfo) => {
  console.log("getCurrentUser");

  return await api.AXIOS({
    url: "/users/addresses",
    method: "post",
    data,
  });
};

export const getSingleUserInfo = async (
  walletAdderss: string
): Promise<SingleUserInfoResponse> => {
  console.log("getSingleUserInfo");

  const res = await api.AXIOS({
    url: "/users",
    method: "get",
    params: {
      address: walletAdderss,
    },
  });
  return res.data;
};

export const addUser = async (user: User) => {
  console.log("addUser");

  return await api.AXIOS({
    url: "/users/create",
    method: "post",
    data: user,
  });
};
