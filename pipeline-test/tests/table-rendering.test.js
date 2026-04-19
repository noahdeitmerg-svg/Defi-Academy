/**
 * Tabellen → Bullets (parseBulletsFromBody in brand/slide-helpers.js).
 * Ausführen: node pipeline-test/tests/table-rendering.test.js
 */

'use strict';

const assert = require('assert');
const { parseBulletsFromBody } = require('../../brand/slide-helpers');

const compareTable = `
| Eigenschaft | CeFi | DeFi |
|---|---|---|
| Custody | Plattform | Nutzer |
| KYC | Pflicht | Nein |
| Ausführung | Datenbank | Smart Contract |
| Transparenz | Intern | Öffentlich |
`;

const bullets = parseBulletsFromBody(compareTable);
assert.strictEqual(bullets.length, 4, 'Should produce 4 bullets');
assert.strictEqual(bullets[0], 'Custody: Plattform vs. Nutzer');
assert.strictEqual(bullets[1], 'KYC: Pflicht vs. Nein');
assert.strictEqual(bullets[2], 'Ausführung: Datenbank vs. Smart Contract');
assert.strictEqual(bullets[3], 'Transparenz: Intern vs. Öffentlich');

const propTable = `
| Property | Value |
|---|---|
| TVL | 50B |
| Users | 500k |
`;
const simple = parseBulletsFromBody(propTable);
assert.strictEqual(simple[0], 'TVL — 50B');
assert.strictEqual(simple[1], 'Users — 500k');

console.log('✔ Table rendering tests pass');
