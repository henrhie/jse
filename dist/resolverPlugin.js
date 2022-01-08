"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const builtins = require('module').builtinModules;
const resolverPlugin = () => {
    return {
        name: 'custom-resolver-plugin',
        setup(build) {
            build.onResolve({ filter: /.*/ }, (args) => {
                if (args.path.startsWith('./') ||
                    args.path.startsWith('../') ||
                    args.kind === 'entry-point') {
                    if (args.importer.startsWith('https://') ||
                        args.importer.startsWith('http://')) {
                        return {
                            namespace: 'unpkg',
                            path: new URL(args.path, args.importer + '/').toString(),
                        };
                    }
                    return {
                        path: path_1.default.join(args.resolveDir, args.path + (!args.path.endsWith('.js') ? '.js' : '')),
                        namespace: 'file',
                    };
                }
                if (!builtins.includes(args.path)) {
                    return {
                        namespace: 'unpkg',
                        path: `https://unpkg.com/${args.path}`,
                    };
                }
            });
        },
    };
};
exports.default = resolverPlugin;
