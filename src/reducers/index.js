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
  startDate: moment(),
};
export const DragTypes = {
  ITEM: 'item',
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
      return { ...state, userId: action.payload };
    case 'CHANGE_DATE_PICKER':
      return { ...state, startDate: action.payload };
    case 'REORDER_ITEM':
      return { ...state, todoList:reorderList([...state.todoList],action.id,action.index)}
    default:
      return state;
  }
  function reorderList(array, value, positionChange) {
    let oldIndex = array.findIndex((x) => x.id === value);
    let arrayClone = array.slice();
    arrayClone.splice(positionChange, 0, arrayClone.splice(oldIndex, 1)[0]);
    return arrayClone;
  }
};
