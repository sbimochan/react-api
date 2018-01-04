/**Global imports */
import * as Axios from 'axios';
import * as HttpStatus from 'http-status-codes';

// let accessToken = localStorage.getItem('accessToken');
// let refreshToken = localStorage.getItem('refreshToken');
// console.log('access', accessToken);
// console.log('refres', refreshToken);

let instance = Axios.create({
  baseURL: 'http://127.0.0.1:8848/api/',
  timeout: 1000,
});
// let instance = Axios.create({ baseURL: 'http://d7718283.ngrok.io/api/', timeout: 1000 });

export function getTokenHeader(type) {
  let token = localStorage.getItem('accessToken');
  if (type === 'refreshToken') {
    token = localStorage.getItem('refreshToken');
  }
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
}

// Add a request interceptor
instance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response.status === HttpStatus.UNAUTHORIZED &&
      error.message === 'Request failed with status code 401'
    ) {
      return instance
        .get('refresh', getTokenHeader('refreshToken'))
        .then((response) => {
          if (response.status === HttpStatus.OK) {
            let config = { ...error.config };
            localStorage.setItem('accessToken', response.data['accessToken']);
            config.headers = getTokenHeader('accessToken').headers;
            return instance
              .request(config)
              .then((response) => response)
              .catch((err) => err);
          }
        })
        .catch((err) => console.log('INVALID REFRESH TOKEN!'));
    }
    return Promise.reject(error);
  }
);

export default instance;
