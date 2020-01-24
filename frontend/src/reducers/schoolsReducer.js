import {
  GET_SCHOOLS,
  GET_SCHOOLS_ERROR,
  SAVE_SCHOOLS,
  SAVE_SCHOOLS_ERROR,
} from '../actions';

const initialState = {
  schools: [],
  saveResponse: false
}

export default function schoolsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SCHOOLS:
      return {
        ...state,
        schools: action.schools,
        saveResponse: false
      }
    case GET_SCHOOLS_ERROR:
      return {
        ...state,
        schools: [],
        saveResponse: false
      }
    case SAVE_SCHOOLS:
      return {
        ...state,
        saveResponse: true
      }
    case SAVE_SCHOOLS_ERROR:
      return {
        ...state,
        saveResponse: false
      }
    default:
      return state;
  }
}
