/**Global imports */
import * as Axios from 'axios';
import * as HttpStatus from 'http-status-codes';

let accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTUxNDUyOTc3NSwiZXhwIjoxNTE0NTMxNTc1fQ.PfmkHS7HHDpBRQ_LHXAejCHiqpzWPOzZ9txq6Om57Jc';
let refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTUxNDUyOTc3NSwiZXhwIjoxNTE1MTM0NTc1fQ.KI5gTs_bKYIQq5S-BY81s7O0i4u4KwUb7om27PFTTOc';

let instance = Axios.create({ baseURL: 'http://127.0.0.1:8848/api/', timeout: 1000 });
// let instance = Axios.create({ baseURL: 'http://d7718283.ngrok.io/api/', timeout: 1000 });

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
    console.log('ss', error.message);

    if (error.response.status === HttpStatus.UNAUTHORIZED && error.message === 'Request failed with status code 401') {
      console.log('unauthorized');

      return instance
        .get('refresh', getTokenHeader('refreshToken'))
        .then(response => {
          if (response.status === HttpStatus.OK) {
            // let config = Object.assign({}, error.config);
            let config = {...error.config};
            accessToken = response.data['new access token'];
            console.log('response access token', accessToken);
            config.headers = getTokenHeader('accessToken').headers;
            return instance.request(config)
              .then(response => response)
              .catch(err => err);
          }
        })
        .catch(err => console.log('INVALID REFRESH TOKEN!'));

    }
    return Promise.reject(error);
  }));

export default instance;