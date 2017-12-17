import axios from 'axios';


export function fetchPages(page) {
  let encodedURI = window.encodeURI('http://127.0.0.1:8848/api/' + page);
  return axios.get(encodedURI)
    .then(response => response.data);
}
