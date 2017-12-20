import * as Axios from 'axios';
import * as HttpStatus from 'http-status-codes';

let accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTUxMzc1MzM3MSwiZXhwIjoxNTEzNzU1MTcxfQ.iK2s9dhBdPZ07l2JDpQQ0t5Qarus6XhRbCkFj9o-NM4';
let refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTUxMzc1MTQ2NCwiZXhwIjoxNTEzNzUxODg0fQ.1h5WNmqHOcfZ9NZeT8gpyr8i6NkZDxXo5haFJKWKFcs';

let instance = Axios.create({baseURL: 'http://127.0.0.1:8848/api/'});

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
    if (error.response.status === HttpStatus.UNAUTHORIZED) {
      instance
        .get('refresh', getTokenHeader('refreshToken'))
        .then(response => {
          if (response.status === HttpStatus.OK) {
            console.log('old:', accessToken);
            accessToken = response.data['new access token'];
            console.log('new', accessToken);
          }
        })
        .catch(error => error);
        
    }
    return Promise.reject(error);
  }));

export default instance;