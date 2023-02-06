import { api } from "./axios";

export type BigFileMutationDto = {
  duration: number;
  size_in_gb: number;
  base_bounty: number;
  file_type: number; // DROPDOWN -> based on value 1- link 2- hardware delivery 3- filecoin cid
  name: string;
  description: string;
  dao_contract_address: string;
  uploaded_by: string;
  expiry: Date;
};

export type ProposalResponse = {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  requested_bounty: number;
  deal_cid: string;
  is_selected: boolean;
  storage_provider_address: string;
  b_file_id: number;
  b_file: null;
};

export type BigFileResponse = {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  duration: number;
  expiry: string;
  size_in_gb: number;
  base_bounty: number;
  file_type: number;
  name: string;
  description: string;
  dao_contract_address: string;
  uploaded_by: string;
  proposals: ProposalResponse[] | null;
  selected_proposal_id: number;
  status: number;
};

export type ProposeStorageDto = {
  requested_bounty: number;
  storage_provider_address: string;
  b_file_id: number;
};

export type BigFileStatus = "0" | "1" | "2" | "3";

export type SelectProposalDto = { proposal_id: number };

export type MakeDealDto = {
  proposal_id: number;
  deal_cid: string;
  storage_provider_address: string;
};

export const addBigFile = async (data: BigFileMutationDto) => {
  console.log("addBigFile");

  return await api.AXIOS({
    url: "/big-files/add",
    method: "post",
    data,
  });
};

export const getBigFileInfo = async (
  bigFileId: string
): Promise<BigFileResponse> => {
  console.log("getBigFileInfo");

  const res = await api.AXIOS({
    url: "/big-files",
    method: "get",
    params: {
      id: bigFileId,
    },
  });
  return res.data;
};

export const getBigFileForDao = async (
  daoAddress: string
): Promise<BigFileResponse[]> => {
  console.log("getBigFileForDao");

  const res = await api.AXIOS({
    url: "/big-files/dao",
    method: "get",
    params: {
      address: daoAddress,
    },
  });
  return res.data;
};

export const getAllBigFiles = async (
  status: BigFileStatus
): Promise<BigFileResponse[]> => {
  console.log("addBigFile");
  // 0- all 1- open, 2- sp selected, 3- closed

  const res = await api.AXIOS({
    url: `/big-files/status/${status}`,
    method: "get",
  });
  return res.data;
};

export const proposeStorageAsStorageProvider = async (
  data: ProposeStorageDto
) => {
  console.log("proposeStorageAsStorageProvider");

  return await api.AXIOS({
    url: "/big-files/apply",
    method: "post",
    data,
  });
};

export const selectProposal = async (data: SelectProposalDto) => {
  console.log("selectProposal");

  return await api.AXIOS({
    url: "/big-files/select-proposal",
    method: "post",
    data,
  });
};

export const makeDeal = async (data: MakeDealDto) => {
  console.log("makeDeal");

  return await api.AXIOS({
    url: "/big-files/accept-proposal",
    method: "post",
    data,
  });
};
