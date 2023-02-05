import { useMutation } from "@tanstack/react-query";
import { addMemberSmartContract } from "../../endpoints/daos";

export type Addresses = {
  daoAddress: string;
  newMemberAddress: string;
};

export const useAddMemberSmartContract = () => {
  return useMutation((addresses: Addresses) =>
    addMemberSmartContract(addresses)
  );
};
