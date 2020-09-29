/**
 * @format
 * @flow
 */

import React, {useEffect} from 'react';

import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {setNavigator} from './app/navigation/helpers';
import {useErrorListener} from './app/hooks/useSentry';

import DrawerNavigator from './app/navigation/drawer/DrawerNavigator';
import {store} from './app/modules/store';
import {Provider} from 'react-redux';
const {initialize} = useErrorListener();

if (!__DEV__) {
  initialize();
}

export default function App() {
  let navigator;

  useEffect(() => {
    if (navigator) {
      setNavigator(navigator);
    }
  }, [navigator]);
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer
          ref={nav => {
            navigator = nav;
          }}>
          <DrawerNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
