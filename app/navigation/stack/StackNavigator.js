import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import routes from '../routes';
import SplashScreen from '../splash/SplashScreen';

import {useNotificationListener} from '../../hooks/useNotification';
import {useLanguageListener} from '../../hooks/useLanguage';

import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {getUser} from '../../modules/auth/api';

const Stack = createStackNavigator();

function Notification() {
  useNotificationListener();
  return null;
}

function Language() {
  useLanguageListener();
  return null;
}
function StackNavigator() {
  const dispatch = useDispatch();
  const {modal, auth} = useSelector(
    state => ({
      modal: state.modal,
      auth: state.auth,
    }),
    shallowEqual,
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      dispatch(getUser());
    };

    bootstrapAsync();
  }, []);

  const {isLoading, isAuthenticated} = auth;

  if (isLoading) {
    return <SplashScreen />;
  }

  const appRoutes = routes.filter(route => route.authStack !== isAuthenticated);
  return (
    <>
      {!isLoading ? (
        <>
          <Notification />
          <Language />
        </>
      ) : null}
      <Stack.Navigator>
        {appRoutes.map(route => (
          <Stack.Screen
            key={route.name}
            name={route.name}
            component={route.component}
          />
        ))}
      </Stack.Navigator>
    </>
  );
}

export default StackNavigator;
