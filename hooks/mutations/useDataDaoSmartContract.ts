import { useMutation } from "@tanstack/react-query";
import { dataDaoSmartContract } from "../../endpoints/daos";

export const useDataDaoSmartContract = () => {
  return useMutation((data: any) => dataDaoSmartContract(data));
};
