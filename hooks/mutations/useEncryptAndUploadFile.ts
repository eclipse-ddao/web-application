import { useMutation } from "@tanstack/react-query";
import {
  EncryptAndUploadFile,
  encrytpAndUploadFile,
} from "../../endpoints/files";

export type Addresses = {
  daoAddress: string;
  newMemberAddress: string;
};

export const useEncryptAndUploadFile = () => {
  return useMutation((data: EncryptAndUploadFile) =>
    encrytpAndUploadFile(data)
  );
};
