import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import InitApp from '@screens/InitApp';
import CharacterItem from '@screens/CharacterItem';

import { BottomTabs } from '@navigations';

import { IPeople } from '@types';

export type RootStackParamList = {
  InitApp: undefined;
  BottomTabs: undefined;
  CharacterItem: { character: IPeople };
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="InitApp"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="InitApp" component={InitApp} />
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="CharacterItem" component={CharacterItem} />
    </Stack.Navigator>
  );
};

export default RootNavigation;
