const initialState = {
  todoList: [],
  description: '',
  editTodo: '',
  editTodoId: null,
  searchbar: '',
  tags: [],
  tagsList: [],
  togglePopUp: false
}
export default (state = initialState, action) => {
  switch (action.type) {
    case 'changeTodoList':
      return {...state, todoList:action.payload}
    case 'changeTogglePopUp':
      return { ...state, togglePopUp: action.payload }
    case 'checkboxChange':
      return {...state,tags: action.payload }
    case 'fetchTags':
      return {...state, tagsList: action.payload}
    case 'editTodo':
      return { ...state, editTodo:action.payload}
    case 'getTodoId':
      return {...state, editTodoId:action.payload}
    case 'changeDescription':
      return {...state, description:action.payload}
    case 'handleSearch':
      return {...state,searchbar:action.payload}
    default:
      return state
  }
}