module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        whitelist: ['API_BASE', 'MARVEL_PUBLIC_KEY', 'MARVEL_PRIVATE_KEY'],
      },
    ],
  ],
};
