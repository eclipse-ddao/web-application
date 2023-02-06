import { atom, useAtom } from "jotai";

const walletAddressAtom = atom("");
const selectedDaoAddressAtom = atom("");
const selectedProposalIdAtom = atom(0);

export const useWalletAddress = () => {
  return useAtom(walletAddressAtom);
};

export const useSelectedDaoAddress = () => {
  return useAtom(selectedDaoAddressAtom);
};

export const useSelectedProposalId = () => {
  return useAtom(selectedProposalIdAtom);
};
