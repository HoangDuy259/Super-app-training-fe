import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as Repack from '@callstack/repack';
import rspack from '@rspack/core';
import { getSharedDependencies } from 'new-demo-app-sdk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Rspack configuration enhanced with Re.Pack defaults for React Native.
 *
 * Learn about Rspack configuration: https://rspack.dev/config/
 * Learn about Re.Pack configuration: https://re-pack.dev/docs/guides/configuration
 */

export default env => {
  const { mode, platform = process.env.PLATFORM } = env;
  const customShared = getSharedDependencies({ eager: true });
  console.log(customShared);

  return {
    mode,
    context: __dirname,
    entry: './index.js',
    experiments: {
      incremental: mode === 'development',
    },
    resolve: {
      ...Repack.getResolveOptions(),
    },
    output: {
      uniqueName: 'host',
    },
    module: {
      rules: [
        ...Repack.getJsTransformRules(),
        ...Repack.getAssetTransformRules(),
      ],
    },
    plugins: [
      new Repack.RepackPlugin(),
      new Repack.plugins.ModuleFederationPluginV2({
        name: 'host',
        filename: 'host.container.js.bundle',
        dts: false,
        remotes: {
          bank: `bank@http://localhost:9000/${platform}/mf-manifest.json`,
        },
        exposes: {
          './store': './src/store/store',
        },
        shared: {
          ...getSharedDependencies({ eager: true }),
          '@react-navigation/native': {
            singleton: true,
            eager: true,
            requiredVersion: '7.1.16',
            version: '7.1.16',
          },
          '@react-navigation/stack': {
            singleton: true,
            eager: true,
            requiredVersion: '7.4.4',
            version: '7.4.4',
          },
          '@react-navigation/bottom-tabs': {
            singleton: true,
            eager: true,
            requiredVersion: '7.4.4',
            version: '7.4.4',
          },
        },
        virtualRuntimeEntry: true,
      }),
      new rspack.IgnorePlugin({
        resourceRegExp: /^@react-native-masked-view/,
      }),
    ],
  };
};
