import fs from 'fs/promises';
import path from 'path';

const CACHE_DIR = 'cache';

export default new (class Cache {
	writeFileVersion = async (versionName: string) => {
		const filename = this.mapVersionNameTofilename(versionName);
		try {
			let versionCache = JSON.parse(
				await fs.readFile(path.join(CACHE_DIR, 'version_cache.json'), {
					encoding: 'utf-8',
				})
			);

			versionCache = { ...versionCache, [filename]: versionName };

			await fs.writeFile(
				path.join(CACHE_DIR, 'version_cache.json'),
				JSON.stringify(versionCache),
				{ encoding: 'utf-8' }
			);
		} catch (error: any) {
			console.error(error.message);
		}
	};

	writeFile = async (file_content: string, path_: string) => {
		try {
			const version_name = this.mapPathToVersionName(path_);
			await fs.writeFile(path.join(CACHE_DIR, version_name), file_content, {
				encoding: 'utf-8',
			});

			await this.writeFileVersion(version_name);
		} catch (error: any) {
			console.error(error.message);
		}
	};

	readFileVersion = async (filename: string) => {
		try {
			await fs.mkdir(CACHE_DIR);
			await fs.writeFile(path.join(CACHE_DIR, 'version_cache.json'), '{}');
			const version_cache_ = JSON.parse(
				await fs.readFile(path.join(CACHE_DIR, 'version_cache.json'), {
					encoding: 'utf-8',
				})
			);
			return version_cache_[filename] as string;
		} catch (error: any) {
			if (error.code === 'EEXIST') {
				return;
			}
			console.error(error.message);
		}
	};

	retrieveFile = async (filename: string) => {
		const version_name = await this.readFileVersion(filename);
		if (!version_name) {
			return;
		}

		let data;
		try {
			data = await fs.readFile(path.join(CACHE_DIR, version_name), {
				encoding: 'utf-8',
			});
		} catch (error: any) {
			console.error(error.message);
		}
		return data;
	};

	mapPathToVersionName = (path: string): string => {
		const _data_ = [];
		const split_data = path.split('');
		for (let i = 0; i < split_data.length; i++) {
			if (i === 0) {
				continue;
			}
			if (split_data[i] === '/') {
				break;
			}
			_data_.push(split_data[i]);
		}
		return _data_.join('');
	};

	mapVersionNameTofilename = (versionName: string): string => {
		const _data_ = [];
		const split_data = versionName.split('');
		for (let i = 0; i < split_data.length; i++) {
			if (split_data[i] === '@') {
				break;
			}
			_data_.push(split_data[i]);
		}
		return _data_.join('');
	};
})();
