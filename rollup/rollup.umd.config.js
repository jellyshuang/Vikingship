import { terser } from 'rollup-plugin-terser'
import replace from '@rollup/plugin-replace'
import basicConfig from './rollup.config'


const config = {
  ...basicConfig,
  output: {
    name: 'Vikingship',
    file: 'dist/index.umd.js',
    format: 'umd',
    exports: 'named',
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'axios': 'Axios'
    },
    plugins: [
      terser()
    ]
  },
  plugins: [
    ...basicConfig.plugins,
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
  ],
  external: ['react', 'react-dom', 'axios']
}

export default config;