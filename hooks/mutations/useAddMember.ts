import { useMutation } from "@tanstack/react-query";
import { addMember, MemberMutationDto } from "../../endpoints/daos";

export const useAddMember = () => {
  return useMutation((data: MemberMutationDto) => addMember(data));
};
