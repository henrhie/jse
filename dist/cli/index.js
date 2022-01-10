#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const cache_clear_1 = require("./commands/cache-clear");
const run_1 = require("./commands/run");
commander_1.program.addCommand(cache_clear_1.clearCacheCommand);
commander_1.program.addCommand(run_1.runCommand);
commander_1.program.parse(process.argv);
