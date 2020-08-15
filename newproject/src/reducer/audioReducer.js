import {
  AUDIO_FAIL,
  AUDIO_SUCCESS,
  AUDIO_LOADING,
  AUDIO_LOADED,
  AUDIO_ERROR
} from '../action/types';

const initialState = {
  // token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoaded: false,
  isLoading: false,
  audio: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUDIO_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case AUDIO_LOADED:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoaded: true,
        isLoading: false,
        audio: action.payload
      };
    case AUDIO_SUCCESS:
      // localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoaded: true,
        isLoading: false,
        audio: action.payload
      };
    case  AUDIO_ERROR:
    case AUDIO_FAIL:
      // localStorage.removeItem('token');
      return {
        ...state,
        // token: null,
        isAuthenticated: false,
        isLoading: false
      }
    default:
      return state;
  }
}