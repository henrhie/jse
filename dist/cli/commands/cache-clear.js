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
exports.clearCacheCommand = void 0;
const commander_1 = require("commander");
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
exports.clearCacheCommand = new commander_1.Command('run')
    .command('clear-cache')
    .description('clear cache of unpkg packages')
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield promises_1.default.rmdir(path_1.default.join(process.cwd(), 'cache'), { recursive: true });
        console.log('✔✔✔ cache cleared');
    }
    catch (error) {
        console.error(error.message);
    }
}));
