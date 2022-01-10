"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const CACHE_DIR = 'cache';
exports.default = new (class Cache {
    constructor() {
        this.writeFileVersion = (versionName) => __awaiter(this, void 0, void 0, function* () {
            const filename = this.mapVersionNameTofilename(versionName);
            try {
                let versionCache = JSON.parse(yield promises_1.default.readFile(path_1.default.join(CACHE_DIR, 'version_cache.json'), {
                    encoding: 'utf-8',
                }));
                versionCache = Object.assign(Object.assign({}, versionCache), { [filename]: versionName });
                yield promises_1.default.writeFile(path_1.default.join(CACHE_DIR, 'version_cache.json'), JSON.stringify(versionCache), { encoding: 'utf-8' });
            }
            catch (error) {
                console.error(error.message);
            }
        });
        this.writeFile = (file_content, path_) => __awaiter(this, void 0, void 0, function* () {
            try {
                const version_name = this.mapPathToVersionName(path_);
                yield promises_1.default.writeFile(path_1.default.join(CACHE_DIR, version_name), file_content, {
                    encoding: 'utf-8',
                });
                yield this.writeFileVersion(version_name);
            }
            catch (error) {
                console.error(error.message);
            }
        });
        this.readFileVersion = (filename) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield promises_1.default.mkdir(CACHE_DIR);
                yield promises_1.default.writeFile(path_1.default.join(CACHE_DIR, 'version_cache.json'), '{}');
                const version_cache_ = JSON.parse(yield promises_1.default.readFile(path_1.default.join(CACHE_DIR, 'version_cache.json'), {
                    encoding: 'utf-8',
                }));
                return version_cache_[filename];
            }
            catch (error) {
                if (error.code === 'EEXIST') {
                    return;
                }
                console.error(error.message);
            }
        });
        this.retrieveFile = (filename) => __awaiter(this, void 0, void 0, function* () {
            const version_name = yield this.readFileVersion(filename);
            if (!version_name) {
                return;
            }
            let data;
            try {
                data = yield promises_1.default.readFile(path_1.default.join(CACHE_DIR, version_name), {
                    encoding: 'utf-8',
                });
            }
            catch (error) {
                console.error(error.message);
            }
            return data;
        });
        this.mapPathToVersionName = (path) => {
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
        this.mapVersionNameTofilename = (versionName) => {
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
    }
})();
