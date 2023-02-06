import { useMutation } from "@tanstack/react-query";
import { addBigFile, BigFileMutationDto } from "../../endpoints/big-files";

export const useAddBigFile = () => {
  return useMutation((data: BigFileMutationDto) => addBigFile(data));
};
