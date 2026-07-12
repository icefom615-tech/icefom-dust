import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the interactive portfolio shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /TAKE SOME TIME TO LIVE/i);
  assert.match(html, /花·生 &amp; 尘光/);
  assert.match(html, /CLICK TO TAKE SOME TIME/);
  assert.match(html, /<title>TAKE SOME TIME TO LIVE \| 花·生 &amp; 尘光<\/title>/i);
  assert.match(html, /property="og:image"/i);
  assert.match(html, /og\.png/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Starter Project/i);
});
