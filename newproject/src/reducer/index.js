import {combineReducers} from 'redux';
import userReducer from './userReducer';
import errorReducer from './errorReducer';
import audioReducer from './audioReducer';

export default combineReducers({
  auth: userReducer,
  error: errorReducer,
  audio: audioReducer
})