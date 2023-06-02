module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@constants': './src/constants',
          '@navigations': './src/navigations',
          '@assets': './src/assets',
          '@screens': './src/screens',
          '@store': './src/store',
          '@services': './src/services',
          '@types': './src/types'
        }
      }
    ],
    'react-native-reanimated/plugin'
  ]
};
