import {CommonActions} from '@react-navigation/native';

const config = {
  navigator: null,
};

export function setNavigator(nav) {
  if (nav) {
    config.navigator = nav;
  }
}

export async function navigate(routeName, params): Promise<boolean> {
  if (!config.navigator) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return navigate(routeName, params); // Make sure it's available
  }

  let dispatchResult = false;

  if (routeName) {
    const action = CommonActions.navigate({routeName, params});
    dispatchResult = config.navigator.dispatch(action);
  }

  return Promise.resolve(dispatchResult);
}

export function goBack() {
  if (config.navigator) {
    const action = CommonActions.goBack();
    config.navigator.dispatch(action);
  }
}
