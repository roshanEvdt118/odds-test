import axios from 'axios';
import toast from 'react-hot-toast';
import { HOST_API_KEY } from '../config-global';

const AxiosClient = async (args) => {
  const { toolkit, headers = {}, ...rest } = args;

  // console.log('url :>> ', url);

  const { url } = rest;

  const isAuthRequired = !url.includes('/admin/login');

  return axios({
    baseURL: `${HOST_API_KEY}`,
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(isAuthRequired && { Authorization: `Bearer ${localStorage?.getItem('token')}` || null }),
      ...headers,
    },
  })
    .then((response) => toolkit.fulfillWithValue(response.data))
    .catch((error) => toolkit.rejectWithValue(error.response.data));
};

axios.interceptors.response.use(
  (response) => response,
  (error) => {

    console.log('error :>> ', error.response.data.responseMessage);
    toast.error(error.response.data.responseMessage, {
      position: 'top-right',
    });
    
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('auth');
      localStorage.clear();
      // window.location.href = '/login';
    }
    return Promise.reject((error.response && error.response.data) || 'Something went wrong');
  }
);

export default AxiosClient;
