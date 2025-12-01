import axios from "axios";

const raw="https://codemeet-vu9d.onrender.com/api"
const axiosInstance=axios.create({
    baseURL:raw ,
    withCredentials:true, //By adding this field browser will send the cookie to server automatically, on every single req
});

export default axiosInstance;

