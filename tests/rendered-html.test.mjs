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
  assert.match(html, /媒介记忆研究-淮南牛肉汤/);
  assert.match(html, /一碗汤，一座城，/);
  assert.match(html, /百万人，共相忆/);
  assert.match(html, /一道美食的前世今生、穿梭时空/);
  assert.match(html, /江淮儿女对淮南牛肉汤的记忆/);
  assert.doesNotMatch(html, /淮河儿女/);
  assert.match(html, /首页阅读说明/);
  assert.match(html, /一碗汤的重量，是由品尝它的人决定的/);
  assert.match(html, /日常食物怎样成为城市记忆/);
  assert.match(html, /媒介案例/);
  assert.match(html, /查看不同研究方法与背后的数据支撑逻辑/);
  assert.match(html, /media\/commons\/huainan-bowl\.jpg/);
  assert.match(html, /淮南牛肉汤实拍/);
  assert.match(html, /A_Bowl_of_Huainan_Beef_Soup\.jpg/);
  assert.doesNotMatch(html, /class="memory-orbit"/);
  assert.match(html, /研究首页/);
  assert.match(html, /牛肉汤图鉴/);
  assert.match(html, /案例与机制/);
  assert.match(html, /论文正文/);
  assert.match(html, /研究方法/);
  assert.match(html, /参考文献/);
  assert.match(html, /来源资料/);
  assert.doesNotMatch(html, /进入论文正文|查看来源资料 →|104项公开来源 · 8条视频 · 6张开放授权图片/);
  assert.doesNotMatch(html, /首页不负责展开结论|首页只回答“这是什么研究、应该从哪里读”/);
  assert.equal((html.match(/class="tab-page"/g) ?? []).length, 1);
  assert.match(html, /data-page="overview"/);
  assert.doesNotMatch(html, /核心研究问题|四组理论，各管一件事|公开数字，先看口径|class="memory-foundations"/);
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
  assert.deepEqual(sourceIds, Array.from({ length: 104 }, (_, index) => index + 1));

  const sourceUrls = [...page.matchAll(/\{ id: \d+, type: .*? url: "([^"]+)" \}/g)].map((match) => match[1]);
  assert.equal(sourceUrls.length, 104);
  assert.ok(sourceUrls.every((url) => url.startsWith("https://")));

  const literalCitationIds = [...page.matchAll(/<Cite id=\{(\d+)\}/g)].map((match) => Number(match[1]));
  assert.ok(literalCitationIds.length > 50);
  assert.ok(literalCitationIds.every((id) => sourceIds.includes(id)));

  for (const match of page.matchAll(/sources:\s*\[([^\]]*)\]/g)) {
    const ids = match[1].split(",").map((value) => Number(value.trim())).filter(Number.isFinite);
    assert.ok(ids.every((id) => sourceIds.includes(id)));
  }

  const tabIds = [...page.matchAll(/\{ id: "(overview|atlas|mechanism|draft|methods|references|sources)", number:/g)].map((match) => match[1]);
  assert.deepEqual(tabIds, ["overview", "atlas", "mechanism", "draft", "methods", "references", "sources"]);
  assert.equal((page.match(/activeTab === "/g) ?? []).length, 7);
  assert.equal((page.match(/<article className="essay-chapter(?: abstract-chapter| conclusion-chapter)?">/g) ?? []).length, 7);
  const essayChapterIds = [...page.matchAll(/^ {4}id: "(abstract|intro|chapter-[2-5]|conclusion)",$/gm)].map((match) => match[1]);
  assert.deepEqual(essayChapterIds, ["abstract", "intro", "chapter-2", "chapter-3", "chapter-4", "chapter-5", "conclusion"]);
  assert.match(page, /className="essay-toc"/);
  assert.match(page, /className="subsection-index"/);
  assert.match(page, /className="chapter-pager"/);
  assert.match(page, /className="plain-writing-details"/);
  assert.match(page, /window\.location\.hash\.slice\(1\)\.split\("\/"\)/);
  assert.match(page, /href=\{`#draft\/\$\{activeEssayEntry\.id\}\/\$\{section\.id\}`\}/);
  assert.equal((page.match(/id="essay-(?:abstract|intro|chapter-[2-5]|conclusion)-/g) ?? []).length, 24);
  assert.match(page, /淮南牛肉汤的媒介记忆建构研究/);
  assert.match(page, /The Construction of Mediated Memory around Huainan Beef Soup/);
  const argumentMatrix = page.slice(page.indexOf("const thesisArgumentMatrix = ["), page.indexOf("] as const;", page.indexOf("const thesisArgumentMatrix = [")));
  assert.equal((argumentMatrix.match(/question: "/g) ?? []).length, 4);
  const terminologyGuide = page.slice(page.indexOf("const terminologyGuide = ["), page.indexOf("] as const;", page.indexOf("const terminologyGuide = [")));
  assert.equal((terminologyGuide.match(/term: "/g) ?? []).length, 10);
  assert.match(page, /一、研究背景与意义/);
  assert.match(page, /note: "实物、吃法与门头"/);
  assert.match(page, /初相识/);
  assert.match(page, /先别急着看文章了/);
  assert.match(page, /一起尝尝看吧/);
  assert.match(page, /淮南牛肉汤能够成为文化符号，重要的是它真好吃/);
  assert.match(page, /干丝 \/ 千张 \/ 豆饼/);
  assert.match(page, /哪些声音让人感受到“烟火气”/);
  assert.match(page, /食客是怎么品尝的/);
  assert.doesNotMatch(page, /人是怎么吃的/);
  assert.match(page, /02 · 端上桌/);
  assert.match(page, /03 · 共品尝/);
  assert.match(page, /留下强烈视觉印象/);
  assert.match(page, /体现了劳动人民对于饱腹的需求/);
  assert.match(page, /“淮南”字样逐渐走向世界各处/);
  assert.match(page, /新增了清真标识与店面形态/);
  assert.doesNotMatch(page, /这组图片能说明什么|03 · 可以放心使用的图片|这张图能看什么/);
  assert.match(page, /className="mechanism-photo-strip"/);
  assert.match(page, /先成为可识别的画面/);
  assert.match(page, /再进入身体动作/);
  assert.match(page, /最后进入街道空间/);
  assert.match(page, /className="case-figure"/);
  const caseImageBlock = page.slice(page.indexOf("const caseImages = {"), page.indexOf("} as const;", page.indexOf("const caseImages = {")));
  assert.equal((caseImageBlock.match(/sourceId: \d+/g) ?? []).length, 3);
  assert.match(page, /二、数字传播生态作为媒介记忆的基础/);
  assert.match(page, /已深写 · 约7700字/);
  assert.match(page, /可调用资源 × 事件激活 × 组织承接 × 主体参与/);
  assert.match(page, /三、意义生产：多重话语下的记忆建构/);
  assert.match(page, /已深写 · 约8500字/);
  assert.match(page, /事件制造注意窗口 → 媒体提取可识别符号/);
  assert.match(page, /已深写 · 约9800字/);
  assert.match(page, /媒介曝光提供共同对象 → 个人借食物和家庭框架唤起记忆/);
  assert.match(page, /已深写 · 约9500字/);
  assert.match(page, /传播者的选择使古老、品牌和成绩版本更容易占据中心/);
  assert.match(page, /已深写 · 约1\.2万字/);
  assert.match(page, /看见—理解—参与—认同—行动—制度化/);
  assert.match(page, /四、研究局限与未来展望/);
  assert.equal((page.match(/sourceId: \d+, group:/g) ?? []).length, 27);
  const citationRoutes = page.slice(page.indexOf("const citationRoutes = ["), page.indexOf("] as const;", page.indexOf("const citationRoutes = [")));
  assert.equal((citationRoutes.match(/chapter: "/g) ?? []).length, 8);
  const methodToolBlock = page.slice(page.indexOf("const methodTools = ["), page.indexOf("] as const;", page.indexOf("const methodTools = [")));
  assert.equal((methodToolBlock.match(/id: "(?:sampling|coding|interview|observation|survey|ethics)"/g) ?? []).length, 6);
  assert.match(page, /4个事件窗口 × 4类主体 × 每格20条/);
  assert.match(page, /30—36人六类主体/);
  assert.match(page, /Krippendorff&apos;s α/);
  assert.match(page, /可直接念出的开场说明/);
  assert.match(page, /居民问卷/);
  assert.match(page, /游客问卷/);
  assert.match(page, /配额样本不等于全市民意/);
  assert.match(page, /matched\.id === "methods"/);
  const toolkitDownloads = [...page.matchAll(/file: "(0[1-8]-[^"]+\.(?:csv|md))"/g)].map((match) => match[1]);
  assert.equal(toolkitDownloads.length, 8);
  await Promise.all(toolkitDownloads.map((file) => access(new URL(`../public/downloads/${file}`, import.meta.url))));
  await access(new URL("../public/downloads/00-empirical-research-toolkit.zip", import.meta.url));
  assert.match(page, /来源多，不等于参考文献就合格/);
  assert.match(page, /全文第一轮统稿表/);
  assert.equal((page.match(/className="rewrite-pair"/g) ?? []).length, 6);
  assert.match(page, /\[22, 23, 24, 25, 26, 27, 28, 78\]\.map/);
  assert.match(page, /window\.addEventListener\("hashchange", syncTabFromHash\)/);

  const mediaAssetsBlock = page.slice(page.indexOf("const mediaAssets = ["), page.indexOf("] as const;", page.indexOf("const mediaAssets = [")));
  const mediaFiles = [...mediaAssetsBlock.matchAll(/src: "media\/commons\/([^"]+)"/g)].map((match) => match[1]);
  assert.equal(mediaFiles.length, 6);
  await Promise.all(mediaFiles.map((file) => access(new URL(`../public/media/commons/${file}`, import.meta.url))));
  assert.equal((page.match(/license: "Public Domain Mark"/g) ?? []).length, 5);
  assert.equal((page.match(/license: "CC BY-SA 4\.0"/g) ?? []).length, 1);

  assert.match(layout, /104项公开来源/);
  assert.match(staticIndex, /104项公开来源/);
  assert.match(packageJson, /"build:pages": "vite build --config vite\.pages\.config\.ts"/);
  assert.doesNotMatch(page + layout + staticIndex, /38项公开来源|53项公开来源|60项公开来源|67项公开来源|72项公开来源|codex-preview|SkeletonPreview/);
  assert.doesNotMatch(page, /HUAINAN · MEMORY|HOW TO READ|THESIS ARCHITECTURE|LITERATURE REVIEW|WHY IT IS MEMORABLE|THE NUMBERS, WITH CAUTION|THE SOUP ITSELF|WHAT IS IN THE BOWL|FROM POT TO TABLE|OPEN MEDIA COLLECTION|VISUAL EVIDENCE|HOW MEMORY WORKS|THREE TRIGGERS|FROM MEMORY TO VALUE|WHAT GETS LOST|RESEARCH AGENDA|CHAPTER-BY-CHAPTER|READABLE CHINESE|WRITE LIKE A HUMAN|METHODS YOU CAN EXECUTE|CORE REFERENCES|WATCH THE MEMORY|SOURCE LEDGER|METHOD & LIMITS/);
});
