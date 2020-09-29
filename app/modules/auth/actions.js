import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  USER_FETCH_FAILURE,
  USER_FETCH_REQUEST,
  USER_FETCH_SUCCESS,
} from './constants';

export const loginRequest = () => ({
  type: LOG_IN_REQUEST,
});

export const loginSuccess = user => ({
  type: LOG_IN_SUCCESS,
  payload: {
    user,
  },
});

export const loginFailure = error => ({
  type: LOG_IN_FAILURE,
  payload: {
    error,
  },
});

export const signUpRequest = () => ({
  type: SIGN_UP_REQUEST,
});

export const signUpSuccess = () => ({
  type: SIGN_UP_SUCCESS,
});

export const signUpFailure = error => ({
  type: SIGN_UP_FAILURE,
  payload: {
    error,
  },
});

export const logout = () => ({
  type: LOG_OUT,
});

export const userFetchRequest = () => ({
  type: USER_FETCH_REQUEST,
});

export const userFetchSuccess = user => ({
  type: USER_FETCH_SUCCESS,
  payload: {user},
});

export const userFetchFailure = error => ({
  type: USER_FETCH_FAILURE,
  payload: {error},
});
