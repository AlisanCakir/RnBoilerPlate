import {useAPI} from '../../hooks/useApi';
import {
  loginFailure,
  loginRequest,
  loginSuccess,
  logout,
  signUpFailure,
  signUpRequest,
  signUpSuccess,
  userFetchFailure,
  userFetchRequest,
  userFetchSuccess,
} from './actions';
import {clear, load, save} from '../../storage';

const {post} = useAPI();
const user = {
  token: 'hello world',
  email: 'he',
  password: 'bla',
};
export const login = ({email, password}) => {
  return async dispatch => {
    dispatch(loginRequest());
    await save('user-data', user);
    const endpoint = 'login';
    post(endpoint, {
      email,
      password,
    })
      .then(async response => {
        await save('user-data', response);
        dispatch(loginSuccess(response));
      })
      .catch(error => {
        dispatch(loginFailure(error));
      });
  };
};

export const signUp = ({name, surname, email, password, country}) => {
  return dispatch => {
    dispatch(signUpRequest());
    const endpoint = 'signUp';
    post(endpoint, {
      name,
      surname,
      email,
      password,
      country,
    })
      .then(response => {
        dispatch(signUpSuccess(response));
      })
      .catch(error => {
        dispatch(signUpFailure(error));
      });
  };
};

export const logOut = () => {
  return async dispatch => {
    await clear();
    dispatch(logout());
  };
};

export const getUser = () => {
  return async dispatch => {
    dispatch(userFetchRequest());
    const data = await load('user-data');
    console.log(data);
    if (data) {
      dispatch(userFetchSuccess());
    } else {
      dispatch(userFetchFailure());
    }
  };
};
