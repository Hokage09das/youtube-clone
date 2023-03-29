import axios from 'axios';

const request = axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3/',
  params: {
    key: 'AIzaSyANceX8PpBUikDkjKtU6gvbeuZ2PSrRaNc',
  },
});

export default request;
