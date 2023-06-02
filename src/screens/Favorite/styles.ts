import { StyleSheet } from 'react-native';

import { COLORS } from '@constants';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.bg
  },
  emptyText: {
    textAlign: 'center',
    paddingVertical: 20,
    color: COLORS.darkGray,
    fontSize: 15,
    lineHeight: 20
  },
  resetAllFavorites: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 56,
    height: 56,
    borderRadius: 56,
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center'
  },
  resetAllFavoritesText: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
    color: COLORS.bg,
    textAlign: 'center'
  }
});

export default styles;
