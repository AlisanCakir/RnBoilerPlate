import React from 'react';
import {Button, Text, Screen} from '../../components';
import {useDispatch} from 'react-redux';

import {logOut} from '../../modules/auth/api';

function DashboardScreen() {
  const dispatch = useDispatch();
  const signOut = () => dispatch(logOut());
  return (
    <Screen preset="scroll" keyboardPersistTaps="handled">
      <Button onPress={signOut}>
        <Text tx={'logout'} />
        <Text tx={'language'} />
      </Button>
    </Screen>
  );
}

export default DashboardScreen;
