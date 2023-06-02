import React, { FC, useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  LayoutRectangle,
  LayoutChangeEvent
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated';

import { COLORS } from '@constants';

import { AppText } from '@components';

type Props = {
  tabs: Array<{ label: string; count: number }>;
  currentTab: number;
  onChangeTabIndex: (index: number) => void;
};

const Tabs: FC<Props> = ({ tabs, currentTab, onChangeTabIndex }) => {
  const [layouts, setLayouts] = useState<Array<LayoutRectangle>>([]);
  const underlinePosition = useSharedValue({ width: 0, translate: 0 });

  useEffect(() => {
    const existLayout = layouts[currentTab];

    if (existLayout) {
      underlinePosition.value = {
        width: existLayout.width,
        translate: existLayout.x
      };
    }
  }, [currentTab, layouts]);

  const handleLayout = (event: LayoutChangeEvent, index: number) => {
    const updatedLayouts = [...layouts];
    updatedLayouts[index] = event.nativeEvent.layout;

    setLayouts(updatedLayouts);
  };

  const underlineStyles = useAnimatedStyle(() => {
    return {
      width: withTiming(underlinePosition.value.width, { duration: 100 }),
      transform: [
        {
          translateX: withTiming(underlinePosition.value.translate, {
            duration: 100
          })
        }
      ]
    };
  });

  const renderTabs = () => {
    return tabs.map((tab, index) => {
      return (
        <TouchableOpacity
          key={index}
          hitSlop={10}
          activeOpacity={1}
          onPress={() => onChangeTabIndex(index)}
          onLayout={(event) => handleLayout(event, index)}
          style={[styles.tabWrapper]}
        >
          <AppText
            style={[
              styles.headerTitle,
              index === currentTab && styles.headerTitleActive
            ]}
          >
            {tab.label}
          </AppText>

          {tab.count !== undefined && (
            <View
              style={[
                styles.countWrapper,
                index === currentTab && styles.countWrapperActive
              ]}
            >
              <AppText style={styles.countWrapperText}>{tab.count}</AppText>
            </View>
          )}
        </TouchableOpacity>
      );
    });
  };

  return (
    <ScrollView
      horizontal
      style={{ flexGrow: undefined }}
      contentContainerStyle={{ flexDirection: 'column' }}
    >
      <View style={styles.tabsWrapper}>{renderTabs()}</View>

      <Animated.View style={[styles.underline, underlineStyles]} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tabsWrapper: {
    flexDirection: 'row',
    gap: 20
  },
  tabWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 5
  },
  headerTitle: {
    fontSize: 15,
    lineHeight: 20,
    color: COLORS.darkGray,
    fontWeight: '600'
  },
  headerTitleActive: {
    color: COLORS.textMain
  },
  countWrapper: {
    height: 20,
    minWidth: 20,
    borderRadius: 20,
    paddingHorizontal: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.darkGray,
    marginLeft: 5
  },
  countWrapperActive: {
    backgroundColor: COLORS.textMain
  },
  countWrapperText: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '600',
    color: COLORS.bg
  },
  underline: {
    height: 2,
    backgroundColor: COLORS.black,
    borderRadius: 3
  }
});

export default Tabs;
