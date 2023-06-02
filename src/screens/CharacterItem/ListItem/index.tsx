import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';

import { AppText } from '@components';
import { COLORS, DIMENSIONS } from '@constants';

type Props = {
  name: string;
  description: string;
  createAt: string;
};

const ListItem: FC<Props> = ({ name, description, createAt }) => {
  return (
    <View style={styles.item}>
      <AppText style={styles.title}>{name}</AppText>
      <View style={styles.footer}>
        <AppText style={styles.description}>{description}</AppText>
        <AppText style={styles.date}>{createAt}</AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.darkGray
  },
  title: {
    fontSize: 19,
    lineHeight: 26,
    fontWeight: '700'
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  description: {
    fontSize: 13,
    lineHeight: 16,
    color: COLORS.textMain
  },
  date: {
    fontSize: 11,
    lineHeight: 17,
    color: COLORS.darkGray
  }
});

export default ListItem;
