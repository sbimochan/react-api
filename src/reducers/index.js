import moment from 'moment';

const initialState = {
  todoList: [],
  description: '',
  editTodo: '',
  editTodoId: null,
  searchbar: '',
  tags: [],
  tagsList: [],
  togglePopUp: false,
  pagination: 1,
  pageCount: 1,
  tagsRelated: [],
  userId: null,
  isAuth: JSON.parse(localStorage.getItem('isAuth')),
  startDate: moment()
};
export default (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_TODO_LIST':
      return { ...state, todoList: action.payload };
    case 'CHANGE_TOGGLE_POPUP':
      return { ...state, togglePopUp: action.payload };
    case 'CHECKBOX_CHANGE':
      return { ...state, tags: action.payload };
    case 'FETCH_TAGS':
      return { ...state, tagsList: action.payload };
    case 'EDIT_TODO':
      return { ...state, editTodo: action.payload };
    case 'GET_TODO_ID':
      return { ...state, editTodoId: action.payload };
    case 'CHANGE_DESCRIPTION':
      return { ...state, description: action.payload };
    case 'HANDLE_SEARCH':
      return { ...state, searchbar: action.payload };
    case 'HANDLE_PAGINATION':
      return { ...state, pagination: action.payload };
    case 'PAGE_COUNT':
      return { ...state, pageCount: action.payload };
    case 'TAGS_RELATED':
      return { ...state, tagsRelated: action.payload };
    case 'IS_AUTH':
      return { ...state, isAuth: action.payload };
    case 'USER_ID':
      return { ...state,userId:action.payload};
    case 'CHANGE_DATE_PICKER':
      return { ...state, startDate:action.payload};
    default:
      return state;
  }
};
