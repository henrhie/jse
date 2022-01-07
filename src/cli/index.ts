#!/usr/bin/env node
import { program } from 'commander';
import { runCommand } from './commands/run';

program.addCommand(runCommand);

program.parse(process.argv);
