import { Command } from 'commander';
import fs from 'fs/promises';
import path from 'path';

export const clearCacheCommand = new Command('run')
	.command('clear-cache')
	.description('clear cache of unpkg packages')
	.action(async () => {
		try {
			await fs.rm(path.join(process.cwd(), 'cache'), { recursive: true });
			console.log('✔✔✔ cache cleared');
		} catch (error: any) {
			if (error.code && error.code === 'ENOENT') {
				console.log('cache already cleared');
				return;
			}
		}
	});
