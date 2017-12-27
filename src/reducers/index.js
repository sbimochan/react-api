const initialState = {
  todoList: [],
  "description": '',
  editTodo: '',
  editTodoId: null,
  "searchbar": '',
  togglePopUp: false
}
export default (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE_ANGULAR':
      console.log("vote angular");

      return { ...state, angular: state.angular + 1 }

    case 'VOTE_REACT':
      console.log("vote react");

      return { ...state, react: state.react + 1 }

    case 'VOTE_VUEJS':
      console.log("vote vue");

      return { ...state, vue: state.vue + 1 }

    default:
      return state
  }
}