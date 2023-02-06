import { useQuery } from "@tanstack/react-query";
import { getBigFileForDao } from "../../endpoints/big-files";

export const useBigFileForDao = (daoAddress: string) => {
  return useQuery(["big-file-dao", daoAddress], () =>
    getBigFileForDao(daoAddress)
  );
};
