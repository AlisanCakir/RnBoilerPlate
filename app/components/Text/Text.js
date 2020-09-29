import * as React from 'react';
import {Text as ReactNativeText} from 'react-native';
import {mergeAll, flatten} from 'ramda';
import {translate} from '../../i18n/translate';

import {color, typography} from '../../theme';
const BASE = {
  fontFamily: typography.primary,
  color: color.black,
  fontSize: 15,
};

const presets = {
  default: BASE,
  bold: {...BASE, fontWeight: 'bold'},
  header: {...BASE, fontSize: 24, fontWeight: 'bold'},
  fieldLabel: {...BASE, fontSize: 13, color: color.dim},
  secondary: {...BASE, fontSize: 9, color: color.dim},
};

export function Text(props) {
  const {
    preset = 'default',
    tx,
    txOptions,
    text,
    children,
    style: styleOverride,
    ...rest
  } = props;

  const i18nText = tx && translate(tx, txOptions);
  const content = i18nText || text || children;

  const style = mergeAll(
    flatten([presets[preset] || presets.default, styleOverride]),
  );

  return (
    <ReactNativeText {...rest} style={style}>
      {content}
    </ReactNativeText>
  );
}
