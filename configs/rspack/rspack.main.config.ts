import path from 'node:path';
import { defineConfig } from '@rspack/cli';
import { merge } from 'webpack-merge';
import getCommonConfig from './rspack.common.config.ts';
import { getEnvPaths } from './utils/path.ts';

export default defineConfig(
  merge(
    getCommonConfig({
      currentPath: getEnvPaths(import.meta.url).__filename,
    }),
    {
      target: 'electron-main',
      entry: {
        index: './src/main/index.ts',
      },
      resolve: {},
      output: {
        path: path.resolve('dist/main'),
      },
      module: {
        rules: [
          {
            test: /\.(m?js|ts)$/,
            use: [
              {
                loader: 'builtin:swc-loader',
                options: {},
              },
            ],
          },
        ],
      },
      optimization: {},
      experiments: {},
    },
  ),
);
