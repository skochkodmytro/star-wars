import React, { FC } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles';

import { RootStackParamList } from '@navigations';
import { COLORS } from '@constants';

import { AppText, Header } from '@components';
import ListItem from './ListItem';

import {
  useGetListOfFilmsQuery,
  useGetListOfStarshipsQuery,
  useGetListOfVehiclesQuery
} from '@store/api/apiPeople';

type Props = NativeStackScreenProps<RootStackParamList, 'CharacterItem'>;

const CharacterItem: FC<Props> = ({ route }) => {
  const { character } = route.params;
  const insets = useSafeAreaInsets();
  const { data, isLoading: isFilmsLoading } = useGetListOfFilmsQuery(
    character.films
  );
  const { data: vehicles, isLoading: isVehiclesLoading } =
    useGetListOfVehiclesQuery(character.vehicles);
  const { data: starships, isLoading: isStarshipsLoading } =
    useGetListOfStarshipsQuery(character.starships);

  const renderHeaderIetm = (label: string, value: string) => {
    return (
      <View style={styles.headerItem}>
        <AppText style={styles.headerItemLabel}>{label}</AppText>
        <AppText style={styles.headerItemValue}>{value}</AppText>
      </View>
    );
  };

  const renderInfoItem = (label: string, value: string) => {
    return (
      <View style={styles.infoItem}>
        <View style={styles.infoItemWrapper}>
          <AppText
            style={{
              ...styles.headerItemLabel,
              fontSize: 18
            }}
          >
            {label}
          </AppText>
        </View>
        <View style={styles.infoItemWrapper}>
          <AppText
            style={{
              ...styles.headerItemLabel,
              fontSize: 18,
              color: COLORS.darkGray
            }}
          >
            {value}
          </AppText>
        </View>
      </View>
    );
  };

  const renderFilms = () => {
    return (
      <View style={styles.filmsWrapper}>
        {data?.map((film, index) => (
          <View key={index} style={styles.listItem}>
            <ListItem
              name={film.title}
              description={film.director}
              createAt={`Release: ${film.release_date}`}
            />
          </View>
        ))}
      </View>
    );
  };

  const renderVehicles = () => {
    return (
      <View style={styles.filmsWrapper}>
        {vehicles?.map((vehicle, index) => (
          <View key={index} style={styles.listItem}>
            <ListItem
              name={vehicle.name}
              description={vehicle.model}
              createAt={`Length: ${vehicle.length}`}
            />
          </View>
        ))}
      </View>
    );
  };

  const renderStarships = () => {
    return (
      <View style={styles.filmsWrapper}>
        {starships?.map((starship, index) => (
          <View key={index} style={styles.listItem}>
            <ListItem
              name={starship.name}
              description={starship.model}
              createAt={`Length: ${starship.length}`}
            />
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={{ ...styles.wrapper, paddingTop: insets.top }}>
      <Header title={character.name} />

      <ScrollView
        contentContainerStyle={{
          ...styles.container,
          paddingBottom: insets.bottom
        }}
      >
        <View style={styles.header}>
          {renderHeaderIetm('Mass: ', character.mass)}
          {renderHeaderIetm('Height: ', character.height)}
          {renderHeaderIetm('Birth: ', character.birth_year)}
        </View>

        <View style={styles.infoWrapper}>
          {renderInfoItem('Gender', character.gender)}
          {renderInfoItem('Hair color', character.hair_color)}
          {renderInfoItem('Skin color', character.skin_color)}
          {renderInfoItem('Eye color', character.eye_color)}
        </View>

        {isFilmsLoading || isVehiclesLoading || isStarshipsLoading ? (
          <View style={{ paddingVertical: 20, alignItems: 'center' }}>
            <ActivityIndicator color={COLORS.black} />
          </View>
        ) : (
          <View>
            {data && data.length && (
              <View style={styles.section}>
                <AppText style={styles.sectionTitle}>Films</AppText>

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 16 }}
                >
                  {renderFilms()}
                </ScrollView>
              </View>
            )}

            {vehicles && vehicles?.length > 0 && (
              <View style={styles.section}>
                <AppText style={styles.sectionTitle}>Vehicles</AppText>

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 16 }}
                >
                  {renderVehicles()}
                </ScrollView>
              </View>
            )}

            {starships && starships.length > 0 && (
              <View style={styles.section}>
                <AppText style={styles.sectionTitle}>Starships</AppText>

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 16 }}
                >
                  {renderStarships()}
                </ScrollView>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default CharacterItem;
