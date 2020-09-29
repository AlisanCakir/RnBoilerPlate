import * as React from 'react';

import RNDateTimePicker from '@react-native-community/datetimepicker/src';

export const Picker = ({
  calMode,
  onChange,
  time,
  is24Hour,
  date,
  show = false,
}) =>
  (show && (
    <RNDateTimePicker
      value={calMode === 'date' ? date : time}
      mode={calMode}
      locale="tr-Tr"
      is24Hour={is24Hour}
      display="default"
      onChange={onChange}
    />
  )) ||
  null;
