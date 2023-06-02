import { StyleSheet } from 'react-native';

import { COLORS } from '@constants';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.bg
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 16
  },
  loadingWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  charactersWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'space-between'
  },
  characterItem: {
    flexBasis: '100%'
  }
});

export default styles;
