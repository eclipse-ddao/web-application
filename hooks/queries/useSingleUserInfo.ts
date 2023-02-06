import { useQuery } from "@tanstack/react-query";
import { getSingleUserInfo } from "../../endpoints/users";

export const useSingleUserInfo = (address: any) => {
  return useQuery(["user", address], () => getSingleUserInfo(address), {
    enabled: !!address && address?.length > 0,
  });
};
