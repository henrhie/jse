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
const axios_1 = __importDefault(require("axios"));
const promises_1 = __importDefault(require("fs/promises"));
const builtins = require('module').builtinModules;
const loaderPlugin = () => {
    return {
        name: 'custom-loader-plugin',
        setup(build) {
            build.onLoad({ filter: /^https?:\/\//, namespace: 'unpkg' }, (args) => __awaiter(this, void 0, void 0, function* () {
                console.log('args:load: ', args);
                const { data } = yield axios_1.default.get(args.path);
                const chunk = {
                    loader: 'jsx',
                    contents: data,
                };
                return chunk;
            }));
            build.onLoad({ filter: /.*/, namespace: 'node-file' }, (args) => __awaiter(this, void 0, void 0, function* () {
                return {
                    contents: `
        import path from ${JSON.stringify(args.path)}
        try { module.exports = require(path) }
        catch {}
      `,
                };
            }));
            build.onLoad({ filter: /.*/, namespace: 'file' }, (args) => __awaiter(this, void 0, void 0, function* () {
                console.log('args===onload: ', args);
                const contents = yield promises_1.default.readFile(args.path, { encoding: 'utf-8' });
                const chunk = {
                    loader: 'jsx',
                    contents,
                };
                return chunk;
            }));
        },
    };
};
exports.default = loaderPlugin;
