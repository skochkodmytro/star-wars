import { StyleSheet } from 'react-native';

import { COLORS, DIMENSIONS } from '@constants';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.bg
  },
  container: {
    flexGrow: 1
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  headerItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerItemLabel: {
    fontSize: 15,
    lineHeight: 20,
    color: COLORS.black
  },
  headerItemValue: {
    fontSize: 13,
    lineHeight: 16,
    color: COLORS.textMain
  },
  infoWrapper: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20
  },
  infoItem: {
    flexBasis: '50%',
    flexDirection: 'row',
    paddingVertical: 10
  },
  infoItemWrapper: {
    flex: 1
  },
  section: {
    paddingVertical: 15,
    borderTopWidth: 5,
    borderColor: COLORS.lightGray
  },
  sectionTitle: {
    paddingHorizontal: 16,
    fontSize: 17,
    lineHeight: 24,
    color: COLORS.black,
    fontWeight: '600',
    marginBottom: 10,
    textTransform: 'uppercase'
  },
  filmsWrapper: {
    flexDirection: 'row',
    gap: 20
  },
  listItem: {
    width: DIMENSIONS.width * 0.7
  },
  filmTitle: {
    fontSize: 19,
    lineHeight: 26,
    fontWeight: '700'
  },
  filmFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  filmDirectorText: {
    fontSize: 13,
    lineHeight: 16,
    color: COLORS.textMain
  },
  filmDate: {
    fontSize: 11,
    lineHeight: 17,
    color: COLORS.darkGray
  }
});

export default styles;
