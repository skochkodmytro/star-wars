import React, { FC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles';

import { COLORS } from '@constants';

import { Paginated, Header, CharacterItem } from '@components';

import { useListPeopleQuery } from '@store/api/apiPeople';
import { toggleFavoriteCharacter } from '@store/slices/people';

import { RootState } from '@store/index';
import { IPeople } from '@types';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList, BottomStackParamList } from '@navigations';

type HomeProps = BottomTabScreenProps<
  BottomStackParamList & RootStackParamList,
  'Home'
>;

const Home: FC<HomeProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const { people: favorites } = useSelector((store: RootState) => store.people);

  const [fetchUrl, setFetchUrl] = useState<string>(
    'https://swapi.dev/api/people'
  );
  const { data, isLoading, isFetching } = useListPeopleQuery(fetchUrl);

  const toggleFavorite = (character: IPeople) => {
    dispatch(toggleFavoriteCharacter(character));
  };

  const renderContent = () => {
    if (!data) return null;

    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ ...styles.container }}>
          <View style={styles.charactersWrapper}>
            {data.results.map((character) => {
              const isFavorite = favorites.some((f) => f.url === character.url);

              return (
                <TouchableOpacity
                  key={character.url}
                  style={styles.characterItem}
                  onPress={() =>
                    navigation.navigate('CharacterItem', { character })
                  }
                >
                  <CharacterItem
                    character={character}
                    isFavorite={isFavorite}
                    onPressFavorite={() => toggleFavorite(character)}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        <View style={{ paddingVertical: 15, paddingHorizontal: 16 }}>
          <Paginated
            count={data.count}
            next={data.next}
            prev={data.previous}
            onNext={(url) => setFetchUrl(url)}
            onPrev={(url) => setFetchUrl(url)}
          />
        </View>

        {isFetching && (
          <View style={styles.loadingWrapper}>
            <ActivityIndicator color={COLORS.black} />
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={{ ...styles.wrapper, paddingTop: insets.top }}>
      <Header title="Characters" showBackBtn={false} />

      {isLoading ? (
        <View style={{ paddingVertical: 100, alignItems: 'center' }}>
          <ActivityIndicator color="black" />
        </View>
      ) : (
        renderContent()
      )}
    </View>
  );
};

export default Home;
