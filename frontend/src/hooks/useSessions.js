import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { sessionApi } from "../api/sessions";
import axios from "axios";
import axiosInstance from "../lib/axios";

// export const useActiveSessions = async () => {
//   // const result=useQuery({
//   //     queryKey:["activeSessions"],
//   //     queryFn:sessionApi.getActiveSessions
//   // });
//   // return result;

//   const res = await axios.get(
//     `https://codemeet-vu9d.onrender.com/api/sessions/active`
//   );
//   console.log(res.data);
// };


export const useActiveSessions = async () => {
  const res = await axios.get(`https://codemeet-vu9d.onrender.com/api/sessions/active`);
  console.log(res.data);
};
    