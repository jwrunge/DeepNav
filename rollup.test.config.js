import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel'

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'testSrc/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'test/bundle.js'
	},
	plugins: [
		babel({
            extensions: [ '.js', '.mjs', '.html', '.svelte' ],
            exclude: 'node_modules/**'
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration —
		// consult the documentation for details:
		// https://github.com/rollup/rollup-plugin-commonjs
		resolve({ browser: true }),
		commonjs(),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	]
};
