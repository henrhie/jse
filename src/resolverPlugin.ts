import * as esbuild from 'esbuild';
import path from 'path';
const builtins = require('module').builtinModules as string[];

type PluginFactoryType = () => esbuild.Plugin;

const node_native_modules = ['fs', 'path', 'event'];

const resolverPlugin: PluginFactoryType = () => {
	return {
		name: 'custom-resolver-plugin',
		setup(build: esbuild.PluginBuild) {
			build.onResolve({ filter: /.*/ }, (args: esbuild.OnResolveArgs) => {
				console.log('args:onresolve: ', args);
				if (
					args.path.startsWith('./') ||
					args.path.startsWith('../') ||
					args.kind === 'entry-point'
				) {
					if (
						args.importer.startsWith('https://') ||
						args.importer.startsWith('http://')
					) {
						return {
							namespace: 'unpkg',
							path: new URL(args.path, args.importer + '/').toString(),
						};
					}

					return {
						path: path.join(process.cwd(), path.dirname(args.path)),
						namespace: 'file',
					};
				}
				// if (builtins.includes(args.path)) {
				// 	console.log('===============>called=========>', args);
				// 	return {
				// 		path: require.resolve(args.path, { paths: [args.resolveDir] }),
				// 		namespace: 'node-file',
				// 	};
				// }
				return {
					namespace: 'unpkg',
					path: `https://unpkg.com/${args.path}`,
				};
			});

			build.onResolve({ filter: /.*/, namespace: 'node-file' }, (args) => {
				return {
					path: args.path,
					namespace: 'file',
				};
			});
		},
	};
};

export default resolverPlugin;
