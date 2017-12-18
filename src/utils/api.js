import axios from 'axios';

let baseurl ='http://127.0.0.1:8848/api/';

export function fetchPages(page) {
  let encodedURI = window.encodeURI(baseurl+ page);
  return axios.get(encodedURI)
    .then(response => response.data);
}

export function addTodo(page,data){
  let encodedURI = window.encodeURI(baseurl + page);
  return axios.post(encodedURI,data)
    .then(response => response.data);
}
export function deleteTodo(page,todoId,data){
  let encodedURI = window.encodeURI(baseurl + page+todoId);
  return axios.delete(encodedURI, data)
    .then(response => response.data);
}