module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'], // atau '.' jika tidak pakai folder src
        alias: {
          '@': './src',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    ],
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
    }],
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  }
};
