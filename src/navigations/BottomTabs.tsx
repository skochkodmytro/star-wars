import React from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SvgXml } from 'react-native-svg';

import { COLORS } from '@constants';
import { ICONS } from '@assets';

import { AppText } from '@components';

import Home from '@screens/Home';
import Favorite from '@screens/Favorite';

import { RootState } from '@store/index';

export type BottomStackParamList = {
  Home: undefined;
  Favorite: undefined;
};

const Tab = createBottomTabNavigator<BottomStackParamList>();

const BottomTabs = () => {
  const { people: favorites } = useSelector((store: RootState) => store.people);

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            const color = focused ? COLORS.black : COLORS.darkGray;
            return (
              <View style={styles.iconWrapper}>
                <SvgXml xml={ICONS.bottomTabs.home(color)} />
              </View>
            );
          },
          tabBarLabel: ({ focused }) => {
            return (
              <AppText
                style={{
                  ...styles.label,
                  color: focused ? COLORS.black : COLORS.darkGray
                }}
              >
                Characters
              </AppText>
            );
          }
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarIcon: ({ focused }) => {
            const color = focused ? COLORS.black : COLORS.darkGray;
            return (
              <View style={styles.iconWrapper}>
                <SvgXml xml={ICONS.bottomTabs.favorites(color)} />

                <View style={styles.favoriteCount}>
                  <AppText style={styles.favoriteCountText}>
                    {favorites.length}
                  </AppText>
                </View>
              </View>
            );
          },
          tabBarLabel: ({ focused }) => {
            return (
              <AppText
                style={{
                  ...styles.label,
                  color: focused ? COLORS.black : COLORS.darkGray
                }}
              >
                Favorites
              </AppText>
            );
          }
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '400'
  },
  favoriteCount: {
    position: 'absolute',
    right: -8,
    top: -8,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 3,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.black
  },
  favoriteCountText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    color: COLORS.bg
  },
  iconWrapper: {
    marginTop: 10
  }
});

export default BottomTabs;
