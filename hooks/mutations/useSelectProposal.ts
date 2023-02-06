import { useMutation } from "@tanstack/react-query";
import { selectProposal, SelectProposalDto } from "../../endpoints/big-files";

export const useSelectProposal = () => {
  return useMutation((data: SelectProposalDto) => selectProposal(data));
};
