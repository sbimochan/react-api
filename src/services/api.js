/**Local imports */
import instance from './instance';
import {getTokenHeader} from "./instance";

let baseurl ='http://127.0.0.1:8848/api/';
// let baseurl ='http://d7718283.ngrok.io/api/'

/*
export function fetchPages(page) {
  let encodedURI = window.encodeURI(baseurl+ page);
  return axios.get(encodedURI)
    .then(response => response.data);
}
*/
export function fetchPages(page) {
  let encodedURI = window.encodeURI(baseurl + page);
  return instance
    .get(encodedURI,getTokenHeader('accessToken'))
    .then(response => response.data);
}
/**
 * without token
 * @param {*} page 
 * @param {*} data 
 */
/*

export function addTodo(page,data){
  let encodedURI = window.encodeURI(baseurl + page);
  return axios.post(encodedURI,data)
    .then(response => response.data);
}
*/
export function addTodo(page, data) {
  let encodedURI = window.encodeURI(baseurl + page);
  return instance
    .post(encodedURI, data,getTokenHeader('accessToken'))
    .then(response => response.data);
}
export function logout(page){
  let encodedURI = window.encodeURI(baseurl + page);
  return instance
    .get(encodedURI, getTokenHeader('refreshToken'))
    .then(response => response.data);
}

export function deleteTodo(page,todoId,data){
  let encodedURI = window.encodeURI(baseurl + page + todoId);
  return instance.delete(encodedURI, data)
    .then(response => response.data);
}
export function searchTodo(page,query){
  let encodedURI = window.encodeURI(baseurl + page + '?search=' + query);
  return instance.get(encodedURI)
  
  .then(response => response.data);
}
export function paginateTodo(page, query){
  let encodedURI = window.encodeURI(baseurl + page +'?page='+query);
  console.log(encodedURI);
  return instance.get(encodedURI)
  .then(response => response.data);
  
}
export function updateTodo(page, id,data) {
  let encodedURI = window.encodeURI(baseurl + page +id);
  
  return instance.put(encodedURI, data)
    .then(response => response.data);
}
/* Tags fetch */
export function fetchTags(page){
  let encodedURI = window.encodeURI(baseurl+page);
  return instance.get(encodedURI).then(response => response.data);
}

/* Tags related todos */
export function todosRelated(page,tagid){
  let encodedURI = window.encodeURI(baseurl + page+'/'+tagid);
  console.log(encodedURI);
  
  return instance.get(encodedURI).then(response =>response.data);
}