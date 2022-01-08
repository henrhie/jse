"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCommand = void 0;
const commander_1 = require("commander");
const esbuild = __importStar(require("esbuild"));
const loaderPlugin_1 = __importDefault(require("../../loaderPlugin"));
const resolverPlugin_1 = __importDefault(require("../../resolverPlugin"));
exports.runCommand = new commander_1.Command('run')
    .command('run')
    .description('execute your experimental javascript program')
    .option('-i, --input <string>', 'entry file for you experimental javascript program', 'index.js')
    .option('-o, --output <string>', 'output file for your experimental javascript program', 'output.js')
    .action(({ input, output }) => {
    esbuild
        .build({
        entryPoints: [input],
        outfile: output,
        bundle: true,
        platform: 'node',
        plugins: [(0, resolverPlugin_1.default)(), (0, loaderPlugin_1.default)()],
    })
        .then((buildResult) => {
        console.log('✅✅✅ bundle successful');
    })
        .catch((err) => {
        console.log('❌❌❌ error occured: ', err.message);
        process.exit(1);
    });
});
