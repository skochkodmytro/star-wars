import React, { FC } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

import { ICONS } from '@assets';
import { COLORS } from '@constants';

import { AppText } from '@components';

type ComponentProps = {
  title: string;
  showBackBtn?: boolean;
  icon?: string;
  onPressBack?: () => void;
};

const Header: FC<ComponentProps> = ({
  title,
  showBackBtn = true,
  icon,
  onPressBack
}) => {
  const navigation = useNavigation();

  const handlePressBack = () => {
    if (onPressBack) {
      onPressBack();
      return;
    }

    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      {showBackBtn && (
        <View style={styles.headerIconWrapper}>
          <TouchableOpacity
            style={styles.headerIcon}
            activeOpacity={0.7}
            onPress={handlePressBack}
            hitSlop={20}
          >
            <SvgXml xml={icon || ICONS.leftArrow()} />
          </TouchableOpacity>
        </View>
      )}

      <AppText style={styles.headerTitle}>{title}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerIconWrapper: {
    position: 'absolute',
    left: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center'
  },
  headerIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 17,
    lineHeight: 24,
    color: COLORS.black,
    fontWeight: '600'
  }
});

export default Header;
