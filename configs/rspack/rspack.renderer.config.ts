import path from 'node:path';
import { defineConfig } from '@rspack/cli';
import { type Entry, type EntryStatic, rspack } from '@rspack/core';
import { ReactRefreshRspackPlugin } from '@rspack/plugin-react-refresh';
import * as glob from 'glob';
import { merge } from 'webpack-merge';
import { DEV_PORT } from './constant/index.ts';
import getCommonConfig from './rspack.common.config.ts';
import { getEnvPaths } from './utils/path.ts';

const isDev = process.env.NODE_ENV === 'development';

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ['Chrome >= 130'];

/**
 * Generates entry points for the renderer process based on the provided entry file names.
 * It searches for all .jsx and .tsx files in the specified directories and maps them to their respective page names.
 * @param fileNames - An array of entry file names to search for, default is ["index"].
 * @returns An object mapping page names to their entry file paths.
 */
function generateRendererEntries(fileNames = ['index']) {
  const entryMap: Record<string, EntryStatic> = {};
  const files = fileNames.flatMap((fileName) => {
    return glob.sync(`./src/renderer/pages/**/${fileName}.{jsx,tsx}`, {
      absolute: true,
      nodir: true,
    });
  });

  files.forEach((file) => {
    const pageName = path.basename(path.dirname(file));
    entryMap[pageName] = file;
  });
  return entryMap;
}

export default defineConfig(
  merge(
    getCommonConfig({
      currentPath: getEnvPaths(import.meta.url).__filename,
    }),
    {
      target: 'electron-renderer',
      entry: generateRendererEntries() as Entry,
      output: {
        path: path.resolve('dist/renderer'),
      },
      resolve: {},
      module: {
        rules: [
          {
            test: /\.(m?jsx?|tsx?)$/,
            use: [
              {
                loader: 'builtin:swc-loader',
                options: {
                  jsc: {
                    parser: {
                      syntax: 'typescript',
                      tsx: true,
                    },
                    transform: {
                      react: {
                        runtime: 'automatic',
                        development: isDev,
                        refresh: isDev,
                      },
                    },
                  },
                  env: { targets },
                },
              },
            ],
          },
          {
            test: /\.(png|jpg|svg)$/,
            type: 'asset',
          },
        ],
      },
      plugins: [
        isDev && new ReactRefreshRspackPlugin(),
        ...Object.keys(generateRendererEntries()).map((pageName) => {
          return new rspack.HtmlRspackPlugin({
            filename: `${pageName}.html`,
            template: path.resolve('index.html'),
            chunks: [pageName],
          });
        }),
      ],
      optimization: {
        minimizer: [
          new rspack.SwcJsMinimizerRspackPlugin(),
          new rspack.LightningCssMinimizerRspackPlugin({
            minimizerOptions: { targets },
          }),
        ],
      },
      devServer: {
        host: 'localhost',
        hot: true,
        port: DEV_PORT,
        static: path.resolve('dist/renderer'),
        allowedHosts: 'all',
        client: {
          overlay: false,
        },
      },
      cache: true,
      experiments: {
        css: true,
      },
    },
  ),
);
