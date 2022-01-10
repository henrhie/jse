import { Command } from 'commander';
import fs from 'fs/promises';
import path from 'path';

export const clearCacheCommand = new Command('run')
	.command('clear-cache')
	.description('clear cache of unpkg packages')
	.action(async () => {
		try {
			await fs.rmdir(path.join(process.cwd(), 'cache'), { recursive: true });
			console.log('✔✔✔ cache cleared');
		} catch (error: any) {
			console.error(error.message);
		}
	});
