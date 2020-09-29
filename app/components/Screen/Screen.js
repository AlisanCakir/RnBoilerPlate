import React from 'react';
import {useSafeArea} from 'react-native-safe-area-context';
import {
  View,
  KeyboardAvoidingView,
  StatusBar,
  Platform,
  ScrollView,
} from 'react-native';
import {color} from '../../theme';


export const presets = {
  fixed: {
    outer: {
      backgroundColor: color.background,
      flex: 1,
      height: '100%',
    },
    inner: {
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      height: '100%',
      width: '100%',
    },
  },

  scroll: {
    outer: {
      backgroundColor: color.background,
      flex: 1,
      height: '100%',
    },
    inner: {justifyContent: 'flex-start', alignItems: 'stretch'},
  },
};
const isIos = Platform.OS === 'ios';

function ScreenWithoutScrolling(props) {
  const insets = useSafeArea();
  const preset = presets['fixed'];
  const style = props.style || {};
  const backgroundStyle = props.backgroundColor
    ? {backgroundColor: props.backgroundColor}
    : {};
  const safeAreaStyle = props.unsafe ? {} : {paddingTop: insets.top};

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? 'padding' : null}>
      <StatusBar
        backgroundColor={color.slate}
        barStyle={props.statusBar || 'light-content'}
      />
      <View style={[preset.inner, style, safeAreaStyle]}>{props.children}</View>
    </KeyboardAvoidingView>
  );
}

function ScreenWithScrolling(props) {
  const insets = useSafeArea();
  const preset = presets['scroll'];
  const style = props.style || {};
  const backgroundStyle = props.backgroundColor
    ? {backgroundColor: props.backgroundColor}
    : {};

  const safeAreaStyle = props.unsafe ? {} : {paddingTop: insets.top};
  const keyboardShouldPersistTaps = props.keyboardPersistTaps || 'never';
  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? 'padding' : null}>
      <StatusBar
        backgroundColor={color.slate}
        barStyle={props.statusBar || 'light-content'}
      />
      <View style={[preset.outer, backgroundStyle, safeAreaStyle]}>
        <ScrollView
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          style={[preset.outer, backgroundStyle]}
          contentContainerStyle={[preset.inner, style]}>
          {props.children}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

export function Screen(props = {}) {
  if (props.preset !== 'scroll') {
    return <ScreenWithoutScrolling {...props} />;
  } else {
    return <ScreenWithScrolling {...props} />;
  }
}

