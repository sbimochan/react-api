export const changeTodoList = (payload) =>{
  return {
    type:'CHANGE_TODO_LIST',
    payload
  }
}
export const changeTogglePopUp = (payload) => {
  return {
    type: 'CHANGE_TOGGLE_POPUP',
    payload
  }
}
export const checkboxChange = (payload) => {
  return {
    type: 'CHECKBOX_CHANGE',
    payload
  }
}
export const fetchTags = (payload) => {
  return {
    type: 'FETCH_TAGS',
    payload
  }
}
export const editTodo = (payload) => {
  return {
    type: 'EDIT_TODO',
    payload
  }
}
export const getTodoId = (payload) => {
  return {
    type: 'GET_TODO_ID',
    payload
  }
}
export const changeDescription = (payload) => {
  return {
    type: 'CHANGE_DESCRIPTION',
    payload
  }
}
export const handleSearch = (payload) => {
  return {
    type: 'HANDLE_SEARCH',
    payload
  }
}
