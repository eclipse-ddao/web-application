import { useMutation } from "@tanstack/react-query";
import { addUser, User } from "../../endpoints/users";

export const useAddUser = () => {
  return useMutation((data: User) => addUser(data));
};
