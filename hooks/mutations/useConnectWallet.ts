import { useMutation } from "@tanstack/react-query";
import { connectWallet } from "../../endpoints/daos";

export const useConnectWallet = () => {
  return useMutation((data: any) => connectWallet(data));
};
