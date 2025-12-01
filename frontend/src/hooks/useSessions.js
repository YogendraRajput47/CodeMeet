import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { sessionApi } from "../api/sessions"




export const useActiveSessions = () => {
  const result=useQuery({
      queryKey:["activeSessions"],
      queryFn:sessionApi.getActiveSessions
  });

  console.log(result.data);
  return result;

 
};
