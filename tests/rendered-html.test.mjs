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

test("server-renders the paginated research home and its tab bar", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /一碗汤，如何成为一座城的记忆/);
  assert.match(html, /核心研究问题/);
  assert.match(html, /研究首页/);
  assert.match(html, /案例与机制/);
  assert.match(html, /中文正文/);
  assert.match(html, /研究方法/);
  assert.match(html, /来源资料/);
  assert.match(html, /53项公开来源/);
  assert.equal((html.match(/class="tab-page"/g) ?? []).length, 1);
  assert.match(html, /data-page="overview"/);
  assert.doesNotMatch(html, /正文论述底稿|内容分析编码表|class="source-row"/);
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

  const tabIds = [...page.matchAll(/\{ id: "(overview|mechanism|draft|methods|sources)", number:/g)].map((match) => match[1]);
  assert.deepEqual(tabIds, ["overview", "mechanism", "draft", "methods", "sources"]);
  assert.equal((page.match(/activeTab === "/g) ?? []).length, 5);
  assert.equal((page.match(/<article className="essay-chapter(?: conclusion-chapter)?">/g) ?? []).length, 5);
  assert.equal((page.match(/className="rewrite-pair"/g) ?? []).length, 6);
  assert.match(page, /\[22, 23, 24, 25, 26, 27, 28\]\.map/);
  assert.match(page, /window\.addEventListener\("hashchange", syncTabFromHash\)/);

  assert.match(layout, /53项公开来源/);
  assert.match(staticIndex, /53项公开来源/);
  assert.match(packageJson, /"build:pages": "vite build --config vite\.pages\.config\.ts"/);
  assert.doesNotMatch(page + layout + staticIndex, /38项公开来源|codex-preview|SkeletonPreview/);
});
