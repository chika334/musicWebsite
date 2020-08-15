import {AUDIO_SUCCESS, AUDIO_FAIL, AUDIO_LOADING, AUDIO_LOADED, AUDIO_ERROR } from './types';
import axios from 'axios';
import { returnErrors } from './errorActions'

export const loadMusic = () => (dispatch) => {
  // load audio
  dispatch({ type: AUDIO_LOADING })

  axios.get(`${process.env.REACT_APP_API}/api/upload/audio`)
    .then(res => dispatch({
      type: AUDIO_LOADED,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status))
      dispatch({
        type: AUDIO_ERROR
      });
    })
}

export const Audio = (formData) => dispatch => {
  const config = {
    header: { 'content-type': 'multipart/form-data' }
  }

  axios.post(`${process.env.REACT_APP_API}/api/audio`, formData, config)
    .then(res => dispatch({
      type: AUDIO_SUCCESS,
      payload: res.data
    }))
    .catch(err => {
      // console.log(err)
      // dispatch(returnErrors(err.response.data, err.response.status, 'IMAGE_FAIL'));
      dispatch({
        type: AUDIO_FAIL
      });
    });
}

export const audioget = () => () => {

}