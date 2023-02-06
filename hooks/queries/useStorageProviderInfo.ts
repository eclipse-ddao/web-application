import { useQuery } from "@tanstack/react-query";
import { getStorageProviderInfo } from "../../endpoints/storage-provider";

export const useStorageProviderInfo = (spAddress: any) => {
  return useQuery(
    ["storage-provider", spAddress],
    () => getStorageProviderInfo(spAddress),
    {
      enabled: spAddress.length > 0,
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
      retryDelay: 20000,
    }
  );
};
