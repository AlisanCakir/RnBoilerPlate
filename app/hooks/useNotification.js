import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import OneSignal from 'react-native-onesignal';
import {save} from '../storage';
import {navigate} from '../navigation/helpers';

export const useNotificationListener = () => {
  const {auth} = useSelector(state => ({
    auth: state.auth,
  }));

  const {token} = auth.user || {token: null};

  const onIds = async (device = {userId: ''}) => {
    await save('NOTIFICATION_TOKEN', device.userId);
  };

  const onReceived = notification => {
    console.log('received');
    console.log('Notification received: ', notification);
  };

  const onOpened = openResult => {
    const data = openResult.notification.payload.additionalData;
    if (data) {
      navigate('ANY_ROUTE', {params: 'any_params'});
    }
  };
  useEffect(() => {
    if (token) {
      OneSignal.setSubscription(true);
    } else {
      OneSignal.setSubscription(false);
    }
  }, [token]);

  useEffect(() => {
    // Todo: get from env file
    OneSignal.init('initKey', {
      kOSSettingsKeyAutoPrompt: true,
    });
    OneSignal.setLogLevel(6, 0);
    OneSignal.inFocusDisplaying(2);
    OneSignal.addEventListener('received', onReceived);
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);
    return () => {
      OneSignal.removeEventListener('ids', onIds);
      OneSignal.removeEventListener('received', onReceived);
      OneSignal.removeEventListener('opened', onOpened);
    };
  }, []);
};
