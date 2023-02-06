import { useQuery } from "@tanstack/react-query";
import { BigFileStatus, getAllBigFiles } from "../../endpoints/big-files";

export const useAllBigFiles = (status: BigFileStatus) => {
  return useQuery(["all-big-files"], () => getAllBigFiles(status));
};
