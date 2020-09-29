import React, {useState} from 'react';
import {View} from 'react-native';
import {TextField, Screen, Button, Text} from '../../components';
import {spacing} from '../../theme';
import {useDispatch} from 'react-redux';
import {signUp} from '../../modules/auth/api';

const styles = {
  container: {
    marginHorizontal: spacing[4],
    marginVertical: spacing[4],
  },
};
function SignUpScreen() {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    phone: '',
  });

  const register = () => dispatch(signUp(data));

  const handleChange = (name, value) => {
    setData({...data, [name]: value});
  };
  return (
    <Screen preset="scroll" keyboardPersistTaps="handled">
      <View style={styles.container}>
        <TextField
          placeholder="First Name"
          value={data.firstName}
          label="First Name"
          onChangeText={text => handleChange('firstName', text)}
        />
        <TextField
          placeholder="Last Name"
          value={data.lastName}
          label="Last Name"
          onChangeText={text => handleChange('lastName', text)}
        />
        <TextField
          placeholder="Password"
          label="Password"
          value={data.password}
          onChangeText={text => handleChange('password', text)}
          secureTextEntry
        />
        <Button onPress={register}>
          <Text tx="register" />
        </Button>
      </View>
    </Screen>
  );
}

export default SignUpScreen;
