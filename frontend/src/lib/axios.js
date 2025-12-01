import axios from "axios";
import { getToken } from "./getToken";
const token=getToken() ||"";

const axiosInstance = axios.create({
  headers: { Authorization: `Bearer ${token}` },
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, //By adding this field browser will send the cookie to server automatically, on every single req
});

export default axiosInstance;


