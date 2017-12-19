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
export function searchTodo(page,query){
  let encodedURI = window.encodeURI(baseurl + page + '?search='+query);
  console.log('jl',encodedURI);
  return axios.get(encodedURI)
  
  .then(response => response.data);
}
export function updateTodo(page, id,data) {
  let encodedURI = window.encodeURI(baseurl + page +id);
  console.log(encodedURI,data);
  console.log(typeof data);
  
  return axios.put(encodedURI, data)
    .then(response => response.data);
}