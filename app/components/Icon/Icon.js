import * as React from 'react';
import {View, Image} from 'react-native';

import {icons} from './icons';

const ROOT = {};

export function Icon(props) {
  const {style: styleOverride, icon, containerStyle} = props;
  const style = {...ROOT, ...styleOverride};

  return (
    <View style={containerStyle}>
      <Image style={style} source={icons[icon]} />
    </View>
  );
}
