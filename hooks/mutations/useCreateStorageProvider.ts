import { useMutation } from "@tanstack/react-query";
import {
  createStorageProvider,
  CreateStorageProviderDto,
} from "../../endpoints/storage-provider";

export const useCreateStorageProvider = () => {
  return useMutation((data: CreateStorageProviderDto) =>
    createStorageProvider(data)
  );
};
