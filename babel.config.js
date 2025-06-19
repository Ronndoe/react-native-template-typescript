module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./app'],
        alias: {
          providers: './src/providers',
          hems: './src/hems',
          utils: './src/utils',
          hooks: './src/hooks',
          memory: './src/memory',
          screens: './src/screens',
          components: './src/components'
        },
      },
    ],
  ],
};
