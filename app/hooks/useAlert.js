import {Alert} from 'react-native';

export const useAlert = () => {
  const show = ({title, body, buttons}) => {
    Alert.alert(title, body, buttons);
  };
  return {show};
};
