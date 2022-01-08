import * as esbuild from 'esbuild';
import axios from 'axios';
import fs from 'fs/promises';
const builtins = require('module').builtinModules as string[];

type PluginFactoryType = () => esbuild.Plugin;

const loaderPlugin: PluginFactoryType = () => {
	return {
		name: 'custom-loader-plugin',
		setup(build: esbuild.PluginBuild) {
			build.onLoad(
				{ filter: /^https?:\/\//, namespace: 'unpkg' },
				async (args) => {
					console.log('args:load: ', args);
					const { data } = await axios.get<string>(args.path);
					const chunk: esbuild.OnLoadResult = {
						loader: 'jsx',
						contents: data,
					};
					return chunk;
				}
			);

			build.onLoad({ filter: /.*/, namespace: 'node-file' }, async (args) => {
				return {
					contents: `
        import ${args.path} from ${JSON.stringify(args.path)}
        try { module.exports = require(${args.path}) }
        catch {}
      `,
				};
			});

			build.onLoad({ filter: /.*/, namespace: 'file' }, async (args) => {
				console.log('args===onload: ', args);
				const contents = await fs.readFile(args.path, { encoding: 'utf-8' });
				const chunk: esbuild.OnLoadResult = {
					loader: 'jsx',
					contents,
				};
				return chunk;
			});
		},
	};
};

export default loaderPlugin;
