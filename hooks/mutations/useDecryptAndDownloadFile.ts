import { useMutation } from "@tanstack/react-query";
import {
  decryptAndDownloadFile,
  DecryptAndDownloadFile,
} from "../../endpoints/files";

export const useDecryptAndDownloadFile = () => {
  return useMutation((data: DecryptAndDownloadFile) =>
    decryptAndDownloadFile(data)
  );
};
