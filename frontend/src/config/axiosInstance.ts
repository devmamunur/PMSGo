import axios, { AxiosInstance } from 'axios';
import { clientEnv } from '@/config/clientSchema';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: clientEnv.BASE_URL,
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});
export default axiosInstance;
