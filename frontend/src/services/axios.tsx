import axios, {AxiosInstance} from 'axios';

export  let BASE_URL = '';

// when deploy locally, change this value to local
export const APP_ENVIRONMENT : string = 'local';

if (APP_ENVIRONMENT === 'local') {
    BASE_URL = process.env.NEXT_PUBLIC_LOCAL_API || '';
} else if (APP_ENVIRONMENT === 'development') {
    BASE_URL = process.env.NEXT_PUBLIC_DEVELOPMENT_API || '';
} else if (APP_ENVIRONMENT === 'staging') {
    BASE_URL = process.env.NEXT_PUBLIC_STAGING_API || '';
} else if (APP_ENVIRONMENT === 'production') {
    BASE_URL = process.env.NEXT_PUBLIC_PRODUCTION_API || '';
}

const axiosInstance : AxiosInstance = axios.create({
    baseURL : BASE_URL,
    headers : { 'Content-Type': 'application/json', Accept: 'application/json' }
})

export default axiosInstance;