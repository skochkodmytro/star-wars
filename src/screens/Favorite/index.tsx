import React, { useState, useCallback, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import styles from './styles';

import { BottomStackParamList, RootStackParamList } from '@navigations';

import { Header, AppText, Tabs, CharacterItem } from '@components';

import {
  selectLengthByGender,
  selectCharactersByGender,
  toggleFavoriteCharacter,
  setFavorites
} from '@store/slices/people';

import { FavoriteService } from '@services';

import { IPeople } from '@types';
import { RootState } from '@store/index';

const GenderByIndex: Array<'All' | 'Male' | 'Female' | 'Other'> = [
  'All',
  'Male',
  'Female',
  'Other'
];

type FavoriteProps = BottomTabScreenProps<
  BottomStackParamList & RootStackParamList,
  'Favorite'
>;

const Favorite: FC<FavoriteProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
  const tabs = useSelector(selectLengthByGender);
  const { people } = useSelector((store: RootState) => store.people);
  const characters = useSelector((store) =>
    selectCharactersByGender(store, GenderByIndex[currentTabIndex])
  );

  const unfavorite = useCallback((character: IPeople) => {
    dispatch(toggleFavoriteCharacter(character));
  }, []);

  const renderCharacter = ({ item }: { item: IPeople }) => {
    return (
      <TouchableOpacity
        style={{ marginBottom: 20 }}
        onPress={() =>
          navigation.navigate('CharacterItem', { character: item })
        }
      >
        <CharacterItem
          character={item}
          isFavorite
          onPressFavorite={() => unfavorite(item)}
        />
      </TouchableOpacity>
    );
  };

  const removeAllFavorites = () => {
    FavoriteService.removeAll();
    dispatch(setFavorites([]));
  };

  const renderEmptyList = () => {
    return (
      <AppText style={styles.emptyText}>You have no characters yet</AppText>
    );
  };

  return (
    <View style={{ ...styles.wrapper, paddingTop: insets.top }}>
      <Header title="Favorites" showBackBtn={false} />

      <View style={{ paddingHorizontal: 16 }}>
        <Tabs
          tabs={tabs}
          currentTab={currentTabIndex}
          onChangeTabIndex={setCurrentTabIndex}
        />
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          data={characters}
          keyExtractor={(item) => item.url}
          renderItem={renderCharacter}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 20 }}
          ListEmptyComponent={renderEmptyList}
        />

        {people.length > 0 && (
          <TouchableOpacity
            style={styles.resetAllFavorites}
            onPress={removeAllFavorites}
          >
            <AppText style={styles.resetAllFavoritesText}>Clear</AppText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Favorite;
