import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text} from '../Text/Text';

import {mergeAll, flatten} from 'ramda';
import {color, spacing, palette} from '../../theme';

const BASE_VIEW = {
  paddingVertical: spacing[2],
  paddingHorizontal: spacing[2],
  borderRadius: 4,
  justifyContent: 'center',
  alignItems: 'center',
};

const BASE_TEXT = {
  paddingHorizontal: spacing[3],
  fontSize: 24,
  padding: 12,
  color: palette.white,
};

export const viewPresets = {
  primary: {...BASE_VIEW, backgroundColor: color.windowsBlue},
  pink: {...BASE_VIEW, backgroundColor: color.rosyPink},
  success: {...BASE_VIEW, backgroundColor: color.shamrockGreen},
  orange: {...BASE_VIEW, backgroundColor: color.orange},
  disabled: {...BASE_VIEW, backgroundColor: color.coolGrey},

  link: {
    ...BASE_VIEW,
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: 'flex-start',
  },
};

export const textPresets = {
  primary: {...BASE_TEXT},
  link: {
    ...BASE_TEXT,
    color: color.text,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
};

export function Button(props) {
  const {
    preset = 'primary',
    tx,
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    ...rest
  } = props;

  const viewStyle = mergeAll(
    flatten([viewPresets[preset] || viewPresets.primary, styleOverride]),
  );
  const textStyle = mergeAll(
    flatten([textPresets[preset] || textPresets.primary, textStyleOverride]),
  );

  const content = children || <Text tx={tx} text={text} style={textStyle} />;

  return (
    <TouchableOpacity style={viewStyle} {...rest}>
      {content}
    </TouchableOpacity>
  );
}
