import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { sessionApi } from "../api/sessions";
import axiosInstance from "../lib/axios";

export const useActiveSessions = async () => {
  const result=useQuery({
      queryKey:["activeSessions"],
      queryFn:sessionApi.getActiveSessions
  });

  return result;

 
};
