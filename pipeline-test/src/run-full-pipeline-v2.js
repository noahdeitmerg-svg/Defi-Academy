#!/usr/bin/env node
/**
 * Weiterleitung zu pipeline-test-v2 (Brand 2.0, einzelne Lektion).
 */
'use strict';

const { spawnSync } = require('child_process');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..');
const script = path.join(repoRoot, 'pipeline-test-v2', 'src', 'run-full-pipeline-v2.js');
const r = spawnSync(process.execPath, [script, ...process.argv.slice(2)], {
  stdio: 'inherit',
  cwd: process.cwd(),
});
process.exit(r.status === null ? 1 : r.status);
