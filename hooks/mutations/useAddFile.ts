import { useMutation } from "@tanstack/react-query";
import { addFileToDao, FileMutationDto } from "../../endpoints/files";

export const useAddFile = () => {
  return useMutation((data: FileMutationDto) => addFileToDao(data));
};
