import test from "node:test";
import assert from "node:assert/strict";
import { isUxModuleAccessible } from "./tierPolicy";

test("free module: immer sichtbar", () => {
  assert.equal(isUxModuleAccessible("free", "free"), true);
  assert.equal(isUxModuleAccessible("free", "pro"), true);
});

test("pro module: nur mit Pro-Nutzer", () => {
  assert.equal(isUxModuleAccessible("pro", "free"), false);
  assert.equal(isUxModuleAccessible("pro", "pro"), true);
});
