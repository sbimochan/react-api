const initialState = {
  todoList: [],
  description: '',
  editTodo: '',
  editTodoId: null,
  searchbar: '',
  tags: [],
  tagsList: [],
  togglePopUp: false,
  pagination:1,
  pageCount: 1

}
export default (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_TODO_LIST':
      return {...state, todoList:action.payload}
    case 'CHANGE_TOGGLE_POPUP':
      return { ...state, togglePopUp: action.payload }
    case 'CHECKBOX_CHANGE':
      return {...state,tags: action.payload }
    case 'FETCH_TAGS':
      return {...state, tagsList: action.payload}
    case 'EDIT_TODO':
      return { ...state, editTodo:action.payload}
    case 'GET_TODO_ID':
      return {...state, editTodoId:action.payload}
    case 'CHANGE_DESCRIPTION':
      return {...state, description:action.payload}
    case 'HANDLE_SEARCH':
      return {...state,searchbar:action.payload}
    case 'HANDLE_PAGINATION':
      return {...state,pagination:action.payload}
    case 'PAGE_COUNT':
      return {...state, pageCount:action.payload}
    default:
      return state
  }
}