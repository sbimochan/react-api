import axios from 'axios';
import instance from './instance';
import {getTokenHeader} from "./instance";

let baseurl ='http://127.0.0.1:8848/api/';

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

export function deleteTodo(page,todoId,data){
  let encodedURI = window.encodeURI(baseurl + page+todoId);
  return axios.delete(encodedURI, data)
    .then(response => response.data);
}
export function searchTodo(page,query){
  let encodedURI = window.encodeURI(baseurl + page + '?search='+query);
  return axios.get(encodedURI)
  
  .then(response => response.data);
}
export function updateTodo(page, id,data) {
  let encodedURI = window.encodeURI(baseurl + page +id);
  
  return axios.put(encodedURI, data)
    .then(response => response.data);
}