import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://myvhs.herokuapp.com',
});
instance.defaults.headers.get['Cache-control'] = 'no-cache';
instance.interceptors.request.use((axiosConfig) => {
  const accessToken = JSON.parse(localStorage.getItem('token'));
  if (accessToken) {
    axiosConfig.headers.Authorization = `Bearer ${accessToken}`;
  }

  return axiosConfig;
});

export default instance;
