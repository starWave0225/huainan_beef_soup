import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the complete thesis research site", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /一碗汤，如何成为一座城的记忆/);
  assert.match(html, /核心研究问题/);
  assert.match(html, /逐章论证施工图/);
  assert.match(html, /正文论述底稿/);
  assert.match(html, /“说人话”不是不学术/);
  assert.match(html, /一段话的五步写法/);
  assert.match(html, /内容分析编码表/);
  assert.match(html, /半结构访谈提纲/);
  assert.match(html, /53项公开来源/);
  assert.equal((html.match(/class="source-row"/g) ?? []).length, 53);
  assert.equal((html.match(/class="chapter-body"/g) ?? []).length, 6);
  assert.equal((html.match(/class="essay-chapter(?:\s[^"]*)?"/g) ?? []).length, 5);
  assert.equal((html.match(/class="rewrite-pair"/g) ?? []).length, 6);
  assert.equal((html.match(/class="video-card"/g) ?? []).length, 7);
  assert.doesNotMatch(html, /Building your site|codex-preview|react-loading-skeleton/);
});

test("keeps source IDs, citations, metadata, and static publishing aligned", async () => {
  const [page, layout, staticIndex, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../index.html", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  const sourceIds = [...page.matchAll(/\{ id: (\d+), type: /g)].map((match) => Number(match[1]));
  assert.deepEqual(sourceIds, Array.from({ length: 53 }, (_, index) => index + 1));

  const sourceUrls = [...page.matchAll(/\{ id: \d+, type: .*? url: "([^"]+)" \}/g)].map((match) => match[1]);
  assert.equal(sourceUrls.length, 53);
  assert.ok(sourceUrls.every((url) => url.startsWith("https://")));

  const literalCitationIds = [...page.matchAll(/<Cite id=\{(\d+)\}/g)].map((match) => Number(match[1]));
  assert.ok(literalCitationIds.length > 50);
  assert.ok(literalCitationIds.every((id) => sourceIds.includes(id)));

  for (const match of page.matchAll(/sources:\s*\[([^\]]*)\]/g)) {
    const ids = match[1].split(",").map((value) => Number(value.trim())).filter(Number.isFinite);
    assert.ok(ids.every((id) => sourceIds.includes(id)));
  }

  assert.match(layout, /53项公开来源/);
  assert.match(staticIndex, /53项公开来源/);
  assert.match(packageJson, /"build:pages": "vite build --config vite\.pages\.config\.ts"/);
  assert.doesNotMatch(page + layout + staticIndex, /38项公开来源|codex-preview|SkeletonPreview/);
});
