import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { COLORS } from '@constants';

import { FavoriteService } from '@services';
import { RootStackParamList } from '@navigations';

import { setFavorites } from '@store/slices/people';

type Props = NativeStackScreenProps<RootStackParamList, 'InitApp'>;

const InitApp: FC<Props> = ({ navigation }) => {
  const dispacth = useDispatch();

  useEffect(() => {
    setFavoriteToStore();
  }, []);

  const setFavoriteToStore = async () => {
    const favorites = await FavoriteService.getAll();
    dispacth(setFavorites(favorites));

    navigation.reset({
      index: 0,
      routes: [{ name: 'BottomTabs' }]
    });
  };

  return <View style={{ flex: 1, backgroundColor: COLORS.bg }} />;
};

export default InitApp;
