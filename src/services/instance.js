/**Global imports */
import * as Axios from 'axios';
import * as HttpStatus from 'http-status-codes';

let accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTUxNDE5MDg4MywiZXhwIjoxNTE0MTkxNDgzfQ.Pqvi_Ay-ajBWgVyqnjWcVkW5z6mmVfUiRv2gmgg_W4U';
let refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTUxNDE5MDg4MywiZXhwIjoxNTE0Nzk1NjgzfQ.cyL8lZefq2R4WrXgewpIkIykCFTW8vm59LSdLQSU-Vw';

let instance = Axios.create({ baseURL: 'http://127.0.0.1:8848/api/', timeout: 1000 });

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
    console.log('ss', typeof HttpStatus.UNAUTHORIZED);

    if (error.response.status === HttpStatus.UNAUTHORIZED && error.message !== 'Request failed with status code 401') {
      console.log('unauthorized');

      return instance
        .get('refresh', getTokenHeader('refreshToken'))
        .then(response => {
          if (response.status === HttpStatus.OK) {
            let config = Object.assign({}, error.config);
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