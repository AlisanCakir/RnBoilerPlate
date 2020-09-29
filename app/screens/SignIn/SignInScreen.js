import React, {useState, useContext} from 'react';
import {View} from 'react-native';

import {TextField, Screen, Button, Text} from '../../components';
import {spacing} from '../../theme';
import {useDispatch} from 'react-redux';
import {login} from '../../modules/auth/api';

const styles = {
  container: {
    marginHorizontal: spacing[4],
    marginVertical: spacing[4],
  },
};
function SignInScreen() {
  const dispatch = useDispatch();
  const [data, setData] = useState({email: '', password: ''});
  const signIn = () => dispatch(login(data));
  const handleChange = (name, value) => {
    setData({...data, [name]: value});
  };
  return (
    <Screen preset="scroll" keyboardPersistTaps="handled">
      <View style={styles.container}>
        <TextField
          placeholder="Email"
          value={data.email}
          label="Email"
          onChangeText={text => handleChange('email', text)}
        />
        <TextField
          placeholder="Password"
          value={data.email}
          label="Password"
          onChangeText={text => handleChange('password', text)}
          secureTextEntry
        />
        <Button onPress={signIn}>
          <Text tx="login" />
        </Button>
      </View>
    </Screen>
  );
}

export default SignInScreen;
