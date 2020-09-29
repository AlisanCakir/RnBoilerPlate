import React, {useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
const Drawer = createDrawerNavigator();
import routes from '../routes';
import {useNotificationListener} from '../../hooks/useNotification';
import {useLanguageListener} from '../../hooks/useLanguage';
import SplashScreen from '../splash/SplashScreen';
import {getUser} from '../../modules/auth/api';

function Notification() {
  useNotificationListener();
  return null;
}

function Language() {
  useLanguageListener();
  return null;
}

function DrawerNavigator() {
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
  console.log(auth);
  const appRoutes = routes.filter(route => route.authStack !== isAuthenticated);
  return (
    <>
      {!isLoading ? (
        <>
          <Notification />
          <Language />
        </>
      ) : null}
      <Drawer.Navigator drawerPosition="right">
        {appRoutes.map(route => (
          <Drawer.Screen
            key={route.name}
            name={route.name}
            component={route.component}
          />
        ))}
      </Drawer.Navigator>
    </>
  );
}

export default DrawerNavigator;
