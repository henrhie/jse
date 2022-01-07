import { Command } from 'commander';
import * as esbuild from 'esbuild';
import loaderPlugin from '../../loaderPlugin';
import resolverPlugin from '../../resolverPlugin';

export const runCommand = new Command('run')
	.command('run')
	.description('execute your experimental javascript program')
	.option(
		'-i, --input <string>',
		'entry file for you experimental javascript program',
		'test.js'
	)
	.option(
		'-o, --output <string>',
		'output file for your experimental javascript program',
		'output.js'
	)
	.action(({ input, output }: { input: string; output: string }) => {
		console.log('dir: ', process.cwd());
		esbuild
			.build({
				entryPoints: [input],
				outfile: output,
				bundle: true,
				platform: 'node',
				// outdir: '../' + process.cwd(),
				plugins: [resolverPlugin(), loaderPlugin()],
				external: ['fs'],
			})
			.then((buildResult: esbuild.BuildResult) => {
				console.log('✅✅✅ bundle successful');
			})
			.catch((err: any) => {
				console.log('❌❌❌ error occured: ', err.message);
				process.exit(1);
			});
	});
