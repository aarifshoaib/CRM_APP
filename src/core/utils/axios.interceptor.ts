import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    timeout: 100000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const setUpAxiosInterceptors = (logout: any) => {
    axiosInstance.interceptors.request.use(
        async (request) => {
            // Add a meaningful condition here
            if (false) {
                logout();
            }
            return request;
        },
        (error) => {
            // Handle request errors here
            return Promise.reject(error);
        }
    );
};

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // You can modify the response data here
        return response;
    },
    (error) => {
        // Handle response errors here
        if (error.response) {
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        return Promise.reject(error);
    }
);
export default axiosInstance;

