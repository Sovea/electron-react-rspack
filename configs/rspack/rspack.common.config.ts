import path from 'node:path';
import { defineConfig } from '@rspack/cli';
import rspack from '@rspack/core';

type ConfigOptions = {
  /** current config path */
  currentPath: string;
};

const isDev = process.env.NODE_ENV === 'development';

export default (options: ConfigOptions) => {
  const { currentPath } = options;
  return defineConfig({
    target: 'node',
    node: {
      __dirname: false,
    },
    resolve: {
      fullySpecified: false,
      extensions: ['.js', '.mjs', '.ts', '.tsx', '.jsx'],
      alias: {
        '@': path.resolve('src'),
        assets: path.resolve('assets'),
        configs: path.resolve('configs'),
      },
    },
    cache: true,
    experiments: {
      cache: {
        type: 'persistent',
        buildDependencies: [currentPath, path.resolve('tsconfig.json')],
      },
    },
    plugins: [
      new rspack.DefinePlugin({
        isDev: JSON.stringify(isDev),
      }),
    ],
    devtool: isDev ? 'cheap-source-map' : false,
  });
};
