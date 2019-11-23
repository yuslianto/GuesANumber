module.exports = {
  project: {
    ios: {},
    android: {}
  },
  assets: [
    'react-native-vector-icons',
    './src/Template/assets/fonts/'
  ],
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        android: null, // disable Android platform, other platforms will still autolink if provided
      },
    },
};