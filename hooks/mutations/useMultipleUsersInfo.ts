import { useMutation } from "@tanstack/react-query";
import { getMultipleUserInfo } from "../../endpoints/users";

export const useMultipleUsers = () => {
  return useMutation((data: any) => getMultipleUserInfo(data));
};
