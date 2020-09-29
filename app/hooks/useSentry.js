import * as Sentry from '@sentry/react-native';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';
import {useAlert} from './useAlert';
import {BackHandler} from 'react-native';

export const useErrorListener = () => {
  const {show} = useAlert();

  const catchError = ({error, tag, level, extra}: Error) => {
    Sentry.withScope(function(scope) {
      if (tag) {
        scope.setTag(tag.key, tag.value);
      }
      if (level) {
        scope.setLevel(Sentry.Severity[level] || Sentry.Severity.Error);
      }

      if (extra) {
        scope.setExtra(extra.key, extra.value);
      }

      Sentry.captureException(error);
    });
  };

  const reporter = (error, isFatal) => {
    const level = isFatal ? 'Fatal' : 'Error';
    catchError({error, level});
  };
  const errorHandler = (error, isFatal) => {
    if (isFatal) {
      const title = 'Unexpected error occurred';
      const body = `Error: ${isFatal ? 'Fatal:' : ''} ${error.name} ${
        error.message
      } We have reported this to our team ! Please close the app and start again!`;
      const buttons = [
        {
          text: 'Close',
          onPress: () => {
            BackHandler.exitApp();
          },
        },
      ];
      show({title, body, buttons});
    }
    reporter(error, isFatal);
  };

  const initialize = () => {
    Sentry.init({
      dsn: '',
      environment: 'test',
      debug: true,
    });
    setJSExceptionHandler(errorHandler, true);
    setNativeExceptionHandler(error => {
      catchError({
        error,
        level: 'Critical',
        tag: {key: 'type', value: 'native-error'},
      });
    });
  };

  return {
    initialize,
    catchError,
  };
};
