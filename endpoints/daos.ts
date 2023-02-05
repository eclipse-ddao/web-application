import { ethers } from "ethers";
import { Addresses } from "../hooks/mutations/useAddMemberSmartContract";
import {
  ADDRESS_CONTRACT,
  ADD_DATA_DAO_ABI,
  ADD_MEMBER_DAO_ABI,
  RANDOMSTRING,
} from "../utils/constants";
import { api } from "./axios";
import { DaoResponse } from "./users";

export type Dao = {
  name: string;
  description: string;
  avatar_url: string;
  created_by: string;
  contract_address: string;
};

export type MembersResponse = {
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  address: string;
  username: string;
  avatar_url: string;
  daos: null;
};

export type MemberMutationDto = {
  dao_contract_address: string;
  member_address: string;
};

export const createDao = async (dao: Dao) => {
  console.log("createDao");

  return await api.AXIOS({
    url: "/daos/create",
    method: "post",
    data: dao,
  });
};

export const addMember = async (data: MemberMutationDto) => {
  console.log("addMember");

  return await api.AXIOS({
    url: "/daos/add/member",
    method: "post",
    data,
  });
};

export const getDaoInfo = async (daoAddress: string): Promise<DaoResponse> => {
  console.log("getDaoInfo");

  const res = await api.AXIOS({
    url: "/daos",
    method: "get",
    params: {
      address: daoAddress,
    },
  });

  return res.data;
};

export const dataDaoSmartContract = async (data: any) => {
  console.log("dataDaoSmartContract");

  const addressContract = ADDRESS_CONTRACT;
  const ethereum = (window as any).ethereum;
  const accounts = await ethereum.request({
    method: "eth_requestAccounts",
  });
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const randomId = RANDOMSTRING;
  const walletAddress = accounts[0];
  const signer = provider.getSigner(walletAddress);
  // signer.signMessage('hello');
  const contract = new ethers.Contract(
    addressContract,
    ADD_DATA_DAO_ABI,
    signer
  ); // dao address for adding memebers

  const res = await contract.createEclipseDataDao(randomId);
  await res.wait();
  const dao_address = await contract.getEclipse(randomId);
  return { walletAddress, contractAddress: dao_address };
};

export const addMemberSmartContract = async (addresses: Addresses) => {
  console.log("addMemberSmartContract");

  const ethereum = (window as any).ethereum;
  const accounts = await ethereum.request({
    method: "eth_requestAccounts",
  });
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const walletAddress = accounts[0];
  const signer = provider.getSigner(walletAddress);
  const contract = new ethers.Contract(
    addresses.daoAddress,
    ADD_MEMBER_DAO_ABI,
    signer
  );

  const res = await contract.addMember(addresses.newMemberAddress);
  await res.wait();
};

export const connectWallet = async (data: any) => {
  console.log("connectWallet");

  const ethereum = (window as any).ethereum;
  const accounts = await ethereum.request({
    method: "eth_requestAccounts",
  });
  const walletAddress = accounts[0];
  return walletAddress;
};
