import React, {useEffect, useState} from 'react';
import {View, TextInput} from 'react-native';
import {color, spacing, typography, palette} from '../../theme';
import {translate} from '../../i18n/translate';
import {Text} from '../';

import {mergeAll, flatten} from 'ramda';

const CONTAINER = {
  paddingVertical: spacing[3],
};

const INPUT = {
  fontFamily: typography.primary,
  minHeight: 44,
  fontSize: 18,
  backgroundColor: color.input,
  padding: 20,
  color: palette.black,
  borderWidth: 2,
  borderColor: color.transparent,
  borderRadius: 5,
  overflow: 'hidden',
};

const inputStyleFocus = {
  borderColor: palette.lightBlue,
};

const PRESETS: {} = {
  default: {},
};

const labelStyle = {
  fontWeight: 'bold',
  fontFamily: typography.primary,
  marginBottom: 10,
  color: color.inputLabel,
  fontSize: 14,
};

const enhance = (style, styleOverride) => {
  return mergeAll(flatten([style, styleOverride]));
};

export const TextField = props => {
  const [inputFocus, setInputFocus] = useState(false);
  const {onFocus} = props;
  useEffect(() => {
    if (inputFocus) {
      if (onFocus) {
        onFocus();
      }
    }
  }, [inputFocus]);
  const handlerFocus = () => {
    setInputFocus(true);
  };

  const handlerBlur = () => {
    setInputFocus(false);
  };

  const {
    placeholderTx,
    placeholder,
    labelTx,
    label,
    multiLine = false,
    preset = 'default',
    style: styleOverride,
    inputStyle: inputStyleOverride,
    forwardedRef,
    ...rest
  } = props;
  let containerStyle = {...CONTAINER, ...PRESETS[preset]};
  containerStyle = enhance(containerStyle, styleOverride);

  let inputStyle = [INPUT, inputFocus ? inputStyleFocus : {}];
  inputStyle = enhance(inputStyle, inputStyleOverride);
  const actualPlaceholder = placeholderTx
    ? translate(placeholderTx)
    : placeholder;

  return (
    <View style={containerStyle}>
      <Text preset="fieldLabel" tx={labelTx} text={label} style={labelStyle} />
      <TextInput
        placeholder={actualPlaceholder}
        placeholderTextColor={palette.lighterGrey}
        underlineColorAndroid={color.transparent}
        {...rest}
        multiline={multiLine}
        style={inputStyle}
        ref={forwardedRef}
        onFocus={() => handlerFocus()}
        onBlur={() => handlerBlur()}
      />
    </View>
  );
};
