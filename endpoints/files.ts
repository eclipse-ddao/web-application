import { api } from "./axios";
import lighthouse from "@lighthouse-web3/sdk";
import { CID, LH_KEY } from "../utils/constants";
import { ethers } from "ethers";

export type FileMutationDto = {
  file_name: string; // input
  uploaded_by: string; // walletAddress
  dao_contract_address: string; // from getDaoInfo current selected
  file_type: string; // input
  image_url: string; // hardcoded
  cid: string; // ts file encrypted file id
};

export type EncryptAndUploadFile = {
  e: React.ChangeEvent<HTMLInputElement>;
  daoAddress: string;
};

export type DecryptAndDownloadFile = {
  cid: string;
  fileType: string;
};

export const addFileToDao = async (data: FileMutationDto) => {
  console.log("createDao");

  return await api.AXIOS({
    url: "/files/add",
    method: "post",
    data,
  });
};

export const encrytpAndUploadFile = async (data: EncryptAndUploadFile) => {
  console.log("encrytpAndUploadFile");

  const lhKey = LH_KEY;
  const ethereum = (window as any).ethereum;
  const accounts = await ethereum.request({
    method: "eth_requestAccounts",
  });
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const walletAddress = accounts[0];
  const signer = provider.getSigner(walletAddress);

  let authMessage = await lighthouse.getAuthMessage(walletAddress);
  let signedMessage = await signer.signMessage(authMessage.data.message);

  const response = await lighthouse.uploadEncrypted(
    // @ts-ignore
    data.e,
    walletAddress,
    lhKey,
    signedMessage
  );
  console.log({ response });
  const cid = response.data.Hash;

  authMessage = await lighthouse.getAuthMessage(walletAddress);
  signedMessage = await signer.signMessage(authMessage.data.message);

  const res = await lighthouse.accessCondition(
    walletAddress,
    cid,
    signedMessage,
    [
      {
        id: 2,
        chain: "Hyperspace",
        method: "isMember",
        standardContractType: "Custom",
        inputArrayType: ["address"],
        outputType: "bool",
        contractAddress: data.daoAddress.toLowerCase(),
        returnValueTest: { comparator: "==", value: "true" },
        parameters: [":userAddress"],
      },
    ]
  );
  return res.data.cid;
};

export const decryptAndDownloadFile = async (data: DecryptAndDownloadFile) => {
  console.log("decryptAndDownloadFile");

  const ethereum = (window as any).ethereum;
  const accounts = await ethereum.request({
    method: "eth_requestAccounts",
  });
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const walletAddress = accounts[0];
  const signer = provider.getSigner(walletAddress);

  let authMessage = await lighthouse.getAuthMessage(walletAddress);
  let signedMessage = await signer.signMessage(authMessage.data.message);

  const key = await lighthouse.fetchEncryptionKey(
    data.cid, // from daoInfo api
    walletAddress,
    signedMessage
  );

  const array = await lighthouse.decryptFile(
    data.cid,
    key.data.key,
    // @ts-ignore
    data.fileType
  );
  return array;
};
