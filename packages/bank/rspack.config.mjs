import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as Repack from '@callstack/repack';
import { getSharedDependencies } from 'new-demo-app-sdk';
import rspack from '@rspack/core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STANDALONE = Boolean(process.env.STANDALONE);

/**
 * Rspack configuration enhanced with Re.Pack defaults for React Native.
 *
 * Learn about Rspack configuration: https://rspack.dev/config/
 * Learn about Re.Pack configuration: https://re-pack.dev/docs/guides/configuration
 */

const customShared = {
  ...getSharedDependencies({ eager: false }),
  '@react-navigation/native': {
    singleton: true,
    eager: true,
    requiredVersion: '7.1.16',
  },
  '@react-navigation/stack': {
    singleton: true,
    eager: true,
    requiredVersion: '7.4.4',
  },
};

export default env => {
  const { mode, platform = process.env.PLATFORM } = env;
  const customShared = getSharedDependencies({ eager: true });
  // console.log(customShared);

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
      uniqueName: 'sas-bank',
    },
    module: {
      rules: [
        ...Repack.getJsTransformRules(),
        ...Repack.getAssetTransformRules({ inline: !STANDALONE }),
      ],
    },
    plugins: [
      new Repack.RepackPlugin(),
      new Repack.plugins.ModuleFederationPluginV2({
        name: 'bank',
        filename: 'bank.container.js.bundle',
        dts: false,
        manifest: true,
        exposes: STANDALONE
          ? undefined
          : {
              // định nghĩa các màn hình remote ở đây
              // remote navigation
              './navigation/BankNavigation': './src/navigation/BankNavigation',
              './navigation/AccountNavigation': './src/navigation/AccountNavigation',
              // home
              './screens/BankScreen': './src/screens/BankScreen',
              // account
              './screens/AccountScreen': './src/screens/account/AccountScreen',
              './screens/AccountDetailScreen': './src/screens/account/AccountDetailScreen',
              './screens/LockedAccountsScreen': './src/screens/account/LockedAccountsScreen',
              // transfer
              './screens/ChooseBankScreen':
                './src/screens/transfer/ChooseBankScreen',
              './screens/FindDestinationAccountScreen':
                './src/screens/transfer/FindDestinationAccountScreen',
              './screens/ConfirmCodeScreen':
                './src/screens/transfer/ConfirmCodeScreen',
              './screens/TransactionStatusScreen':
                './src/screens/transfer/ChooseBankScreen',
              // slice and saga
              './store/slices': './src/store/slices/index.ts',
              './store/accountSlice': './src/store/slices/accountSlice',
              './store/transferSlice': './src/store/slices/transferSlice',
              './store/transactionSlice': './src/store/slices/transactionSlice',
              './sagas': './src/sagas/index.ts',
            },
        remotes: {
          host: `host@http://localhost:8081/${platform}/mf-manifest.json`,
        },
        shared: {
          ...getSharedDependencies({ eager: true }),
          '@react-navigation/native': {
            singleton: true,
            eager: true,
            requiredVersion: '7.1.16',
            version: '7.1.16', // <- thêm dòng này
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
      }),
      new Repack.plugins.CodeSigningPlugin({
        enabled: mode === 'production',
        privateKeyPath: path.join('..', '..', 'code-signing.pem'),
      }),
      new rspack.IgnorePlugin({
        resourceRegExp: /^@react-native-masked-view/,
      }),
    ],
  };
};
