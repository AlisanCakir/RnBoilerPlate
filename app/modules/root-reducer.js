import {combineReducers} from 'redux';
import modal from './modal/reducer';
import auth from './auth/reducer';

export default combineReducers({
  modal,
  auth,
});
