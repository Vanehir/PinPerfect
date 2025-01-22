import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DetailParamList } from './types';
import { Screen } from './types';
import TabNavigator from './tab/tab.navigator';

const Stack = createNativeStackNavigator<DetailParamList>();
const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screen.TabNavigator} component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default RootStack;
