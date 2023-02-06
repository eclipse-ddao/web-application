import { useQuery } from "@tanstack/react-query";
import { getBigFileInfo } from "../../endpoints/big-files";

export const useBigFileInfo = (bigFileId: string) => {
  return useQuery(["big-file", bigFileId], () => getBigFileInfo(bigFileId));
};
