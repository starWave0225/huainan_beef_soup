"use client";

/* eslint-disable @next/next/no-img-element -- Licensed local research images use stable relative URLs in both vinext and static Vite builds. */

import { useEffect, useMemo, useState } from "react";

type Source = {
  id: number;
  type: "政策/统计" | "新闻/专题" | "视频" | "学术/典籍" | "图片/素材";
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
  { id: 54, type: "图片/素材", date: "2023-06", publisher: "Wikimedia Commons", title: "A Bowl of Huainan Beef Soup", note: "Franklin Rainier拍摄的牛肉汤俯视图；Commons标记为Public Domain，可用于观察肉片、香菜、葱花与汤色的视觉组合。", url: "https://commons.wikimedia.org/wiki/File:A_Bowl_of_Huainan_Beef_Soup.jpg" },
  { id: 55, type: "图片/素材", date: "2023-06", publisher: "Wikimedia Commons", title: "Huainan beef soup restaurant", note: "Franklin Rainier拍摄的门店外观，Public Domain；适合研究“淮南牛肉汤”怎样通过招牌进入外地街道景观。", url: "https://commons.wikimedia.org/wiki/File:Huainan_beef_soup_restaurant.jpg" },
  { id: 56, type: "图片/素材", date: "2023-06", publisher: "Wikimedia Commons", title: "Huainan Beef Soup with Onion Topping", note: "Franklin Rainier拍摄的加洋葱与辣椒浇头版本，Public Domain；提示实际吃法存在门店和食客差异。", url: "https://commons.wikimedia.org/wiki/File:Huainan_Beef_Soup_with_Onion_Topping.jpg" },
  { id: 57, type: "图片/素材", date: "2023-06", publisher: "Wikimedia Commons", title: "Huainan Beef Soup with Shortbread", note: "Franklin Rainier拍摄的牛肉汤与酥饼搭配，Public Domain；可把研究单位从单碗菜品扩展到完整进食组合。", url: "https://commons.wikimedia.org/wiki/File:Huainan_Beef_Soup_with_Shortbread.jpg" },
  { id: 58, type: "图片/素材", date: "2025-02", publisher: "Wikimedia Commons", title: "Jiangji Huainan Beef Soup", note: "Chongkian拍摄的上海黄浦区淮南牛肉汤门店，CC BY-SA 4.0；显示地方食品跨城市迁移后的街面形态。", url: "https://commons.wikimedia.org/wiki/File:Jiangji_Huainan_Beef_Soup.jpg" },
  { id: 59, type: "图片/素材", date: "2023-06", publisher: "Wikimedia Commons", title: "Shortbread with Soup", note: "Franklin Rainier拍摄的酥饼蘸汤场景，Public Domain；将手部动作和吃法纳入感官记忆研究。", url: "https://commons.wikimedia.org/wiki/File:Shortbread_with_Soup.jpg" },
  { id: 60, type: "新闻/专题", date: "2017-06", publisher: "央视网", title: "安徽小吃——淮南牛肉汤", note: "概述牛骨汤、牛肉/牛杂、粉丝、干丝、葱段和红油等常见组成；页面图片注明来源网络，本站只引用文字，不下载该图。", url: "https://food.cctv.com/2017/06/07/ARTILzQ7w7K65rD2SuNeHeEj170607.shtml" },
];

const sourceById = (id: number) => sources.find((source) => source.id === id)!;

function Cite({ id }: { id: number }) {
  const source = sourceById(id);
  return <a className="cite" href={source.url} target="_blank" rel="noreferrer" aria-label={`来源 ${id}：${source.title}`}>[{String(id).padStart(2, "0")}]</a>;
}

const cases = [
  {
    id: "archaeology",
    eyebrow: "案例一 · 武王墩考古",
    title: "一只大鼎，如何变成“千年牛肉汤”的记忆触发器？",
    body: "武王墩考古确认了战国晚期楚国高等级墓葬、青铜礼器与丰富动物遗存。后续检测显示黄牛等动物经历烹饪，这证明楚国礼制与饮食生活，却仍不足以证明今天这套牛肉汤配方已经连续存在两千年。传播中被压缩掉的，恰好是“牛骨 → 牛肉汤 → 淮南牛肉汤”之间的三次推论跳跃。",
    insight: "考古给出看得见的器物，地方传播又把这些器物同熟悉的牛肉汤连在一起。两者一结合，传说就显得更像有了证据。",
    sources: [14, 23, 24, 28, 29],
  },
  {
    id: "television",
    eyebrow: "案例二 · 电视剧《六姊妹》",
    title: "《六姊妹》没有介绍一道菜，而是让它反复出现在“家”里。",
    body: "剧中牛肉汤并非知识性插入，而是日常生活的布景、家庭关系的黏合剂和城市年代感的感官线索。主创访谈、演员短视频和游客打卡又把屏幕里的味觉记忆搬回街巷：2025年春季，九龙岗时光小镇官方口径为日均接待游客超1.2万人次；五一报道为日均1.5万人次，其中市外游客占65%以上。",
    insight: "电视剧先让观众把牛肉汤同“家”联系起来，短视频让这种画面方便模仿和转发，取景地与门店再把看剧变成实地到访和消费。",
    sources: [6, 16, 17, 19, 25],
  },
  {
    id: "industry",
    eyebrow: "案例三 · 标准与集体商标",
    title: "标准越来越多以后，谁来决定什么叫“正宗”？",
    body: "从方便食品、中央厨房到集体商标，淮南牛肉汤正在从千店千味进入可复制体系。2025年集体商标获批，2026年首批30家企业获授权；截至2026年5月，官方披露已发布17项团体标准和1项省级地方标准。统一质量有助于品牌与食品安全，却也可能把地方差异压缩成单一版本。",
    insight: "真正需要保护的不是某个永远不变的配方，而是传承人、门店、食客仍能参与定义和更新这碗汤的能力。",
    sources: [2, 3, 4, 5, 9, 36, 37, 38],
  },
];

const chapterBlueprints = [
  {
    label: "绪论",
    question: "为什么要从媒介记忆，而不只从美食传播研究？",
    claim: "研究的不是一碗永远不变的汤，而是传说、技艺、个人经验、影视、政策和平台内容怎样一起让越来越多人把它当作淮南的代表。",
    evidence: "分别说明媒介记忆、食物记忆、城市品牌和非遗保护能回答什么，再指出现有研究很少把四者放进同一个传播过程。",
    boundary: "知名度提高，只能说明更多人看见了；不能直接说明大家已经认同它是共同记忆。",
    sources: [31, 32, 35, 39, 40, 41, 42],
  },
  {
    label: "第二章 · 因何记忆",
    question: "哪些材料让淮南牛肉汤容易被人记住？",
    claim: "传说让它好讲，典籍和考古让它看起来有历史根据，矿城早餐和制作过程则让本地人能用亲身经验确认它。政策、市场、非遗和乡愁又把这些材料推到更多人面前。",
    evidence: "比较传说、考古报道、地方标准、非遗节目和产业政策，看它们分别怎样讲这碗汤的过去。",
    boundary: "考古牛骨、古代烹牛文字与现代菜品之间不存在可直接证明的连续配方链。",
    sources: [10, 14, 21, 24, 28, 29, 30, 52, 53],
  },
  {
    label: "第三章 · 如何记忆",
    question: "考古、电视剧和短视频，是怎样重新讲这碗汤的？",
    claim: "考古、电视剧和节庆会让关注突然升温。新闻、短视频、直播和线下活动再把同一个故事改写成不同版本；“千年、非遗、烟火气、正宗”等标签把复杂内容压缩成几句话，各方也会争论这些话该怎么理解。",
    evidence: "把武王墩、《六姊妹》、万人共品和集体商标连成一条时间线，比较事件前后媒体用了什么标题、画面和评论，地方政策又怎样接住热度。",
    boundary: "平台热度只能证明可见性变化；集体记忆还需由受众复述、认同与实践材料证明。",
    sources: [17, 23, 25, 27, 39, 40, 47, 48, 49],
  },
  {
    label: "第四章 · 记忆转化",
    question: "网上关注怎样变成认同、到访和消费？",
    claim: "个人味觉被公开讲述后，可能变成一群人的共同话题；影视里的场景通过线路、门店和活动变成实地到访；标准、商标、包装和电商则让这碗汤带着“淮南”名称走向外地。",
    evidence: "把游客报道、文旅活动、网络销售、政策奖补和产业数据按先后关系连起来，不要只罗列增长数字。",
    boundary: "游客增长、产业增长与媒介事件同期发生不等于单一因果；必须保留其他政策、季节和市场因素。",
    sources: [3, 6, 8, 18, 19, 32, 33, 41, 42, 47, 50, 51],
  },
  {
    label: "第五章 · 记忆障碍",
    question: "传播突出谁、忽略谁，又会丢掉哪些地方经验？",
    claim: "媒体更喜欢帝王传说和醒目的大数字；统一标准可能压缩门店差异；短视频也可能只留下好看的画面，省略技艺和普通劳动者的经历。年轻人的新表达，还可能同老一代的生活记忆接不上。",
    evidence: "对照同一历史说法的不同版本、文件标准与门店做法、宣传视频与传承人访谈，主动寻找不符合主流说法的材料。",
    boundary: "不能预设商业化必然损害非遗；关键判断标准是社区参与、收益、公平表达和持续传承。",
    sources: [5, 9, 36, 37, 38, 45, 46, 52],
  },
  {
    label: "结语 · 研究发现与启示",
    question: "城市怎样借这碗汤被看见，又不把地方生活掏空？",
    claim: "一道菜能不能长期代表一座城，不能只靠政府设计口号，还要看本地生活是否认可、商家怎样经营、公共部门怎样管理、外地人怎样实际体验。非遗传播也不能只看曝光量，还要看有没有人愿意继续学、相关社区有没有受益。",
    evidence: "用城市品牌研究解释城市形象和本地认同的关系，再根据UNESCO原则提出传承人参与、数据公开和保留门店差异等可检查的指标。",
    boundary: "结论要说清这些变化在什么条件下发生，不要再用“打造名片、促进发展”代替研究发现。",
    sources: [2, 36, 37, 41, 42, 45, 46],
  },
];

const codingRows = [
  ["故事从哪里来", "传说 / 考古典籍 / 市井生活 / 非遗技艺 / 工业城市", "这条内容把牛肉汤的过去放在哪里？"],
  ["时间框架", "楚汉—五代 / 矿业城市 / 改革开放 / 数字当下", "是否把断裂的时期压缩成连续历史？"],
  ["核心符号", "大鼎 / 红油 / 热气 / 粉丝豆饼 / 老街矿区 / 家", "哪些视觉、听觉和味觉线索被重复？"],
  ["叙事框架", "千年历史 / 非遗 / 家乡味 / 城市名片 / 百亿产业", "内容优先让受众记住什么？"],
  ["主体位置", "政府 / 媒体 / 企业 / 传承人 / 门店 / 游客 / 本地居民", "谁在发言，谁只作为背景出现？"],
  ["媒介行动", "报道 / 剧情植入 / 直播 / 评论 / 打卡 / 购买 / 共食", "记忆如何从观看进入实践？"],
  ["情感线索", "乡愁 / 家庭 / 自豪 / 新奇 / 怀旧 / 争议", "情感怎样连接个人与城市共同体？"],
  ["证据强度", "可核事实 / 公开口径 / 地方传说 / 研究推断", "陈述是材料事实还是作者解释？"],
];

const videoCodingRows = [
  { id: 22, genre: "消费生活节目", frame: "地方美食 + 历史文化", use: "用它了解2022年的常见讲法：镜头怎样把食材、热气和历史故事组合成一张“地方名片”。" },
  { id: 23, genre: "新闻联播", frame: "重大考古 + 中华文明", use: "看国家级新闻怎样让淮南历史被更多人看见；不能把考古报道直接当成牛肉汤的起源证据。" },
  { id: 24, genre: "深度新闻", frame: "专家解释 + 礼制饮食", use: "记录专家如何限定黄牛遗存的解释范围，可与地方传播中的“千年同款”进行对照。" },
  { id: 25, genre: "电视剧主创访谈", frame: "家庭记忆 + 地方生活", use: "看“家、几代人、迁徙和烟火气”怎样影响观众理解淮南。" },
  { id: 26, genre: "新华社短视频", frame: "万人共食 + 文旅动能", use: "观察电视剧热度、集体活动、镜头中的人群和消费场景怎样被放进同一条传播内容。" },
  { id: 27, genre: "非遗文化节目", frame: "技艺展示 + 国家舞台", use: "记录节目拍了哪些选料、熬制和操作动作，又让谁来解释；再看好看的舞台效果有没有盖住真正的技艺。" },
  { id: 28, genre: "新闻联播", frame: "科技检测 + 楚国礼乐", use: "看检测结果怎样进入公众记忆；再和2024年的报道对照，观察同一次考古发现后来增加了哪些新说法。" },
];

const mediaAssets = [
  { id: "bowl", src: "media/commons/huainan-bowl.jpg", title: "一碗汤里的视觉层次", alt: "俯拍的一碗淮南牛肉汤，能看到牛肉、香菜、葱花和清汤", author: "Franklin Rainier", license: "Public Domain Mark", licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/", sourceId: 54, note: "俯视画面同时拍到肉片、绿叶、汤面和碗沿。分析时可以记录哪些食材最显眼、颜色怎样形成对比。" },
  { id: "onion", src: "media/commons/huainan-onion.jpg", title: "浇头让“正宗”出现差异", alt: "一碗加入洋葱和红辣椒浇头的淮南牛肉汤", author: "Franklin Rainier", license: "Public Domain Mark", licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/", sourceId: 56, note: "洋葱与辣椒让同一菜名呈现不同版本，提醒研究者不要把一张照片当作唯一标准。" },
  { id: "shortbread", src: "media/commons/huainan-shortbread.jpg", title: "汤与酥饼是一组吃法", alt: "淮南牛肉汤与一盘酥饼摆在木桌上", author: "Franklin Rainier", license: "Public Domain Mark", licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/", sourceId: 57, note: "主食搭配把研究对象从“单碗菜品”扩展为一顿早餐的组合、节奏与饱腹经验。" },
  { id: "dip", src: "media/commons/huainan-dip.jpg", title: "动作也是感官记忆", alt: "酥饼靠近汤碗，呈现蘸汤或搭配食用的场景", author: "Franklin Rainier", license: "Public Domain Mark", licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/", sourceId: 59, note: "掰、蘸、咬等身体动作很少出现在政策文本中，却是访谈和场景观察可以追问的生活知识。" },
  { id: "restaurant", src: "media/commons/huainan-restaurant.jpg", title: "菜名成为街道招牌", alt: "写有淮南牛肉汤字样的街边门店外观", author: "Franklin Rainier", license: "Public Domain Mark", licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/", sourceId: 55, note: "门头、价格、桌椅和开放式入口共同构成消费预期，也让“淮南”在异地街道被反复看见。" },
  { id: "jiangji", src: "media/commons/huainan-jiangji.jpg", title: "从淮南名称到上海门店", alt: "上海黄浦区蒋记淮南牛肉汤清真门店外观", author: "Chongkian", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", sourceId: 58, note: "照片明确记录上海黄浦区门店，可用于研究地方食品迁移后怎样保留产地名称、清真标识与街坊店形态。" },
] as const;

const siteTabs = [
  { id: "overview", number: "01", label: "研究首页", note: "问题与证据" },
  { id: "atlas", number: "02", label: "牛肉汤图鉴", note: "实物、吃法与门店" },
  { id: "mechanism", number: "03", label: "案例与机制", note: "传播与反思" },
  { id: "draft", number: "04", label: "论文正文", note: "依原提纲逐节写作" },
  { id: "methods", number: "05", label: "研究方法", note: "抽样、分类与访谈" },
  { id: "sources", number: "06", label: "来源资料", note: "视频与60项档案" },
] as const;

const essayChapterIndex = [
  {
    id: "intro",
    number: "00",
    label: "绪论",
    title: "问题提出与研究设计",
    purpose: "说明为什么研究、研究了什么，以及准备怎样证明。",
    question: "地方早餐为什么值得从媒介记忆角度研究？",
    evidence: "理论文献、事件时间线、政策文本与方法文献",
    boundary: "公开资料能提出问题，不能代替受众调查。",
    sections: [
      { id: "background", label: "研究背景与意义" },
      { id: "review", label: "国内外研究现状" },
      { id: "methods", label: "研究方法和研究思路" },
      { id: "innovation", label: "研究内容和创新点" },
    ],
  },
  {
    id: "chapter-2",
    number: "02",
    label: "第二章",
    title: "因何记忆：媒介记忆动因",
    purpose: "拆开“历史悠久所以容易传播”的笼统说法。",
    question: "淮南牛肉汤到底为什么容易被记住？",
    evidence: "地方传说、考古材料、生活经验与数字传播生态",
    boundary: "能说明记忆资源丰富，不能证明现代配方连续两千年。",
    sections: [
      { id: "resources", label: "基础资源的可记忆性" },
      { id: "digital-ecology", label: "数字传播生态" },
      { id: "drivers", label: "媒介记忆的外部驱动力" },
    ],
  },
  {
    id: "chapter-3",
    number: "03",
    label: "第三章",
    title: "如何记忆：激活与重构",
    purpose: "追踪同一材料怎样在考古、影视、短视频和活动之间改写。",
    question: "媒介具体怎样选择、剪辑并重新组织地方记忆？",
    evidence: "武王墩考古、《六姊妹》、短视频与多主体话语",
    boundary: "传播节点能说明内容变化，受众接受仍需评论和访谈验证。",
    sections: [
      { id: "activation", label: "记忆激活" },
      { id: "reconstruction", label: "记忆重构" },
      { id: "meaning", label: "意义生产" },
    ],
  },
  {
    id: "chapter-4",
    number: "04",
    label: "第四章",
    title: "记忆转化：价值跃迁",
    purpose: "说明线上关注怎样可能进入认同、到访、消费和城市品牌。",
    question: "被看见之后，记忆如何转成现实行动与地方价值？",
    evidence: "评论表达、客流报道、门店空间、商品与产业政策",
    boundary: "时间上同时出现不等于因果成立，需区分曝光、到访和复购。",
    sections: [
      { id: "identity", label: "情感与主体重塑" },
      { id: "practice-space", label: "实践与空间转化" },
      { id: "city-symbol", label: "地方与符号跃升" },
    ],
  },
  {
    id: "chapter-5",
    number: "05",
    label: "第五章",
    title: "记忆障碍：问题反思",
    purpose: "把传播成功背后的选择、失真和代际问题摆到台面上。",
    question: "什么被记住了，什么又在传播中被省略或压平？",
    evidence: "标题与短视频叙事、标准文本、门店差异和代际经验",
    boundary: "不能先把商业化或年轻人当作问题，必须回到具体权力与收益。",
    sections: [
      { id: "selective-memory", label: "传播者的选择性记忆" },
      { id: "media-damage", label: "传播媒介的记忆损伤" },
      { id: "generations", label: "被动接受与代际断裂" },
    ],
  },
  {
    id: "conclusion",
    number: "06",
    label: "结语",
    title: "研究发现、启示与局限",
    purpose: "收束机制链条，并把建议落实到可检查的行动。",
    question: "这项研究最终解释了什么，还有什么没有证明？",
    evidence: "前五章交叉证据、城市形象与非遗保护文献",
    boundary: "结论只到公开材料能够支持的位置，反例与田野调查仍是下一步。",
    sections: [
      { id: "findings", label: "研究发现总结" },
      { id: "city-image", label: "城市形象建构" },
      { id: "heritage", label: "非遗保护与地方性" },
      { id: "limits", label: "研究局限与展望" },
    ],
  },
] as const;

type SiteTab = (typeof siteTabs)[number]["id"];
type EssayChapterId = (typeof essayChapterIndex)[number]["id"];

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [activeCase, setActiveCase] = useState(cases[0].id);
  const [sourceFilter, setSourceFilter] = useState("全部");
  const [activeTab, setActiveTab] = useState<SiteTab>("overview");
  const [activeEssayChapter, setActiveEssayChapter] = useState<EssayChapterId>("intro");

  useEffect(() => {
    const updateProgress = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  useEffect(() => {
    const syncTabFromHash = () => {
      const [requested, requestedChapter, requestedSection] = window.location.hash.slice(1).split("/");
      const matched = siteTabs.find((tab) => tab.id === requested);
      if (matched) {
        setActiveTab(matched.id);
        if (matched.id === "draft") {
          const chapter = essayChapterIndex.find((item) => item.id === requestedChapter) ?? essayChapterIndex[0];
          setActiveEssayChapter(chapter.id);
          requestAnimationFrame(() => requestAnimationFrame(() => {
            const target = requestedSection
              ? document.getElementById(`essay-${chapter.id}-${requestedSection}`)
              : document.getElementById("draft-reader");
            target?.scrollIntoView({ behavior: "auto", block: "start" });
          }));
        } else {
          requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "auto" }));
        }
      }
    };

    syncTabFromHash();
    window.addEventListener("hashchange", syncTabFromHash);
    return () => window.removeEventListener("hashchange", syncTabFromHash);
  }, []);

  const openTab = (tab: SiteTab) => {
    setActiveTab(tab);
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "auto" }));
  };

  const filteredSources = useMemo(
    () => sourceFilter === "全部" ? sources : sources.filter((source) => source.type === sourceFilter),
    [sourceFilter],
  );
  const selectedCase = cases.find((item) => item.id === activeCase)!;
  const activeEssayEntry = essayChapterIndex.find((chapter) => chapter.id === activeEssayChapter)!;
  const activeEssayChapterIndex = essayChapterIndex.findIndex((chapter) => chapter.id === activeEssayChapter);
  const previousEssayChapter = activeEssayChapterIndex > 0 ? essayChapterIndex[activeEssayChapterIndex - 1] : null;
  const nextEssayChapter = activeEssayChapterIndex < essayChapterIndex.length - 1 ? essayChapterIndex[activeEssayChapterIndex + 1] : null;

  return (
    <main id="top">
      <div className="reading-progress" style={{ width: `${progress}%` }} />
      <header className="site-header">
        <a className="brand" href="#overview" onClick={() => openTab("overview")} aria-label="淮南牛肉汤媒介记忆研究首页">
          <span className="brand-mark">淮</span>
          <span>媒介记忆研究志</span>
        </a>
        <span className="edition">研究版 · 2026.08</span>
      </header>

      <nav className="site-tabs" aria-label="网站分页">
        {siteTabs.map((tab) => (
          <a
            key={tab.id}
            href={tab.id === "draft" ? `#draft/${activeEssayChapter}` : `#${tab.id}`}
            className={activeTab === tab.id ? "active" : ""}
            onClick={() => openTab(tab.id)}
            aria-current={activeTab === tab.id ? "page" : undefined}
          >
            <span>{tab.number}</span>
            <strong>{tab.label}</strong>
            <small>{tab.note}</small>
          </a>
        ))}
      </nav>

      {activeTab === "overview" && <div className="tab-page" data-page="overview">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">淮南牛肉汤 · 媒介记忆研究</p>
          <h1>一碗汤，<br />如何成为一座城的记忆？</h1>
          <p className="dek">
            有人说它传了两千年，有人记得的是矿区清晨，还有人因为《六姊妹》第一次注意到它。这个网站不急着替谁下结论，而是把故事、证据和传播过程一层层拆开。
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#atlas" onClick={() => openTab("atlas")}>打开牛肉汤图鉴</a>
            <a className="text-action" href="#draft/intro" onClick={() => { openTab("draft"); setActiveEssayChapter("intro"); }}>阅读论文正文 →</a>
            <span>60项公开来源 · 7条视频 · 6张开放授权图片</span>
          </div>
        </div>

        <div className="memory-orbit" aria-label="媒介记忆建构路径示意图">
          <div className="orbit orbit-outer"><span>城市符号</span></div>
          <div className="orbit orbit-middle"><span>媒体反复讲述</span></div>
          <div className="orbit orbit-inner"><span>味道和日常</span></div>
          <div className="bowl"><span>淮南</span><strong>牛肉汤</strong></div>
          <p className="orbit-note">人们记住的不只是什么发生过，<br />也包括后来怎样被讲、被看见、被吃到。</p>
        </div>
      </section>

      <section className="question-strip" aria-label="研究路径">
        <span className="strip-label">研究路径</span>
        <ol>
          <li><b>01</b> 为什么好记</li>
          <li><b>02</b> 媒体怎么讲</li>
          <li><b>03</b> 热度去了哪里</li>
          <li><b>04</b> 传播丢掉什么</li>
          <li><b>05</b> 怎样拿材料证明</li>
        </ol>
      </section>

      <section className="reading-note page-section">
        <div>
          <p className="section-kicker">阅读说明</p>
          <h2>先看清：每句话的证据有多硬。</h2>
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
          <div><p className="section-kicker">论文要回答什么</p><h2>这篇论文真正要解释的，不只是“它有多火”。</h2></div>
          <p>下面五个问题分别追问：材料从哪里来、媒体怎么讲、谁在发言、热度去了哪里，以及传播丢掉了什么。</p>
        </div>

        <div className="central-question">
          <span>核心研究问题</span>
          <p>淮南牛肉汤原本是当地人的日常吃食。考古新闻、电视剧、短视频、政府宣传和商业经营，怎样一步步把它讲成“淮南的代表”？不同人为什么愿意相信、转发、打卡和购买？在这个过程中，哪些历史有证据，哪些只是好听的故事，又有哪些普通人的记忆被挤到了一边？</p>
          <small>这一段可以直接放进绪论。下面五个问题把“大问题”拆成了可查材料、可做访谈的小问题。</small>
        </div>

        <div className="research-question-grid">
          <article><b>RQ1</b><h3>它为什么好记</h3><p>传说、考古、制作技艺和早餐经验分别起了什么作用？哪些能当历史证据，哪些只能说明人们愿意这样讲？</p></article>
          <article><b>RQ2</b><h3>媒体怎么讲</h3><p>考古报道、电视剧、短视频、新闻、直播和线下活动，分别挑中了哪些画面和故事？</p></article>
          <article><b>RQ3</b><h3>谁说了算</h3><p>政府、媒体、企业、传承人、门店和食客，对“正宗”有怎样不同的理解？谁的声音最容易被看见？</p></article>
          <article><b>RQ4</b><h3>热度去了哪里</h3><p>网上关注有没有变成城市认同、游客到访、购买和产业增长？中间需要哪些线下承接？</p></article>
          <article><b>RQ5</b><h3>传播丢掉了什么</h3><p>追求热度、统一标准和商业规模时，复杂历史、门店差异和普通人的生活记忆会不会被压扁？</p></article>
        </div>

        <div className="theory-heading">
          <p className="section-kicker">四组理论，各管一件事</p>
          <h3>理论不是为了显得高深，而是帮你回答四个具体问题。</h3>
        </div>
        <div className="theory-grid">
          <article>
            <span>01 · 媒介记忆</span>
            <h3>媒体为什么不只是传话</h3>
            <p>媒体会决定什么被反复看见、什么被省略。同一段故事从书本进入电视、新闻和短视频时，会被重新剪裁和解释。学术上把这种跨媒介反复改写叫“再媒介化”<Cite id={31} /><Cite id={35} /><Cite id={39} /><Cite id={40} />。</p>
            <em>主要用于：第三章分析新闻、影视和短视频</em>
          </article>
          <article>
            <span>02 · 食物记忆</span>
            <h3>为什么味道会让人想起家</h3>
            <p>人对食物的记忆不只来自知识，还来自气味、温度、吃法和一起吃饭的人。字幕、弹幕和评论又会把“我记得的味道”变成可以公开交流的家乡记忆<Cite id={32} /><Cite id={33} />。</p>
            <em>主要用于：第二章日常经验、第四章情感认同</em>
          </article>
          <article>
            <span>03 · 城市品牌</span>
            <h3>一道菜怎样代表一座城</h3>
            <p>城市形象不能只靠一句广告。它还要看本地人认不认、管理是否跟得上、外地人实际体验怎样。门店、商品、街区和食客的行为，都在告诉人们“这里是什么样的地方”<Cite id={41} /><Cite id={42} />。</p>
            <em>主要用于：第四章城市形象、结语建议</em>
          </article>
          <article>
            <span>04 · 活态非遗</span>
            <h3>怎样保护，而不是把配方冻住</h3>
            <p>非遗不是只能原样复制的旧物，而是仍有人在学、在做、在改的生活实践。商业化不一定有害，关键要看传承人和相关社区能不能参与决定、得到合理收益，并保留技艺原来的生活环境<Cite id={37} /><Cite id={38} /><Cite id={45} /><Cite id={46} />。</p>
            <em>主要用于：第五章问题反思、结语保护建议</em>
          </article>
        </div>

        <aside className="innovation-callout">
          <span>这篇论文可以多做一步</span>
          <p>不要只说媒体让牛肉汤更有名。把整个过程讲清楚：原来有哪些故事和日常经验，什么事件让它突然被看见，媒体挑了哪些符号，不同人怎样争论“正宗”，最后有没有带来认同、到访和消费。每一步都说明证据够不够。</p>
        </aside>
      </section>

      <section className="evidence-section page-section" id="evidence">
        <div className="section-heading">
          <div><p className="section-kicker">01 · 人们为什么会记住它</p><h2>人们记住它，不只因为一句“历史悠久”。</h2></div>
          <p>故事让人愿意复述，考古让故事看起来有依据，早餐经验则让本地人能用自己的味觉确认它。</p>
        </div>

        <div className="memory-foundations">
          <article className="foundation-card legend-card">
            <span className="foundation-index">A</span>
            <span className="badge legend">地方传说</span>
            <h3>好讲：名人、危机和一碗救命汤</h3>
            <p>刘安炼丹、赵匡胤困寿春等叙事，将复杂历史压缩为人物、危机与救赎。它们的传播优势来自戏剧性，不来自史料强度。</p>
            <p className="card-conclusion">它让人觉得：这碗汤很早就属于这里。</p>
            <a className="source-link" href={sourceById(10).url} target="_blank" rel="noreferrer">查看官方如何讲述这一故事 <span>↗</span></a>
          </article>
          <article className="foundation-card artifact-card">
            <span className="foundation-index">B</span>
            <span className="badge verified">可核事实</span>
            <h3>看得见：典籍中的文字和考古器物</h3>
            <p>《淮南子》确有“屠牛而烹其肉”“煎熬燎炙”<Cite id={29} />；武王墩出土鼎与黄牛等经烹饪动物遗存<Cite id={24} /><Cite id={28} />。</p>
            <p className="card-conclusion">边界：这些证据支持古代牛肉烹饪，却不能直接证明现代菜品配方。</p>
            <a className="source-link" href={sourceById(29).url} target="_blank" rel="noreferrer">阅读《淮南子》原文 <span>↗</span></a>
          </article>
          <article className="foundation-card everyday-card">
            <span className="foundation-index">C</span>
            <span className="badge reported">地方研究</span>
            <h3>吃得到：矿城清晨和街边早餐</h3>
            <p>地方政府资料把现代牛肉汤的兴起与回民牛肉技艺、矿区器具条件及改革开放后的屠宰政策变化联系起来<Cite id={21} /><Cite id={30} />。</p>
            <p className="card-conclusion">热、辣、香和一起吃早餐的经历，让城市记忆不只留在文字里。</p>
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
          <div><p className="section-kicker">公开数字，先看口径</p><h2>数字很大，但不一定能直接放在一起比较。</h2></div>
          <p>这些数字都能找到出处，但各自统计了什么、怎样统计，公开信息并不完整。因此，它们不能简单连成一条增长曲线。</p>
        </div>
        <div className="metric-grid">
          <article><span>2017</span><strong>省级非遗</strong><p>淮南牛肉汤制作技艺进入安徽省第五批省级非遗代表性项目名录。</p><div className="metric-source">制度性确认 <Cite id={18} /></div></article>
          <article><span>2024</span><strong>≈ 1.5 亿元</strong><p>官方报道中的全年网络销售额；电商企业13家。</p><div className="metric-source">公开口径 <Cite id={8} /></div></article>
          <article><span>2025 H1</span><strong>195.2 亿元</strong><p>集体商标获批报道披露的上半年全产业链产值，同比增长21%。</p><div className="metric-source">公开口径 <Cite id={3} /></div></article>
          <article><span>2025 报道</span><strong>&gt; 320 亿元</strong><p>全产业链年产值；相关企业235家。与上半年数字不应直接相加。</p><div className="metric-source">公开口径 <Cite id={6} /></div></article>
          <article className="target-metric"><span>2027 目标</span><strong>&gt; 500 亿元</strong><p>这是政策目标，不是已经实现的事实。</p><div className="metric-source">规划目标 <Cite id={1} /></div></article>
        </div>
        <p className="data-warning"><b>先别急着画增长曲线：</b> 2022年地方文章称全国门店“3万余家”，2025年媒体报道又称“约10万家”。两者都没有公开完整的调查方法，所以不能据此计算门店增长率。它们只能说明，对产业规模的公开说法越来越大。</p>
      </section>
      </div>}

      {activeTab === "atlas" && <div className="tab-page" data-page="atlas">
      <section className="atlas-hero page-section" id="atlas">
        <figure className="atlas-hero-figure">
          <img src="media/commons/huainan-shortbread.jpg" alt="淮南牛肉汤与酥饼摆在同一张木桌上" />
          <figcaption>淮南牛肉汤与酥饼 · Franklin Rainier · Public Domain Mark <Cite id={57} /></figcaption>
        </figure>
        <div className="atlas-hero-copy">
          <p className="section-kicker">先认识这碗汤</p>
          <h2>先看清这碗汤，<br />再谈它怎样被记住。</h2>
          <p>前面的论文结构谈了很多媒介、城市与记忆，但研究对象不能只剩一个抽象菜名。这一页把镜头拉回碗里：汤底、肉片、粉丝、豆制品、香菜葱花、辣油和酥饼怎样共同出现；一顿早餐怎样从后厨工序走到桌面；“淮南牛肉汤”又怎样作为门店招牌进入外地街道。</p>
          <aside><b>这组图片能说明什么</b>这些开放授权照片记录了以“淮南牛肉汤”名义出现的不同消费场景，但不能代表淮南所有门店，也不能确定唯一的正宗配方。它们可以帮助观察画面怎样表现这碗汤，却不能代替到店调查。</aside>
        </div>
      </section>

      <section className="bowl-anatomy page-section">
        <div className="section-heading">
          <div><p className="section-kicker">01 · 碗里有什么</p><h2>先把一碗汤拆成六个部分。</h2></div>
          <p>央视网的地方小吃介绍提到牛骨汤、牛肉或牛杂、粉丝、干丝、葱段和红油等常见组成<Cite id={60} />；2009年地方制作规范则把原辅料、熬汤、烫制与卫生要求写成技术文本<Cite id={52} />。两者都只能作为观察入口，不能替代当下门店实测。</p>
        </div>
        <div className="anatomy-layout">
          <figure>
            <img src="media/commons/huainan-onion.jpg" alt="从上方观察加入洋葱与辣椒浇头的淮南牛肉汤" loading="lazy" />
            <figcaption>加洋葱与辣椒的版本，直观显示同一菜名内部的变化 <Cite id={56} /></figcaption>
          </figure>
          <div className="anatomy-list">
            <article><span>01</span><div><h3>汤底</h3><p>牛骨和肉类熬出的热汤承担香气、温度与口感的基础。报道常用“清”“浓”“鲜醇”描述它，但汤色深浅不能单独判断正宗。</p></div></article>
            <article><span>02</span><div><h3>牛肉与牛杂</h3><p>薄切牛肉提供最醒目的名称对应，牛杂则增加口感层次和物尽其用的饮食逻辑。论文应区分菜单选择与固定配方。</p></div></article>
            <article><span>03</span><div><h3>粉丝</h3><p>粉丝吸附汤汁、增加饱腹感，也让“喝汤”变成可以作为早餐或正餐的一整碗食物。</p></div></article>
            <article><span>04</span><div><h3>干丝 / 千张</h3><p>豆制品带来与肉片不同的纤维和咀嚼感。不同资料使用“干丝”“千张丝”等称呼，访谈时应保留本地人的实际用词。</p></div></article>
            <article><span>05</span><div><h3>香菜与葱花</h3><p>绿色点缀在俯拍照片和短视频中非常显眼，同时以新鲜香气完成出碗前的最后一层味觉。</p></div></article>
            <article><span>06</span><div><h3>红油、浇头与桌边选择</h3><p>辣椒油、洋葱、盐度和其他浇头把最终味道交给门店与食客共同完成。“正宗”由此不是后厨单方面决定。</p></div></article>
          </div>
        </div>

        <div className="flavor-reading">
          <article><b>看</b><h3>画面里有哪些颜色</h3><p>浅色汤面、灰褐肉片、绿色香菜与红色辣油，是短视频和照片里很容易认出的组合。分析时可以记录每种颜色有没有出现、占了多大画面。</p></article>
          <article><b>听</b><h3>哪些声音让人觉得“正在营业”</h3><p>滚汤、漏勺、切肉、碗筷和门店叫单共同制造现场感。分析视频时，不能只看字幕和旁白。</p></article>
          <article><b>闻 / 尝</b><h3>屏幕怎样替味道说话</h3><p>屏幕传不出气味和味道，只能用“鲜、香、辣、浓、不腻”等词和食客表情来代替。研究要分清真实味觉和视频对味觉的描述。</p></article>
          <article><b>触 / 动</b><h3>人是怎么吃的</h3><p>端碗、吹热气、夹肉、掰饼、蘸汤和加辣，都是具体的进食动作。到门店观察时，可以直接把这些动作记录下来。</p></article>
        </div>
      </section>

      <section className="making-section page-section">
        <div className="section-heading light-heading">
          <div><p className="section-kicker">02 · 这碗汤怎么端上桌</p><h2>从后厨到桌面，可以观察五个步骤。</h2></div>
          <p>这不是家庭复刻菜谱，而是依据公开技术规范和节目材料整理的研究观察表。2009年规范可用于理解工序怎样被文本固定，但不能当作2026年唯一现行版本<Cite id={52} />。</p>
        </div>
        <ol className="making-steps">
          <li><span>01</span><div><h3>原料处理</h3><p>牛肉、骨和牛杂怎样清洗、浸泡、分拣，会影响汤的基础状态。观察时要记下店家怎样说原料来源、卫生流程能否看见、哪些信息不愿公开。</p></div><em>观察时可以记：产地、清真、鲜货 / 冻货、能否追溯</em></li>
          <li><span>02</span><div><h3>大锅熬汤</h3><p>时间、火候、骨肉比例和香料，是门店经验最集中的部分。媒体爱拍沸腾大锅，因为它看起来既有规模，也有热度和手艺。</p></div><em>观察时可以记：老汤、火候、秘方、谁在劳动</em></li>
          <li><span>03</span><div><h3>熟制与切配</h3><p>肉片厚薄、牛杂种类、粉丝和豆制品怎样预先处理，都会影响口感，也能看出门店更看重效率，还是更愿意保留手工差异。</p></div><em>观察时可以记：刀工、分量、预制、中央厨房</em></li>
          <li><span>04</span><div><h3>烫制与冲汤</h3><p>漏勺把粉丝、干丝等配料送入滚汤，再和肉片一起装碗。这一串动作快、声音响，是短视频最爱拍的“手艺画面”。</p></div><em>观察时可以记：速度、热气、声音、是否专门为镜头表演</em></li>
          <li><span>05</span><div><h3>桌边完成</h3><p>香菜、葱花、红油、盐度和酥饼，让食客也参与决定最后的味道。一碗汤最终怎么吃，是后厨做法、门店习惯和个人选择共同决定的。</p></div><em>观察时可以记：自己加料、一起吃饭、早餐节奏、进食动作</em></li>
        </ol>
      </section>

      <section className="media-gallery-section page-section">
        <div className="section-heading">
          <div><p className="section-kicker">03 · 可以放心使用的图片</p><h2>六张开放素材，分别能看出什么？</h2></div>
          <p>图片已经下载到网站本地，避免外链失效。每张图保留作者、许可证和Commons原始文件页；CC BY-SA素材未修改原文件，仅由网页按卡片比例裁切显示。</p>
        </div>
        <div className="media-gallery-grid">
          {mediaAssets.map((asset, index) => (
            <article className={index === 0 || index === 5 ? "wide" : ""} key={asset.id}>
              <a className="media-image" href={sourceById(asset.sourceId).url} target="_blank" rel="noreferrer">
                <img src={asset.src} alt={asset.alt} loading="lazy" />
                <span>查看原始文件 ↗</span>
              </a>
              <div className="media-copy"><small>0{index + 1} · 这张图能看什么</small><h3>{asset.title}</h3><p>{asset.note}</p><div>摄影：{asset.author} · <a href={asset.licenseUrl} target="_blank" rel="noreferrer">{asset.license}</a> · <Cite id={asset.sourceId} /></div></div>
            </article>
          ))}
        </div>
        <aside className="license-ledger"><b>授权账本</b><p>素材54—57、59由Franklin Rainier拍摄，Commons文件页标记为Public Domain Mark；素材58由Chongkian拍摄，采用CC BY-SA 4.0。网站对所有图片均保留署名与原始文件链接。Commons专题目前收录6个淮南牛肉汤文件<Cite id={54} /><Cite id={58} />。</p></aside>
      </section>
      </div>}

      {activeTab === "mechanism" && <div className="tab-page" data-page="mechanism">
      <section className="mechanism-section page-section" id="mechanism">
        <div className="section-heading">
          <div><p className="section-kicker">01 · 这碗汤是怎样被越讲越大的</p><h2>媒体每讲一次，故事就会变一点。</h2></div>
          <p>媒体不会把现成记忆原样搬过来。它会挑选、排序、强调，也会省略。一个故事从新闻进入电视剧、短视频和活动现场时，每次都会被重新讲一遍<Cite id={31} /><Cite id={34} /><Cite id={35} />。</p>
        </div>

        <div className="memory-loop" aria-label="媒介记忆循环的六个步骤">
          <article><span>01</span><b>原有材料</b><p>传说、典籍、技艺、门店和个人回忆</p></article>
          <article><span>02</span><b>突然升温</b><p>考古发现、电视剧、节庆或平台热点</p></article>
          <article><span>03</span><b>贴上标签</b><p>“千年”“非遗”“烟火气”“正宗”</p></article>
          <article><span>04</span><b>各说各话</b><p>政府、商家、媒体和食客解释不同</p></article>
          <article><span>05</span><b>变成行动</b><p>评论、购买、打卡、加盟和认同</p></article>
          <article><span>06</span><b>留下新素材</b><p>新的图像、数字和体验进入下一轮传播</p></article>
        </div>

        <div className="voice-grid">
          <article>
            <span className="voice-number">01 / 政府怎么讲</span>
            <h3>把一碗汤纳入城市规划和公共品牌</h3>
            <p>行动方案使用“规模商品、网红爆品、文旅潮品”的三段式表达<Cite id={1} />；地方条例进一步把标准、商标、非遗和文旅写入制度<Cite id={2} />。</p>
            <div className="voice-effect">带来的结果：统一名称、政策资源和管理标准</div>
          </article>
          <article>
            <span className="voice-number">02 / 商家怎么讲</span>
            <h3>让外地人也能买到、加盟和下单</h3>
            <p>方便装、冷冻款、中央厨房和直播带货解决“离开淮南还能不能喝到”的问题<Cite id={8} /><Cite id={11} />，同时也把“正宗”转化为品牌承诺。</p>
            <div className="voice-effect">带来的结果：方便购买、方便复制、规模更大</div>
          </article>
          <article>
            <span className="voice-number">03 / 普通人怎么讲</span>
            <h3>用“我记得的那一碗”保留差异</h3>
            <p>老店、返乡者、演员Vlog与普通游客把宏大历史落回味觉、家庭和清晨<Cite id={17} />。差异化口味本身就是地方生活仍然鲜活的证据。</p>
            <div className="voice-effect">带来的结果：亲切、可信，也保留不同口味</div>
          </article>
        </div>
      </section>

      <section className="cases-section page-section" id="cases">
        <div className="section-heading">
          <div><p className="section-kicker">02 · 三次突然升温</p><h2>三个事件，怎样让更多人注意到这碗汤？</h2></div>
          <p>选择一个案例，看看它怎样从一次新闻或活动，变成可以分享、购买和实地打卡的公共话题。</p>
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
            <span>根据现有材料可以这样理解</span>
            <p>{selectedCase.insight}</p>
            <div className="case-cites">依据 {selectedCase.sources.map((id) => <Cite key={id} id={id} />)}</div>
          </aside>
        </div>
      </section>

      <section className="conversion-section page-section">
        <div className="section-heading">
          <div><p className="section-kicker">03 · 从看见，到打卡、购买和认同</p><h2>一段视频不会自动变成城市认同，更不会自动变成收入。</h2></div>
          <p>它需要让人先产生情感，再有地方可去、有东西可买，也要有人把短期热度接成长期体验<Cite id={32} /><Cite id={33} />。</p>
        </div>
        <div className="conversion-grid">
          <article><span>先有情感</span><h3>“我家的味道”变成共同话题</h3><p>人们公开讲述“回家第一碗”“家里的味道”，原本私人的经验才可能慢慢变成一群人的共同认同。</p></article>
          <article><span>再到现场</span><h3>看完屏幕，再去现场</h3><p>《六姊妹》取景地、非遗展馆和门店，把在线观看变成路线、打卡和一起喝汤<Cite id={17} /><Cite id={19} />。</p></article>
          <article><span>最后进入商品</span><h3>带着“淮南”名字走向外地</h3><p>集体商标、标准、加工技术和电商，让牛肉汤可以跨地区销售，也让商品一直带着产地名称<Cite id={3} /><Cite id={5} /><Cite id={8} />。</p></article>
        </div>
        <div className="tourism-proof">
          <div><span>2025 · 春季</span><strong>12,000+</strong><p>九龙岗时光小镇官方报道的日均游客量</p></div>
          <div className="proof-arrow">看见淮南 <i>→</i> 真正来到淮南</div>
          <div><span>2025 · 五一</span><strong>65%</strong><p>报道中的市外游客占比</p></div>
          <p className="proof-note">这能支持“影视带来显著到访”，但尚不能单独证明牛肉汤贡献了多少旅游收入。<Cite id={6} /><Cite id={19} /></p>
        </div>
      </section>

      <section className="reflection-section page-section" id="reflection">
        <div className="section-heading light-heading">
          <div><p className="section-kicker">04 · 传播中丢掉了什么</p><h2>故事越容易传播，越可能把复杂历史讲简单了。</h2></div>
          <p>媒体总要做选择：醒目的画面更容易留下，复杂历史、门店差异和普通人的声音则可能被挤到后面。</p>
        </div>
        <div className="risk-grid">
          <article><b>01</b><h3>大故事盖住普通人</h3><p>“两千年前已经喝同款牛肉汤”很好转发，却容易盖住矿区清晨、回民技艺和普通店主的生活经历。</p><span>建议：每个起源故事都标清证据有多强。</span></article>
          <article><b>02</b><h3>统一标准压平门店差异</h3><p>食品安全需要共同底线，但清汤、红汤、香料和配料的门店差异，也是地方知识的一部分。</p><span>建议：统一安全底线，保留不同风味。</span></article>
          <article><b>03</b><h3>有流量，不等于有人接着学</h3><p>节庆、直播和大屏能带来一时关注，却不能证明下一代已经掌握技艺。</p><span>建议：公布学徒人数、学习周期和传承人收益。</span></article>
          <article><b>04</b><h3>数字很大，统计方法却没说清</h3><p>产值、门店和就业数字不断增加，但计算范围和方法很少完整公开。</p><span>建议：每年公开一张可以复核的统计表。</span></article>
        </div>
        <blockquote>
          <p>保护非遗，不是锁死一种做法，而是让相关的人还能继续学、继续做、继续决定它怎样变化。</p>
          <cite>基于 UNESCO《保护非物质文化遗产公约》与传承原则的概括 <Cite id={37} /><Cite id={38} /></cite>
        </blockquote>
      </section>
      </div>}

      {activeTab === "draft" && <div className="tab-page" data-page="draft">
      <section className="research-section page-section">
        <div className="section-heading">
          <div><p className="section-kicker">写正文前，先把判断拿出来检验</p><h2>这四句话看起来有道理，但还需要材料证明。</h2></div>
          <p>它们不是现成结论，而是根据公开资料提出的猜想。后面还要用访谈、视频和平台样本来验证，也允许被反例推翻。</p>
        </div>
        <div className="proposition-list">
          <article><span>P1</span><div><h3>味道比口号更容易记住</h3><p>热、辣、香、汤锅声和酥饼一起出现时，比抽象的城市宣传口号更容易让人留下印象。</p></div><em>怎么验证：跟店观察、访谈食客、分析视频画面</em></article>
          <article><span>P2</span><div><h3>考古和电视剧会突然放大关注</h3><p>它们不是凭空创造记忆，而是把原来就有的地方故事，在短时间内推到更多人面前。</p></div><em>怎么验证：比较事件前后的搜索量、报道说法和评论时间</em></article>
          <article><span>P3</span><div><h3>“正宗”是大家争出来的</h3><p>政府标准、企业品牌、传承人的做法和食客记得的味道，给出的答案可能并不一样。</p></div><em>怎么验证：对照政策、品牌材料、门店和传承人访谈</em></article>
          <article><span>P4</span><div><h3>网上热度要有人在线下接住</h3><p>只有出现可走的路线、可看的场馆、可进入的门店和可购买的商品，网上关注才可能变成到访和收入。</p></div><em>怎么验证：调查游客从哪里来、怎样消费，再对照网销和到访数据</em></article>
        </div>
      </section>

      <section className="blueprint-section page-section" id="blueprint">
        <div className="section-heading light-heading">
          <div><p className="section-kicker">每一章具体怎么写</p><h2>每一章都回答一个问题，也要说明证据还不够证明什么。</h2></div>
          <p>这些不是替你写好的结论，而是写作路线。每章都先提出判断，再放材料、解释关系，最后说清不能下什么过头的结论。</p>
        </div>
        <div className="chapter-list">
          {chapterBlueprints.map((chapter, index) => (
            <article key={chapter.label}>
              <div className="chapter-index"><span>{String(index + 1).padStart(2, "0")}</span><b>{chapter.label}</b></div>
              <div className="chapter-body">
                <p className="chapter-question">{chapter.question}</p>
                <div className="chapter-block"><span>这一章要证明什么</span><p>{chapter.claim}</p></div>
                <div className="chapter-block"><span>准备拿什么来证明</span><p>{chapter.evidence}</p></div>
                <div className="chapter-boundary"><span>不要说过头</span><p>{chapter.boundary}</p></div>
                <div className="chapter-cites">可以先看这些材料 {chapter.sources.map((id) => <Cite key={id} id={id} />)}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="draft-section page-section" id="draft">
        <div className="essay-shell">
          <div className="section-heading draft-heading">
            <div><p className="section-kicker">论文正文 · 分章阅读</p><h2>先选章节，再按本章索引阅读。</h2></div>
            <p>六章不再连续铺在一页。每章先说明要回答的问题、主要材料和论证边界，再进入正文；章节与小节都有独立链接，便于引用、讨论和逐段修改。</p>
          </div>

          <aside className="draft-disclaimer">
            <b>材料范围</b>
            <p>正文以60项公开资料为基础，能够说明政策、媒体和产业主体公开说了什么；涉及本地居民记忆、游客动机和平台接受效果的判断，仍需访谈、抽样或统计验证。</p>
          </aside>

          <div className="essay-reader" id="draft-reader">
            <aside className="essay-toc">
              <div className="essay-toc-head">
                <div><span>论文目录</span><b>六章正文</b></div>
                <p>一次只读一章。先看每章要解决的问题，再用本章索引直达具体小节。</p>
              </div>
              <nav aria-label="论文章节目录">
                {essayChapterIndex.map((chapter) => (
                  <a
                    key={chapter.id}
                    href={`#draft/${chapter.id}`}
                    className={activeEssayChapter === chapter.id ? "active" : ""}
                    aria-current={activeEssayChapter === chapter.id ? "page" : undefined}
                    onClick={() => setActiveEssayChapter(chapter.id)}
                  >
                    <span>{chapter.number}</span>
                    <div><b>{chapter.label}</b><small>{chapter.title}</small></div>
                    <em>→</em>
                  </a>
                ))}
              </nav>
            </aside>

            <div className="essay-reading-pane">
              <div className="chapter-brief" aria-label="本章阅读提示">
                <div><span>本章回答</span><p>{activeEssayEntry.question}</p></div>
                <div><span>主要材料</span><p>{activeEssayEntry.evidence}</p></div>
                <div><span>论证边界</span><p>{activeEssayEntry.boundary}</p></div>
              </div>

              <nav className="subsection-index" aria-label="本章小节索引">
                <span>本章索引</span>
                <div>
                  {activeEssayEntry.sections.map((section, index) => (
                    <a key={section.id} href={`#draft/${activeEssayEntry.id}/${section.id}`}>
                      {String(index + 1).padStart(2, "0")} · {section.label}
                    </a>
                  ))}
                </div>
              </nav>

          {activeEssayChapter === "intro" && (
          <article className="essay-chapter">
            <header><span>绪论</span><div><p>问题提出与研究设计</p><h3>从地方早餐到城市符号：为什么要研究媒介怎样组织记忆</h3></div></header>
            <div className="essay-prose">
              <section className="essay-subsection" id="essay-intro-background">
                <h4>一、研究背景与意义</h4>
                <p>淮南牛肉汤原本首先是一种地方日常饮食：它同街边门店、矿区生活、清晨劳动和家庭口味相连。近年发生的变化在于，这碗汤越来越频繁地进入考古新闻、电视剧、短视频、非遗节目、产业大会和地方政策。2024年武王墩考古让淮南的楚文化进入全国公共视野<Cite id={14} /><Cite id={23} />；2025年《六姊妹》及相关短视频、见面会和万人共食活动，又把牛肉汤放进“家乡”“家庭”和“烟火气”的情感叙事<Cite id={17} /><Cite id={25} /><Cite id={47} />。与此同时，地方行动方案、集体商标和产业条例正在把它变成可以管理、授权和统计的城市公共品牌<Cite id={1} /><Cite id={2} /><Cite id={3} />。因此，研究对象已经不只是菜品本身，而是地方食物如何在多种媒介和多类主体的共同作用下成为公共记忆。</p>
                <p>这一问题具有两层意义。理论上，它能把媒介记忆、食物记忆、城市品牌和活态非遗四组研究放进同一过程。媒介记忆研究说明媒介技术会改变过去被保存和调用的方式<Cite id={31} /><Cite id={35} />；食物记忆研究解释气味、温度和进食经验为何能连接个人身份与集体怀旧<Cite id={32} />；城市品牌研究则提醒我们，城市形象不是一句广告，而是本地认同、公共治理和外部体验之间的关系<Cite id={41} /><Cite id={42} />。现实上，这项研究可以帮助地方传播区分史实、传说和宣传口径，判断产业扩张是否真正转化为城市认同，并讨论商业开发怎样反过来支持而不是消耗非遗传承。</p>
              </section>

              <section className="essay-subsection" id="essay-intro-review">
                <h4>二、国内外研究现状</h4>
                <p>国外媒介记忆研究已经从“媒介保存记忆”转向“媒介参与生产记忆”。van Dijck关注数字技术如何进入个人记忆实践<Cite id={31} />；Erll强调文化记忆会在文学、影视、新闻和平台之间反复改写，这一过程被称为“再媒介化”<Cite id={35} /><Cite id={39} />；Hoskins则进一步指出，数字连接既扩大参与，也让平台排序和商业控制介入哪些过去更容易被看见<Cite id={40} />。这些研究为本文提供了基本判断：牛肉汤的地方记忆并不是一个先已完成、再被媒体搬运的对象，而是在一次次选择、剪辑、表演和转发中逐渐形成的。</p>
                <p>美食传播研究与城市传播研究提供了另外两条线索。食物能通过感官经验唤起家庭、地方和身份记忆，平台字幕、弹幕与评论又使私人味觉获得公开表达的机会<Cite id={32} /><Cite id={33} />。城市品牌研究则表明，地方食品并非只是一件商品；门店空间、食用动作、产地叙事和游客体验都在共同表达地方<Cite id={41} /><Cite id={42} />。但如果研究只讨论“美食提高城市知名度”，就容易跳过中间过程：哪些故事先被选中，谁赋予它意义，受众是否接受，线上关注又怎样进入线下空间。</p>
                <p>现有淮南牛肉汤资料主要集中在风味工艺、产业规模、非遗宣传和地方历史叙事。风味研究能够说明汤底、香料和制作工艺的物质基础<Cite id={53} />，政策与新闻材料则提供商标、标准、企业、产值和文旅活动等公开信息<Cite id={1} /><Cite id={5} /><Cite id={18} />。不足之处在于，这些材料多从“资源丰富”“产业增长”或“城市名片”出发，较少系统解释传说、考古、影视、平台和政策如何接成一条记忆生产链，也较少比较官方、商业和民间对“正宗”的不同理解。本文试图补足的，正是这个过程层面的空缺。</p>
              </section>

              <section className="essay-subsection" id="essay-intro-methods">
                <h4>三、研究方法和研究思路</h4>
                <p>本文采用事件型多模态内容分析、半结构访谈和场景观察相结合的方法。内容分析以一条新闻、视频或帖子为单位，记录其中调用的历史资源、核心画面、叙事标签、发言主体、情感线索和证据强度，具体操作可参照Krippendorff关于分析单位、编码规则与一致性检验的要求<Cite id={43} />。访谈将覆盖传承人、老店与普通门店、企业、政府或协会、本地不同代际居民以及外地游客，重点追问他们如何判断“正宗”、从哪里得知相关故事、平台热度是否改变实际做法；访谈材料可采用主题分析进行归纳<Cite id={44} />。场景观察则进入门店、街区、取景地和活动现场，记录屏幕中的符号是否真正成为可体验的空间。</p>
                <p>研究按四个事件窗口组织材料：2022年至2023年作为考古和影视热点出现前的基线；2024年春夏观察武王墩考古及其二次传播；2025年春季观察《六姊妹》、短视频和线下活动之间的流动；2025年下半年至2026年观察集体商标、标准和地方条例如何进一步固定“淮南牛肉汤”的公共含义。当前网站整理的60项公开来源属于前期资料库，它们能重建重要节点和机构说法，但正式论文仍需补充系统平台样本、访谈原文和现场记录。</p>
              </section>

              <section className="essay-subsection" id="essay-intro-innovation">
                <h4>四、研究内容和创新点</h4>
                <p>本文围绕一个核心问题展开：淮南牛肉汤如何从地方日常饮食变成集体记忆和城市符号，这一过程中又出现了哪些失真、排除和地方性损耗。第二章回答“它为什么容易被记住”，第三章回答“媒体怎样重新组织这些记忆”，第四章讨论关注怎样进入认同、到访和产业，第五章分析传播成功背后的选择性遗忘、失真和代际问题，结语再回到城市形象与非遗保护。</p>
                <p>本文的尝试不在于再次证明牛肉汤“历史悠久”或“产业兴旺”，而在于提出并检验一条完整过程：原有资源被事件唤醒，媒体用标签和画面重新组织，不同主体围绕意义展开竞争，随后产生评论、打卡、购买、标准和统计；这些新活动又成为下一轮传播的材料。同时，本文把可核事实、机构公开口径、地方传说和研究推断分开标注，防止考古材料、产业数字和受众效果在论证中相互越界。</p>
              </section>
            </div>
          </article>
          )}

          {activeEssayChapter === "chapter-2" && (
          <article className="essay-chapter">
            <header><span>第二章</span><div><p>因何记忆</p><h3>淮南牛肉汤的媒介记忆动因</h3></div></header>
            <div className="essay-prose">
              <section className="essay-subsection" id="essay-chapter-2-resources">
                <h4>一、淮南牛肉汤基础资源的可记忆性</h4>
                <p>讨论淮南牛肉汤的历史，最容易落入一个看似合理、其实解释力很弱的说法：因为它“历史悠久”，所以它自然成了城市记忆。问题在于，年代久不等于今天的人一定记得，更不等于不同的人记得的是同一件事。本节寻找的不是唯一的“第一碗”，而是传说、物证和日常经验为什么都能成为可被媒介调用的记忆资源。</p>
                <p><b>第一，传说记忆具有可讲述性。</b>刘安炼丹、赵匡胤困寿春等故事把复杂饮食史压缩成人物、困境和转折：有名的人物来到此地，在关键时刻喝下一碗汤，于是地方、历史与食物被接成一条容易复述的线。地方政府和产业活动仍会调用这类故事<Cite id={10} /><Cite id={21} />，说明它们确有现实传播能力。但“经常被讲述”不等于“已经被证实”。论文应将其界定为地方记忆资源，而不是现代菜品起源的直接证据。</p>
                <p><b>第二，考古记忆具有可展示性。</b>《淮南子》中确有关于屠牛、烹肉和“煎熬燎炙”的文字<Cite id={29} />；武王墩考古确认了高等级楚墓、青铜鼎和动物遗存，相关节目还提到黄牛等动物曾经历烹饪<Cite id={14} /><Cite id={24} /><Cite id={28} />。这些材料能够支持古代牛肉烹饪和礼制生活，却不能一步推出今天的配方已经延续两千年。这里至少跨过了“动物遗存—牛肉烹饪—汤类食物—现代地方菜”几个层次。考古的传播作用不在于替起源传说盖章，而在于提供容易被镜头呈现的器物和遗存，使地方故事获得更强的“证据感”。</p>
                <p><b>第三，市井记忆具有可体验性。</b>与帝王传说相比，矿区清晨、街边炉火、回民牛肉技艺以及上班前的一顿热汤，更接近许多人的生活经验。地方资料把现代牛肉汤的兴起同回民饮食技艺、矿区生活条件、市场流通和改革开放后的制度变化联系起来<Cite id={21} /><Cite id={30} />；早期制作规范又把主辅料、熬汤和烫制等做法写进技术文本<Cite id={52} />。热气、辣味、汤锅声和共同进食所留下的是身体记忆：人们未必能复述完整历史，却能凭气味、温度和吃法认出“这是家乡”。这种可以反复吃到的经验，是牛肉汤区别于抽象城市口号的重要条件<Cite id={32} /><Cite id={33} />。</p>
              </section>

              <section className="essay-subsection" id="essay-chapter-2-digital-ecology">
                <h4>二、数字传播生态作为媒介记忆的基础</h4>
                <p><b>记忆载体首先发生了数字化迁移。</b>原先存在于地方典籍、口述传说、门店技艺和家庭经验中的材料，如今被转换成新闻画面、影视情节、短视频片段、直播话术、评论和打卡照片。数字化并不是简单换一个存放地点：文本进入视频后更依赖器物、热气、色彩和动作，长历史进入平台后更容易被压成“千年”“非遗”“正宗”等短标签。媒介形式改变了内容可见的次序，也改变了受众参与记忆的方式<Cite id={31} /><Cite id={34} />。</p>
                <p><b>记忆主体也由少数机构扩展为多类参与者。</b>政府部门发布政策和城市叙事，媒体选择报道角度，企业和门店用产品解释“正宗”，传承人强调工艺，演员、游客和普通用户则通过短视频、评论和照片加入讲述。主体增多不意味着权力完全平等：官方账号、主流媒体和高流量内容仍拥有更强的可见度。平台内容同时呈现碎片化和情感化倾向，复杂史料较难传播，“家乡味”“烟火气”和人物故事则更容易引起表达。论文需要分析的不是参与者有没有出现，而是谁的说法被反复放大、谁只作为画面背景存在。</p>
              </section>

              <section className="essay-subsection" id="essay-chapter-2-drivers">
                <h4>三、媒介记忆的外部驱动力</h4>
                <p><b>政策与商业共同推动记忆进入规模化传播。</b>地方行动方案把产品、网络传播和文旅消费纳入同一发展安排<Cite id={1} />；集体商标、授权名单、标准和条例又逐渐规定谁能使用名称、质量底线如何管理<Cite id={2} /><Cite id={3} /><Cite id={5} />。电商和直播则解决地方味道怎样离开淮南的问题<Cite id={8} /><Cite id={11} />。这两类力量不仅扩大销售，也在反复规定公众应该把牛肉汤理解成什么：地方特产、城市品牌、标准商品，还是可以加盟和下单的产业项目。</p>
                <p><b>文化与社会驱动力让传播获得情感理由。</b>非遗认定和国家级节目把制作过程从门店劳动转换成值得公共展示的文化技艺<Cite id={18} /><Cite id={27} />；人口流动、返乡叙事和平台上的家乡表达，又使一碗热汤成为连接个人经历与地方身份的媒介。这里的“乡愁”不能被预设为所有人的共同反应，而应在评论和访谈中检验。但可以确认的是，牛肉汤同时拥有可讲的过去、可看的物证和可重复的感官经验，因此比单纯政策口号更容易进入个人表达。</p>
                <p>由此可见，淮南牛肉汤的可记忆性并不是一条连续历史单独造成的，而是基础资源、数字传播条件和外部推动力量相互叠加的结果。这个结论为下一章提供起点：媒介并非从零创造一段记忆，而是从已有材料中选择某些部分，并在事件中重新安排它们。</p>
              </section>
            </div>
          </article>
          )}

          {activeEssayChapter === "chapter-3" && (
          <article className="essay-chapter">
            <header><span>第三章</span><div><p>如何记忆</p><h3>淮南牛肉汤媒介记忆的激活与重构</h3></div></header>
            <div className="essay-prose">
              <section className="essay-subsection" id="essay-chapter-3-activation">
                <h4>一、记忆激活：记忆资源的符号化唤醒</h4>
                <p>记忆资源只有被事件重新调用，才会进入更大范围的公共讨论。武王墩考古是第一个重要节点。考古报道原本关心墓葬形制、器物制度、动物遗存和楚国礼制<Cite id={23} /><Cite id={24} />，但进入地方传播和平台讨论后，最容易留下的往往是“大鼎”“黄牛”“两千多年”等画面和词语。它们又同本地最知名的食物相遇，于是专业考古问题被翻译成“古人是否也喝牛肉汤”的通俗问题。这样的翻译降低了公众接近考古的门槛，却也容易借考古权威填补尚未证明的起源环节。</p>
                <p>《六姊妹》构成另一类触发。牛肉汤在剧中不是知识讲解，而是家庭、邻里和城市日常的组成部分。主创访谈强调家庭与地方生活<Cite id={25} />，相关报道则记录剧中食物、演员短视频和游客打卡之间的联系<Cite id={17} />。考古用器物唤醒历史感，电视剧用人物关系唤醒亲近感，两者分别激活了“古老淮南”和“生活淮南”。后续新闻、短视频、线下活动和游客内容继续引用这些画面，使一次事件逐步沉淀为可重复调用的记忆材料。</p>
              </section>

              <section className="essay-subsection" id="essay-chapter-3-reconstruction">
                <h4>二、记忆重构：数字媒介生态下的再生产路径</h4>
                <p>媒介并不是透明容器。同一个故事从考古报告进入电视，从电视剧进入短视频，再进入线下活动时，每一步都会增加新重点并省略原有语境。Erll所说的“再媒介化”，在本案例中可以具体理解为：器物被新闻解释，剧情被剪成片段，片段被活动重新表演，游客又把现场拍回平台<Cite id={35} /><Cite id={39} />。每一次传播看似在重复原来的内容，实际上都生产了一个更适合当前媒介和目的的新版本。</p>
                <p>这种重构主要通过三种方式发生。其一，屏幕无法传递真实味道，便用红油、热气、滚汤声、入口表情和“鲜香辣”等语言制造近似的感官体验。其二，微观家庭叙事把宏大的城市历史落到一顿饭、一次返乡和几代人的关系中，使受众先产生人物情感，再认识地方。其三，数字平台把原本有时间顺序的历史切成可以独立转发的片段，楚文化、矿城生活、非遗和现代产业由此可能在几十秒内并置。所谓“重构”不是抽象判断，而是这些画面、声音、人物和时间顺序发生了变化。</p>
              </section>

              <section className="essay-subsection" id="essay-chapter-3-meaning">
                <h4>三、意义生产：多重话语下的记忆建构</h4>
                <p>不同主体并不以同一种方式解释牛肉汤。官方话语倾向于把它放进非遗、产业和城市品牌框架，用规划、商标、标准和活动建立统一名称与公共权威<Cite id={1} /><Cite id={3} /><Cite id={5} />。商业话语更关心味道能否被加工、运输、加盟和下单，因此把“正宗”转化为质量承诺和品牌识别<Cite id={8} />。民间话语则常从“我记得的那一碗”出发，用汤色、香料、吃法、门店关系和家庭经历判断是否地道。</p>
                <p>这三种说法分别回应治理、经营和生活经验，不能简单归为谁真谁假。但它们进入公共空间的机会并不均等。官方与企业拥有稳定发布渠道和活动资源，普通食客的经验更分散，也更容易被平台热度筛选。正式研究应比较媒体引用了谁、标准制定邀请了谁、品牌收益分配给谁，并通过访谈确认“正宗”究竟是一项得到共同认可的标准，还是一个仍在争论中的词。</p>
                <p>因此，淮南牛肉汤的媒介记忆可以概括为一个循环：历史和日常提供材料，考古或影视事件触发关注，媒体用“千年”“非遗”“烟火气”“正宗”等标签组织内容，各类主体继续解释和争论，随后产生评论、共食、购买与到访；这些行动留下的新画面和数字，又进入下一轮传播。这个循环比“媒体提高知名度”更能说明记忆如何被持续生产。</p>
              </section>
            </div>
          </article>
          )}

          {activeEssayChapter === "chapter-4" && (
          <article className="essay-chapter">
            <header><span>第四章</span><div><p>记忆转化</p><h3>淮南牛肉汤媒介记忆的价值跃迁</h3></div></header>
            <div className="essay-prose">
              <section className="essay-subsection" id="essay-chapter-4-identity">
                <h4>一、情感与主体重塑：个体记忆到集体记忆</h4>
                <p>一位本地人记得小时候在哪里喝汤，首先是一段私人经验；只有当这种经验通过家庭讲述、影视画面、短视频和评论被公开表达，人们发现彼此拥有相似记忆时，个体记忆才可能聚合为集体认同。食物的特殊性在于它既能被讲述，也能被重新吃到。观众看到《六姊妹》中的家庭生活后，可以在评论中讲自己的家乡早餐，也可以到店用一碗汤检验屏幕想象。已有研究说明媒介中的食物能够唤醒地方记忆<Cite id={33} />，但淮南案例究竟影响了哪些人、产生了自豪还是反感，仍需通过评论样本和访谈验证，不能仅由电视剧热播直接推出。</p>
                <p>这里所谓“主体重塑”，并不是受众被动接受统一叙事，而是原本沉默的个人经验获得表达位置。演员、返乡者、年轻用户和外地游客都可能以自己的视角重新讲述牛肉汤。问题在于，表达机会不等于实际权力：用户可以评论和模仿，却未必能参与标准制定、活动资源和品牌收益分配。因此，论文既要观察情感共鸣，也要追问参与发生在表达层、消费层还是决策层。</p>
              </section>

              <section className="essay-subsection" id="essay-chapter-4-practice-space">
                <h4>二、实践与空间转化：从屏幕观看到消费和到访</h4>
                <p>电视剧取景地、街区、门店和节庆活动把屏幕中的抽象“淮南”变成可以走、看、拍和品尝的空间。2025年春季，九龙岗时光小镇出现明显客流；五一报道给出的口径为日均约1.5万人次，其中市外游客超过六成<Cite id={19} />，另一份地方材料称日均游客超过1.2万人次<Cite id={6} />。地方部门还把粉丝见面会、方言互动和万人共品牛肉汤放进同一场活动<Cite id={47} />。这些材料能够说明影视热点、地方活动和到访增长在时间上相伴，却不能证明每位游客都因电视剧或牛肉汤而来。游客来源、出行动机、停留路线和消费金额仍需独立调查。</p>
                <p>方便装、冷冻产品、电商直播和连锁门店，使牛肉汤离开本地餐桌后仍携带“淮南”名称；机场、高铁站、服务区、商圈和景区门店的奖补政策，又把它主动放进人口流动频繁的地点<Cite id={8} /><Cite id={51} />。这里发生的是双向转化：地方记忆变成可以购买和携带的商品，商品的持续流通又让“淮南”在异地被反复看见。论文需要分别测量曝光、到访、购买和复购，不能用一个“出圈”概括所有环节。</p>
              </section>

              <section className="essay-subsection" id="essay-chapter-4-city-symbol">
                <h4>三、地方与符号跃升：从一碗汤到一座城</h4>
                <p>牛肉汤离开原来的街边门店和早餐时间后，会出现“脱域”：方便食品、电商内容和异地连锁让消费者不必身处淮南也能接触它。但包装上的产地说明、门店招牌、集体商标和短视频故事，又尝试把它重新嵌回“淮南”这一地方名称。能否成功再嵌入，不只取决于名称有没有出现，还取决于产品体验、历史讲述和公共治理是否相互一致。</p>
                <p>产业政策为这种符号跃升提供组织条件。行动方案把产品规模、网络传播和文旅消费放进同一发展路径<Cite id={1} />；集体商标、授权名单和地方条例逐步把名称变成可管理的公共品牌<Cite id={2} /><Cite id={3} /><Cite id={4} />；计划执行报告还提供项目投资和产值增长等公开口径<Cite id={50} />。这说明政策不仅报道传播结果，也直接决定哪些主体可以使用名称、哪些场景获得资源、哪些数字成为城市成绩。</p>
                <p>城市品牌研究提醒我们，地方形象不能只靠政府和企业单向设计<Cite id={41} /><Cite id={42} />。牛肉汤能否长期代表淮南，还要看本地居民是否认可、普通门店是否受益、游客实际体验是否兑现宣传。情感、空间和产业可以互相加强，却不是自动发生的因果链：热搜不一定带来长期认同，到访不一定转为消费，产值增长也不必然意味着地方文化得到更好保护。</p>
              </section>
            </div>
          </article>
          )}

          {activeEssayChapter === "chapter-5" && (
          <article className="essay-chapter">
            <header><span>第五章</span><div><p>记忆障碍</p><h3>淮南牛肉汤媒介记忆的问题反思</h3></div></header>
            <div className="essay-prose">
              <section className="essay-subsection" id="essay-chapter-5-selective-memory">
                <h4>一、传播者的选择性记忆障碍</h4>
                <p>媒介记忆必然包含选择。帝王、古墓和大鼎具有明确人物和强烈画面，容易进入标题；矿区工人的清晨、回民技艺的传承、普通店主的经营变化和家庭口味差异，却很难在几十秒视频中获得同样位置。问题不在于传播者进行了选择，而在于某一种选择是否长期垄断“淮南牛肉汤是什么”的答案。若古代传奇持续压过近现代生活，城市记忆就可能只有显眼的历史年代，却没有具体的人。</p>
                <p>政治与商业逻辑还可能征用记忆。政策传播倾向于用产业规模、城市名片和发展目标证明治理成效，商业传播倾向于把“正宗”“秘方”和“千年”变成购买理由。二者都能扩大资源和市场，却也可能只保留有利于品牌统一的版本。研究者应对照宣传文本、标准条款、门店实践和从业者访谈，判断哪些记忆被公共资源放大、哪些经验因不利于统一叙事而被省略。</p>
              </section>

              <section className="essay-subsection" id="essay-chapter-5-media-damage">
                <h4>二、传播媒介的记忆损伤</h4>
                <p>碎片化首先消解历史深度。平台内容为了争夺注意力，常把复杂关系压缩成“千年古方”“一口穿越两千年”等易于转发的表达，把考古、典籍、传说和现代菜品放进同一句话，却不说明证据之间的距离。结果不只是某个细节可能错误，更在于公众只剩几个关键词，看不见这些说法如何形成。论文必须逐层区分可核事实、地方传说、机构口径和研究解释，避免重复自己正在批评的传播方式。</p>
                <p>标准化和舞台化也可能造成另一类损伤。食品安全、原料质量和商标信誉需要共同底线，白名单、制作规范和授权制度确实回应了市场扩张中的治理问题<Cite id={5} /><Cite id={9} /><Cite id={52} />。但如果标准继续规定所有汤色、香料比例和地方吃法，或非遗节目只留下沸腾大锅和快速动作，就可能把分布在不同街区、族群和门店中的知识压成单一版本。较稳妥的原则是统一安全和责任底线，同时保留门店解释工艺差异的空间。</p>
              </section>

              <section className="essay-subsection" id="essay-chapter-5-generations">
                <h4>三、受众的被动接受与代际断裂</h4>
                <p>数字平台表面上扩大参与，推荐算法却会重复放大节奏快、情绪强、易模仿的内容。受众可以点赞、评论和转发，但如果接触到的始终是相似版本，这种参与仍可能建立在有限选择上。正式研究应主动寻找不接受“千年”说法、不追剧、不打卡或反对统一标准的受访者，观察他们是没有被主流传播看见，还是确实对城市叙事持不同理解。</p>
                <p>代际差异也不能简单写成“年轻人不懂传统”。年轻人可能先从电视剧和短视频认识牛肉汤，老一辈则更多从家庭劳动、矿区生活和长期消费中理解它；两代人拥有的是不同进入路径。活态非遗并不要求下一代原样复制上一代，而强调社区在持续传递中重新创造<Cite id={37} /><Cite id={46} />。真正需要判断的是，年轻人是否有机会接触完整技艺，传承人是否愿意解释知识，新的表达能否同旧的生活经验形成对话。</p>
                <p>商业化同样不能被预设为文化的敌人。产品销售和旅游收入可能为从业者提供生计，使年轻人愿意学习；没有稳定收益，保护也可能只剩节庆表演。关键是社区和传承人是否知情参与、能否公平分享收益、能否对误用知识提出异议<Cite id={38} /><Cite id={45} />。因此，判断传播是否造成记忆障碍，最终要回到发言权、收益和持续传承能力，而不能只看播放量或销售额。</p>
              </section>
            </div>
          </article>
          )}

          {activeEssayChapter === "conclusion" && (
          <article className="essay-chapter conclusion-chapter">
            <header><span>结语</span><div><p>研究发现、启示与局限</p><h3>一碗汤成为城市记忆，不靠一次“出圈”</h3></div></header>
            <div className="essay-prose">
              <section className="essay-subsection" id="essay-conclusion-findings">
                <h4>一、研究发现总结</h4>
                <p>淮南牛肉汤从地方日常食物走向城市符号，并不是一家媒体、一次考古发现或一部电视剧单独造成的。它首先拥有传说、典籍、考古、技艺和生活经验等多层资源；考古与影视事件把其中一部分推到公共视野；新闻、短视频、活动和政策再用“千年”“非遗”“家乡味”“正宗”等标签重新组织；政府、企业、传承人、门店和食客继续解释这些标签。评论、共食、到访、购买、商标和标准又把记忆带入情感、空间和产业，并留下下一轮传播的新材料。</p>
              </section>

              <section className="essay-subsection" id="essay-conclusion-city-image">
                <h4>二、媒介记忆如何参与城市形象建构</h4>
                <p>媒介记忆首先提供了一个城市形象的记忆场域：考古让淮南被看作具有楚文化历史的地方，电视剧让它被看作有家庭和工业生活温度的城市，牛肉汤则把这些抽象印象落实为可以看见、闻到和吃到的日常对象。城市形象由此不只是视觉标识，而是历史叙事、生活经验和身体感受共同构成的关系。</p>
                <p>其次，媒介通过反复选择和组合生产城市符号。大鼎、热汤、红油、老街、家庭饭桌和“正宗”等元素并非天然代表淮南，而是在新闻、影视、平台和活动中不断同时出现，才逐渐形成稳定联想。符号能否成立，取决于它是否同真实地方生活保持联系。若传播只保留统一、好看的版本，短期识别度可能提高，长期信任却会下降。</p>
                <p>最后，媒介记忆只有被现实条件承接，才可能转化为城市发展。线路、取景地、门店、产品、商标和公共服务把屏幕关注接到线下；居民认同、游客体验、从业者收益和透明统计则决定这种转化能否持续。城市传播的评价指标因此不应只有热搜、客流和产值，还应包括历史表述是否准确、普通门店是否受益、游客体验是否兑现、社区是否参与决策。</p>
              </section>

              <section className="essay-subsection" id="essay-conclusion-heritage">
                <h4>三、媒介记忆在非遗保护与地方性延续中的双重角色</h4>
                <p>数字媒介为非遗提供了新的传播和学习通道。制作动作可以被记录，传承人能够进入公共表达，异地消费者也能通过视频和产品认识地方技艺。传播和商业收益如果回到从业者、学徒培养和门店经营，就可能增强继续传承的现实条件。</p>
                <p>风险同样存在。工艺可能被压成视觉奇观，地方差异可能被统一标准削弱，传说可能借考古权威被包装成事实，社区知识也可能在没有充分参与和收益的情况下被商业使用。保护与发展不是二选一，关键在于由谁决定可以改变什么、收益如何分配、哪些差异必须保留。政策可以公开标准制定者和参与过程，产业报告可以同步说明统计口径和从业者收益，文旅项目则应记录学徒成长、社区意见和日常传承，而不只展示客流。</p>
              </section>

              <section className="essay-subsection" id="essay-conclusion-limits">
                <h4>四、研究局限与未来展望</h4>
                <p>当前初稿主要建立在公开网页、报道、视频和学术文献之上，能够较可靠地重建机构叙事和重要传播节点，却不能代表全部受众经验。官方产业数字的统计边界并未完全公开，平台互动量也会随时间变化；目前还缺少系统评论样本、完整访谈和持续现场观察。因此，本文现阶段关于认同、到访动机和传承效果的判断，只能作为待验证命题。</p>
                <p>后续研究应完成四项工作：建立事件前后可比较的平台样本；访谈不同代际居民、传承人、门店、企业、管理者和游客；在门店、取景地与活动现场记录实际行为；独立核对产值、门店、游客和网销数据的计算口径。若调查发现许多本地人不接受“千年”说法、游客并非因影视到访，或标准化没有明显改变门店实践，这些反例不是论文失败，而是帮助研究从一套顺滑故事变成经得起检验的结论。</p>
              </section>
            </div>
          </article>
          )}

              <nav className="chapter-pager" aria-label="前后章节">
                <div>
                  {previousEssayChapter && (
                    <a href={`#draft/${previousEssayChapter.id}`} onClick={() => setActiveEssayChapter(previousEssayChapter.id)}>
                      <span>← 上一章</span>
                      <b>{previousEssayChapter.label} · {previousEssayChapter.title}</b>
                    </a>
                  )}
                </div>
                <div>
                  {nextEssayChapter && (
                    <a href={`#draft/${nextEssayChapter.id}`} onClick={() => setActiveEssayChapter(nextEssayChapter.id)}>
                      <span>下一章 →</span>
                      <b>{nextEssayChapter.label} · {nextEssayChapter.title}</b>
                    </a>
                  )}
                </div>
              </nav>
            </div>
          </div>

          <details className="plain-writing-details">
            <summary><span>附：论文表达修改工具</span><b>查看六组“套话改正常中文”的示范</b></summary>
          <section className="plain-writing-toolkit" aria-labelledby="plain-writing-title">
            <div className="toolkit-intro">
              <p className="section-kicker">把套话改成正常中文</p>
              <h3 id="plain-writing-title">说人话不是不学术，而是不让套话代替分析。</h3>
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
          </details>
        </div>
      </section>
      </div>}

      {activeTab === "methods" && <div className="tab-page" data-page="methods">
      <section className="methods-lab page-section" id="methods">
        <div className="section-heading">
          <div><p className="section-kicker">这套研究怎么真正做下去</p><h2>资料已经有了，下一步要按同一套规则采样和访谈。</h2></div>
          <p>网站里的60项公开来源只是前期材料，不能代替你自己的调查。下面这套办法既能写进研究方法章节，也确实可以照着执行。</p>
        </div>

        <div className="method-lead">
          <div><span>建议这样做</span><strong>按事件收集视频和文章<br />＋访谈不同的人<br />＋去门店和街区观察</strong></div>
          <p>先数清媒体反复用了什么画面和说法，再问不同的人怎样理解，最后到现场看这些说法是否真的进入门店、街区和游客体验。学术上分别对应内容分析、半结构访谈和场景观察。三种材料互相核对，避免只看宣传稿就替受众下结论。</p>
        </div>

        <div className="sample-window-heading">
          <span>01 / 先按四个时间段收材料</span>
          <p>不要试图收完“网上所有内容”。围绕四次重要变化，分别收集事件前后一段时间的材料，才方便比较。</p>
        </div>
        <div className="sample-window-grid">
          <article><b>基线窗口</b><span>2022.04—2023.12</span><h3>全国性美食节目与产业叙事</h3><p>以央视《消费主张》和早期政策材料观察考古、影视爆点出现前，牛肉汤如何被描述。</p><em>起始样本 <Cite id={22} /><Cite id={1} /></em></article>
          <article><b>考古窗口</b><span>2024.04—2024.07</span><h3>武王墩进入公共视野</h3><p>比较考古机构、央视、地方媒体和平台转载的说法，重点记录内容怎样从“牛骨”一步步跳到“牛肉汤”。</p><em>起始样本 <Cite id={14} /><Cite id={23} /><Cite id={24} /></em></article>
          <article><b>影视窗口</b><span>2025.02—2025.05</span><h3>《六姊妹》与万人共食</h3><p>追踪剧情、主创访谈、演员短视频、游客打卡、官方活动和到访口径之间的跨媒介流动。</p><em>起始样本 <Cite id={17} /><Cite id={25} /><Cite id={47} /><Cite id={48} /></em></article>
          <article><b>制度窗口</b><span>2025.08—2026.05</span><h3>商标、标准与地方条例</h3><p>观察“正宗”如何从经验判断转为授权、标准、白名单和法规，以及民间差异是否被保留。</p><em>起始样本 <Cite id={2} /><Cite id={3} /><Cite id={4} /><Cite id={5} /></em></article>
        </div>

        <div className="corpus-grid">
          <article><span>A · 政策、新闻和研究资料</span><h3>网站现有60项</h3><p>用来整理政策节点、事件时间线、理论和图片。要保存标题、日期、发布者、网址、关键段落和授权信息，防止原链接以后失效。</p></article>
          <article><span>B · 短视频和社交平台内容</span><h3>建议 240—400 条</h3><p>每个时间段从抖音、B站、小红书或微博选取政府、媒体、商家和普通用户四类账号。播放量、互动量和评论量都只是采集当天的快照，不能当成永远不变的事实。</p></article>
          <article><span>C · 访谈和现场观察</span><h3>建议 30—40 人</h3><p>尽量覆盖传承人和老店、普通门店和企业、政府和协会、本地老居民、年轻本地人、外地游客或内容创作者。人数不是越多越好，当新访谈很少再带来新信息时，可以停止。</p></article>
        </div>

        <div className="coding-heading">
          <div><span>02 / 给每条视频、文章或帖子填同一张表</span><h3>一条内容填一行，方便之后比较。</h3></div>
          <p>先让两个人各自试填大约10%的样本，再对照分歧、把每个选项解释清楚，最后正式填写全部样本。论文中要报告两人的判断有多一致。具体做法可参考Krippendorff<Cite id={43} />。</p>
        </div>
        <div className="coding-table-wrap">
          <table className="coding-table">
            <thead><tr><th>维度</th><th>建议代码</th><th>分析问题</th></tr></thead>
            <tbody>{codingRows.map(([dimension, codes, question]) => <tr key={dimension}><td>{dimension}</td><td>{codes}</td><td>{question}</td></tr>)}</tbody>
          </table>
        </div>

        <div className="interview-heading"><span>03 / 分别去问不同的人</span><h3>听听谁觉得什么才算“正宗”。</h3></div>
        <div className="interview-grid">
          <article><b>传承人 / 老店</b><p>你认为什么不能被标准化？哪一种变化仍属于传承，哪一种已经改变了技艺内涵？</p></article>
          <article><b>普通门店 / 企业</b><p>“正宗”在经营中意味着配方、产地、商标还是顾客认可？平台流量改变了哪些做法？</p></article>
          <article><b>政府 / 协会</b><p>产业产值、门店数和文旅转化如何统计？商标授权、食品安全与非遗保护怎样分工？</p></article>
          <article><b>本地老居民</b><p>你最早在何种场景喝牛肉汤？今天的宣传与记忆中的味道、街区和人际关系有何差异？</p></article>
          <article><b>年轻本地人</b><p>你通过家庭、门店、电视剧还是短视频认识它？哪些叙事让你自豪，哪些让你觉得“太宣传”？</p></article>
          <article><b>外地游客 / 创作者</b><p>来淮南前形成了什么想象？实际体验改变了什么？你发布内容时为何选择某些画面和词语？</p></article>
        </div>
        <p className="interview-note">整理访谈时，可以先反复阅读原文，再标出常见说法，把相近内容归成主题，检查这些主题有没有遗漏或重叠，最后再写进论文。学术上这叫主题分析；还要保留不符合主要结论的反例，并记下研究者自己的判断过程<Cite id={44} />。</p>

        <div className="validity-grid">
          <article><span>同一结论看三种材料</span><p>政策文件、媒体内容和访谈至少互相核对一次，不能让一篇宣传稿代表所有人的记忆。</p></article>
          <article><span>不同时间不要乱比</span><p>保存采集日期和对应事件；只有统计范围相同，平台互动量和行政数字才可以比较。</p></article>
          <article><span>先保护受访者</span><p>访谈前取得同意。谈到传承知识和商业配方时，受访者可以选择匿名、撤回或不公开某些内容<Cite id={45} />。</p></article>
          <article><span>主动找反例</span><p>专门寻找不认同“千年”、不追剧、不打卡或反对统一标准的人，看看原来的判断能不能站住。</p></article>
        </div>
      </section>

      <section className="reference-section page-section">
        <div className="section-heading">
          <div><p className="section-kicker">可以先读的八条核心文献</p><h2>先整理成参考文献初稿，提交前再按学校格式核对。</h2></div>
          <p>下面暂时按常见的GB/T 7714格式整理。正式提交前，还要对照学校模板、数据库信息和你实际阅读的版本，检查大小写、出版地和访问日期。</p>
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
      </div>}

      {activeTab === "sources" && <div className="tab-page" data-page="sources">
      <section className="video-section page-section">
        <div className="section-heading">
          <div><p className="section-kicker">先看视频怎么讲</p><h2>这些公开视频不是装饰，而是可以分析的材料。</h2></div>
          <p>从2022年的消费节目到2025年的非遗舞台，不同节目给同一碗汤安排了不同角色。这里先说明每条视频能看什么，再链接到原发布页。</p>
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
          <div><p className="section-kicker">所有材料都放在这里</p><h2>60项网页、文章、视频、图片和学术资料。</h2></div>
          <p>资料复核截至2026年8月17日。来源链接均指向原始页面；“官方来源”意味着发布主体明确，并不自动消除自报口径与宣传倾向。</p>
        </div>
        <div className="source-filters" role="group" aria-label="筛选来源类型">
          {["全部", "政策/统计", "新闻/专题", "视频", "图片/素材", "学术/典籍"].map((filter) => (
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
          <p className="section-kicker">网站做到了什么，还缺什么</p>
          <h2>使用这些材料前，请先看这三点。</h2>
        </div>
        <div className="method-grid">
          <article><h3>这个网站已经做了什么</h3><p>60项政策、统计、新闻、视频、图片、典籍和学术资料都已逐条登记。开放图片记录了作者和许可证，论文各章也配好了可以使用的材料和不能说过头的地方。</p></article>
          <article><h3>正式论文还要自己做什么</h3><p>还要按规则收集平台内容，访谈传承人、门店和食客，到现场观察，并独立核对产业产值、门店数量和游客转化等数字是怎样算出来的。</p></article>
          <article><h3>使用这些材料时要记住</h3><p>网站中的“研究推断”只能当作分析起点，不能冒充调查结论。正式论文要交代样本怎样选、每条材料怎样分析，还要给出反例和原始访谈依据。</p></article>
        </div>
      </section>
      </div>}

      <footer>
        <div><span className="brand-mark">淮</span><p>淮南牛肉汤媒介记忆研究志<br /><small>公开资料型可视化研究 · 2026</small></p></div>
        <p>一碗汤会冷却，记忆仍在沸腾。</p>
        <a href="#overview" onClick={() => openTab("overview")}>回到首页 ↑</a>
      </footer>
    </main>
  );
}
