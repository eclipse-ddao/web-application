import { useQuery } from "@tanstack/react-query";
import { getDaoInfo } from "../../endpoints/daos";

export const useDaoInfo = (daoAddress: string) => {
  return useQuery(["dao", daoAddress], () => getDaoInfo(daoAddress), {
    enabled: !!daoAddress && daoAddress?.length > 0,
  });
};
