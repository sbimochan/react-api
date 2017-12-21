/**Global imports */
import * as Axios from 'axios';
import * as HttpStatus from 'http-status-codes';

let accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTUxMzc2NjkwNSwiZXhwIjoxNTEzNzY4NzA1fQ._34rdKA96CL3c2jhjyClxUvzPmRuvW2kpfIpN4O5pRc';
let refreshToken = 'eyJhbGciOiasdadJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTUxMzc4NjA1MywiZXhwIjoxNTEzNzg2NDczfQ.8Nx7D0jfOSz0tUYBsdE1SA2F7rAsV5OiWK-1v6GST0w';

let instance = Axios.create({ baseURL: 'http://127.0.0.1:8848/api/' });

export function getTokenHeader(type) {
  let token = accessToken;
  if (type === 'refreshToken') {
    token = refreshToken;
  }
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
}

// Add a request interceptor
instance
  .interceptors
  .request
  .use(config => config, (error => Promise.reject(error)));

// Add a response interceptor
instance
  .interceptors
  .response
  .use(response => response, (error => {
    console.log('ss',error.message);
    
if (error.response.status === HttpStatus.UNAUTHORIZED && error.message !== 'Request failed with status code 401') {
      return instance
      .get('refresh', getTokenHeader('refreshToken'))
      .then(response => {
          if (response.status === HttpStatus.OK) {
            let config = Object.assign({}, error.config);
            accessToken = response.data['new access token'];
            config.headers = getTokenHeader('accessToken').headers;
            return instance.request(config)
            .then(response => response)
            .catch(err => err);
          }
        })
        .catch(error => console.log('INVALID REFRESH TOKEN!'));

    }else{
      console.log("new type of error");
    }
    return Promise.reject(error);
  }));

export default instance;