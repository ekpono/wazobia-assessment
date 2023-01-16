import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://test-api.sytbuilder.com",
    // baseURL: process.env.APP_API_BASE_URL,
});

axiosInstance.interceptors.request.use(function (config) {
    const user = JSON.parse(localStorage.getItem('user'));
    config.headers.Authorization =  user ? `Bearer ${user.token}` : '';
    return config;
});

export default axiosInstance;
