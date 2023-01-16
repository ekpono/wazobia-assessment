import axios from 'axios';
import { baseUrl } from "../config.js";

const axiosInstance = axios.create({
    baseURL: baseUrl
});

axiosInstance.interceptors.request.use(function (config) {
    const user = JSON.parse(localStorage.getItem('user'));
    config.headers.Authorization =  user ? `Bearer ${user.token}` : '';
    return config;
});

export default axiosInstance;
