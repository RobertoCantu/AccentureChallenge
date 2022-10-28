import axios from 'axios';

const axiosInstance = axios.create({
    // Do something before request is sent
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    responseType: 'json',
});

axiosInstance.interceptors.request.use(
    (config) => {
        if (config.headers) {
            config.headers['Authorization'] = `Bearer ${localStorage.getItem(
                'accessToken'
            )}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log('aca', JSON.stringify(error));
        if (error.response && error.response.status == 401) {
            // window.location.assign("/auth/logout");
            window.localStorage.removeItem('accessToken');
            window.localStorage.removeItem('user');
        }

        return Promise.reject(
            (error.response && error.response.data) || 'Something went wrong'
        );
    }
);

export default axiosInstance;
