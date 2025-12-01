import axios from "axios";

const axiosInstance=axios.create({
    baseURL:import.meta.env.VITE_API_URL || "https://codemeet-vu9d.onrender.com/api",
    withCredentials:true, //By adding this field browser will send the cookie to server automatically, on every single req
});

export default axiosInstance;

