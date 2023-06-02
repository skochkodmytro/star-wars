import React, { FC } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { ICONS } from '@assets';

import { AppText } from '@components';

type Props = {
  count: number;
  prev: string | null;
  next: string | null;
  onNext: (url: string) => void;
  onPrev: (url: string) => void;
};

const Paginated: FC<Props> = ({ count, prev, next, onNext, onPrev }) => {
  const getCurrentPage = (url: string, increment: -1 | 1) => {
    const startIndex = url.indexOf('=') + 1;
    const endIndex = url.length;
    const number = url.substring(startIndex, endIndex);

    return +number + increment;
  };

  const getCurrentPageText = () => {
    let currentPage: number = 0;

    if (next) {
      currentPage = getCurrentPage(next, -1);
    }

    if (prev) {
      currentPage = getCurrentPage(prev, 1);
    }

    return `${currentPage} of ${Math.ceil(count / 10)}`;
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={{ ...styles.paginationItem, opacity: !prev ? 0.5 : 1 }}
        disabled={!prev}
        onPress={() => {
          if (prev) onPrev(prev);
        }}
      >
        <SvgXml xml={ICONS.leftArrow()} />
        <AppText style={{ ...styles.itemText, marginLeft: 8 }}>
          Previous
        </AppText>
      </TouchableOpacity>

      <AppText>{getCurrentPageText()}</AppText>

      <TouchableOpacity
        style={{
          ...styles.paginationItem,
          justifyContent: 'flex-end',
          opacity: !next ? 0.5 : 1
        }}
        disabled={!next}
        onPress={() => {
          if (next) onNext(next);
        }}
      >
        <AppText style={{ ...styles.itemText, marginRight: 8 }}>Next</AppText>

        <View style={{ transform: [{ rotate: '180deg' }] }}>
          <SvgXml xml={ICONS.leftArrow()} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  paginationItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemText: {}
});

export default Paginated;
