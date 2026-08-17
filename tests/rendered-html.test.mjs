import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
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
  assert.match(html, /哪些历史有证据，哪些只是好听的故事/);
  assert.match(html, /四组理论，各管一件事/);
  assert.match(html, /研究首页/);
  assert.match(html, /牛肉汤图鉴/);
  assert.match(html, /案例与机制/);
  assert.match(html, /论文正文/);
  assert.match(html, /研究方法/);
  assert.match(html, /来源资料/);
  assert.match(html, /60项公开来源/);
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
  assert.deepEqual(sourceIds, Array.from({ length: 60 }, (_, index) => index + 1));

  const sourceUrls = [...page.matchAll(/\{ id: \d+, type: .*? url: "([^"]+)" \}/g)].map((match) => match[1]);
  assert.equal(sourceUrls.length, 60);
  assert.ok(sourceUrls.every((url) => url.startsWith("https://")));

  const literalCitationIds = [...page.matchAll(/<Cite id=\{(\d+)\}/g)].map((match) => Number(match[1]));
  assert.ok(literalCitationIds.length > 50);
  assert.ok(literalCitationIds.every((id) => sourceIds.includes(id)));

  for (const match of page.matchAll(/sources:\s*\[([^\]]*)\]/g)) {
    const ids = match[1].split(",").map((value) => Number(value.trim())).filter(Number.isFinite);
    assert.ok(ids.every((id) => sourceIds.includes(id)));
  }

  const tabIds = [...page.matchAll(/\{ id: "(overview|atlas|mechanism|draft|methods|sources)", number:/g)].map((match) => match[1]);
  assert.deepEqual(tabIds, ["overview", "atlas", "mechanism", "draft", "methods", "sources"]);
  assert.equal((page.match(/activeTab === "/g) ?? []).length, 6);
  assert.equal((page.match(/<article className="essay-chapter(?: conclusion-chapter)?">/g) ?? []).length, 6);
  assert.match(page, /一、研究背景与意义/);
  assert.match(page, /二、数字传播生态作为媒介记忆的基础/);
  assert.match(page, /三、意义生产：多重话语下的记忆建构/);
  assert.match(page, /四、研究局限与未来展望/);
  assert.equal((page.match(/className="rewrite-pair"/g) ?? []).length, 6);
  assert.match(page, /\[22, 23, 24, 25, 26, 27, 28\]\.map/);
  assert.match(page, /window\.addEventListener\("hashchange", syncTabFromHash\)/);

  const mediaFiles = [...page.matchAll(/src: "media\/commons\/([^"]+)"/g)].map((match) => match[1]);
  assert.equal(mediaFiles.length, 6);
  await Promise.all(mediaFiles.map((file) => access(new URL(`../public/media/commons/${file}`, import.meta.url))));
  assert.equal((page.match(/license: "Public Domain Mark"/g) ?? []).length, 5);
  assert.equal((page.match(/license: "CC BY-SA 4\.0"/g) ?? []).length, 1);

  assert.match(layout, /60项公开来源/);
  assert.match(staticIndex, /60项公开来源/);
  assert.match(packageJson, /"build:pages": "vite build --config vite\.pages\.config\.ts"/);
  assert.doesNotMatch(page + layout + staticIndex, /38项公开来源|53项公开来源|codex-preview|SkeletonPreview/);
  assert.doesNotMatch(page, /HUAINAN · MEMORY|HOW TO READ|THESIS ARCHITECTURE|LITERATURE REVIEW|WHY IT IS MEMORABLE|THE NUMBERS, WITH CAUTION|THE SOUP ITSELF|WHAT IS IN THE BOWL|FROM POT TO TABLE|OPEN MEDIA COLLECTION|VISUAL EVIDENCE|HOW MEMORY WORKS|THREE TRIGGERS|FROM MEMORY TO VALUE|WHAT GETS LOST|RESEARCH AGENDA|CHAPTER-BY-CHAPTER|READABLE CHINESE|WRITE LIKE A HUMAN|METHODS YOU CAN EXECUTE|CORE REFERENCES|WATCH THE MEMORY|SOURCE LEDGER|METHOD & LIMITS/);
});
