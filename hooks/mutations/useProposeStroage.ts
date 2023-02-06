import { useMutation } from "@tanstack/react-query";
import {
  proposeStorageAsStorageProvider,
  ProposeStorageDto,
} from "../../endpoints/big-files";

export const useProposeStroage = () => {
  return useMutation((data: ProposeStorageDto) =>
    proposeStorageAsStorageProvider(data)
  );
};
