"use client";

import { useEffect, useMemo, useState } from "react";

type Source = {
  id: number;
  type: "政策/统计" | "新闻/专题" | "视频" | "学术/典籍";
  date: string;
  publisher: string;
  title: string;
  note: string;
  url: string;
};

const sources: Source[] = [
  { id: 1, type: "政策/统计", date: "2024-06", publisher: "淮南市人民政府", title: "淮南牛肉汤产业高质量发展行动方案（2024—2027年）", note: "提出2027年全产业链总产值超500亿元等政策目标。", url: "https://huainan.gov.cn/ztzl/szfgb/szfbgswj/1260255564.html" },
  { id: 2, type: "政策/统计", date: "2026-02", publisher: "淮南市人大常委会", title: "淮南市淮南牛肉汤产业发展条例", note: "地方性法规，覆盖食品安全、品牌、标准、非遗与文旅。", url: "https://hnrd.huainan.gov.cn/dffg/528807.html" },
  { id: 3, type: "政策/统计", date: "2025-08", publisher: "淮南市市场监管局", title: "“淮南牛肉汤”集体商标正式获批注册", note: "集体商标获批；披露2025年上半年产值195.2亿元。", url: "https://scjgj.huainan.gov.cn/xwdt/sjdt/551834755.html" },
  { id: 4, type: "政策/统计", date: "2026-01", publisher: "淮南市市场监管局", title: "30家企业获得首批集体商标授权", note: "集体商标从注册进入授权与质量治理阶段。", url: "https://scjgj.huainan.gov.cn/ztgz/zscqgz/gzdt/551852254.html" },
  { id: 5, type: "政策/统计", date: "2026-05", publisher: "淮南市市场监管局", title: "集体商标入选安徽省商标保护名录", note: "披露已发布17项团体标准、1项省级地方标准。", url: "https://scjgj.huainan.gov.cn/xwdt/sjdt/551860664.html" },
  { id: 6, type: "政策/统计", date: "2025-05", publisher: "淮南市人民政府", title: "“五新融合”点燃春日经济", note: "称全产业链企业235家、年产值超320亿元；时光小镇日均游客超1.2万人次。", url: "https://www.huainan.gov.cn/ztzl/rdsz/ssyfsqgc/gzqk/1260633843.html" },
  { id: 7, type: "政策/统计", date: "2025-10", publisher: "淮南市市场监管局", title: "关于加速淮南牛肉汤产业发展的提案答复", note: "披露2024年全产业链产值超300亿元、获证加工企业20家。", url: "https://scjgj.huainan.gov.cn/ztgz/yatabl/551846017.html" },
  { id: 8, type: "政策/统计", date: "2025-03", publisher: "淮南市人民政府", title: "从长三角到淮南牛肉汤", note: "披露2024年电商企业13家、网销额约1.5亿元，并描述全平台直播布局。", url: "https://www.huainan.gov.cn/zwgk/jrhn/1260573136.html" },
  { id: 9, type: "政策/统计", date: "2025-03", publisher: "淮南市市场监管局", title: "首批20家牛肉汤餐饮消费“白名单”", note: "从43家初审名单评出20家，以门店标准化回应食品安全与品牌一致性。", url: "https://scjgj.huainan.gov.cn/xwdt/sjdt/551803800.html" },
  { id: 10, type: "政策/统计", date: "2025-03", publisher: "淮南市农业农村局", title: "2025产业大会集中签约29个项目", note: "签约总投资超122亿元；同时呈现当地对历史、考古与非遗的官方叙事。", url: "https://nyncj.huainan.gov.cn/public/118319852/1260609962.html" },
  { id: 11, type: "政策/统计", date: "2025-06", publisher: "淮南市商务局", title: "2025淮南牛肉汤电商直播带货大赛收官", note: "政府组织的平台化营销实践，但页面未披露成交规模。", url: "https://swj.huainan.gov.cn/public/118319855/1260676526.html" },
  { id: 12, type: "政策/统计", date: "2025-03", publisher: "淮南市商务局", title: "电商直播助力特色旅游产品销售", note: "借《六姊妹》热度，将牛肉汤、豆腐等纳入直播消费场景。", url: "https://swj.huainan.gov.cn/dzsw/551805639.html" },
  { id: 13, type: "政策/统计", date: "2025-03", publisher: "淮南市人民政府", title: "淮南牛肉汤产业高质量发展大会召开", note: "明确“从地域名品到文旅潮品”的政策传播方向。", url: "https://www.huainan.gov.cn/zwgk/jrhn/1260574348.html" },
  { id: 14, type: "政策/统计", date: "2024-04", publisher: "淮南市人民政府", title: "武王墩墓考古发掘成果公布", note: "确认大型楚国高等级墓葬及大鼎等考古事实，不等于确认现代菜品起源。", url: "https://www.huainan.gov.cn/zjhn/fjms/1260154108.html" },
  { id: 15, type: "新闻/专题", date: "2024-01", publisher: "新华社", title: "Huainan beef soup, renowned historic local cuisine", note: "图片专题呈现餐馆、配料与生产线；称2023年全产业链产值超300亿元。", url: "https://english.news.cn/20240119/e93375706a7b4f97accf229ec8b2e377/c.html" },
  { id: 16, type: "新闻/专题", date: "2025-02", publisher: "人民网", title: "流量时代，“六姊妹家乡”转型的另一面", note: "分析电视剧如何把工业城市记忆转化为取景地与文旅流量。", url: "https://ah.people.com.cn/n2/2025/0225/c227131-41146224.html" },
  { id: 17, type: "新闻/专题", date: "2025-03", publisher: "人民网", title: "从《六姊妹》到淮南牛肉汤", note: "记录牛肉汤在剧中反复出现、演员短视频传播与线下游客打卡。", url: "https://ah.people.com.cn/n2/2025/0328/c358348-41179036.html" },
  { id: 18, type: "新闻/专题", date: "2025-05", publisher: "人民网", title: "“一碗汤”打造农文旅融合发展金名片", note: "串联非遗、影视、文旅与产业化，是典型的城市品牌叙事。", url: "https://ah.people.com.cn/n2/2025/0529/c374164-41243832.html" },
  { id: 19, type: "新闻/专题", date: "2025-05", publisher: "安徽日报 / 人民网", title: "五一期间九龙岗日均接待游客1.5万人次", note: "市外游客占比65%以上，为影视记忆转为空间流量提供观察窗口。", url: "https://ah.people.com.cn/BIG5/n2/2025/0506/c358428-41218087.html" },
  { id: 20, type: "新闻/专题", date: "2026-05", publisher: "淮南日报", title: "淮南牛肉汤：一锅红艳，滋味流芳", note: "地方文化长文，包含2013市级非遗、2017省级非遗等时间线；历史解释需与其他来源互证。", url: "https://hnrb.huainannet.com/content/202605/29/content_209689.html" },
  { id: 21, type: "新闻/专题", date: "2019-08", publisher: "淮南市人民政府", title: "淮南特产：淮南牛肉汤", note: "将现代牛肉汤兴起与回民技艺、矿区城市条件、改革开放后的市场联系起来。", url: "https://www.huainan.gov.cn/zjhn/hntc/1259063166.html" },
  { id: 22, type: "视频", date: "2022-04", publisher: "央视网 · 消费主张", title: "历史文化厚重的淮南牛肉汤", note: "较早的中央电视节目片段，展示大众媒介如何包装地方美食历史。", url: "https://tv.cctv.com/2022/04/21/VIDElEViajJZ7FDhwdedfumg220421.shtml" },
  { id: 23, type: "视频", date: "2024-05", publisher: "央视网 · 新闻联播", title: "武王墩考古获重要进展", note: "国家级新闻节点把楚墓、大鼎与淮南历史推入公共视野。", url: "https://tv.cctv.com/2024/05/18/VIDEtbnF5n4gJDHtT0WCSe7l240518.shtml" },
  { id: 24, type: "视频", date: "2024-05", publisher: "央视网 · 焦点访谈", title: "探秘武王墩", note: "专家讨论15种动物遗存与楚国礼制；可防止把出土牛骨直接等同现代牛肉汤。", url: "https://tv.cctv.com/2024/05/21/VIDEVh649e0kY32OWAQbXEVl240521.shtml" },
  { id: 25, type: "视频", date: "2025-02", publisher: "央视网 · 剧说很好看", title: "《六姊妹》主创访谈", note: "呈现“家”“代际”“地方生活”如何成为影视记忆的情感框架。", url: "https://tv.cctv.com/2025/02/25/VIDEvyKZNJy6V415mgtDFwew250225.shtml" },
  { id: 26, type: "视频", date: "2025-03", publisher: "新华网", title: "安徽淮南：飘香牛肉汤 文旅新动能", note: "1分52秒新华社视频，记录万人共品活动与城市消费场景。", url: "https://www.news.cn/government/20250331/d81ea60397bc44c5bcba3eb438dc7138/c.html" },
  { id: 27, type: "视频", date: "2025-05", publisher: "央视网 · 非遗里的中国", title: "省级非遗：淮南牛肉汤制作技艺", note: "把制作过程转化为国家级屏幕中的非遗展示。", url: "https://tv.cctv.com/2025/05/10/VIDESQT8zBU2r1wPwqem596m250510.shtml" },
  { id: 28, type: "视频", date: "2025-12", publisher: "央视网 · 新闻联播", title: "武王墩再现楚国礼乐文明", note: "检测显示鼎内动物包括黄牛等且经历烹饪；仍不能推出具体菜谱。", url: "https://tv.cctv.com/2025/12/21/VIDElHeKJzmgFQljHx7C3zJt251221.shtml" },
  { id: 29, type: "学术/典籍", date: "西汉文本", publisher: "中国哲学书电子化计划", title: "《淮南子·齐俗训》原文", note: "“屠牛而烹其肉……煎熬燎炙”证明文本中的牛肉烹饪观念，不证明现代菜品连续传承。", url: "https://ctext.org/text.pl?if=gb&node=3206&show=parallel" },
  { id: 30, type: "学术/典籍", date: "1979", publisher: "中国政府网", title: "国务院关于保护耕牛和调整屠宰政策的通知", note: "现代牛肉消费制度环境变化的重要背景材料。", url: "https://www.gov.cn/zhengce/pdfFile/1979_PDF.pdf" },
  { id: 31, type: "学术/典籍", date: "2007", publisher: "Stanford University Press", title: "Mediated Memories in the Digital Age", note: "José van Dijck：媒介技术参与塑造记忆行为、私人经验与文化记忆。", url: "https://www.sup.org/books/media-studies/mediated-memories-digital-age/" },
  { id: 32, type: "学术/典籍", date: "2006", publisher: "Annual Review of Anthropology", title: "Food and Memory", note: "Jon Holtzman综述食物、感官、身份、怀旧与“被发明的传统”。", url: "https://www.annualreviews.org/content/journals/10.1146/annurev.anthro.35.081705.123220" },
  { id: 33, type: "学术/典籍", date: "2024", publisher: "热带地理", title: "“带你回到家乡”：食物会唤醒地方记忆吗？", note: "以《舌尖上的中国》为例，分析字幕、弹幕和评论中的地方记忆唤醒。", url: "https://www.rddl.com.cn/EN/10.13284/j.cnki.rddl.20230606" },
  { id: 34, type: "学术/典籍", date: "2025", publisher: "University of Edinburgh / OUP", title: "The Remaking of Memory in the Age of the Internet and Social Media", note: "数字记忆更外部化、对话化、交互化，也更难驾驭和检索。", url: "https://www.research.ed.ac.uk/en/publications/the-remaking-of-memory-in-the-age-of-the-internet-and-social-medi/" },
  { id: 35, type: "学术/典籍", date: "2017", publisher: "Oxford Academic", title: "Media and the Dynamics of Memory", note: "Astrid Erll：文化记忆通过不同媒介的持续“再媒介化”而运动。", url: "https://academic.oup.com/book/1585/chapter-abstract/141086511" },
  { id: 36, type: "学术/典籍", date: "2011", publisher: "中国人大网", title: "中华人民共和国非物质文化遗产法", note: "法律要求保护注重真实性、整体性和传承性，使用应尊重形式与内涵。", url: "https://www.npc.gov.cn/npc/c2/c12435/c12488/201905/t20190522_70066.html" },
  { id: 37, type: "学术/典籍", date: "2003", publisher: "UNESCO", title: "保护非物质文化遗产公约", note: "非遗不是被冻结的物件，而是社区不断再创造、代际传递的实践。", url: "https://ich.unesco.org/en/convention" },
  { id: 38, type: "学术/典籍", date: "持续更新", publisher: "UNESCO", title: "Intangible heritage and livelihoods", note: "提示去语境化与过度商业化风险，应由社区主导并公平受益。", url: "https://ich.unesco.org/en/livelihoods-01315" },
];

const sourceById = (id: number) => sources.find((source) => source.id === id)!;

function Cite({ id }: { id: number }) {
  const source = sourceById(id);
  return <a className="cite" href={source.url} target="_blank" rel="noreferrer" aria-label={`来源 ${id}：${source.title}`}>[{String(id).padStart(2, "0")}]</a>;
}

const cases = [
  {
    id: "archaeology",
    eyebrow: "CASE 01 · 考古事件",
    title: "一只大鼎，如何变成“千年牛肉汤”的记忆触发器？",
    body: "武王墩考古确认了战国晚期楚国高等级墓葬、青铜礼器与丰富动物遗存。后续检测显示黄牛等动物经历烹饪，这证明楚国礼制与饮食生活，却仍不足以证明今天这套牛肉汤配方已经连续存在两千年。传播中被压缩掉的，恰好是“牛骨 → 牛肉汤 → 淮南牛肉汤”之间的三次推论跳跃。",
    insight: "考古提供可视化的物证，地方叙事提供熟悉的菜名；二者在热点新闻里接合，形成一种“有证据感的传说”。",
    sources: [14, 23, 24, 28, 29],
  },
  {
    id: "television",
    eyebrow: "CASE 02 · 影视事件",
    title: "《六姊妹》没有介绍一道菜，而是让它反复出现在“家”里。",
    body: "剧中牛肉汤并非知识性插入，而是日常生活的布景、家庭关系的黏合剂和城市年代感的感官线索。主创访谈、演员短视频和游客打卡又把屏幕里的味觉记忆搬回街巷：2025年春季，九龙岗时光小镇官方口径为日均接待游客超1.2万人次；五一报道为日均1.5万人次，其中市外游客占65%以上。",
    insight: "影视先完成情感编码，短视频完成可模仿扩散，取景地和门店再把观看转化为身体到场与消费。",
    sources: [6, 16, 17, 19, 25],
  },
  {
    id: "industry",
    eyebrow: "CASE 03 · 产业事件",
    title: "标准化不是记忆的终点，而是一场关于“谁有权定义正宗”的协商。",
    body: "从方便食品、中央厨房到集体商标，淮南牛肉汤正在从千店千味进入可复制体系。2025年集体商标获批，2026年首批30家企业获授权；截至2026年5月，官方披露已发布17项团体标准和1项省级地方标准。统一质量有助于品牌与食品安全，却也可能把地方差异压缩成单一版本。",
    insight: "真正需要保护的不是某个永远不变的配方，而是传承人、门店、食客仍能参与定义和更新这碗汤的能力。",
    sources: [2, 3, 4, 5, 9, 36, 37, 38],
  },
];

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [activeCase, setActiveCase] = useState(cases[0].id);
  const [sourceFilter, setSourceFilter] = useState("全部");

  useEffect(() => {
    const updateProgress = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  const filteredSources = useMemo(
    () => sourceFilter === "全部" ? sources : sources.filter((source) => source.type === sourceFilter),
    [sourceFilter],
  );
  const selectedCase = cases.find((item) => item.id === activeCase)!;

  return (
    <main id="top">
      <div className="reading-progress" style={{ width: `${progress}%` }} />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="淮南牛肉汤媒介记忆研究首页">
          <span className="brand-mark">淮</span>
          <span>媒介记忆研究志</span>
        </a>
        <nav aria-label="主导航">
          <a href="#evidence">证据</a>
          <a href="#mechanism">机制</a>
          <a href="#cases">案例</a>
          <a href="#reflection">反思</a>
          <a href="#sources">38项来源</a>
        </nav>
        <span className="edition">研究版 · 2026.08</span>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">HUAINAN · MEMORY ATLAS</p>
          <h1>一碗汤，<br />如何成为一座城的记忆？</h1>
          <p className="dek">
            从楚汉典籍、街巷烟火到短视频、电视剧与产业政策：这不是一道菜的“起源故事”，而是一场仍在发生的记忆建构。
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#evidence">沿证据进入</a>
            <span>38项公开来源 · 7条视频 · 逐条可访问</span>
          </div>
        </div>

        <div className="memory-orbit" aria-label="媒介记忆建构路径示意图">
          <div className="orbit orbit-outer"><span>城市符号</span></div>
          <div className="orbit orbit-middle"><span>媒介再生产</span></div>
          <div className="orbit orbit-inner"><span>身体记忆</span></div>
          <div className="bowl"><span>淮南</span><strong>牛肉汤</strong></div>
          <p className="orbit-note">记忆不是被原样保存，<br />而是在每次传播中重新生成。</p>
        </div>
      </section>

      <section className="question-strip" aria-label="研究路径">
        <span className="strip-label">研究路径</span>
        <ol>
          <li><b>01</b> 因何可记</li>
          <li><b>02</b> 如何被记</li>
          <li><b>03</b> 怎样转化</li>
          <li><b>04</b> 何处失真</li>
        </ol>
      </section>

      <section className="reading-note page-section">
        <div>
          <p className="section-kicker">HOW TO READ</p>
          <h2>先把“事实”拆成不同强度的证据。</h2>
        </div>
        <div className="evidence-legend">
          <article><span className="badge verified">可核事实</span><p>法规、名录、正式统计、考古报告能够直接支持的陈述。</p></article>
          <article><span className="badge reported">公开口径</span><p>政府或媒体报道中的行业估计；来源可靠不等于口径可比。</p></article>
          <article><span className="badge legend">地方传说</span><p>刘安、赵匡胤等故事具有记忆价值，但不当作历史事实。</p></article>
          <article><span className="badge analysis">研究推断</span><p>由多条材料综合出的解释，明确标注为分析而非原始资料。</p></article>
        </div>
      </section>

      <section className="evidence-section page-section" id="evidence">
        <div className="section-heading">
          <div><p className="section-kicker">01 · WHY IT IS MEMORABLE</p><h2>因何记忆：三层地基，不是一条起源线。</h2></div>
          <p>“悠久”本身不能解释记忆。真正有效的是：故事便于复述、物证便于展示、日常经验便于身体确认。</p>
        </div>

        <div className="memory-foundations">
          <article className="foundation-card legend-card">
            <span className="foundation-index">A</span>
            <span className="badge legend">地方传说</span>
            <h3>可讲述：王、兵与一锅救命汤</h3>
            <p>刘安炼丹、赵匡胤困寿春等叙事，将复杂历史压缩为人物、危机与救赎。它们的传播优势来自戏剧性，不来自史料强度。</p>
            <p className="card-conclusion">作用：为地方美食提供“很久以前就属于这里”的时间纵深。</p>
            <a className="source-link" href={sourceById(10).url} target="_blank" rel="noreferrer">查看官方如何讲述这一故事 <span>↗</span></a>
          </article>
          <article className="foundation-card artifact-card">
            <span className="foundation-index">B</span>
            <span className="badge verified">可核事实</span>
            <h3>可展示：典籍文字与考古器物</h3>
            <p>《淮南子》确有“屠牛而烹其肉”“煎熬燎炙”<Cite id={29} />；武王墩出土鼎与黄牛等经烹饪动物遗存<Cite id={24} /><Cite id={28} />。</p>
            <p className="card-conclusion">边界：这些证据支持古代牛肉烹饪，却不能直接证明现代菜品配方。</p>
            <a className="source-link" href={sourceById(29).url} target="_blank" rel="noreferrer">阅读《淮南子》原文 <span>↗</span></a>
          </article>
          <article className="foundation-card everyday-card">
            <span className="foundation-index">C</span>
            <span className="badge reported">地方研究</span>
            <h3>可体验：矿城清晨与市井早餐</h3>
            <p>地方政府资料把现代牛肉汤的兴起与回民牛肉技艺、矿区器具条件及改革开放后的屠宰政策变化联系起来<Cite id={21} /><Cite id={30} />。</p>
            <p className="card-conclusion">作用：热、辣、香与街巷共食，让城市记忆进入身体而非只留在文字中。</p>
            <a className="source-link" href={sourceById(21).url} target="_blank" rel="noreferrer">查看现代兴起的地方解释 <span>↗</span></a>
          </article>
        </div>

        <aside className="critical-callout">
          <span>关键判断</span>
          <p>淮南牛肉汤最有研究价值的，不是寻找唯一“第一碗”，而是观察不同年代如何不断为它补写过去。传说给它人物，考古给它物证感，市井生活给它可信的身体经验。</p>
        </aside>
      </section>

      <section className="numbers-section page-section">
        <div className="section-heading light-heading">
          <div><p className="section-kicker">THE NUMBERS, WITH CAUTION</p><h2>一条增长曲线，也可能是一种叙事。</h2></div>
          <p>下列数字均有公开出处，但统计范围、调查方法和“全产业链”定义没有完全公开，不能简单当作同口径时间序列。</p>
        </div>
        <div className="metric-grid">
          <article><span>2017</span><strong>省级非遗</strong><p>淮南牛肉汤制作技艺进入安徽省第五批省级非遗代表性项目名录。</p><div className="metric-source">制度性确认 <Cite id={18} /></div></article>
          <article><span>2024</span><strong>≈ 1.5 亿元</strong><p>官方报道中的全年网络销售额；电商企业13家。</p><div className="metric-source">公开口径 <Cite id={8} /></div></article>
          <article><span>2025 H1</span><strong>195.2 亿元</strong><p>集体商标获批报道披露的上半年全产业链产值，同比增长21%。</p><div className="metric-source">公开口径 <Cite id={3} /></div></article>
          <article><span>2025 报道</span><strong>&gt; 320 亿元</strong><p>全产业链年产值；相关企业235家。与上半年数字不应直接相加。</p><div className="metric-source">公开口径 <Cite id={6} /></div></article>
          <article className="target-metric"><span>2027 目标</span><strong>&gt; 500 亿元</strong><p>这是政策目标，不是已经实现的事实。</p><div className="metric-source">规划目标 <Cite id={1} /></div></article>
        </div>
        <p className="data-warning"><b>口径警报：</b> 2022年地方文章称全国门店“3万余家”，2025年媒体报道又称“约10万家”。两者都不是抽样方法透明的官方普查。本网站因此不绘制门店增长率，只把它们当作“规模想象”如何扩张的材料。</p>
      </section>

      <section className="mechanism-section page-section" id="mechanism">
        <div className="section-heading">
          <div><p className="section-kicker">02 · HOW MEMORY WORKS</p><h2>如何记忆：一套不断回流的媒介循环。</h2></div>
          <p>媒介并非把既有记忆装进容器，而是参与选择、排序、强化和删除。数字平台又让这种过程变得持续更新<Cite id={31} /><Cite id={34} /><Cite id={35} />。</p>
        </div>

        <div className="memory-loop" aria-label="媒介记忆循环的六个步骤">
          <article><span>01</span><b>资源</b><p>典籍、传说、技艺、门店与个人乡愁</p></article>
          <article><span>02</span><b>触发</b><p>考古发现、电视剧、节庆或平台热点</p></article>
          <article><span>03</span><b>编码</b><p>“千年”“非遗”“烟火气”“正宗”等符号</p></article>
          <article><span>04</span><b>协商</b><p>官方、商家、媒体与食客争夺解释权</p></article>
          <article><span>05</span><b>转化</b><p>评论、购买、打卡、加盟与城市认同</p></article>
          <article><span>06</span><b>再归档</b><p>新的图像、数据和体验成为下轮记忆资源</p></article>
        </div>

        <div className="voice-grid">
          <article>
            <span className="voice-number">01 / 官方话语</span>
            <h3>把地方味道变成可治理的城市品牌</h3>
            <p>行动方案使用“规模商品、网红爆品、文旅潮品”的三段式表达<Cite id={1} />；地方条例进一步把标准、商标、非遗和文旅写入制度<Cite id={2} />。</p>
            <div className="voice-effect">生产：权威性、统一性、公共资源</div>
          </article>
          <article>
            <span className="voice-number">02 / 商业话语</span>
            <h3>把记忆变成可复制、可携带、可下单的商品</h3>
            <p>方便装、冷冻款、中央厨房和直播带货解决“离开淮南还能不能喝到”的问题<Cite id={8} /><Cite id={11} />，同时也把“正宗”转化为品牌承诺。</p>
            <div className="voice-effect">生产：可消费性、便利性、规模</div>
          </article>
          <article>
            <span className="voice-number">03 / 民间话语</span>
            <h3>用“我家的那一碗”抵抗单一版本</h3>
            <p>老店、返乡者、演员Vlog与普通游客把宏大历史落回味觉、家庭和清晨<Cite id={17} />。差异化口味本身就是地方生活仍然鲜活的证据。</p>
            <div className="voice-effect">生产：真实性、亲密感、多样性</div>
          </article>
        </div>
      </section>

      <section className="cases-section page-section" id="cases">
        <div className="section-heading">
          <div><p className="section-kicker">03 · THREE TRIGGERS</p><h2>三个节点，看记忆如何突然“出圈”。</h2></div>
          <p>选择案例查看它如何从一次事件，变成可分享、可消费、可到访的公共记忆。</p>
        </div>
        <div className="case-tabs" role="tablist" aria-label="案例切换">
          {cases.map((item, index) => (
            <button key={item.id} className={activeCase === item.id ? "active" : ""} onClick={() => setActiveCase(item.id)} role="tab" aria-selected={activeCase === item.id}>
              <span>0{index + 1}</span>{item.id === "archaeology" ? "武王墩考古" : item.id === "television" ? "《六姊妹》" : "标准与商标"}
            </button>
          ))}
        </div>
        <div className="case-panel" role="tabpanel">
          <div className="case-copy">
            <p className="case-eyebrow">{selectedCase.eyebrow}</p>
            <h3>{selectedCase.title}</h3>
            <p>{selectedCase.body}</p>
          </div>
          <aside>
            <span>研究推断</span>
            <p>{selectedCase.insight}</p>
            <div className="case-cites">证据链 {selectedCase.sources.map((id) => <Cite key={id} id={id} />)}</div>
          </aside>
        </div>
      </section>

      <section className="conversion-section page-section">
        <div className="section-heading">
          <div><p className="section-kicker">04 · FROM MEMORY TO VALUE</p><h2>怎样转化：情感、空间与产业的三级跃迁。</h2></div>
          <p>食物记忆能够连接身份、怀旧和感官经验<Cite id={32} /><Cite id={33} />，但价值转化不是自动发生的，需要媒介触发与线下承接。</p>
        </div>
        <div className="conversion-grid">
          <article><span>情感层</span><h3>个人味觉 → 集体身份</h3><p>“回家第一碗”“家里的味道”把私密经验公开表达；相似叙事聚合为城市共同体。</p></article>
          <article><span>空间层</span><h3>屏幕景观 → 身体到场</h3><p>《六姊妹》取景地、非遗展馆与门店把在线观看转化为路线、打卡和共食<Cite id={17} /><Cite id={19} />。</p></article>
          <article><span>产业层</span><h3>地方名品 → 标准商品</h3><p>集体商标、标准体系、加工技术和电商让记忆跨地域流通<Cite id={3} /><Cite id={5} /><Cite id={8} />。</p></article>
        </div>
        <div className="tourism-proof">
          <div><span>2025 · 春季</span><strong>12,000+</strong><p>九龙岗时光小镇官方报道的日均游客量</p></div>
          <div className="proof-arrow">屏幕记忆 <i>→</i> 空间流量</div>
          <div><span>2025 · 五一</span><strong>65%</strong><p>报道中的市外游客占比</p></div>
          <p className="proof-note">这能支持“影视带来显著到访”，但尚不能单独证明牛肉汤贡献了多少旅游收入。<Cite id={6} /><Cite id={19} /></p>
        </div>
      </section>

      <section className="reflection-section page-section" id="reflection">
        <div className="section-heading light-heading">
          <div><p className="section-kicker">05 · WHAT GETS LOST</p><h2>何处失真：被看见的越多，被遗忘的也可能越多。</h2></div>
          <p>媒介记忆从来具有选择性。高传播效率会放大鲜明符号，也会挤压复杂历史、地方差异与传承人的声音。</p>
        </div>
        <div className="risk-grid">
          <article><b>01</b><h3>传说吞没历史</h3><p>“两千年前已经喝同款牛肉汤”比“楚国存在牛肉烹饪与礼制”更易传播，却把推论包装成事实。</p><span>建议：所有起源叙事标记证据等级。</span></article>
          <article><b>02</b><h3>标准抹平差异</h3><p>食品安全与品质底线需要标准，但清汤、红汤、香料与配料的门店差异也是地方知识。</p><span>建议：标准化底线，不标准化全部风味。</span></article>
          <article><b>03</b><h3>流量替代传承</h3><p>节庆、直播和大屏曝光制造即时可见度，不等于技艺已被下一代掌握。</p><span>建议：公布学徒、传习活动和传承人收益。</span></article>
          <article><b>04</b><h3>产业数字遮蔽口径</h3><p>产值、门店和就业数据频繁跃升，但统计边界与方法较少公开。</p><span>建议：建立年度可复核统计表与方法说明。</span></article>
        </div>
        <blockquote>
          <p>非遗保护不是把一种做法冻结成唯一标准，而是确保知识、技能与意义仍能被社区持续传递和重新创造。</p>
          <cite>基于 UNESCO《保护非物质文化遗产公约》与传承原则的概括 <Cite id={37} /><Cite id={38} /></cite>
        </blockquote>
      </section>

      <section className="research-section page-section">
        <div className="section-heading">
          <div><p className="section-kicker">06 · RESEARCH AGENDA</p><h2>从网站走回论文：四个可验证的研究命题。</h2></div>
          <p>以下不是资料原话，而是基于公开材料形成、可继续用访谈和平台数据检验的研究假设。</p>
        </div>
        <div className="proposition-list">
          <article><span>P1</span><div><h3>感官锚定命题</h3><p>热、辣、香、汤锅与烧饼形成稳定的视听—味觉符号，使牛肉汤比抽象城市口号更容易被记住。</p></div><em>验证：感官民族志、食客深访、短视频画面编码</em></article>
          <article><span>P2</span><div><h3>事件触发命题</h3><p>考古与影视不是孤立热点，而是把既有地方记忆短时间推入全国公共视野的“记忆加速器”。</p></div><em>验证：事件前后搜索指数、报道框架、评论时序</em></article>
          <article><span>P3</span><div><h3>话语协商命题</h3><p>“正宗”并非固定属性，而是政府标准、企业品牌、传承人技艺与食客经验持续协商的结果。</p></div><em>验证：政策文本、品牌材料、门店与传承人访谈</em></article>
          <article><span>P4</span><div><h3>线上—线下闭环命题</h3><p>媒介曝光只有被线路、场馆、门店与商品承接，才会从注意力转化为地方空间与产业价值。</p></div><em>验证：游客来源、消费路径、网销与到访的关联数据</em></article>
        </div>
      </section>

      <section className="video-section page-section">
        <div className="section-heading">
          <div><p className="section-kicker">WATCH THE MEMORY BEING MADE</p><h2>公开视频不是装饰，而是研究样本。</h2></div>
          <p>从2022年的消费节目到2025年的非遗舞台，同一碗汤在不同节目类型中被赋予不同意义。点击前往原发布页。</p>
        </div>
        <div className="video-grid">
          {[22, 23, 24, 25, 26, 27, 28].map((id, index) => {
            const source = sourceById(id);
            return (
              <a className="video-card" key={id} href={source.url} target="_blank" rel="noreferrer">
                <div className={`video-visual visual-${(index % 4) + 1}`}><span className="play">▶</span><b>{source.date.slice(0, 4)}</b></div>
                <span>{source.publisher}</span>
                <h3>{source.title}</h3>
                <p>{source.note}</p>
                <em>观看原视频 ↗</em>
              </a>
            );
          })}
        </div>
      </section>

      <section className="sources-section page-section" id="sources">
        <div className="section-heading">
          <div><p className="section-kicker">SOURCE LEDGER</p><h2>来源档案：38项网页、文章、视频与学术资料。</h2></div>
          <p>资料采集截至2026年8月17日。来源链接均指向原始页面；“官方来源”意味着发布主体明确，并不自动消除自报口径与宣传倾向。</p>
        </div>
        <div className="source-filters" role="group" aria-label="筛选来源类型">
          {["全部", "政策/统计", "新闻/专题", "视频", "学术/典籍"].map((filter) => (
            <button key={filter} className={sourceFilter === filter ? "active" : ""} onClick={() => setSourceFilter(filter)}>
              {filter}<span>{filter === "全部" ? sources.length : sources.filter((source) => source.type === filter).length}</span>
            </button>
          ))}
        </div>
        <div className="source-list">
          {filteredSources.map((source) => (
            <a href={source.url} target="_blank" rel="noreferrer" className="source-row" key={source.id}>
              <span className="source-id">{String(source.id).padStart(2, "0")}</span>
              <div className="source-main"><div><span className={`source-type type-${source.type.replace("/", "-")}`}>{source.type}</span><span className="source-meta">{source.date} · {source.publisher}</span></div><h3>{source.title}</h3><p>{source.note}</p></div>
              <span className="source-open">↗</span>
            </a>
          ))}
        </div>
      </section>

      <section className="method-section page-section">
        <div>
          <p className="section-kicker">METHOD & LIMITS</p>
          <h2>研究说明</h2>
        </div>
        <div className="method-grid">
          <article><h3>做了什么</h3><p>交叉阅读地方政府、监管部门、权威媒体、央视视频、典籍与学术研究；把事实、公开口径、传说与分析推断分层。</p></article>
          <article><h3>尚未做什么</h3><p>没有抓取抖音、小红书等平台全量数据，没有进行传承人、门店经营者和食客访谈，也没有独立审计产业产值。</p></article>
          <article><h3>如何继续</h3><p>下一阶段应建立事件型平台语料库、开展多主体访谈，并索取全产业链统计定义、样本与计算方法。</p></article>
        </div>
      </section>

      <footer>
        <div><span className="brand-mark">淮</span><p>淮南牛肉汤媒介记忆研究志<br /><small>公开资料型可视化研究 · 2026</small></p></div>
        <p>一碗汤会冷却，记忆仍在沸腾。</p>
        <a href="#top">回到开头 ↑</a>
      </footer>
    </main>
  );
}
