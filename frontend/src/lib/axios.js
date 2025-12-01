import axios from "axios";


const axiosInstance=axios.create({
    baseURL:import.meta.env.VITE_API_URL ,
    withCredentials:true, //By adding this field browser will send the cookie to server automatically, on every single req
});

export default axiosInstance;

