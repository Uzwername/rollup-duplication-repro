import path from 'path';
import pathsTransformer from 'ts-transform-paths';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const plugins = [
  peerDepsExternal(),
  alias({
    entries: [
      { find: '@', replacement: path.join(__dirname, '/src') },
      { find: '$root', replacement: __dirname },
    ],
  }),
  nodeResolve(),
  typescript({
    transformers: [() => pathsTransformer()],
  }),
  commonjs({
    extensions: ['.js', '.ts'],
  }),
];

export default [
  {
    input: './src/a.ts',
    output: {
      file: 'dist/a.js',
      format: 'esm',
      sourcemap: true,
    },
    plugins,
  },
  {
    input: './src/b.ts',
    output: {
      file: 'dist/b.js',
      format: 'esm',
      sourcemap: true,
    },
    plugins,
  },
];
