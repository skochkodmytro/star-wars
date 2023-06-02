import React, { FC } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { COLORS } from '@constants';
import { ICONS } from '@assets';

import { AppText } from '@components';

import { IPeople } from '@types';

type Props = {
  character: IPeople;
  isFavorite: boolean;
  onPressFavorite: () => void;
};

const CharacterItem: FC<Props> = ({
  character,
  isFavorite,
  onPressFavorite
}) => {
  const renderListItem = (title: string, value: string) => {
    return (
      <View style={styles.listItem}>
        <AppText style={styles.listItemTitle}>{title}</AppText>
        <AppText style={styles.listItemValue}>{value}</AppText>
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <AppText style={styles.headerName} numberOfLines={1}>
          {character.name}
        </AppText>
        <TouchableOpacity
          style={styles.headerIcon}
          hitSlop={20}
          onPress={onPressFavorite}
        >
          <SvgXml
            xml={ICONS.star(isFavorite ? COLORS.gold : COLORS.darkGray)}
            width={20}
            height={20}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.heightMassWrapper}>
        <View style={styles.heightMassItem}>
          <AppText style={styles.heightMassItemText}>
            Birth: {character.birth_year}
          </AppText>
        </View>
        <View style={styles.heightMassItem}>
          <AppText style={styles.heightMassItemText}>
            Mass: {character.mass}
          </AppText>
        </View>
        <View style={styles.heightMassItem}>
          <AppText style={styles.heightMassItemText}>
            Height: {character.height}
          </AppText>
        </View>
      </View>

      <View style={{ paddingHorizontal: 10 }}>
        {renderListItem('Gender', character.gender)}
        {renderListItem('Hair Color', character.hair_color)}
        {renderListItem('Skin Color', character.skin_color)}
        {renderListItem('Eye Color', character.eye_color)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.darkGray,
    overflow: 'hidden'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: COLORS.darkGray
  },
  headerName: {
    fontSize: 19,
    lineHeight: 26,
    fontWeight: '600',
    color: COLORS.black,
    flex: 1
  },
  headerIcon: {
    height: 24,
    width: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },

  heightMassWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  heightMassItem: {
    flex: 1,
    paddingVertical: 5,
    alignItems: 'center'
  },
  heightMassItemText: {
    fontSize: 13,
    lineHeight: 16,
    color: COLORS.darkGray
  },
  listItem: {
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center'
  },
  listItemTitle: {
    flex: 1,
    fontSize: 15,
    lineHeight: 20,
    color: COLORS.black
  },
  listItemValue: {
    flex: 1,
    fontSize: 15,
    lineHeight: 20,
    color: COLORS.black
  }
});

export default CharacterItem;
