import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("content configuration contains every agreed section", async () => {
  const source = await readFile(new URL("../app/content.ts", import.meta.url), "utf8");
  for (const section of ["works", "vlog", "about", "contact"]) {
    assert.match(source, new RegExp(`id: \\"${section}\\"`));
  }
  assert.match(source, /花·生 & 影子/);
  assert.match(source, /bvid/);
});
