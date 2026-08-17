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
    label: "绪论 / 第一章",
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
    label: "结语 · 研究启示",
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
  { id: "draft", number: "04", label: "中文正文", note: "章节写作底稿" },
  { id: "methods", number: "05", label: "研究方法", note: "抽样、分类与访谈" },
  { id: "sources", number: "06", label: "来源资料", note: "视频与60项档案" },
] as const;

type SiteTab = (typeof siteTabs)[number]["id"];

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [activeCase, setActiveCase] = useState(cases[0].id);
  const [sourceFilter, setSourceFilter] = useState("全部");
  const [activeTab, setActiveTab] = useState<SiteTab>("overview");

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
      const requested = window.location.hash.slice(1);
      const matched = siteTabs.find((tab) => tab.id === requested);
      if (matched) {
        setActiveTab(matched.id);
        requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "auto" }));
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
            href={`#${tab.id}`}
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
            <a className="text-action" href="#draft" onClick={() => openTab("draft")}>阅读中文正文 →</a>
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
            <div><p className="section-kicker">可继续修改的正文底稿</p><h2>先把材料讲明白，再把判断说完整。</h2></div>
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
