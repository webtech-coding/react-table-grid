import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import dts from 'rollup-plugin-dts';

import path from 'path';
import packageJson from "./package.json" assert { type: "json" };

export default [
  // JS/ESM bundle build
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,     // dist/index.js
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,   // dist/index.esm.js
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({ extensions: ['.js', '.jsx', '.ts', '.tsx','.json'] }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist/types',
        rootDir: 'src',
      }),
    ],
    external: ['react', 'react-dom'],
  },

  // Type declarations build
  {
    input: 'dist/types/index.d.ts',
    output: [{ file: 'dist/types/index.d.ts', format: 'es' }],
    plugins: [dts.default],
  },
];