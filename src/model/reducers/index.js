import { combineReducers } from 'redux';
import formReducer from './searchFormReducer';

export default combineReducers({
  searchForm: formReducer
});