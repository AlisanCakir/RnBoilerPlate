import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOG_OUT,
  USER_FETCH_REQUEST,
  USER_FETCH_SUCCESS,
  USER_FETCH_FAILURE,
} from './constants';

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  showEmailVerification: false,
  user: {},
  error: {},
};

export default (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case LOG_IN_REQUEST:
      return {...state, isLoading: true};
    case LOG_IN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: payload.user,
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        error: payload.error,
        isLoading: false,
      };
    case SIGN_UP_REQUEST:
      return {...state, isLoading: true};
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showEmailVerification: true,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      };
    case LOG_OUT:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        error: {},
      };
    case USER_FETCH_REQUEST:
      return {...state, isLoading: true};
    case USER_FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: payload.user,
      };
    case USER_FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        error: payload.error,
      };
    default:
      return state;
  }
};
