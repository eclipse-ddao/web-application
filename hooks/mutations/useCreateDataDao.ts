import { useMutation } from "@tanstack/react-query";
import { createDao, Dao } from "../../endpoints/daos";

export const useCreateDataDao = () => {
  return useMutation((data: Dao) => createDao(data));
};
