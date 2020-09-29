import React, {useEffect} from 'react';

import routes from '../routes';
import SplashScreen from '../splash/SplashScreen';

import {useNotificationListener} from '../../hooks/useNotification';
import {useLanguageListener} from '../../hooks/useLanguage';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getUser} from '../../modules/auth/api';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();

function Notification() {
  useNotificationListener();
  return null;
}

function Language() {
  useLanguageListener();
  return null;
}

function TabNavigator() {
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
      <Tab.Navigator>
        {appRoutes.map(route => (
          <Tab.Screen
            key={route.name}
            name={route.name}
            component={route.component}
          />
        ))}
      </Tab.Navigator>
    </>
  );
}

export default TabNavigator;
