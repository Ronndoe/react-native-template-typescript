// jest.config.js
const fs = require('fs');
const { pathsToModuleNameMapper } = require('ts-jest');

const tsconfig = JSON.parse(
  fs.readFileSync('./tsconfig.json', 'utf8') // NOT './app/tsconfig.json'
);

module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|ts|tsx)$': 'babel-jest',
  },
  setupFiles: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(tsconfig.compilerOptions.paths || {}, {
      prefix: '<rootDir>/',
    }),
    'react-native-sqlite-storage': '<rootDir>/__mocks__/react-native-sqlite-storage.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|@react-native-voice' +
      '|react-native-tts' +
      '|react-native-svg' +
      ')/)',
  ],
};
