import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { sessionApi } from "../api/sessions";
import axiosInstance from "../lib/axios";

export const useActiveSessions = async () => {
  // const result=useQuery({
  //     queryKey:["activeSessions"],
  //     queryFn:sessionApi.getActiveSessions
  // });
  // return result;

  try {
    const res = await axiosInstance("/sessions/active");
    console.log("Active Sessions:", res.data);
  } catch (error) {
    console.error("Error fetching sessions:", error.response?.data || error);
  }
};
