import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel'

const production = !process.env.ROLLUP_WATCH;

const babelSettings = {
    babelHelpers: 'runtime',
    extensions: [ '.js', '.mjs', '.html' ],
    plugins: ['@babel/plugin-external-helpers', '@babel/plugin-transform-runtime', '@babel/plugin-proposal-object-rest-spread']
}

export default {
	input: 'src/deepnav.js',
	output: {
		sourcemap: true,
		format: 'umd',
		name: 'deepnav',
		file: 'dist/deepnav.js'
	},
	plugins: [
		babel(babelSettings),

		resolve({ browser: true }),
		commonjs(),

		production && terser()
	]
};
