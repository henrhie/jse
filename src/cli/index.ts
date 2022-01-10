#!/usr/bin/env node
import { program } from 'commander';
import { clearCacheCommand } from './commands/cache-clear';
import { runCommand } from './commands/run';

program.addCommand(clearCacheCommand);
program.addCommand(runCommand);

program.parse(process.argv);
