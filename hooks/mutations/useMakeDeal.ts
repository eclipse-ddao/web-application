import { useMutation } from "@tanstack/react-query";
import { makeDeal, MakeDealDto } from "../../endpoints/big-files";

export const useMakeDeal = () => {
  return useMutation((data: MakeDealDto) => makeDeal(data));
};
