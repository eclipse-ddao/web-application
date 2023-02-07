import { useMutation } from "@tanstack/react-query";
import { selectSPSmartContract } from "../../endpoints/big-files";

export const useSelectSPSmartContract = () => {
  return useMutation((data: any) => selectSPSmartContract(data));
};
