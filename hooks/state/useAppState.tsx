import { atom, useAtom } from "jotai";

const walletAddressAtom = atom("");
const selectedDaoAddressAtom = atom("");

export const useWalletAddress = () => {
  return useAtom(walletAddressAtom);
};

export const useSelectedDaoAddress = () => {
  return useAtom(selectedDaoAddressAtom);
};
