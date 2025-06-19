/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const customConfig = {
    transformer: {
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
        assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
        sourceExts: [...defaultConfig.resolver.sourceExts, 'svg', 'ts', 'tsx', 'js', 'jsx', 'json'],
        extraNodeModules: {
            providers: path.resolve(__dirname, 'src/providers'),
            hems: path.resolve(__dirname, 'src/hems'),
            utils: path.resolve(__dirname, 'src/utils'),
            hooks: path.resolve(__dirname, 'src/hooks'),
        },
    },
    watchFolders: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'app'),
    ],
};

module.exports = mergeConfig(defaultConfig, customConfig);
