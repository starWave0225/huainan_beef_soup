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
  { id: 39, type: "学术/典籍", date: "2025", publisher: "Oxford University Press", title: "Literature, Film, and the Mediality of Cultural Memory", note: "Astrid Erll从记忆生产、再媒介化、预媒介化与平台化解释文学、影视和数字媒介的记忆能动性。", url: "https://academic.oup.com/book/59997/chapter-abstract/513457263" },
  { id: 40, type: "学术/典籍", date: "2018", publisher: "Routledge", title: "Digital Memory Studies: Media Pasts in Transition", note: "Andrew Hoskins主编，讨论数字连接、档案、记忆经济及网络控制共同造成的记忆悖论。", url: "https://www.routledge.com/Digital-Memory-Studies-Media-Pasts-in-Transition/Hoskins/p/book/9781138639379" },
  { id: 41, type: "学术/典籍", date: "2005", publisher: "Wiley", title: "City Branding: An Effective Assertion of Identity or a Transitory Marketing Trick?", note: "Kavaratzis与Ashworth提醒城市品牌不应被简化为产品营销，需要处理地方身份、公共治理与形象传播的关系。", url: "https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1467-9663.2005.00482.x" },
  { id: 42, type: "学术/典籍", date: "2016", publisher: "Annals of Tourism Research", title: "Place branding performances in tourist local food shops", note: "以地方食品商店为场域，说明城市品牌通过物质、话语和身体实践共同被表演出来。", url: "https://www.sciencedirect.com/science/article/pii/S0160738316300901" },
  { id: 43, type: "学术/典籍", date: "2018", publisher: "SAGE", title: "Content Analysis: An Introduction to Its Methodology（第4版）", note: "Krippendorff关于分析单位、编码、信度和效度的经典方法教材，可支撑平台文本与视频内容分析。", url: "https://collegepublishing.sagepub.com/products/content-analysis-4-258450" },
  { id: 44, type: "学术/典籍", date: "2006", publisher: "Qualitative Research in Psychology", title: "Using thematic analysis in psychology", note: "Braun与Clarke提出灵活的主题分析路径，可用于访谈材料的熟悉、编码、主题生成与修订。", url: "https://www.tandfonline.com/doi/abs/10.1191/1478088706qp063oa" },
  { id: 45, type: "学术/典籍", date: "2015", publisher: "UNESCO", title: "Ethical Principles for Safeguarding Intangible Cultural Heritage", note: "十二项伦理原则强调社区主体、持续知情同意、物质与精神收益，以及对去语境化、商品化和误表征风险的共同判断。", url: "https://ich.unesco.org/en/ethics-and-ich-00866" },
  { id: 46, type: "学术/典籍", date: "持续更新", publisher: "UNESCO", title: "Safeguarding without freezing", note: "非遗保护的对象是仍被社区认可、持续再创造和代际传递的活态实践，而不是冻结唯一版本。", url: "https://ich.unesco.org/en/safeguarding-00012" },
  { id: 47, type: "新闻/专题", date: "2025-03", publisher: "淮南市文化和旅游局", title: "《六姊妹》粉丝见面会暨万人共品淮南牛肉汤活动", note: "电视剧、地方美食、方言挑战和万人共食被同场编排，是影视记忆转为城市仪式的关键案例。", url: "https://wlj.huainan.gov.cn/xwzx/xwtt/551804997.html" },
  { id: 48, type: "新闻/专题", date: "2025-03", publisher: "淮南市纪检监察网", title: "巡察监督护航《六姊妹》取景地“出圈”", note: "披露地方使用微信、微博、抖音、媒体拍摄和文旅项目库承接影视热度，也记录取景地保护与服务短板。", url: "https://www.hnjjjc.gov.cn/html/wenzhang_745447.html" },
  { id: 49, type: "新闻/专题", date: "2025-02", publisher: "淮南日报", title: "“一城双响”赋能淮南文旅融合发展", note: "将武王墩考古与《六姊妹》并置为城市热点，并明确提出用故事、线路和空间设施把传播热度转为文旅体验。", url: "https://hnrb.huainannet.com/content/202502/26/content_201727.html" },
  { id: 50, type: "政策/统计", date: "2025-08", publisher: "淮南市发展和改革委员会", title: "2025年上半年国民经济和社会发展计划执行情况", note: "披露牛肉汤全产业链招引项目21个、总投资10.8亿元、产值增长20.1%；属于行政统计口径，仍需索取计算边界。", url: "https://fgw.huainan.gov.cn/public/118319839/1260821604.html" },
  { id: 51, type: "政策/统计", date: "2025-05", publisher: "淮南市人民政府", title: "淮南牛肉汤产业升级政策负责人解读", note: "说明机场、高铁站、服务区、商圈和景区门店奖补，显示政策如何主动把地方食品嵌入流动空间。", url: "https://www.huainan.gov.cn/public/6596035/1260760606.html" },
  { id: 52, type: "政策/统计", date: "2009", publisher: "安徽省质量技术监督局", title: "DB34/T 929—2009 淮南牛肉汤制作技术规范", note: "早期地方标准明确主辅料、熬汤、烫制与卫生要求；适合研究“正宗”如何被技术文本固定，不宜当作2026年现行合规结论。", url: "https://www.huainan.gov.cn/download/5c78f201e4b05014fd4554c5" },
  { id: 53, type: "学术/典籍", date: "2024", publisher: "安徽省农业科学院机构知识库", title: "淮南牛肉汤风味特征研究进展", note: "汇总风味与地方性研究，同时把赵匡胤、回民起源并列为传说，恰好说明学术文本也会参与起源叙事再生产。", url: "https://ahas.agriir.cn/resources/detail/1/24CCB6E6-065A-4E88-B70A-988F3237DDE4.html?projectId=405fc0ca-2997-11e7-b5f5-3440b5b17484" },
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

const chapterBlueprints = [
  {
    label: "绪论 / 第一章",
    question: "为什么要从媒介记忆，而不只从美食传播研究？",
    claim: "研究对象不是一碗固定不变的汤，而是传说、技艺、身体经验、影视形象、政策文本和平台内容如何共同把它生产为城市记忆。",
    evidence: "以文献综述厘清“媒介记忆—食物记忆—城市品牌—非遗活化”四组研究，并指出现有研究较少解释它们之间的过程关系。",
    boundary: "绪论要提出机制问题，避免把“知名度提升”直接等同于“记忆建构完成”。",
    sources: [31, 32, 35, 39, 40, 41, 42],
  },
  {
    label: "第二章 · 因何记忆",
    question: "哪些资源使淮南牛肉汤具有可记忆性？",
    claim: "可记忆性来自三种资源叠加：传说提供可讲述的时间纵深，典籍与考古提供可视化物证感，矿城早餐和制作技艺提供可体验的身体记忆。政策、市场、非遗与乡愁则把这些资源推入传播。",
    evidence: "对传说文本、考古报道、地方标准、非遗节目和产业政策进行跨文本比较，观察同一对象如何被赋予不同时间尺度。",
    boundary: "考古牛骨、古代烹牛文字与现代菜品之间不存在可直接证明的连续配方链。",
    sources: [10, 14, 21, 24, 28, 29, 30, 52, 53],
  },
  {
    label: "第三章 · 如何记忆",
    question: "记忆如何被激活、重构并在多重话语中协商？",
    claim: "考古、电视剧和节庆构成事件触发器；新闻、短视频、直播与线下活动进行再媒介化；“千年、非遗、烟火气、正宗”等高频符号完成压缩编码；官方、商业和民间主体再争夺解释权。",
    evidence: "以武王墩、《六姊妹》、万人共品和集体商标为事件链，比较事件前后报道框架、镜头符号、评论主题与政策承接。",
    boundary: "平台热度只能证明可见性变化；集体记忆还需由受众复述、认同与实践材料证明。",
    sources: [17, 23, 25, 27, 39, 40, 47, 48, 49],
  },
  {
    label: "第四章 · 记忆转化",
    question: "记忆怎样转为情感认同、空间流量和产业价值？",
    claim: "个人味觉通过公开叙事聚合为集体身份；影视景观通过线路、门店和活动转为身体到场；标准、商标、包装和电商则让地方记忆成为可复制、可携带的符号资本。",
    evidence: "将游客报道、文旅活动、网销口径、政策奖补和产业数据组成转化链，而不是孤立罗列增长数字。",
    boundary: "游客增长、产业增长与媒介事件同期发生不等于单一因果；必须保留其他政策、季节和市场因素。",
    sources: [3, 6, 8, 18, 19, 32, 33, 41, 42, 47, 50, 51],
  },
  {
    label: "第五章 · 记忆障碍",
    question: "谁被突出、谁被删除，哪些传播会损伤地方性？",
    claim: "可传播逻辑偏爱帝王传说和宏大数字；标准化可能压缩门店差异；碎片化内容可能用视觉奇观代替技艺语境；年轻受众的二次创作也可能与老一代生活记忆断裂。",
    evidence: "对同一历史主张的不同表述、标准条款与门店实践、宣传视频与传承人访谈进行反例分析。",
    boundary: "不能预设商业化必然损害非遗；关键判断标准是社区参与、收益、公平表达和持续传承。",
    sources: [5, 9, 36, 37, 38, 45, 46, 52],
  },
  {
    label: "结语 · 研究启示",
    question: "媒介记忆如何赋能城市，同时避免把地方性变成空壳？",
    claim: "有效的城市符号不是政府单向设计的口号，而是地方生活、公共治理、商业网络与受众实践持续协商的结果；非遗传播的目标应从曝光量转向传承能力与社区受益。",
    evidence: "用城市品牌理论解释身份—形象关系，用UNESCO原则提出传承人参与、数据透明和差异化保护指标。",
    boundary: "结论应回到机制与条件，避免再次用“打造名片、促进发展”替代研究发现。",
    sources: [2, 36, 37, 41, 42, 45, 46],
  },
];

const codingRows = [
  ["记忆资源", "传说 / 考古典籍 / 市井生活 / 非遗技艺 / 工业城市", "文本把牛肉汤的过去锚定在哪里？"],
  ["时间框架", "楚汉—五代 / 矿业城市 / 改革开放 / 数字当下", "是否把断裂的时期压缩成连续历史？"],
  ["核心符号", "大鼎 / 红油 / 热气 / 粉丝豆饼 / 老街矿区 / 家", "哪些视觉、听觉和味觉线索被重复？"],
  ["叙事框架", "千年历史 / 非遗 / 家乡味 / 城市名片 / 百亿产业", "内容优先让受众记住什么？"],
  ["主体位置", "政府 / 媒体 / 企业 / 传承人 / 门店 / 游客 / 本地居民", "谁在发言，谁只作为背景出现？"],
  ["媒介行动", "报道 / 剧情植入 / 直播 / 评论 / 打卡 / 购买 / 共食", "记忆如何从观看进入实践？"],
  ["情感线索", "乡愁 / 家庭 / 自豪 / 新奇 / 怀旧 / 争议", "情感怎样连接个人与城市共同体？"],
  ["证据强度", "可核事实 / 公开口径 / 地方传说 / 研究推断", "陈述是材料事实还是作者解释？"],
];

const videoCodingRows = [
  { id: 22, genre: "消费生活节目", frame: "地方美食 + 历史文化", use: "建立2022年的媒介基线：镜头怎样把食材、热气和历史故事组合为“地方名片”。" },
  { id: 23, genre: "新闻联播", frame: "重大考古 + 中华文明", use: "分析国家级新闻如何制造城市历史可见度；不能把考古报道直接编码为牛肉汤起源证据。" },
  { id: 24, genre: "深度新闻", frame: "专家解释 + 礼制饮食", use: "记录专家如何限定黄牛遗存的解释范围，可与地方传播中的“千年同款”进行对照。" },
  { id: 25, genre: "电视剧主创访谈", frame: "家庭记忆 + 地方生活", use: "分析“家、代际、迁徙、烟火气”怎样成为观众理解淮南的预媒介框架。" },
  { id: 26, genre: "新华社短视频", frame: "万人共食 + 文旅动能", use: "观察影视IP、地方仪式、镜头人群和消费场景怎样共同完成事件化传播。" },
  { id: 27, genre: "非遗文化节目", frame: "技艺展示 + 国家舞台", use: "编码选料、熬制、动作、传承人话语与舞台化效果，讨论“技艺”是否被视觉奇观遮蔽。" },
  { id: 28, genre: "新闻联播", frame: "科技检测 + 楚国礼乐", use: "分析检测结果怎样被转化为公共记忆；与2024报道比较同一考古事件的累积性再生产。" },
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
          <a href="#thesis">论文地图</a>
          <a href="#evidence">证据</a>
          <a href="#mechanism">机制</a>
          <a href="#blueprint">逐章论证</a>
          <a href="#draft">正文底稿</a>
          <a href="#methods">方法</a>
          <a href="#sources">53项来源</a>
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
            <a className="primary-action" href="#thesis">进入论文地图</a>
            <span>53项公开来源 · 7条视频 · 6章论证施工图</span>
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
          <li><b>05</b> 如何验证</li>
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

      <section className="thesis-section page-section" id="thesis">
        <div className="section-heading">
          <div><p className="section-kicker">THESIS ARCHITECTURE</p><h2>先确定论文真正要解释的，不是“它有多火”。</h2></div>
          <p>你的提纲已经具备完整过程链。下面把标题转成可以回答、可以搜集材料、也可以被反驳的研究问题。</p>
        </div>

        <div className="central-question">
          <span>核心研究问题</span>
          <p>在数字媒介与地方文化产业协同发展的语境中，淮南牛肉汤如何经由多主体、多媒介的选择、编码、再媒介化与实践转化，从地方日常饮食成为集体记忆和城市符号；这一过程中又发生了哪些失真、排除与地方性损耗？</p>
          <small>可直接用于绪论“研究问题”，正文再将“如何”拆解为下列五个子问题。</small>
        </div>

        <div className="research-question-grid">
          <article><b>RQ1</b><h3>资源条件</h3><p>哪些传说、物证、技艺和日常经验使它具有可记忆性？哪些是历史证据，哪些只是记忆资源？</p></article>
          <article><b>RQ2</b><h3>建构机制</h3><p>考古、影视、短视频、新闻、直播和线下活动如何激活并重构这些资源？</p></article>
          <article><b>RQ3</b><h3>主体协商</h3><p>政府、媒体、企业、传承人、门店与食客分别生产何种“正宗”与城市想象？</p></article>
          <article><b>RQ4</b><h3>价值转化</h3><p>个人味觉如何聚合为集体身份，线上注意力又如何进入空间到访、购买和产业链？</p></article>
          <article><b>RQ5</b><h3>障碍与边界</h3><p>选择性记忆、碎片化、标准化和商业化在何种条件下损伤历史深度与地方性？</p></article>
        </div>

        <div className="theory-heading">
          <p className="section-kicker">LITERATURE REVIEW · FOUR LENSES</p>
          <h3>文献综述不要四块平铺，而要让四种理论各自解释一个环节。</h3>
        </div>
        <div className="theory-grid">
          <article>
            <span>01 · 媒介记忆</span>
            <h3>解释“记忆怎样被媒介生产”</h3>
            <p>van Dijck强调媒介技术参与个人与文化记忆；Erll用“再媒介化”说明记忆在文学、影视、新闻和数字平台之间持续转写；Hoskins进一步揭示网络连接同时带来活化与控制<Cite id={31} /><Cite id={35} /><Cite id={39} /><Cite id={40} />。</p>
            <em>放入：国内外研究现状、第三章机制分析</em>
          </article>
          <article>
            <span>02 · 食物记忆</span>
            <h3>解释“为什么味道能连接身份”</h3>
            <p>食物同时牵动感官、身体、怀旧、族群与被发明的传统；字幕、弹幕和评论又能把私人味觉唤醒为可公开交流的地方记忆<Cite id={32} /><Cite id={33} />。</p>
            <em>放入：第二章可记忆性、第四章情感共鸣</em>
          </article>
          <article>
            <span>03 · 城市品牌</span>
            <h3>解释“地方身份怎样变成城市形象”</h3>
            <p>城市品牌不只是宣传口号，而是地方身份、公共治理和外部形象之间的协商；地方食品商店中的商品、空间、讲述和身体体验都在共同“表演”地方<Cite id={41} /><Cite id={42} />。</p>
            <em>放入：第四章城市符号、结语现实启示</em>
          </article>
          <article>
            <span>04 · 活态非遗</span>
            <h3>解释“保护与商业化的判断标准”</h3>
            <p>非遗应由社区持续再创造和传递。商业使用并非天然有害，关键在知情参与、公平受益、语境保存以及传承人的实际能力<Cite id={37} /><Cite id={38} /><Cite id={45} /><Cite id={46} />。</p>
            <em>放入：第五章问题反思、非遗保护启示</em>
          </article>
        </div>

        <aside className="innovation-callout">
          <span>可形成的创新点</span>
          <p>把“资源—事件触发—符号编码—话语协商—情感/空间/产业转化—再归档”作为一条完整机制链，并用证据等级控制地方传说、宣传口径与研究推断之间的越界。</p>
        </aside>
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

      <section className="blueprint-section page-section" id="blueprint">
        <div className="section-heading light-heading">
          <div><p className="section-kicker">CHAPTER-BY-CHAPTER ARGUMENT MAP</p><h2>逐章论证施工图：每一章都要有主张、材料与边界。</h2></div>
          <p>这些不是替你写好的结论，而是可被资料支持、也允许反例修正的论证骨架。每章末尾的“边界”尤其重要，它能避免论文停留在宣传材料复述。</p>
        </div>
        <div className="chapter-list">
          {chapterBlueprints.map((chapter, index) => (
            <article key={chapter.label}>
              <div className="chapter-index"><span>{String(index + 1).padStart(2, "0")}</span><b>{chapter.label}</b></div>
              <div className="chapter-body">
                <p className="chapter-question">{chapter.question}</p>
                <div className="chapter-block"><span>本章核心判断</span><p>{chapter.claim}</p></div>
                <div className="chapter-block"><span>证据组织方式</span><p>{chapter.evidence}</p></div>
                <div className="chapter-boundary"><span>论证边界</span><p>{chapter.boundary}</p></div>
                <div className="chapter-cites">建议证据 {chapter.sources.map((id) => <Cite key={id} id={id} />)}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="draft-section page-section" id="draft">
        <div className="essay-shell">
          <div className="section-heading draft-heading">
            <div><p className="section-kicker">READABLE CHINESE · WORKING DRAFT</p><h2>正文论述底稿：把材料讲明白，把判断说完整。</h2></div>
            <p>下面不是把网页卡片机械扩写，而是按照“提出判断—摆出材料—解释关系—交代边界—回扣问题”的顺序，示范一篇中文论文怎样既有学术分寸，又让普通读者读得懂。</p>
          </div>

          <aside className="draft-disclaimer">
            <b>使用说明</b>
            <p>这些段落可以作为第二至第五章和结语的写作底稿，但不能直接冒充已经完成的实证结论。公开资料能够支持“媒体、政策和产业主体说了什么”，却不能代替本地居民究竟如何记忆、游客为何到访、平台用户是否接受这些叙事。涉及受众效果的地方，正文都保留了“还需访谈、抽样或统计验证”的限定。</p>
          </aside>

          <article className="essay-chapter">
            <header><span>第二章</span><div><p>因何记忆</p><h3>淮南牛肉汤为什么容易被记住</h3></div></header>
            <div className="essay-prose">
              <p>讨论淮南牛肉汤的历史，最容易落入一个看似合理、其实解释力很弱的说法：因为它“历史悠久”，所以它自然成了城市记忆。问题在于，年代久并不等于今天的人一定记得，更不等于不同的人记得的是同一件事。真正需要解释的是，一些散落在典籍、传说、街巷和家庭生活中的材料，为什么能够在今天被重新挑选出来，又为什么恰好能同“淮南”这个城市名称牢牢连接。换句话说，本章寻找的不是一碗汤唯一而准确的出生日期，而是它成为记忆对象所依赖的几类资源。</p>
              <p>第一类资源是地方传说。刘安炼丹、赵匡胤困寿春等故事之所以反复出现，不是因为它们已经完成了严格的史实证明，而是因为它们把复杂的饮食史压缩成了人物、困境和转折：一个有名的人来到此地，在关键时刻喝下一碗汤，于是地方、历史与食物被接成一条容易复述的线。地方政府和产业活动仍会调用这类故事<Cite id={10} /><Cite id={21} />，说明传说确实具有现实传播能力。但论文不能顺着传播材料，把“经常被讲述”写成“已经被证实”。比较稳妥的表述是：这些传说为牛肉汤提供了可讲述的过去，是地方记忆的资源，而不是菜品起源的直接证据。</p>
              <p>第二类资源是典籍与考古所带来的“物证感”。《淮南子》中确实能够找到关于屠牛、烹肉和煎熬燎炙的文字<Cite id={29} />；武王墩考古也确认了高等级楚墓、青铜鼎和动物遗存，后续节目谈到黄牛等动物曾经历烹饪<Cite id={14} /><Cite id={24} /><Cite id={28} />。这些材料能够证明古代淮南地区存在牛肉烹饪观念和相关礼制生活，却不能一步推出今天的淮南牛肉汤已经原样延续两千年。这里至少跨过了“牛的遗存—牛肉烹饪—汤类食物—现代地方菜”几个不同层次。也正因为普通读者很难在短视频或新闻标题中停下来辨认这些层次，考古画面才容易同熟悉的菜名接合，形成一种很有说服力、却需要学术辨析的历史想象。</p>
              <p>第三类资源来自近现代城市生活。与帝王传说相比，矿区清晨、街边炉火、回民牛肉技艺以及上班前的一顿热汤，可能更接近许多淮南人的实际经验。地方资料把现代牛肉汤的兴起同回民饮食技艺、矿区生活条件、市场流通和改革开放后的制度环境联系起来<Cite id={21} /><Cite id={30} />；早期制作规范又把主辅料、熬汤和烫制等做法写进技术文本<Cite id={52} />。这些材料提醒我们，牛肉汤的地方性不只在“古”，也在无数重复发生的日常场景中。热气、辣味、汤锅声和共同进食所留下的是身体记忆：人们未必能说清一段完整历史，却能凭气味、温度和吃法认出“这是家乡”。食物与记忆研究所强调的感官、怀旧和身份联系，正可以解释这种经验为什么比抽象口号更牢固<Cite id={32} /><Cite id={33} />。</p>
              <p>因此，淮南牛肉汤的“可记忆性”并不是由一条不间断的历史线单独保证的，而是由三种力量叠加而成：传说让它容易讲，物证让它显得有历史根据，日常生活则让人能够用身体反复确认。近年来的非遗认定、产业政策与品牌建设，又把原本分散的资源组织进公共叙事<Cite id={1} /><Cite id={18} /><Cite id={37} />。本章由此得到的不是“起源已经查清”的结论，而是一个更适合后文分析的起点：牛肉汤本来就拥有多种可被调用的记忆材料，媒介传播要做的，是从中选择某些部分、赋予某种顺序，并让它们在新的事件中再次变得可见。</p>
            </div>
          </article>

          <article className="essay-chapter">
            <header><span>第三章</span><div><p>如何记忆</p><h3>媒介不是搬运记忆，而是在重新安排记忆</h3></div></header>
            <div className="essay-prose">
              <p>如果把媒介理解成一个透明容器，就会以为新闻、电视剧和短视频只是把早已存在的牛肉汤故事送到更多人面前。媒介记忆研究提供了不同看法：媒介技术会决定什么更容易保存、什么更方便分享，也会改变私人经验进入公共讨论的方式<Cite id={31} />；同一段过去在典籍、电视、新闻和社交平台之间不断转写，每一次转写都会增加新的重点，同时省略原来的语境<Cite id={35} /><Cite id={39} />。因此，研究重点不只是统计牛肉汤“出现了多少次”，还要追问它以什么画面出现、同哪些人物和情绪绑定，又有哪些复杂内容在传播中被删掉。</p>
              <p>武王墩考古是观察这种选择过程的第一个窗口。考古报道原本关心墓葬形制、器物制度、动物遗存和楚国礼制，央视新闻与专题节目也保留了相当多的专业说明<Cite id={23} /><Cite id={24} />。但当内容进入地方宣传和平台二次传播后，最容易被记住的往往是“大鼎”“黄牛”“两千多年”这些视觉明确、情绪强烈的词。它们又同本地最知名的食物相遇，于是专业考古问题被迅速翻译成“古人是否也喝牛肉汤”的通俗问题。这样的翻译未必全是错误，它确实降低了公众接近考古的门槛；真正的问题在于，传播者是否说明了证据能够走到哪一步，还是利用考古的权威感填补了中间尚未证明的环节。</p>
              <p>电视剧《六姊妹》构成了另一种记忆生产。牛肉汤在剧中并不是由人物站出来介绍历史，而是被放进家庭、邻里和城市日常：人物围桌吃饭、谈论生活，地方食物因此同“家”以及代际关系一起出现。主创访谈强调家庭与地方生活的情感框架<Cite id={25} />，相关报道则记录了剧中食物、演员短视频和游客打卡之间的联系<Cite id={17} />。这种表达比知识讲解更容易产生亲近感，因为观众首先记住的不是配方，而是“这一家人在这样的地方生活”。不过，论文若要进一步说观众由此产生了乡愁或城市认同，仍需分析弹幕、评论和访谈；仅凭剧情反复出现，最多只能判断文本提供了这种情感可能。</p>
              <p>影视播出以后，记忆并没有停在屏幕上。地方部门把粉丝见面会、方言互动和万人共品牛肉汤安排在同一场活动中<Cite id={47} />；微信、微博、抖音、媒体报道和取景地建设又继续承接电视剧热度<Cite id={48} />。牛肉汤由剧情中的生活道具，变成短视频中的可模仿内容、活动中的共同进食仪式，以及游客抵达淮南后可以完成的体验。Erll所说的“再媒介化”在这里不是抽象术语，而是一个很具体的过程：一个画面被新闻解释，被短视频剪短，被活动重新表演，再被游客拍摄上传。每次传播都声称在重复原来的记忆，实际却已经生产了新版本。</p>
              <p>这一过程还涉及不同主体之间的解释权。政府倾向于把牛肉汤放进非遗、产业和城市品牌框架，以标准、商标和政策目标赋予它统一名称<Cite id={1} /><Cite id={3} /><Cite id={5} />；企业更关心怎样把味道做成可以运输、加盟和下单的商品<Cite id={8} />；老店、传承人和本地食客则可能用汤色、香料、吃法甚至店主关系来判断是否“地道”。这三种说法并不简单对应真假，而是分别回答治理、经营和生活经验中的问题。所谓“正宗”，也就不是藏在某份文件里等待发现的固定答案，而是各方不断协商的结果。内容分析应当比较谁的声音更常被媒体引用，访谈则要进一步追问谁在标准制定和品牌收益中拥有实际发言权。</p>
              <p>综上，淮南牛肉汤的媒介记忆可以理解为一个循环：历史和日常提供素材，考古或影视事件触发关注，媒体用“千年”“非遗”“烟火气”等词完成编码，不同主体围绕这些词进行协商，随后产生观看、评论、购买和到访；这些新活动留下的图像、数据与故事，又成为下一轮传播的素材。数字网络使记忆更容易被参与和更新，也让平台排序、热度竞争与商业目标介入记忆的可见性<Cite id={34} /><Cite id={40} />。这比“媒介提高了知名度”更接近论文需要解释的机制，因为它同时说明了记忆如何被生产、如何流动，也为后文讨论它怎样转化为城市价值留下了接口。</p>
            </div>
          </article>

          <article className="essay-chapter">
            <header><span>第四章</span><div><p>记忆转化</p><h3>从个人味觉到城市符号，中间发生了什么</h3></div></header>
            <div className="essay-prose">
              <p>一位本地人记得小时候在哪里喝汤，首先是一段私人经验；当许多人通过家庭讲述、影视画面和平台评论发现彼此拥有相似经验时，私人记忆才可能汇成集体认同。食物在这里有一个特殊优势：它既能被讲述，也能被重新吃到。观众看到《六姊妹》中的家庭生活后，可以在评论区讲自己的家乡早餐，也可以在来到淮南后用一碗热汤检验屏幕想象。已有研究表明，媒介中的食物能够通过字幕、评论等互动唤醒地方记忆<Cite id={33} />，但对于淮南案例，仍需用平台评论和访谈确认这种唤醒具体发生在谁身上，而不能把理论可能性直接写成所有观众的共同反应。</p>
              <p>第二种转化是从观看到身体到场。电视剧取景地、街区、门店和节庆把屏幕中的抽象“淮南”变成可以走、看、拍和品尝的空间。公开报道显示，2025年春季九龙岗时光小镇出现明显客流，五一报道给出的口径为日均接待游客约1.5万人次，其中市外游客占比超过六成<Cite id={19} />；另一份地方材料称该地日均游客超过1.2万人次<Cite id={6} />。这些数字能够说明影视热点与到访增长在时间上相伴，却不能单独证明每一位游客都因电视剧或牛肉汤而来。更严谨的研究需要结合游客来源、出行动机、消费路线和同期基线，才能判断屏幕记忆到底贡献了多少新增到访。</p>
              <p>第三种转化发生在商品与流通空间中。方便装、冷冻产品、电商直播和连锁门店，让牛肉汤离开本地餐桌后仍能携带“淮南”名称；机场、高铁站、服务区、商圈和景区门店的奖补政策，又主动把它放进人口流动频繁的地点<Cite id={8} /><Cite id={51} />。地方食品由此不仅被消费，也承担起城市标识的功能：购买者带走的是产品，同时也带走一套关于产地、味道和地方文化的说明。城市品牌研究提醒我们，这并不是给商品贴一个城市标签那么简单。品牌能否长期成立，还取决于本地生活是否认可这种形象、公共治理能否兑现品质承诺，以及游客实际经验是否同宣传相符<Cite id={41} /><Cite id={42} />。</p>
              <p>产业政策则为转化提供了组织和基础设施。行动方案把产品规模、网络传播和文旅消费放进同一发展路径<Cite id={1} />；集体商标、授权名单与地方条例逐步把“淮南牛肉汤”变成可管理的公共品牌<Cite id={2} /><Cite id={3} /><Cite id={4} />；2025年计划执行报告还披露了项目投资和产值增长<Cite id={50} />。这说明政策不是站在传播之外进行总结，而是在决定哪些主体可以使用名称、哪些场景优先获得资源、哪些数字成为城市成绩。也正因如此，论文不能只问媒体怎样报道政策，还要把政策看作记忆建构的行动者：它把某种地方记忆转化为标准、门店、线路和统计口径，使之在现实空间中持续出现。</p>
              <p>因此，本章所说的“转化”至少包括情感、空间和产业三个层次。味觉经验通过公共叙事成为身份表达，屏幕关注通过取景地和活动变成身体到场，地方名称又通过商标和商品进入更大范围的流通。三者能够互相加强，却不是一条自动发生的因果链。热搜不一定带来长期认同，到访不一定都转为消费，产值增长也不必然意味着地方文化得到了更好保护。论文的价值正在于把这些环节分开测量：用评论和访谈判断情感，用游客调查和路线观察判断空间，用口径透明的统计判断产业，而不是用一个“出圈”概括全部变化。</p>
            </div>
          </article>

          <article className="essay-chapter">
            <header><span>第五章</span><div><p>障碍与反思</p><h3>传播越成功，越要追问哪些东西被省略了</h3></div></header>
            <div className="essay-prose">
              <p>媒介记忆从来不是把过去完整搬到现在，而是从许多材料中选择少数部分。就淮南牛肉汤而言，帝王、古墓和大鼎具有清晰人物与强烈画面，因而更容易成为标题；矿区工人的清晨、回民技艺的传承、普通店主的经营变化和家庭内部的味觉差异，却很难在几十秒视频中获得同样位置。选择本身并不可避免，问题在于被反复选择的故事是否最终垄断了“淮南牛肉汤是什么”的答案。研究者需要主动寻找那些不进入主流宣传的讲述，让城市记忆不仅有显眼的古代，也有普通人的近现代生活。</p>
              <p>碎片化是第二个问题。平台内容为了争夺注意力，常把复杂关系压缩成“千年古方”“一口穿越两千年”之类容易转发的表达。它们将考古、典籍、地方传说和现代菜品放进同一句话，却很少说明证据之间的距离。结果并不只是某个历史细节说错了，更重要的是公众逐渐只剩几个关键词，而看不见这些说法如何形成。对论文而言，纠错不是简单宣布传说“虚假”，而是逐层还原：何者是可核事实，何者是地方长期讲述，何者是机构公开口径，何者只是研究者根据多份材料提出的解释。只有把证据等级写清，论文才不会重复它正在批评的传播逻辑。</p>
              <p>标准化带来的矛盾更复杂。食品安全、原料质量和商标信誉需要共同底线，白名单、制作规范和授权制度也确实回应了市场扩张中的治理问题<Cite id={5} /><Cite id={9} /><Cite id={52} />。但如果标准继续进入所有香料比例、汤色和地方吃法，就可能把原本存在于不同街区、族群和门店中的知识压成一种工业版本。比较可行的原则是“标准化底线，不标准化全部风味”：对卫生、产地标识和质量责任作明确要求，同时给传承人和门店保留解释工艺差异的空间。正式研究还应询问标准由谁起草、哪些经营者参与、未获授权者如何受到影响，而不只根据文件宣布治理已经完成。</p>
              <p>商业化也不应被简单写成文化的敌人。产品销售和旅游收入可以让从业者获得生计，使年轻人愿意学习技艺；没有稳定收益，所谓保护可能只剩节庆表演。真正需要判断的是，商业使用是否让社区和传承人知情参与、是否公平分享物质与精神收益、是否保留技艺原有语境，以及他们能否对误用提出异议。UNESCO的相关原则正是把社区主体与公平受益放在判断中心<Cite id={38} /><Cite id={45} />。因此，研究不能只数直播场次和销售额，还要追踪谁获得收入、谁承担成本、谁的名字与知识被使用。这些问题比笼统批评“过度商业化”更具体，也更可能形成可执行的保护建议。</p>
              <p>最后还要注意代际与平台可见性的差异。年轻人可能先从电视剧和短视频认识牛肉汤，老一辈则更多从家庭劳动、矿区生活和长期消费中理解它；推荐算法又会优先放大节奏快、情绪强、易模仿的版本。由此产生的不是简单的“年轻人不懂传统”，而是不同代际拥有不同的进入路径。活态非遗并不要求下一代原样复制上一代，而强调社区在持续传递中重新创造<Cite id={37} /><Cite id={46} />。研究应当关心年轻人是否有机会接触完整技艺、能否提出自己的表达，也要记录那些播放量不高却保留丰富地方知识的内容。可见度不是价值本身，平台热度更不能替代代际传承。</p>
            </div>
          </article>

          <article className="essay-chapter conclusion-chapter">
            <header><span>结语</span><div><p>回答研究问题</p><h3>一碗汤成为城市记忆，不靠一次“出圈”</h3></div></header>
            <div className="essay-prose">
              <p>综合以上分析，淮南牛肉汤从地方日常食物走向城市符号，并不是某一家媒体、一次考古发现或一部电视剧单独造成的。它首先拥有传说、典籍、考古、技艺和生活经验等多层记忆资源；考古与影视事件把其中一部分推到公共视野；新闻、短视频、活动和政策再用“千年”“非遗”“家乡味”“正宗”等符号重新组织；政府、企业、传承人、门店和食客则在实际使用中继续协商这些符号。记忆最终通过评论、共食、到访、购买、商标和标准进入情感、空间与产业，并把新产生的画面和数据送回下一轮传播。</p>
              <p>这个案例对城市形象研究的启发在于，地方品牌不是宣传部门单向设计的一张名片，而是本地生活、外部观看和公共治理共同完成的关系。一碗汤之所以比抽象口号更有力量，是因为它可以被身体经验验证；它之所以也更容易引起争议，是因为每个人都可能依据自己的口味和生活史判断宣传是否可信。城市形象建设若只追求统一故事，可能获得短期识别度，却削弱长期信任。更稳妥的做法，是让历史证据有边界、让门店差异被看见、让游客真实体验能够反馈到品牌治理中。</p>
              <p>对非遗保护而言，目标也不是固定一份永远不变的配方，而是维持社区继续传承、解释和更新技艺的能力。政策可以公开标准制定者和参与过程，产业报告可以同时公布统计口径与从业者收益，文旅项目可以记录传承活动、学徒成长和社区意见，而不只展示客流与产值。这样的指标未必像热搜数字那样醒目，却更能回答文化是否真正活着。保护与发展并非二选一，关键在于收益、话语权和风险是否由相关社区共同判断。</p>
              <p>最后必须说明，这一结论目前主要建立在公开网页、报道、视频和学术文献之上。它能够较可靠地重建机构叙事和重要传播节点，却还不能代表全部受众经验。下一步应以事件型内容分析、不同主体访谈和线下场景观察检验这条机制链，并认真保留反例。如果调查发现许多本地人并不接受“千年”说法、游客并非因影视到访，或标准化并未明显改变门店实践，这些材料不是对论文的破坏，反而会使结论从一套顺滑故事变成一项真正经得起追问的研究。</p>
            </div>
          </article>

          <section className="plain-writing-toolkit" aria-labelledby="plain-writing-title">
            <div className="toolkit-intro">
              <p className="section-kicker">WRITE LIKE A HUMAN</p>
              <h3 id="plain-writing-title">“说人话”不是不学术，而是不用套话替代分析。</h3>
              <p>判断一句话有没有内容，可以问三个问题：谁做了什么？材料在哪里？这件事为什么能支持你的结论？如果一句话只有“赋能、助推、打造、彰显、路径、机制、场域”，却回答不了这三个问题，就应当重写。</p>
            </div>

            <div className="rewrite-list">
              <article className="rewrite-pair"><div><span>不要这样写</span><p>“淮南牛肉汤在媒介赋能下实现破圈传播，彰显了地方文化的独特魅力。”</p></div><div><span>可以这样写</span><p>牛肉汤并不是因为上了几次热搜，就自动变成了所有人共享的城市记忆。真正发生变化的是：考古、电视剧和短视频先后提供了新的讲述机会，地方部门和商家又把这些关注接到活动、门店与商品上。论文需要分析的，正是关注如何在这些环节之间移动。</p></div></article>
              <article className="rewrite-pair"><div><span>不要这样写</span><p>“深厚的历史底蕴为淮南牛肉汤文化传播奠定了坚实基础。”</p></div><div><span>可以这样写</span><p>所谓“历史底蕴”不是一个无需说明的原因。传说提供了容易复述的人物故事，典籍和考古提供了可以引用、可以展示的材料，街巷早餐则提供了本地人能够亲身确认的经验。三者作用不同，应当分开论证。</p></div></article>
              <article className="rewrite-pair"><div><span>不要这样写</span><p>“《六姊妹》的热播有效促进了城市认同的建构。”</p></div><div><span>可以这样写</span><p>《六姊妹》把牛肉汤放进家庭生活，使观众有机会把这道食物同“家”联系起来；演员短视频、线下活动和游客打卡又延长了这种联系。但“城市认同已经增强”仍需评论分析和访谈证明，不能仅由电视剧热播直接推出。</p></div></article>
              <article className="rewrite-pair"><div><span>不要这样写</span><p>“标准化与品牌化双轮驱动产业高质量发展。”</p></div><div><span>可以这样写</span><p>标准和集体商标解决的是两类具体问题：前者规定质量与安全底线，后者管理谁可以使用“淮南牛肉汤”这一名称。它们有利于建立稳定预期，也可能减少门店差异。是否称得上“高质量”，还要看从业者收益、消费者体验和地方技艺是否得到保留。</p></div></article>
              <article className="rewrite-pair"><div><span>不要这样写</span><p>“数字媒介重塑了淮南牛肉汤的文化记忆场域。”</p></div><div><span>可以这样写</span><p>短视频改变了哪些故事更容易被看见：大鼎、热汤和“千年”标签适合快速剪辑，复杂的制作知识和普通劳动者经历则较难进入热门内容。所谓“重塑”，应当落实为这种可见性次序的变化。</p></div></article>
              <article className="rewrite-pair"><div><span>不要这样写</span><p>“应加强非遗活化利用，实现社会效益与经济效益相统一。”</p></div><div><span>可以这样写</span><p>保护措施可以落到可检查的事情上：公开传承人和门店是否参与标准制定，记录学徒人数与学习周期，说明活动收入怎样分配，并允许社区对误用其知识和名称提出异议。只有这些条件得到满足，经济收益才可能反过来支持传承。</p></div></article>
            </div>

            <div className="paragraph-method">
              <div>
                <span>一段话的五步写法</span>
                <ol>
                  <li><b>观点句</b>先回答这一段想证明什么。</li>
                  <li><b>材料句</b>说明哪份报道、视频或访谈提供了依据。</li>
                  <li><b>分析句</b>解释材料与观点之间为什么有关。</li>
                  <li><b>限定句</b>交代材料还不能证明什么。</li>
                  <li><b>回扣句</b>把这一段接回章节问题。</li>
                </ol>
              </div>
              <div className="paragraph-example">
                <span>完整示范 · 武王墩考古</span>
                <p>武王墩考古对牛肉汤传播的影响，首先是给地方饮食叙事增加了可见的历史材料。政府发布和央视节目确认了大型楚墓、青铜鼎及动物遗存，节目还提到黄牛等动物曾被烹饪<Cite id={14} /><Cite id={24} /><Cite id={28} />。与抽象年代相比，器物和遗存更容易被新闻画面展示，也更容易同今天的地方美食发生联想。不过，这些材料只能支持古代牛肉烹饪与礼制生活，不能证明现代牛肉汤配方连续传承。因此，考古在这里更适合被理解为一次“记忆触发”：它提高了起源叙事的可信感，同时也暴露出媒介传播容易跨越证据边界的问题。</p>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className="methods-lab page-section" id="methods">
        <div className="section-heading">
          <div><p className="section-kicker">METHODS YOU CAN EXECUTE</p><h2>从“搜资料”进入可复核的论文研究设计。</h2></div>
          <p>当前53项公开来源可以作为前期材料库，但不能替代你自己的样本构建。下面给出可直接写入研究方法章节、并能实际执行的方案。</p>
        </div>

        <div className="method-lead">
          <div><span>推荐设计</span><strong>事件型多模态内容分析<br />＋半结构访谈<br />＋场景观察</strong></div>
          <p>内容分析回答“哪些符号和框架被反复生产”，访谈回答“不同主体如何理解和协商这些符号”，场景观察回答“屏幕记忆怎样进入门店、街区、展馆与游客身体”。三种材料相互校验，避免只依据宣传稿判断受众记忆。</p>
        </div>

        <div className="sample-window-heading">
          <span>01 / 事件抽样窗口</span>
          <p>不要抓取一个无限扩张的“所有网络内容”，而应围绕可比较的事件前后建立四个窗口。</p>
        </div>
        <div className="sample-window-grid">
          <article><b>基线窗口</b><span>2022.04—2023.12</span><h3>全国性美食节目与产业叙事</h3><p>以央视《消费主张》和早期政策材料观察考古、影视爆点出现前，牛肉汤如何被描述。</p><em>起始样本 <Cite id={22} /><Cite id={1} /></em></article>
          <article><b>考古窗口</b><span>2024.04—2024.07</span><h3>武王墩进入公共视野</h3><p>比较考古机构、央视、地方媒体与平台二次传播，重点编码“牛骨—牛肉—牛肉汤”的推论跳跃。</p><em>起始样本 <Cite id={14} /><Cite id={23} /><Cite id={24} /></em></article>
          <article><b>影视窗口</b><span>2025.02—2025.05</span><h3>《六姊妹》与万人共食</h3><p>追踪剧情、主创访谈、演员短视频、游客打卡、官方活动和到访口径之间的跨媒介流动。</p><em>起始样本 <Cite id={17} /><Cite id={25} /><Cite id={47} /><Cite id={48} /></em></article>
          <article><b>制度窗口</b><span>2025.08—2026.05</span><h3>商标、标准与地方条例</h3><p>观察“正宗”如何从经验判断转为授权、标准、白名单和法规，以及民间差异是否被保留。</p><em>起始样本 <Cite id={2} /><Cite id={3} /><Cite id={4} /><Cite id={5} /></em></article>
        </div>

        <div className="corpus-grid">
          <article><span>A · 制度与媒体文本</span><h3>网站现有53项</h3><p>作为政策节点、事件时间线和理论概念的基础语料。全文保存标题、日期、发布者、URL、关键段落和截图，避免链接后续失效。</p></article>
          <article><span>B · 平台内容样本</span><h3>建议 240—400 条</h3><p>每个事件窗口从抖音、B站、小红书或微博选取官方、媒体、商家、普通用户四类账号；记录播放、互动和评论只是快照，不把平台指标当稳定事实。</p></article>
          <article><span>C · 访谈与观察</span><h3>建议 30—40 人</h3><p>覆盖传承人/老店、普通门店/企业、政府/协会、本地老居民、年轻本地人、外地游客或内容创作者；以“信息饱和”而非机械人数作为停止标准。</p></article>
        </div>

        <div className="coding-heading">
          <div><span>02 / 内容分析编码表</span><h3>一条视频、文章或帖子为一个分析单元。</h3></div>
          <p>先由两名编码者独立试编码约10%样本，讨论分歧并修订操作定义，再正式编码；涉及类别变量时报告一致性指标。方法依据可参照Krippendorff<Cite id={43} />。</p>
        </div>
        <div className="coding-table-wrap">
          <table className="coding-table">
            <thead><tr><th>维度</th><th>建议代码</th><th>分析问题</th></tr></thead>
            <tbody>{codingRows.map(([dimension, codes, question]) => <tr key={dimension}><td>{dimension}</td><td>{codes}</td><td>{question}</td></tr>)}</tbody>
          </table>
        </div>

        <div className="interview-heading"><span>03 / 半结构访谈提纲</span><h3>让不同主体讲出“谁有权定义这碗汤”。</h3></div>
        <div className="interview-grid">
          <article><b>传承人 / 老店</b><p>你认为什么不能被标准化？哪一种变化仍属于传承，哪一种已经改变了技艺内涵？</p></article>
          <article><b>普通门店 / 企业</b><p>“正宗”在经营中意味着配方、产地、商标还是顾客认可？平台流量改变了哪些做法？</p></article>
          <article><b>政府 / 协会</b><p>产业产值、门店数和文旅转化如何统计？商标授权、食品安全与非遗保护怎样分工？</p></article>
          <article><b>本地老居民</b><p>你最早在何种场景喝牛肉汤？今天的宣传与记忆中的味道、街区和人际关系有何差异？</p></article>
          <article><b>年轻本地人</b><p>你通过家庭、门店、电视剧还是短视频认识它？哪些叙事让你自豪，哪些让你觉得“太宣传”？</p></article>
          <article><b>外地游客 / 创作者</b><p>来淮南前形成了什么想象？实际体验改变了什么？你发布内容时为何选择某些画面和词语？</p></article>
        </div>
        <p className="interview-note">分析访谈时可采用Braun与Clarke的主题分析：熟悉材料—初始编码—生成主题—审查主题—定义命名—写作，并保留反例与研究者反思备忘录<Cite id={44} />。</p>

        <div className="validity-grid">
          <article><span>材料三角互证</span><p>同一结论至少比较制度文本、媒介内容与主体访谈，不让单一宣传来源代表全部社会记忆。</p></article>
          <article><span>时间可比性</span><p>保存采集日期和事件窗口；平台互动量与行政统计只能在口径相同的条件下比较。</p></article>
          <article><span>研究伦理</span><p>访谈取得知情同意；涉及传承知识与商业配方时允许匿名、撤回和限制公开，遵循社区主体原则<Cite id={45} />。</p></article>
          <article><span>反例优先</span><p>主动寻找不认同“千年”、不追剧、不打卡或反对标准化的材料，以检验而非装饰既定结论。</p></article>
        </div>
      </section>

      <section className="reference-section page-section">
        <div className="section-heading">
          <div><p className="section-kicker">CORE REFERENCES · GB/T 7714 DRAFT</p><h2>八条核心文献，可直接进入参考文献初稿。</h2></div>
          <p>以下按常见GB/T 7714写法整理，提交前仍应以学校模板、数据库导出信息和你实际阅读的版本复核大小写、出版地与访问日期。</p>
        </div>
        <ol className="reference-list">
          <li><span>[1]</span><p>VAN DIJCK J. <i>Mediated Memories in the Digital Age</i>[M]. Stanford: Stanford University Press, 2007. <Cite id={31} /></p></li>
          <li><span>[2]</span><p>HOSKINS A, ed. <i>Digital Memory Studies: Media Pasts in Transition</i>[M]. New York: Routledge, 2018. <Cite id={40} /></p></li>
          <li><span>[3]</span><p>ERLL A. Media and the Dynamics of Memory: From Cultural Paradigms to Transcultural Premediation[A]//WAGONER B, ed. <i>Handbook of Culture and Memory</i>[M]. Oxford: Oxford University Press, 2017: 305-324. <Cite id={35} /></p></li>
          <li><span>[4]</span><p>HOLTZMAN J D. Food and Memory[J]. <i>Annual Review of Anthropology</i>, 2006, 35: 361-378. <Cite id={32} /></p></li>
          <li><span>[5]</span><p>KAVARATZIS M, ASHWORTH G J. City Branding: An Effective Assertion of Identity or a Transitory Marketing Trick?[J]. <i>Tijdschrift voor Economische en Sociale Geografie</i>, 2005, 96(5): 506-514. <Cite id={41} /></p></li>
          <li><span>[6]</span><p>KRIPPENDORFF K. <i>Content Analysis: An Introduction to Its Methodology</i>[M]. 4th ed. Thousand Oaks: SAGE, 2018. <Cite id={43} /></p></li>
          <li><span>[7]</span><p>BRAUN V, CLARKE V. Using Thematic Analysis in Psychology[J]. <i>Qualitative Research in Psychology</i>, 2006, 3(2): 77-101. <Cite id={44} /></p></li>
          <li><span>[8]</span><p>UNESCO. Convention for the Safeguarding of the Intangible Cultural Heritage[EB/OL]. 2003. <Cite id={37} /></p></li>
        </ol>
      </section>

      <section className="video-section page-section">
        <div className="section-heading">
          <div><p className="section-kicker">WATCH THE MEMORY BEING MADE</p><h2>公开视频不是装饰，而是研究样本。</h2></div>
          <p>从2022年的消费节目到2025年的非遗舞台，同一碗汤在不同节目类型中被赋予不同意义。先看编码用途，再点击进入原发布页。</p>
        </div>
        <div className="video-coding-matrix">
          {videoCodingRows.map((row) => {
            const source = sourceById(row.id);
            return <article key={row.id}><span>{String(row.id).padStart(2, "0")}</span><div><b>{source.date} · {row.genre}</b><h3>{source.title}</h3></div><p><em>{row.frame}</em>{row.use}</p><a href={source.url} target="_blank" rel="noreferrer">原视频 ↗</a></article>;
          })}
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
          <div><p className="section-kicker">SOURCE LEDGER</p><h2>来源档案：53项网页、文章、视频与学术资料。</h2></div>
          <p>资料复核截至2026年8月17日。来源链接均指向原始页面；“官方来源”意味着发布主体明确，并不自动消除自报口径与宣传倾向。</p>
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
          <article><h3>网站已经完成</h3><p>对53项政策、统计、新闻、视频、典籍和学术资料逐条建档；按证据强度分层，并为六个论文部分配置论点、材料和论证边界。</p></article>
          <article><h3>论文仍需补做</h3><p>平台内容系统抽样、传承人/门店/食客访谈、线下场景观察，以及对全产业链产值、门店数和游客转化口径的独立核查。</p></article>
          <article><h3>使用时的原则</h3><p>网站中的“研究推断”可作为分析起点，不应直接当作调查结论；正式论文必须呈现样本规则、编码手册、反例与原始访谈依据。</p></article>
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
