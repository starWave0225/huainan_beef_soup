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
  { id: 61, type: "学术/典籍", date: "2016", publisher: "国际新闻界", title: "集体记忆研究的传播学取向", note: "陈振华梳理传播学与集体记忆的理论关联，强调互联网改变记忆建构机制，也提醒研究关注媒介权力、个体缺失和连续／断裂问题。", url: "https://cjjc.ruc.edu.cn/CN/Y2016/V38/I4/109" },
  { id: 62, type: "学术/典籍", date: "2024", publisher: "新闻与写作", title: "“记忆”之辨：新闻传播学领域记忆研究的概念辨析与方法论反思", note: "胡康、郑一卉辨析数字记忆、媒介记忆等相近概念，提醒论文不能把所有与过去有关的传播都笼统称为媒介记忆。", url: "https://xwxz.cbpt.cnki.net/portal/journal/portal/client/paper/cd73dd6f5b4504a1d406bf657163f642" },
  { id: 63, type: "学术/典籍", date: "2023", publisher: "新闻与传播评论", title: "参与·网络·仓储：记忆实践路径下的数字记忆建构", note: "刘晗从主体、客体和中介三个层面讨论参与传播、数字化迁移与网络化连接，可用于分析政府、平台、门店和用户怎样共同参与记忆生产。", url: "https://xwcbpl.whu.edu.cn/e/public/DownFile/?classid=9&id=381" },
  { id: 64, type: "学术/典籍", date: "2024", publisher: "民族学刊", title: "舌尖上的“美美与共”：饮食类非遗短视频的传播与共同体意识深化", note: "以抖音饮食类非遗短视频为例，讨论地方性、通感化表达、味觉记忆和认同；结论仍需结合具体案例与受众材料审慎使用。", url: "https://mzxk.cbpt.cnki.net/portal/journal/portal/client/paper/a46650c469e0617ce2b6004c7baf692b" },
  { id: 65, type: "学术/典籍", date: "2022", publisher: "城市观察", title: "美食短视频中的广州城市形象建构及其传播策略研究", note: "对广州美食短视频进行内容编码，归纳景观、经济、文化、饮食和市民形象五类元素，为本研究的城市形象编码提供可比较方案。", url: "https://csgc.cbpt.cnki.net/portal/journal/portal/client/paper/a301a7740f67b1fc305857af89a11f16" },
  { id: 66, type: "学术/典籍", date: "2025", publisher: "安庆师范大学学报（社会科学版）", title: "司机、味觉与地标：“非网红城市”旅食Vlog的传播符号学分析", note: "研究旅食Vlog如何选择司机、角落食肆和冷门景点等地方符号，并指出符号重复和选择性展演可能制造新的模板化城市形象。", url: "https://aqss.cbpt.cnki.net/portal/journal/portal/client/paper/c8b9182f2062e67d5fbbe46485b7ea20" },
  { id: 67, type: "学术/典籍", date: "2025", publisher: "国际新闻界", title: "社会正义、记忆权与传播伦理：塑造数字时代的公正记忆文化", note: "从记忆权出发强调个人和群体讲述自身过去的权利，提示平台既扩大表达，也可能制造新的可见性不平等。", url: "https://cjjc.ruc.edu.cn/CN/lexeme/showArticleByLexeme.do?articleID=1549" },
  { id: 68, type: "新闻/专题", date: "2025-02", publisher: "淮南市人民政府", title: "一部剧与一座城……", note: "梳理淮南作为重点工业城市的煤电体系、跨省劳动力迁入和矿区生活空间；页面也出现把楚墓牛骨直接等同现代牛肉汤的传播性跳跃，适合同时研究工业记忆与证据失真。", url: "https://www.huainan.gov.cn/zwgk/jrhn/1260539368.html" },
  { id: 69, type: "新闻/专题", date: "2025-03", publisher: "淮南市人民政府", title: "从武王墩到淮南牛肉汤", note: "地方长文把考古、赵匡胤传说、回族迁徙、煤矿城市和现代产业串成连续故事；其中现代形成材料可供核对，宏大连续叙事本身则是本文的分析对象。", url: "https://www.huainan.gov.cn/zwgk/jrhn/1260555567.html" },
  { id: 70, type: "学术/典籍", date: "2021", publisher: "热带地理", title: "食物景观对地方社会记忆的表征和塑造——以《舌尖上的中国》为例", note: "于雯静等以情感挖掘、语义网络和扎根理论分析食物景观，提出味道、家庭、身体实践与环境性、功能性、情感性记忆的关系。", url: "https://www.rddl.com.cn/CN/abstract/article/1001-5221/49924" },
  { id: 71, type: "学术/典籍", date: "2022", publisher: "新闻与传播研究（人大复印报刊资料转载）", title: "重识“地方”：网红空间与媒介地方感的形成——以短视频打卡“西安城墙”为考察中心", note: "曾一果、凡婷婷比较实地打卡和远程观看，讨论短视频、用户实践和现实空间怎样共同形成媒介地方感，为分析淮南门店与取景地提供参照。", url: "https://www.rdfybk.com/qw/DownPdf?id=814642" },
  { id: 72, type: "新闻/专题", date: "2024-06", publisher: "淮南市人民政府", title: "淮南牛肉汤非遗美食惠民消费周活动", note: "记录文化和自然遗产日、非遗展示与消费周被组合在同一活动中，可观察文化保护、公共仪式和消费场景怎样相互推动。", url: "https://www.huainan.gov.cn/zwgk/jrhn/1260243584.html" },
  { id: 73, type: "学术/典籍", date: "2020", publisher: "国际新闻界", title: "春晚作为记忆实践——媒介记忆的书写、承携和消费", note: "谢卓潇区分媒介文本与围绕媒介发生的记忆实践，说明集体记忆还需要受众叙述、身体经验和长期使用，不能只由节目内容推出。", url: "https://cjjc.ruc.edu.cn/CN/Y2020/V42/I1/154" },
  { id: 74, type: "新闻/专题", date: "2025-02", publisher: "央视网 · CCTV电视剧", title: "新春大剧《六姊妹》开播", note: "总台开播材料明确剧集跨越20世纪60年代至21世纪初，以淮南普通家庭和生活流叙事呈现社会变迁，是分析家庭框架怎样预先组织观看的重要材料。", url: "https://news.cctv.com/2025/02/03/ARTI8eeF1t4OUXKie7pCihxU250203.shtml" },
  { id: 75, type: "新闻/专题", date: "2025-03", publisher: "北京市广播电视局 / 央视网", title: "《六姊妹》研讨会：岁月长歌与家庭记忆", note: "披露中国视听大数据收视口径，并集中呈现主管部门、出品方、主创和评论者如何把该剧解释为时代记忆、家文化与情感共鸣。", url: "https://gongyi.cctv.com/2025/03/02/ARTILx4khPxF3afyyRlvTRcl250302.shtml" },
  { id: 76, type: "新闻/专题", date: "2025-03", publisher: "北京青年报 / 新华网", title: "《六姊妹》推热工业小城淮南", note: "记录九龙岗日客流过万的同期现象，并分析老物件、方言、美食和普通家庭如何共同形成工业城市的年代感；因果判断仍需同游客调查互证。", url: "https://www.news.cn/ent/20250314/5d91ef6862234c30ad5e0097dec6847a/c.html" },
  { id: 77, type: "新闻/专题", date: "2025-04", publisher: "中国社会科学院考古研究所", title: "武王墩一号墓入选2024年度全国十大考古新发现", note: "国家级评选把地方发掘转化为全国公共文化事件，评议重点仍是楚文化政治格局、礼制变迁与艺术成就，而不是现代菜品起源。", url: "https://kaogu.cssn.cn/xsqy/ryjx/202505/t20250529_5949472.shtml" },
  { id: 78, type: "视频", date: "2025-12", publisher: "央视网 · 新闻直播间", title: "跟着影视去旅行：探访《六姊妹》拍摄地", note: "电视剧播出十个月后，总台新闻仍以取景地和老街区再利用为主题报道淮南，可用于观察影视记忆的长尾传播和空间再媒介化。", url: "https://tv.cctv.com/2025/12/20/VIDEFuve6lZR4SmvWuMOHSmB251220.shtml" },
  { id: 79, type: "新闻/专题", date: "2025-08", publisher: "淮南市人民政府", title: "田家庵文旅融合中的《六姊妹》传播矩阵", note: "披露定档预热、30余处实拍场地、10余条地方视频、全网阅读量超100万及小红书话题和游客二次创作，呈现地方组织如何主动延长影视热度。", url: "https://www.huainan.gov.cn/zwgk/xqdt/1260702473.html" },
  { id: 80, type: "新闻/专题", date: "2025-03", publisher: "淮南市人民政府", title: "《六姊妹》取景地名特优产品展销会", note: "地方部门把观剧、游小镇、品美食和购商品设计为连续场景，36家企业携200余种产品参展，是屏幕记忆进入消费空间的具体节点。", url: "https://www.huainan.gov.cn/zwgk/jrhn/1260555520.html" },
  { id: 81, type: "新闻/专题", date: "2025-02", publisher: "淮南市文化和旅游局", title: "看《六姊妹》寻觅淮南非遗市集", note: "电视剧播出后不到两周，地方即在取景地组织近20家非遗企业和传承人展示、互动，使剧情、工业街区与地方技艺发生现场连接。", url: "https://wlj.huainan.gov.cn/jgsz/jgks/shwhhfwzwhyck/gzqk/551795196.html" },
  { id: 82, type: "新闻/专题", date: "2025-04", publisher: "淮南市人民政府", title: "织好规划“点线面” 留住老城“人景情”", note: "记录九龙岗被重新定位为近代工矿文化体验区，以及微改造、原住民保留、公众参与和商业文化混合开发等计划，显示屏幕记忆开始反向改造现实空间。", url: "https://www.huainan.gov.cn/zwgk/bmdt/1260600274.html" },
  { id: 83, type: "新闻/专题", date: "2025-03", publisher: "淮南发布 · 澎湃政务", title: "从《六姊妹》到淮南牛肉汤", note: "记录陆毅在电视剧播出前发布牛肉汤探店Vlog，及剧集、演员讲述、非遗展馆、直播带货被串联为“一碗汤一座城”叙事；适合研究预热与跨媒介引用。", url: "https://m.thepaper.cn/newsDetail_forward_30491976" },
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
  { id: 78, genre: "新闻直播间", frame: "影视长尾 + 老街再利用", use: "电视剧播出十个月后再看取景地如何进入新闻，观察剧情、旅游和街区改造怎样共同延长影视记忆。" },
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
  { id: "sources", number: "06", label: "来源资料", note: "视频与83项档案" },
] as const;

const essayChapterIndex = [
  {
    id: "intro",
    number: "00",
    label: "绪论",
    title: "问题提出与研究设计",
    status: "已深写 · 约6200字",
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
    status: "已深写 · 约7700字",
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
    status: "已深写 · 约8500字",
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
    status: "下一步 · 约1300字底稿",
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
    status: "待深写 · 约1200字底稿",
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
    status: "待深写 · 约1300字底稿",
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
            <span>83项公开来源 · 8条视频 · 6张开放授权图片</span>
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
            <p>正文以83项公开资料为基础，能够说明政策、媒体和产业主体公开说了什么；涉及本地居民记忆、游客动机和平台接受效果的判断，仍需访谈、抽样或统计验证。</p>
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
                    <div><b>{chapter.label}</b><small>{chapter.title}</small><i>{chapter.status}</i></div>
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
                <p>淮南牛肉汤首先是一种日常饮食，而不是一条先被设计好、再投放出去的城市广告。它同清晨开门的街边店、矿区和工厂的劳动节奏、回民饮食技艺、家庭口味以及在外地寻找“家乡味”的经验相连。对许多本地人来说，记住它未必需要先知道一套完整历史：汤的温度、红油颜色、牛骨香气、粉丝和酥饼的搭配，以及和谁一起吃，已经构成了可以反复唤起的身体经验。也正因为它既有可以讲述的过去，又有可以重新吃到的现实，牛肉汤比抽象口号更容易在个人经历与公共叙事之间移动。</p>
                <p>近几年，这种日常经验进入公共传播的速度明显加快。2024年武王墩考古使楚文化、青铜器和动物遗存成为全国性新闻画面<Cite id={14} /><Cite id={23} /><Cite id={24} />；2025年电视剧《六姊妹》又把牛肉汤放进家庭、邻里和工业城市生活，演员短视频、粉丝见面会与万人共食活动继续延长了剧情之外的关注<Cite id={17} /><Cite id={25} /><Cite id={47} />。与此同时，产业行动方案、集体商标、授权名单和地方条例正在把“淮南牛肉汤”变成可以规划、授权、统计和追责的公共品牌<Cite id={1} /><Cite id={2} /><Cite id={3} /><Cite id={4} />。同一碗汤由此同时出现在考古新闻、电视剧、短视频、非遗节目、政策文件、门店招牌和商品包装中。</p>
                <p>这组变化不能只用“美食出圈”概括。“出圈”只能说明可见度在某个时段增加，却没有回答三个更重要的问题：媒体从地方历史和日常生活中选择了什么；政府、媒体、企业、传承人、门店和食客分别怎样解释这些材料；传播产生的新故事、新画面和新标准，后来又怎样改变人们理解淮南的方式。本文因此不把牛肉汤当作一个含义固定的符号，而把它看作一个仍在形成中的记忆对象。研究重点也从“媒体有没有宣传它”转向“有关它的过去如何被选择、组织、争论和再次使用”。</p>
                <p>从理论上看，这个案例能够把媒介记忆研究带入日常生活。现有媒介记忆研究常以战争、灾难、纪念活动或重大政治事件为对象，容易让人误以为只有宏大历史才值得研究。事实上，食物同样能够保存社会关系、生活节奏和地方差异。媒介也不是把一段已经完成的记忆原样搬到屏幕上；报道标题、镜头、平台标签、评论区、商标和标准都会改变过去被看见的次序。van Dijck、Erll及国内传播学研究都指出，媒介技术与传播实践参与记忆的生产、流通和调用，而不只是充当储存容器<Cite id={31} /><Cite id={35} /><Cite id={61} /><Cite id={63} />。以牛肉汤为对象，可以更具体地观察这种作用怎样发生在一项普通、可食用、可经营的地方事物上。</p>
                <p>从经验研究看，牛肉汤又能连接食物记忆、城市形象和非遗保护三条线索。食物记忆研究说明味觉、气味和共同进食会把家庭经验、身份和怀旧联系起来<Cite id={32} />；城市品牌研究则提醒，城市形象不是政府单方面发布的标识，而是在公共治理、本地认同和外来者体验中持续形成的关系<Cite id={41} /><Cite id={42} />。非遗研究更要求关注活态实践由谁传、怎样变、谁能从利用中获益，而不是只把技艺变成舞台上的好看动作<Cite id={37} /><Cite id={38} /><Cite id={45} />。把三者放在同一案例中，有助于解释“被看见”“被记住”“被认同”和“被消费”之间并不自动等同。</p>
                <p>现实意义也在这里。第一，研究可以给地方历史叙事划出证据边界，避免把古代烹牛、墓葬动物遗存和现代菜品配方直接连成一条未经证明的连续史。第二，它可以把产业产值、游客数量和平台热度重新放回具体口径中，区分传播同期变化与因果关系。第三，它能追问统一品牌形成后，普通门店、传承人、少数群体和不同代际居民是否仍有讲述自身经验的机会。记忆权研究提示，平台扩大表达的同时也会制造新的可见性差异<Cite id={67} />。因此，本文最终关心的不只是淮南能否借一碗汤获得知名度，更关心一座城市在被讲述时，是否保留了普通人的生活、不同做法和纠正失真的能力。</p>
              </section>

              <section className="essay-subsection" id="essay-intro-review">
                <h4>二、国内外研究现状</h4>
                <p><b>首先需要说明本文所说的“媒介记忆”是什么。</b>集体记忆不是许多个人回忆的简单相加，而是群体在当下需要、社会关系和共同表达中不断组织过去的过程。媒介记忆则强调这一过程怎样经过报道、影像、仪式、平台、档案和日常媒介实践被选择、排序和赋义。它既包括媒体生产出的历史叙事，也包括受众如何转发、评论、模仿和在生活中重新使用这些叙事。国内研究已经提醒，互联网改变了集体记忆的建构机制，但不能因此把所有“网上出现过的过去”都叫作媒介记忆<Cite id={61} /><Cite id={62} />。本文采用的操作性定义是：与牛肉汤有关的传说、物证、技艺和生活经验，在媒介生产、流通、接受及再使用中被反复选择和组织，并由此形成阶段性公共理解的过程。</p>
                <p><b>国外研究为这一判断提供了三层基础。</b>第一层关注个人记忆与媒介技术。van Dijck讨论照片、影像和数字平台怎样进入人们记录生活、理解自我和分享过去的日常实践<Cite id={31} />。第二层关注文化记忆的跨媒介流动。Erll提出的“再媒介化”说明，同一段过去从文学进入电影、从新闻进入平台时并非简单复制，而会根据媒介形式和当下用途被重新编码<Cite id={35} /><Cite id={39} />。第三层关注数字连接的矛盾。Hoskins等人的研究指出，网络让更多主体能够参与记忆，也使算法排序、数据所有权和商业逻辑介入可见性分配<Cite id={40} />。这三层分别对应本文的个人味觉表达、跨媒介事件链和平台权力问题。</p>
                <p><b>国内媒介记忆研究正在从文本分析转向记忆实践。</b>早期研究多考察大众媒介怎样再现重大历史，随后逐渐关注数字平台、普通用户和日常生活。陈振华对传播学取向的梳理，把媒介权力、新媒体、全球化以及记忆的连续与断裂列为关键问题，同时指出研究容易遗漏具体个人<Cite id={61} />。刘晗则从主体、客体和中介三个层面说明数字记忆怎样通过参与传播、数字化迁移和网络化连接被共同建构<Cite id={63} />。概念辨析研究进一步提示，“数字记忆”“媒介记忆”“媒体记忆”等词并不完全相同，研究者应说明自己究竟在研究技术形态、机构叙事还是社会实践<Cite id={62} />。这些讨论帮助本文避免把“媒介影响记忆”写成一句无法检验的套话。</p>
                <p><b>食物与记忆研究解释了地方饮食为什么具有特殊性。</b>Holtzman的综述表明，食物能够连接感官、身份、怀旧和“被发明的传统”，但同一种食物并不必然为所有人保存同一种过去<Cite id={32} />。国内以《舌尖上的中国》为对象的研究进一步把字幕、弹幕和评论放在一起，发现食物影像会唤起地方经验和乡愁表达，同时也指出数字媒介对地方建构的具体作用仍需更细致地追踪<Cite id={33} />。饮食类非遗短视频研究则强调画面、声音和语言的通感化表达能够模拟味觉、激发记忆与认同<Cite id={64} />。这些成果说明，研究牛肉汤不能只分析起源故事，还要记录热气、汤色、动作、方言、家庭关系和评论中的身体化表达。</p>
                <p><b>美食传播与城市形象研究已经证明食物是表达城市的一条路径。</b>地方食品商店研究表明，产地叙事、空间布置、商品和身体实践会共同表演地方品牌<Cite id={42} />；对广州美食短视频的内容分析则把景观、经济、文化、饮食和市民形象分开编码，说明美食视频实际在同时描绘“什么样的城”和“什么样的人”<Cite id={65} />。但城市品牌不应被简化为产品营销，品牌承诺能否成立还取决于本地居民、公共治理和外来者体验是否相互支持<Cite id={41} />。近期对“非网红城市”旅食Vlog的研究更指出，看似反商业化的司机、角落食肆和冷门景点也可能被重复成新的流量模板，造成符号通胀与选择性展演<Cite id={66} />。这为分析淮南“烟火气”是否被模板化提供了直接参照。</p>
                <p><b>非遗与记忆伦理研究补上了“谁能决定”的问题。</b>UNESCO对非遗的界定强调，传统由社区持续传递并在环境变化中重新创造；保护不等于冻结唯一版本<Cite id={37} /><Cite id={46} />。相关伦理原则要求社区知情参与、尊重其精神和物质利益，并警惕去语境化、商品化和误表征<Cite id={38} /><Cite id={45} />。记忆权研究把这一问题进一步转化为表达权：个人和群体应有机会以自己的方式讲述过去，数字平台则可能同时扩大表达和制造新的盲区<Cite id={67} />。因此，论文不能只判断标准化是否提高效率，还要调查标准由谁制定、差异能否说明、收益如何分配、错误叙事怎样被纠正。</p>
                <p><b>现有淮南牛肉汤研究与公开材料仍以工艺、产业和宣传为主。</b>风味研究可以说明原料、香辛料和制作工艺的物质基础，也显示学术文本会并列引用赵匡胤、回民技艺等不同起源说法<Cite id={53} />；地方标准把主辅料、熬汤和烫制写入技术规范，为研究“正宗”如何被文本固定提供了材料<Cite id={52} />。政策与新闻则持续公布商标、标准、企业、产值和文旅活动<Cite id={1} /><Cite id={5} /><Cite id={18} />。这些资料很重要，但它们大多回答“有什么资源”“产业怎样发展”或“活动取得什么成效”，较少把媒体内容、主体利益和受众实践连在一起。</p>
                <p><b>综合来看，至少有四处空缺。</b>一是对象空缺：媒介记忆研究较少进入地方早餐这类可反复消费的日常对象。二是过程空缺：牛肉汤研究常把历史、影视、短视频、政策和产业并列介绍，却没有解释材料怎样在不同媒介间流动。三是主体空缺：公开叙事多集中政府、媒体和企业，对普通门店、传承人、居民和不认同主流说法者关注不足。四是证据空缺：知名度、认同、到访和产业增长经常被写成一条顺滑因果链，却缺少可比较的平台样本、访谈和现场材料。本文不以“牛肉汤已经成为集体记忆”为前提，而把它改写为需要验证的问题，并以记忆资源—事件激活—媒介重构—主体协商—实践转化—反馈再生产作为初步分析链条。</p>
              </section>

              <section className="essay-subsection" id="essay-intro-methods">
                <h4>三、研究方法和研究思路</h4>
                <p><b>研究对象不是“牛肉汤文化”的全部，而是与它有关的媒介记忆建构过程。</b>具体观察单位包括：政府和机构发布的政策、统计与活动材料；新闻和专题报道；考古、影视和非遗节目；抖音、B站、小红书、微博等平台内容及评论；集体商标、标准、包装和门店空间；传承人、经营者、居民、游客及内容创作者的讲述。时间范围以2022年至2026年为主，必要时向前追溯地方典籍、政策制度和早期制作规范。这样的限定既能观察近期传播变化，也避免把整个淮南饮食史都塞进一篇传播学论文。</p>
                <p><b>全文围绕四个递进问题展开。</b>第一，传说、典籍、考古、工艺和日常经验中，哪些资源使牛肉汤容易被记住？第二，考古、电视剧、短视频、新闻、节庆和政策怎样选择并重新组织这些资源，不同主体又怎样争论“历史”“非遗”和“正宗”？第三，线上可见度在什么条件下转化为地方认同、到访、购买、品牌和产业制度？第四，这一过程遗漏了谁、损伤了什么地方经验，又应怎样在传播、商业利用与活态传承之间建立边界？四个问题分别对应第二至第五章，结语再讨论城市形象和非遗保护启示。</p>
                <p><b>公开资料库承担“重建事件与提出命题”的作用。</b>当前83项来源包括政策统计、新闻专题、8条可观看视频、学术与典籍、开放授权图片。研究将它们按发布者、日期、材料类型、核心说法、证据强度和可用于哪一章登记，并保存标题、网址与关键内容。公开资料能够确认某项政策何时发布、节目展示了什么、机构使用了哪些数字，却不能直接代表受众想法。因此，本文把可核事实、机构公开口径、地方传说和研究推断分开标注；前期资料只用来建立事件链和研究假设，不冒充完整样本。</p>
                <p><b>内容分析采用事件型、分层抽样的办法。</b>研究设置四个窗口：2022年至2023年作为考古和影视热点前的基线；2024年春夏观察武王墩考古及二次传播；2025年春季观察《六姊妹》、演员短视频、万人共食与游客内容之间的流动；2025年下半年至2026年观察集体商标、标准和条例怎样继续固定公共含义。每个窗口分别抽取政府、主流媒体、商业主体和普通用户内容，避免只抓热门帖子。正式样本计划控制在240至400条平台内容，并记录抓取日期，因为播放、点赞和评论数会持续变化。</p>
                <p><b>每条新闻、视频或帖子使用同一张编码表。</b>编码项目包括记忆资源、时间框架、核心符号、叙事标签、发言主体、情感线索、媒介行动、证据强度和指向的城市形象。视频还要记录镜头中的热气、汤色、器物、门店、人物动作、声音、字幕与剪辑关系，避免只抄标题。分析单位、分类规则和缺失值处理将预先写入编码手册；两名编码者先独立试编约10%的材料，再根据分歧修订定义并报告一致性结果。这样做遵循内容分析对可重复编码和信度检验的基本要求<Cite id={43} />，也便于同广州美食短视频已有编码维度进行比较<Cite id={65} />。</p>
                <p><b>访谈用来回答公开文本不能替人回答的问题。</b>计划采用目的性抽样与最大差异抽样，访谈30至40人：传承人和老店、普通门店与加工企业、政府或协会人员、本地老居民、年轻本地人、外地游客及内容创作者。问题不直接问“你是否有城市认同”，而从具体经历进入，例如第一次在哪里喝、怎样判断正宗、从何处得知起源故事、平台热度是否改变经营或出行、哪些宣传让人自豪或反感。访谈转写后按熟悉材料、初始编码、形成主题、检查反例和命名主题的步骤进行分析<Cite id={44} />。当连续访谈很少再出现新主题时，再判断材料是否接近饱和。</p>
                <p><b>场景观察负责检查屏幕叙事是否进入现实空间。</b>观察地点包括不同类型的牛肉汤门店、九龙岗等影视取景地、节庆或产业活动、车站和景区周边门店。记录门头与集体商标、菜单和价格、汤与主食搭配、顾客动作、店员如何解释起源与工艺、游客是否拍摄打卡，以及宣传线路是否真正可走。研究不暗中记录可识别个人，不把偶遇谈话写成正式访谈；涉及录音、照片和引语时取得知情同意，并对普通受访者匿名处理。</p>
                <p><b>最后通过交叉验证而不是简单相加形成结论。</b>若政策称游客增加，需同现场、游客访谈和可核统计口径对照；若热门视频强调“千年”，需同典籍、考古报告和专家解释对照；若标准声称保护正宗，则要比较门店差异、传承人参与和授权规则。不同材料相互印证时可以提高判断把握，出现矛盾时则把矛盾本身作为研究发现。本文只在证据允许的范围内下结论：平台热度证明可见度，重复复述和共同实践才可能说明记忆形成，因果关系还需要时间比较与排除其他解释。</p>
              </section>

              <section className="essay-subsection" id="essay-intro-innovation">
                <h4>四、研究内容和创新点</h4>
                <p><b>全文结构遵循“因何记忆—如何记忆—怎样转化—出现何种障碍”的问题链。</b>第二章不寻找唯一的起源答案，而比较传说、典籍、考古、技艺和市井生活为何具有不同的可记忆性，并说明政策、市场、非遗与人口流动怎样推动这些资源进入传播。第三章以武王墩考古、《六姊妹》、短视频和线下活动为节点，分析画面、标签、叙事和主体位置怎样变化。第四章追踪个人表达、集体讨论、空间到访、商品流通与公共品牌之间的转化条件。第五章则反过来检查选择性记忆、碎片化、标准化和代际差异。结语把这些发现放回城市形象和非遗保护。</p>
                <p><b>第一项尝试，是把日常食物作为媒介记忆过程来研究。</b>相比纪念碑或重大历史事件，牛肉汤可以被反复制作、食用、购买和改变。它既是记忆的内容，也是身体实践、商品和空间媒介。本文因此不只分析媒体“说了什么”，还观察食用动作、门店空间、包装、商标和线路怎样让记忆获得物质承接。这可以把媒介记忆研究从宏大叙事推进到普通人的生活经验，也能说明日常性并不等于缺少权力关系。</p>
                <p><b>第二项尝试，是建立一条能够被材料检验的过程模型。</b>初步模型为：基础资源提供可讲述、可展示和可体验的材料；考古、影视或制度事件激活关注；新闻与平台通过标签、画面和情感框架进行重构；政府、企业、传承人、门店与用户围绕意义展开协商；评论、共食、到访、购买、标准和统计构成实践转化；这些新实践又留下下一轮传播能够调用的内容。模型中的每一环都对应具体材料，并允许出现中断。例如有热度却没有到访、有到访却没有复购、标准增加却没有改善传承，都应被记录。</p>
                <p><b>第三项尝试，是把证据边界与记忆伦理放进同一套分析。</b>本文将可核事实、机构口径、地方传说和研究推断分级呈现，不用考古权威替现代配方背书，也不用同期增长替因果关系背书。同时，研究不仅问哪种说法传播最广，还问谁有机会发言、谁被当作背景、谁参与制定标准、谁获得收益以及谁能纠正错误。这样可以把“传播效果好不好”推进到“这种记忆是否准确、多元且可持续”的判断<Cite id={45} /><Cite id={67} />。</p>
                <p>这些创新仍是待验证的研究设计，而不是已经成立的结论。当前公开资料足以搭建事件链、理论框架和编码方案，却不足以证明本地居民已经形成一致认同，也不足以把游客和产业变化归因于单一媒介事件。论文后续质量取决于平台样本、访谈、场景观察和反例是否真正完成。若调查结果推翻“千年叙事受到普遍接受”“影视直接带来认同”等预设，研究应修改模型，而不是删掉不顺从论点的材料。</p>
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
                <p><b>“容易被记住”不是食物自带的属性，而是食物、地方生活和传播方式共同形成的关系。</b>一道菜历史久、味道重、颜色鲜明，都不等于它必然成为公共记忆。只有当某些材料能够被反复讲述、被镜头辨认、被身体再次体验，并被一群人放进共同的时间与地方框架中，它们才可能稳定地进入记忆。因此，本节不追问谁做出了唯一的“第一碗”，而是分析传说、典籍、考古、近现代城市生活与感官实践分别提供了什么记忆条件。</p>
                <p>这些资源大致表现为三种不同但会相互叠加的能力：传说让牛肉汤<b>好讲</b>，器物、文字和制作动作让它<b>好看</b>，清晨进食、汤的温度和门店关系让它<b>好体验</b>。好讲降低了复述门槛，好看给抽象过去增加了视觉根据，好体验则允许人们用身体和生活经历确认“这与我有关”。媒介传播之所以能够不断改写这碗汤，正是因为它可以在三类材料之间来回取用。</p>
                <p><b>首先，地方传说提供了高度压缩的叙事结构。</b>刘安炼丹、赵匡胤困寿春等故事通常都有清楚的人物、地点、困难和转折：一位知名历史人物来到淮南，在关键时刻因一碗汤恢复体力或获得启发，于是地方、名人和食物被接成一条容易复述的线。听众不必掌握复杂的饮食史和社会史，也能在几十秒内记住故事主干。地方政府、产业活动和专题文章至今仍会调用这些说法<Cite id={10} /><Cite id={21} /><Cite id={69} />，说明传说不是已经退出当代生活的旧材料，而是仍在发挥作用的传播资源。</p>
                <p>一篇地方长文可以把武王墩楚墓、赵匡胤传说、回族迁徙、煤矿城市和现代产业放进同一条叙事线<Cite id={69} />。这种写法的吸引力，在于它把相隔很远的年代变成一段似乎不断向前发展的地方故事：古代提供历史厚度，近代提供族群技艺，工业化提供市民生活，今天的产业则成为故事的结果。对本文来说，这篇材料的价值不只是提供若干事实，更在于展示地方传播怎样主动制造“连续感”。</p>
                <p>不过，叙事完整不等于史实连续。传说能够说明一个地方愿意怎样想象自己的过去，却不能单独证明现代菜品的起源。判断时至少应分开三个问题：这个故事何时开始出现；哪些机构和人群在什么场合讲它；它对今天的身份、经营和旅游有什么作用。只要不把“被频繁讲述”偷换成“已经被历史证实”，传说本身就是重要材料。相反，如果论文只忙着判定传说真假，反而会错过它为什么被选择、谁从中获益以及受众为何愿意转述。</p>
                <p><b>其次，典籍与考古提供了更强的证据感，但它们支撑的结论有明确边界。</b>《淮南子·齐俗训》中确有屠牛、烹肉以及“煎熬燎炙”等文字<Cite id={29} />。它至少说明西汉文本已经讨论牛肉烹饪和饮食方式，也使“淮南—古代饮食”之间有了可查的文献连接。它却没有记载今天所说的淮南牛肉汤配方，更不能证明一项具体技艺从西汉不间断地传到现代。典籍能证明文字写了什么，不能替失去的传承链补证。</p>
                <p>武王墩考古则确认了战国晚期高等级楚墓、青铜礼器和丰富动物遗存<Cite id={14} /><Cite id={23} />。相关节目中的科技检测进一步说明，鼎内动物包括黄牛等，且有经历烹饪的迹象<Cite id={24} /><Cite id={28} />。这组事实有助于理解楚国礼制和饮食生活，也为公众提供了大鼎、牛骨、墓葬结构等可见对象。但从“发现牛类遗存”到“古人烹牛肉”，再到“古人制作汤类”，最后到“现代淮南牛肉汤已有两千年”，中间至少经过三次推论。前两层可能由检测与考古语境部分支持，最后一层仍缺少配方、名称和连续传承的证据。</p>
                <p>地方报道中出现过“楚王已经喝淮南牛肉汤”一类表述<Cite id={68} />。本文不把它当作可以继续引用的历史结论，而把它视为需要分析的传播现象：为什么一条谨慎的考古信息会在公共叙事中变成确定的菜品起源？原因之一是现代人熟悉“牛肉汤”，却不熟悉动物考古和礼制饮食；用熟悉菜名解释陌生遗存，可以迅速降低理解成本。代价则是证据层级被压平，受众很难再看出事实、推断和传说的区别。</p>
                <p>考古材料之所以特别有传播力，还因为它能给传说增加可视的“权威外观”。文字传说只能听和读，大鼎、墓室、检测图和专家讲解却能被新闻镜头反复呈现。观众看到真实器物后，容易把对器物的信任一并转移给随后出现的地方故事。这并非受众简单“受骗”，而是影像把两类不同证据放在同一画面中造成的联想。正式研究可以逐镜记录：节目先展示什么、专家原话如何限定、新闻标题又删掉了哪些条件，由此判断“证据感”是怎样生产出来的。</p>
                <p><b>再次，现代牛肉汤的形成更适合放回近现代人口、制度和城市生活中解释。</b>地方公开资料普遍把它同回民牛肉烹饪技艺、寿县杂烩汤、矿区需求和改革开放后的市场联系起来<Cite id={21} /><Cite id={69} />。这些材料至少提示，今天人们熟悉的街边牛肉汤并非只靠一个古代故事生成，而是在原料供应、族群交往、城市就业和餐饮经营中逐渐定型。它们来自地方机构和地方叙事，仍需族谱、行业档案、早期工商记录及多位经营者口述互证，不能因为比传说更具体就直接当作最终定论。</p>
                <p>回民饮食技艺在这条形成线索中尤其重要。牛肉的处理、香料使用和经营网络并不是脱离人的抽象“秘方”，而是家庭、师徒和社区在长期劳动中积累的知识。若传播只说“回民擅长制汤”，却不记录具体迁徙路径、门店关系和技艺传承者，族群就会变成给品牌增加异域色彩的背景。论文后续访谈应追问：谁向谁学习，哪些步骤在家庭内部传递，哪些做法因食品供应、顾客口味和经营条件而改变，从而把“族群贡献”落实到可说明的人和实践。</p>
                <p>制度变化同样不可忽略。1979年国务院调整耕牛保护和屠宰政策，为牛肉原料更广泛进入市场提供了宏观背景<Cite id={30} />；地方资料则把改革开放后的个体餐饮、市场流通和牛肉供应变化同现代牛肉汤扩张联系起来<Cite id={21} />。这比“祖传千年”更能解释为什么相关门店在特定时期明显增加。它也提醒我们，地方饮食传统从来不是封闭保存的旧物，而是在制度允许、原料可得、经营者进入和消费者需求相遇时不断形成。</p>
                <p>淮南作为煤电工业城市的历史，又为这种早餐提供了特殊的社会环境。地方资料记录了煤矿建设、跨省劳动力迁入和围绕矿区形成的生活空间<Cite id={68} />。大量劳动者的聚集意味着稳定、快速而饱腹的餐饮需求；轮班、早工和体力劳动也使热汤、肉类、粉丝与主食的组合具有现实吸引力。地方叙述还提到矿区可取得的油桶、炉具和燃料条件对早期经营方式有所帮助<Cite id={21} />。这里的重要因果不是“矿工天然爱喝牛肉汤”，而是城市产业结构、劳动节奏、器具和原料共同创造了适合它生长的场景。</p>
                <p>因此，“矿区早餐”也不能被写成浪漫化的集体回忆。不同矿区、工种、收入和年代的经验可能并不相同，女性的备餐劳动、流动摊贩的经营风险以及回民家庭的技艺贡献也可能在“大工业怀旧”中被省略。正式访谈应寻找老矿工、家属、早期经营者和非矿区居民相互对照，询问他们实际在哪里吃、什么价格、何时成为日常，以及是否接受今天流行的历史讲法。只有这样，工业城市记忆才不会又被压成一个新的单一传说。</p>
                <p><b>牛肉汤还具有典型的感官与身体可记忆性。</b>常见组成包括牛骨汤、牛肉或牛杂、粉丝、干丝、葱段、香菜与红油<Cite id={60} />，地方标准则把原料、熬汤、烫制和卫生等操作写入技术规范<Cite id={52} />。这些内容并不只是一张配料表：滚汤的声音、蒸汽遮住镜头的瞬间、红油与香菜的颜色、端碗和蘸饼的动作，都能成为记忆线索。人们可能说不清某种香料比例，却能根据第一口的温度、汤的厚薄和习惯搭配判断“像不像以前”。</p>
                <p>食物记忆研究表明，味道经常同家庭关系、地方环境和身体实践一起被记住<Cite id={32} />；关于食物景观的研究进一步把环境性、功能性和情感性记忆联系起来<Cite id={70} />。这意味着一碗汤的记忆不仅在汤里，也在清晨街道、店内桌椅、同桌的人、赶班时间和反复进店的关系中。研究若只分析新闻文本，就会漏掉这些不容易写成口号、却最能支撑地方认同的生活材料。</p>
                <p>感官识别也不是要求所有人记住同一种标准味。现有照片已经显示清汤或红汤、洋葱与辣椒浇头、牛肉汤配酥饼、蘸汤动作以及异地门店等不同版本<Cite id={54} /><Cite id={56} /><Cite id={57} /><Cite id={58} /><Cite id={59} />。差异恰恰可能是记忆发生的入口：有人由红油认出家乡，有人坚持清汤，有人看重粉丝或豆饼，有人先想到与酥饼搭配。所谓“可记忆性”不是人人复制同一个味觉答案，而是人们能够围绕相似对象讲出可比较、可争论的经验。</p>
                <p>综合来看，淮南牛肉汤的基础资源不是一条从楚汉直通今天的完整历史，而是几类时间不同、证据强弱不同的材料集合。传说给它人物与情节，典籍和考古给它历史纵深与视觉证据，回民技艺、市场制度和矿城生活解释现代形态，感官和门店实践则使普通人能够再次确认。媒介可以把这些材料接成故事，也可能暴露它们之间的断裂。下一节要讨论的，正是数字媒介怎样改变它们被保存、组合和看见的方式。</p>
              </section>

              <section className="essay-subsection" id="essay-chapter-2-digital-ecology">
                <h4>二、数字传播生态作为媒介记忆的基础</h4>
                <p><b>数字化不是把旧记忆原样搬到网上，而是改变了记忆的基本单位。</b>典籍原来以篇章存在，口述故事依靠讲述场合，制作技艺藏在连续动作里，家庭味觉则依附具体的人际关系。进入网络后，它们被拆成标题、十五秒镜头、字幕、标签、直播话术、评论和打卡照片。每个单元都可以单独转发、搜索和重新拼接。媒介技术由此不只是记忆的仓库，也参与决定过去以什么形状出现<Cite id={31} /><Cite id={34} /><Cite id={63} />。</p>
                <p>这种转换首先改变了信息的轻重次序。长篇史料中的年代限制、考古报告里的保留意见和技艺中的等待时间，很难完整进入短视频；“千年”“非遗”“正宗”“家乡味”等词却可以直接成为封面和标签。标签帮助用户快速识别内容，也让不同平台内容能够被聚合，但它同时把尚有争议的判断预先写进分类。研究因此不能只统计某个标签出现多少次，还要回到原材料，检查它压缩了什么、增加了什么、又把哪一种解释变成默认答案。</p>
                <p><b>数字影像还要解决一个先天难题：屏幕不能真正传递味道。</b>拍摄者通常用翻滚汤面、红油近景、蒸汽、舀汤声、入口表情和“鲜、香、辣、烫”等语言进行补偿。饮食类非遗短视频研究把这种做法概括为视觉、听觉与语言共同制造的通感表达<Cite id={64} />。它不能让观众真的尝到，却能调动已有味觉经验，让本地人产生回忆，让外地人形成想象。由此，颜色是否饱和、蒸汽是否可见、人物反应是否夸张，都会影响哪一种牛肉汤更容易被平台记住。</p>
                <p>对本地受众而言，影像常是“认出”而不是第一次认识。看到熟悉门头、汤锅和酥饼，个人经验可能被迅速唤起，并在弹幕或评论中补充“我家楼下”“上学前常吃”“这个做法不对”。关于《舌尖上的中国》的研究发现，食物影像能够触发地方、家庭和乡愁表达<Cite id={33} /><Cite id={70} />。不过，评论中的热烈回忆只能证明一部分发言者愿意公开表达，不能直接代表所有本地人，更不能由几条高赞评论推断全体居民形成了一致记忆。</p>
                <p><b>网络传播还会形成事件触发后的级联循环。</b>武王墩考古先由发掘公告和新闻节目提供器物与专家解释<Cite id={14} /><Cite id={23} /><Cite id={24} />，地方专题随后把它同牛肉汤故事并置<Cite id={68} /><Cite id={69} />，用户又可能剪取大鼎、牛骨和热汤画面生成新的短内容。到2025年，新的检测信息再次进入国家级新闻<Cite id={28} />，此前已经流行的“千年”框架又会影响公众怎样理解新材料。传播不是从权威媒体单向流向受众，而是旧标签预先安排新证据，新证据再反过来加强旧标签。</p>
                <p>数字网络也把影视、新闻、线下活动和个人记录接在一起。《六姊妹》中的家庭生活先提供情感框架，演员和媒体片段把剧情拆成可转发内容，万人共食与粉丝活动把屏幕情节变成现场仪式<Cite id={17} /><Cite id={25} /><Cite id={26} /><Cite id={47} />，游客拍摄又将现场送回平台。文化记忆研究所说的“再媒介化”，在这里就是同一批人物、场景和味觉符号不断换载体，每次转换都根据新的传播目的调整重点<Cite id={35} /><Cite id={39} />。</p>
                <p><b>参与主体因此明显增多。</b>政府部门发布政策、考古和城市叙事，新闻机构安排事件议程，影视创作者把食物嵌入人物生活，企业和门店用产品解释“正宗”，传承人展示工艺，演员、游客、本地居民和异乡人则通过视频、评论、照片与评分加入讲述。过去分散的私人经验由此获得公共出口。一个人说“我小时候喝的不是这样”，既在纠正内容，也是在向公共空间提交自己的地方版本。</p>
                <p>但主体增多不等于发言权自动平等。机构账号拥有稳定发布渠道，商业内容可以购买流量，头部创作者更熟悉平台节奏；普通店主、老年居民和不愿出镜的传承人即使经验丰富，也可能只在画面里出现几秒。数字记忆研究提醒，参与、网络连接与存储同时受平台规则和商业权力约束<Cite id={40} /><Cite id={63} /><Cite id={67} />。本文要记录的不只是“谁发过内容”，还包括谁被引用、谁获得推荐、谁能纠错，以及谁提供了劳动却没有署名。</p>
                <p>平台偏好还可能把地方性做成可复制的模板。旅食Vlog研究发现，司机、角落食肆和“非网红”空间在反复使用后，也会变成新的符号套路<Cite id={66} />。淮南传播中的“老街、热气、方言、豪爽老板、便宜大碗”同样可能一面呈现生活感，一面筛掉整洁的新门店、家庭制汤和不符合“烟火气”的城市空间。判断内容是否真实，不能只看它是否显得朴素，还要检查这种朴素是不是经过选择的表演。</p>
                <p><b>数字内容还会在到达淮南之前制造一种“媒介地方感”。</b>短视频研究表明，远程观看者和实地打卡者都可能在影像、平台互动与现实空间的结合中形成对地方的理解<Cite id={71} />。用户先在屏幕上认识一碗汤、一个取景地和一条老街，到达后便倾向于寻找已经看过的画面；现场拍摄又会重复这些机位和标签。这样形成的地方感可以降低出行认知门槛，也可能使游客只验证平台模板，而看不见模板以外的淮南。</p>
                <p>最后，数字痕迹并不等于永久档案。帖子可能删除，链接可能失效，播放量和评论排序持续变化，搜索结果还会因时间、账号和推荐系统而不同。所谓“网上都这么说”，往往只是某次抓取时最可见的一部分。正式研究应保存抓取日期、页面截图或合规存档、互动量口径与采样路径，并分别记录原始发布、转载和剪辑，避免把重复搬运误当成多个独立证据。</p>
                <p>可见，数字传播生态为淮南牛肉汤提供的不是一个更大的展示柜，而是一套重新切分和排序记忆的机制。它让传说、器物、技艺和个人回忆更容易连接，也使证据简化、模板复制和可见性不平等同时增加。第二章的关键判断因此是：数字媒介没有凭空创造牛肉汤的地方意义，却显著改变了哪些旧材料最容易被看见、由谁解释以及公众能用什么方式参与。</p>
              </section>

              <section className="essay-subsection" id="essay-chapter-2-drivers">
                <h4>三、媒介记忆的外部驱动力</h4>
                <p><b>丰富的材料和数字平台只是可能条件，记忆进入公共议程还需要持续的外部推动。</b>在淮南案例中，政策、产业、文化事件、人口流动和情感需要并不是相互分开的几条线。政府会借影视或考古热点组织活动，企业会借城市叙事解释产品，平台会把活动转成内容，用户又以家乡或旅行经验继续传播。分析“动因”不能寻找一个万能原因，而应说明这些力量在什么时间、通过什么组织接口发生配合。</p>
                <p><b>政策的作用首先不是替媒体提供宣传稿，而是把牛肉汤定义为一个可以治理的对象。</b>2024—2027年行动方案把生产加工、门店、网络传播、文旅消费和产业目标放进同一安排<Cite id={1} />；后续地方条例进一步覆盖食品安全、品牌、标准、非遗和文旅<Cite id={2} />。原本分散在街巷的餐饮实践由此获得统一名称、部门分工、项目目标和统计指标。“淮南牛肉汤”不再只是一类食物，也成为可以投入公共资源、汇报进度和评价治理成效的产业事项。</p>
                <p>集体商标、授权名单、白名单和技术标准又继续划定名称边界。集体商标注册及首批授权，决定哪些经营主体可以在特定规则下使用公共品牌<Cite id={3} /><Cite id={4} />；餐饮消费白名单与系列标准把食品安全、原料和服务转化为可检查条件<Cite id={5} /><Cite id={9} /><Cite id={52} />。这些制度有助于降低消费者识别成本和失信风险，也会影响公众以后把什么样的门店、汤色和产品理解为“正规”或“正宗”。所以，标准不仅规范生产，也参与生产记忆。</p>
                <p>不过，政策文件中的目标值、产值和企业数不能直接当作传播效果。它们首先是行政行动和统计口径，需要追问产业链包括哪些环节、企业是否重复计算、目标是否已经实现。更重要的是，政策让某些指标获得高可见度，也可能让难以量化的内容退到后面，例如师徒关系、普通门店生计、族群知识和居民是否认同。本文使用政策材料时，既把它当作事实来源，也把“政府选择衡量什么”本身当作研究对象。</p>
                <p><b>市场扩张解决了地方记忆如何离开本地的问题。</b>方便装、冷冻产品、中央厨房、连锁和异地门店，使消费者不必到淮南也能接触带有产地名称的商品。电商企业、平台直播和地方带货活动进一步把汤料、包装、主播故事和即时下单组合起来<Cite id={8} /><Cite id={11} /><Cite id={12} />。食物由此获得可运输、可复制和可计数的形态，“淮南”二字也随包装与门头进入外地家庭和街道。</p>
                <p>市场传播并非只会破坏传统。稳定销售可以改善从业者收入，为原料、培训和技艺传承提供现实基础；异地消费者也可能先通过商品认识地方，再产生旅行和深入了解的兴趣。问题在于市场偏好可规模化、易说明的版本，复杂历史和门店差异容易被压缩成一句“正宗秘方”。因此，评价商业化不能预设好坏，而要看普通经营者是否有进入渠道、传承人是否参与解释、品牌收益是否回到地方，以及产品体验是否兑现它使用的历史承诺<Cite id={38} /><Cite id={45} />。</p>
                <p><b>文化制度与公共事件为传播提供了“值得纪念”的理由。</b>非遗认定把日常制作从普通餐饮劳动转化为需要保护、展示和传承的文化实践；国家级节目又通过舞台、镜头和传承人叙述，把选料、熬制和烫制变成可观看的技艺<Cite id={18} /><Cite id={27} />。文化和自然遗产日同牛肉汤非遗美食消费周被安排在一起<Cite id={72} />，则更清楚地显示保护、公共仪式和消费并非三个孤立领域，而是在活动中被有意连接。</p>
                <p>这种连接有双重效果。一方面，节庆和节目让制作知识获得尊重，也让平时不被注意的从业者进入公共表达；另一方面，有限时长更偏爱沸腾大锅、快速动作和壮观人群，日常学习、清洗备料、成本压力及技艺分歧较难出现。非遗一旦只在节庆时被看见，就可能从活态实践变成周期性表演。后续调查应比较节目中的“传承”与门店中的真实学习过程，看展示是否带来学徒、收入和持续经营。</p>
                <p><b>人口流动和城市情感则解释了为什么这些传播会被个人主动接住。</b>淮南工业化过程伴随多地劳动者迁入、矿区社区形成和家庭代际生活<Cite id={68} />，后来又有就业、求学和经商带来的向外流动。对离开淮南的人来说，牛肉汤既容易在异地找到，也能通过味道、方言和清晨习惯标记“从哪里来”。影视中的家庭叙事和平台上的返乡内容，正好为这种私人经验提供公共表达格式。</p>
                <p>但“乡愁”不能被写成所有淮南人的共同反应。有人怀念矿区和老店，也有人把相关生活同辛苦、衰退或离开联系在一起；年轻人可能从电视剧和短视频第一次理解父母的城市经验，也可能只把牛肉汤当作普通快餐。情感动因是否成立，需要比较本地居住者、离乡者、返乡者和外地游客的讲述。只有看到自豪、怀念、无感和反感同时存在，论文才能解释公共记忆怎样协商，而不是替受访者预先写好乡愁。</p>
                <p>几类驱动力通常以“事件—组织—传播—参与”的方式相互放大。考古或电视剧制造关注窗口，政府部门迅速组织专题、线路和活动，媒体与企业提供内容和消费入口，用户再用评论、打卡、购买和二次创作延长事件。若其中任何一环缺位，记忆都可能停在短期曝光：有资源但没有事件，材料不易集中出现；有事件但没有组织承接，热度很快消散；有传播但缺少现实体验，认同难以稳定；有消费却缺乏社区参与，品牌增长也可能同地方生活脱节。</p>
                <p>因此，本章可以提出一个供后文检验的关系式：<b>媒介记忆的形成强度，取决于“可调用资源 × 事件激活 × 组织承接 × 主体参与”，而不是四项简单相加。</b>这里的乘法不是统计模型，而是强调任何条件接近于零，都可能使转化中断。它也避免把产业增长、平台热度和集体记忆混为一谈：前两者可以成为条件或结果，是否形成较稳定的公共理解，还要看人们能否复述、争论并在生活中重新使用。</p>
                <p>由此可见，淮南牛肉汤“因何被记忆”没有一个单独答案。它拥有好讲、好看和好体验的基础材料，数字媒介重新切分并连接这些材料，政策、市场、文化事件、人口流动与情感需求又把它们不断推入公共空间。但这些条件只解释记忆为什么可能发生，尚未说明具体事件怎样选择历史、怎样安排镜头、怎样让某种说法压过另一种说法。下一章将以武王墩考古、《六姊妹》、短视频和线下活动为节点，追踪这套“激活—重构—协商”的实际过程。</p>
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
                <p><b>所谓“记忆激活”，不是媒体把一段沉睡的历史完整唤醒，而是某个事件让原本分散的材料突然获得共同的注意力。</b>淮南早已有楚文化、矿业城市、回民技艺、街边早餐和牛肉汤传说，但它们并不会始终同时出现在公众面前。考古发现、电视剧播出或大型活动提供了明确的时间节点，新闻机构、政府部门、企业和用户便可以围绕节点重新选择材料。激活首先改变的是可见度，随后才可能改变公众怎样理解地方。</p>
                <p>判断一个事件是否构成记忆激活，至少要看四个条件：旧材料是否被重新引用；原本不同的材料是否被接到同一故事里；是否有多类主体连续参与；事件结束后是否留下可再次使用的画面、词语或空间。仅有一次报道并不足以形成公共记忆。真正值得分析的是报道之后发生的连锁反应：谁迅速跟进、调用了什么、把关注接到哪里，又有哪些说法在重复中逐渐显得理所当然。</p>
                <p><b>武王墩考古构成了“历史型激活”。</b>2024年地方发布和央视节目集中呈现墓葬形制、青铜礼器、墨书、动物遗存与楚国礼制<Cite id={14} /><Cite id={23} /><Cite id={24} />。2025年，武王墩一号墓又入选中国社会科学院“2024年中国考古新发现”和全国十大考古新发现，地方发掘由此持续进入国家级公共文化议程<Cite id={77} />。事件的核心原本是战国晚期楚国政治、礼制与物质文化，牛肉汤并非考古结论的一部分。</p>
                <p>但新闻传播需要把复杂考古转换成普通人能迅速辨认的线索。墓坑结构和器物组合需要专业知识，大鼎、牛类遗存和“两千多年”却具有明确画面与数字。相关节目还说明鼎内包括黄牛等动物并经历烹饪<Cite id={28} />。当这些线索进入地方美食语境时，一个通俗问题很容易出现：楚国人当时是不是已经在喝牛肉汤？这一步翻译降低了理解门槛，也把考古对象从礼制生活拉近到今天的餐桌。</p>
                <p>激活的关键并不在考古节目是否直接说出“淮南牛肉汤”，而在后续传播怎样完成联想。地方文章把武王墩、赵匡胤传说、回族迁徙、矿业城市和当代产业排成连续历史<Cite id={69} />；另一篇地方材料甚至把墓中牛类遗存直接写成楚王饮用现代牛肉汤的证明<Cite id={68} />。考古给出真实器物和权威解释，地方叙事再把器物同熟悉菜名连接，两种材料在同一页面或画面中出现，便产生了强烈的历史连续感。</p>
                <p>这种激活同时具有知识价值和失真风险。它让更多人关注楚文化，也让公众意识到饮食可以成为理解古代生活的入口；但如果传播省略“牛类遗存—烹饪行为—汤类食物—现代菜品”之间的推论层级，考古权威就会被借给一个尚未证实的起源故事。本文因此把“千年牛肉汤”视为事件激活后形成的传播框架，而不是预先接受的历史事实。</p>
                <p>从时间上看，考古激活也不是一次完成。2024年的阶段性成果先建立“大墓、大鼎、动物遗存”的基本视觉词汇，2025年的全国性评选和新检测又为旧画面增加权威与新信息<Cite id={23} /><Cite id={28} /><Cite id={77} />。每一次新进展都会重新把旧报道推回搜索和推荐页面，使公众以已经熟悉的“牛肉汤”框架解释新的考古事实。这说明事件既会激活过去，过去形成的标签也会反过来预先安排事件。</p>
                <p><b>《六姊妹》构成了另一种“生活型激活”。</b>总台开播材料明确将故事放在20世纪60年代至21世纪初的淮南，通过何家几代人的婚恋、工作、邻里与日常生活呈现社会变化<Cite id={74} />。同考古强调古代历史不同，电视剧提供的是普通家庭可以进入的时间：饭桌、工厂、街巷、家务和姐妹关系。牛肉汤不需要作为知识点被介绍，只要反复出现在人物生活中，就能成为这个城市“怎样过日子”的一部分。</p>
                <p>剧集选择生活流叙事非常重要。若牛肉汤只在旅游宣传镜头中出现，观众首先会把它理解为需要购买的地方特产；当它同家庭争执、团聚、上班和返乡并置，食物便获得了人物关系和时间积累。主创访谈与研讨会不断强调普通家庭、家文化、年代质感和烟火日常<Cite id={25} /><Cite id={75} />。这些解释又为观众预先提供了一种观看方法：不是只看情节，而是把老物件、方言和一日三餐当作共同年代的线索。</p>
                <p>电视剧的激活甚至早于正式播出。地方官方专题记录，演员陆毅在2024年4月拍摄期间发布牛肉汤探店Vlog；到2025年剧集播出和总台节目访谈时，这段演员个人内容又被地方媒体重新引用<Cite id={83} />。这是一种“预媒介化”：演员的探店先让部分用户知道剧组与淮南牛肉汤，电视剧播出后，旧Vlog又因为角色身份和剧情获得新的意义。观众看到的不再只是演员吃饭，而是“剧中人”走进真实淮南。</p>
                <p>电视剧还拥有比一般短视频更长的陪伴时间。考古新闻以新发现制造瞬时惊奇，连续剧则通过多集播出让观众同人物共同经历几十年。牛肉汤、老北头、工厂家属生活和淮南方言在不同情节中重复出现，逐渐从背景变成辨认故事世界的标志。这种重复并不证明观众已经形成城市认同，却提供了记忆所需要的熟悉感：下一次再看到热汤或老街，观众能够把它接回人物和情节。</p>
                <p>全国播出与高收视又扩大了触发范围。研讨会公布的中国视听大数据口径称，该剧全剧平均收视率超过4%，单集超过5%<Cite id={75} />。这些数字只能说明特定统计体系下的观看规模，不能直接证明观众记住了牛肉汤或认同淮南。但大范围播出确实为地方材料进入跨地域讨论提供了条件，也使地方部门、媒体和企业相信影视注意力值得迅速承接。</p>
                <p><b>第三类激活来自地方组织的主动接续。</b>电视剧2月3日开播后，2月15日起取景地就出现“看《六姊妹》寻觅淮南非遗”市集，近20家非遗企业和传承人被组织进剧情氛围与现场互动<Cite id={81} />。3月1日起，名特优产品展销会又把“观剧—游小镇—品美食—购好物”设计成连续行动，36家企业带来200余种产品<Cite id={80} />。这些活动不是热度的自然后果，而是公共部门和行业组织把屏幕注意力重新编排为空间与消费路径。</p>
                <p>3月29日的粉丝见面会暨万人共品牛肉汤活动进一步把分散观看变成共同在场。活动由地方政府与影视公司共同主办，主创和演员分享“淮南瞬间”，方言挑战、粉丝互动与集体饮食被安排在同一现场<Cite id={47} />；新华社视频则用三口大锅、上千斤牛肉、厨师团队和排队人群把这场活动再度转成全国可观看的公共场面<Cite id={26} />。电视剧中的家庭食物由此被放大成城市仪式。</p>
                <p>这条时间链说明，激活不是“考古发现—公众记住”或“电视剧热播—城市走红”的单线因果。更准确的过程是：事件提供注意力窗口，媒体给出可识别符号，地方组织迅速安排活动和空间，参与者再生产照片、评价与短视频。考古和影视分别提供历史感与亲近感，组织承接则把两种感受转成可参加的现实场景。下一节将继续追问：同一材料每换一种媒介，究竟被改成了什么。</p>
              </section>

              <section className="essay-subsection" id="essay-chapter-3-reconstruction">
                <h4>二、记忆重构：数字媒介生态下的再生产路径</h4>
                <p><b>“重构”不等于媒体凭空编造，而是同一材料每换一种载体，都会被重新取舍、排列和解释。</b>考古简报重视遗迹单位与证据，电视新闻需要画面和专家说明，地方专题需要把发现同城市关联，短视频需要迅速抓住注意，线下活动则要让人能够参与。每次转换都保留一部分旧内容，也加入当前媒介的节奏与目的。Erll所说的再媒介化，正可以用来理解这种连续改写<Cite id={35} /><Cite id={39} />。</p>
                <p>淮南案例中至少有五条相互交叉的再生产路径：考古材料从发掘进入新闻和起源叙事；电视剧从长篇剧情进入片段、访谈与探店；屏幕中的食物经活动变成可共同食用的现场；取景画面经旅游线路和空间修复变成可打卡地点；游客和居民再把现场拍回平台。记忆不是沿一条渠道向下流动，而是在文本、影像、空间、商品和身体实践之间循环。</p>
                <p><b>第一条路径是“专业证据—新闻画面—地方故事”。</b>考古发布中的墓葬结构、器物组合和动物检测，本来依靠专业语境才能解释。新闻节目会选取体量最大的墓坑、最醒目的大鼎、科技检测画面和专家原声，使观众在有限时间内抓住“重要发现”<Cite id={23} /><Cite id={24} />。地方传播再从新闻中提取“大鼎、黄牛、两千年”，将它们接到牛肉汤传说。材料没有完全消失，但证明对象已经从楚国礼制悄悄转向现代地方身份。</p>
                <p>视觉权威在这条路径中发挥关键作用。真实大鼎和实验室检测比文字传说更具可信感；当热汤照片紧接考古器物出现时，画面之间的邻接就会替代严格论证。用户未必真的认为两者完全相同，却很容易留下“一定有关系”的印象。因此，正式内容分析要记录镜头与图片的先后关系，而不能只抄报道文字。某个限定条件即使写在正文里，也可能被更强的视觉联想抵消。</p>
                <p>时间也在转换中被压缩。战国墓葬、五代传说、近现代回民技艺、改革开放市场和今天的产业，在地方长文或短视频里可以十几秒内连续出现<Cite id={69} />。压缩让城市历史显得完整，方便受众记忆；它也省略了各时期之间缺少直接传承材料的事实。所谓“千年”，往往不是一个经过考证的年代结论，而是媒介把多个时间层压成一句话后的效果。</p>
                <p><b>第二条路径是“长篇剧情—生活片段—城市符号”。</b>《六姊妹》用跨越几十年的家庭叙事呈现淮南，观众最初接触的是人物命运和日常关系<Cite id={74} />。进入新闻和平台后，长剧情会被拆成方言、老物件、姐妹互动、工厂空间和吃牛肉汤等独立片段。每个片段都可以脱离原剧情传播，并被重新命名为“淮南烟火气”或“年代记忆”。城市由复杂故事世界缩成几个高辨识度符号。</p>
                <p>食物特别适合承担这种压缩，因为它同时连接人物、空间和感官。一碗汤可以出现在早餐、团聚或返乡场景，不需要台词专门解释，观众也能理解其日常性质。地方专题进一步把剧中反复出现的牛肉汤解释为串联人物悲欢、见证城市生活的文化符号<Cite id={83} />。这是一种事后赋义：电视剧提供可见场面，地方叙事再明确告诉公众应该从中读出“家乡、温暖和城市”。</p>
                <p>演员身份又把虚构与现实连接起来。演员在拍摄期间探店，本来可以是一段个人生活记录；剧集播出后，官方账号、新闻访谈和粉丝内容不断重新引用，探店便成为“演员替观众验证淮南味道”的证据<Cite id={17} /><Cite id={83} />。演员既是角色的扮演者，又成为地方体验的见证者，其个人影响力使一家具体门店、一道具体吃法获得超出普通顾客经验的可见度。</p>
                <p><b>第三条路径是“无法传味—多模态补偿”。</b>屏幕不能让观众真正闻到或尝到牛肉汤，于是拍摄会强化红油、热气、翻滚汤面、舀汤声、酥饼蘸汤和入口表情。字幕和口播再补上“鲜、香、辣、暖”等词。饮食非遗短视频研究把这种视觉、听觉和语言的配合称为通感化表达<Cite id={64} />。它并不复制味觉，却能调用观众已有的饮食经验，制造“好像已经尝到”的期待。</p>
                <p>多模态表达还会选择一种更适合镜头的牛肉汤。蒸汽明显、颜色浓、动作快的大锅比等待熬汤、采购原料和清理灶台更容易进入视频；大口进食和夸张反应也比安静的日常早餐更能传达味道。这意味着平台中的“地道”首先是一种可拍性。论文需要比较屏幕版本与门店观察，判断哪些步骤被反复展示，哪些劳动因不够好看而持续缺席。</p>
                <p><b>第四条路径是“屏幕场景—公共仪式—可再拍摄事件”。</b>粉丝见面会把演员、方言和剧情记忆带到现场，万人共食则把原本属于家庭与街边店的一碗汤放大成集体行动<Cite id={47} />。巨型汤锅、众多厨师、排队人群和“万人”数字非常适合新闻镜头<Cite id={26} />。参与者既在吃，也在观看自己身处一个值得记录的城市事件。个体进食由此获得了仪式性的“我们一起”。</p>
                <p>不过，活动名称中的“万人”和新闻镜头中的密集人群只能证明组织者如何设计、媒体如何呈现，不能直接证明每位参加者都产生了同一种地方认同。有人为演员而来，有人为免费品尝或热闹而来，也有人只是路过。媒介记忆研究应把活动作为可共同参与的记忆实践，而不是把到场人数自动换算成认同人数。需要通过现场访谈和参与者叙述判断他们后来究竟记住了什么<Cite id={73} />。</p>
                <p><b>第五条路径是“取景地—体验线路—平台打卡”。</b>地方部门在开播后修复剧中场景、设置非遗市集和产品展销，游客便能沿着已经命名的地点寻找红旗照相馆、老北头、回民饭店和相关美食<Cite id={79} /><Cite id={80} /><Cite id={81} />。屏幕中的背景不再只是取景场所，而成为带有剧情说明、商品和拍照位置的体验空间。游客用身体进入影像，再用手机把自己的进入过程记录下来。</p>
                <p>空间再生产同时包含保护与改造。九龙岗后续规划把区域定位为“近代工矿文化体验区”，提出微改造、商业与文化混合、保留部分原住民和公众参与<Cite id={82} />。这些计划说明影视热度已经反向影响现实空间的功能与叙事。它可能为工业遗产修复提供资源，也可能把仍在生活的街区改成只为游客复刻剧情的布景。研究应区分真实历史建筑、剧组置景和后期仿建，避免把三者混成一个“原汁原味”的过去。</p>
                <p>平台鼓励的二次创作继续延长这条路径。地方材料披露，定档后官方账号先转发总台信息、开设老淮南专栏和制作系列视频，随后又通过小红书话题鼓励游客拍摄，相关报道和评论按官方口径累计阅读量超过100万<Cite id={79} />。这里的“裂变”并非完全自发：地方机构先提供话题、地点和模仿模板，用户在模板中加入自己的脸、路线和评价。参与扩大了，但议题边界仍部分由组织者设定。</p>
                <p>到2025年12月，央视新闻仍以“跟着影视去旅行”报道《六姊妹》取景地和老街区<Cite id={78} />。这说明影视记忆并未随大结局立即消失，而是经过旅游、改造和媒体回访进入长尾阶段。后续报道又会成为新的起点：没看过首播的用户可能先从旅游视频认识九龙岗，再回头寻找电视剧。记忆传播的时间顺序由此倒置，作品、地点和用户记录相互导流。</p>
                <p>重构过程还受到数字存储不稳定的影响。演员Vlog可能删除或调整，平台评论排序随时变化，官方统计的“阅读量”也可能把多平台、转载和重复访问放在一起。正式研究必须保留抓取时间、账号身份、原始链接、互动量口径与转引关系。否则今天可见的热门内容会被误当成当时最重要的内容，地方媒体对演员视频的二次引用也可能被误算为独立证据。</p>
                <p>因此，淮南牛肉汤的记忆重构可以概括为三个变化：<b>证据被视觉化，长故事被符号化，观看被实践化。</b>视觉化让大鼎与热汤更具权威和诱惑，符号化让“千年、家、烟火气”便于传播，实践化则让观众通过探店、共食、打卡和购买进入叙事。三者扩大记忆的可参与性，也不断改变原材料的含义。下一节要讨论的是，谁有能力为这些符号作出最终或暂时的解释。</p>
              </section>

              <section className="essay-subsection" id="essay-chapter-3-meaning">
                <h4>三、意义生产：多重话语下的记忆建构</h4>
                <p><b>媒介重构最终会落到意义问题：公众被邀请把这碗汤理解成什么？</b>同一碗牛肉汤可以被说成千年古味、回民技艺、矿工早餐、非遗项目、城市名片、标准产品、家乡味或游客必吃。各种说法并非完全互斥，却各自突出不同时间、主体和利益。媒介记忆不是从中挑出一个永远正确的答案，而是观察这些解释如何竞争、联合并在特定阶段获得较高权威。</p>
                <p><b>官方话语首先把分散经验组织成城市公共叙事。</b>政策文件用产业规划、标准、集体商标和统计指标确定“淮南牛肉汤”的治理边界<Cite id={1} /><Cite id={3} /><Cite id={5} />；文化和旅游部门则把它同楚汉文化、非遗、影视和“开放热情的淮南人”并置<Cite id={47} />。在这套话语中，一碗汤不仅代表个人口味，还要承担展示历史、招商、文旅和城市形象的公共任务。</p>
                <p>官方并不是单一声音。考古部门强调墓葬、礼制和学术价值<Cite id={77} />，文旅部门强调游客体验与非遗，商务和市场监管部门强调展销、标准和品牌，区级政府更关注取景地、基础设施与平台传播<Cite id={79} /><Cite id={80} />。这些部门会共享“一碗汤一座城”的大方向，却对何种材料最重要有不同优先级。论文应把“官方”继续拆分，比较不同机构怎样选择历史和衡量成效。</p>
                <p><b>影视与专业评论话语把牛肉汤放进“家”和“时代”的框架。</b>开播宣传强调何家几十年的普通生活<Cite id={74} />，研讨会则由主管部门、出品方、主创和评论者不断阐释家庭责任、时代记忆与情感共鸣<Cite id={75} />。食物在这个框架里不是孤立商品，而是柴米油盐和亲缘关系的组成部分。它使宏大社会变迁落到可以被观众理解的一顿饭，也使淮南从能源城市变成拥有家庭温度的生活空间。</p>
                <p>这种情感框架具有广泛连接能力，却也可能遮盖具体差异。“家”可以让不同地域观众产生共鸣，但观众感动于姐妹关系，不等于他们记住了淮南；同样，“普通人的史诗”可能把工人、女性和移民生活带入屏幕，也可能把矛盾重新收束成温暖怀旧。论文需要区分对剧情人物的情感、对某个年代的怀念、对淮南地方的识别和对牛肉汤的记忆，不能把四者合并成一个“共情”。</p>
                <p><b>商业话语更关心地方意义能否变成可识别、可携带和可购买的承诺。</b>展销会把观剧、游览、品尝和购买连接起来<Cite id={80} />，电商与直播把牛肉汤包装成异地可下单的商品<Cite id={8} /><Cite id={12} />。在商业叙事中，“正宗”意味着产地、工艺或品牌可信，“非遗”意味着文化价值，“演员同款”则意味着可模仿的体验。历史和情感被转译成选择商品的理由。</p>
                <p>商业叙事并不天然虚假。商品可以让离乡者持续接触家乡味，也能为门店和传承人提供收入。问题在于，市场通常偏好一句话能说清的故事，因此更愿意重复“千年、秘方、地道”，不愿解释证据争议和门店差异。正式研究应把包装、直播话术和门店招牌同政策标准、传承人讲述对照，判断商家引用的地方记忆究竟来自共同知识，还是为了销售临时拼接。</p>
                <p><b>非遗话语试图把制作从普通餐饮提升为值得保护的活态知识。</b>取景地非遗市集邀请传承人展示和互动<Cite id={81} />，国家级节目则把选料、熬制和操作转成可观看技艺<Cite id={27} />。它为经营者和传承人提供文化身份，也提醒公众牛肉汤并非只有成品和销量。然而，如果镜头只保留壮观大锅和熟练动作，不说明学习周期、社区关系和工艺变化，“非遗”也会变成另一个宣传标签。</p>
                <p><b>演员、游客和居民话语则从个人经验进入。</b>演员探店和主创访谈把“我吃过、我想再来”转成具有粉丝影响力的见证<Cite id={83} />；游客以同款机位、同款门店和同款食物完成打卡；本地居民则可能用童年、矿区、家附近门店和具体口味判断屏幕是否可信。这些叙述比机构口号更具生活细节，但也受到角色知名度、平台推荐和拍摄能力影响，并非每种个人经验都能得到同样传播。</p>
                <p>评论区可以成为不同记忆相遇的地方。本地人可能纠正方言和吃法，外地人询问门店，离乡者讲返乡经历，也有人质疑剧情或起源。食物影像研究说明评论与弹幕能够唤起地方记忆和自传表达<Cite id={33} />。不过，高赞排序会让某些情绪更突出，沉默者和不同意见仍然不可见。评论是公共记忆正在协商的材料，不是已经达成共识的证明。</p>
                <p>几类话语的争夺，集中体现在四个高频标签上。<b>“千年”</b>把复杂历史压缩成时间深度，主要借考古和传说获得可信感；它提升城市文化分量，却最容易跨越证据边界。研究者不必禁止传说，而应要求发布者说明“这是地方传说”“这是考古事实”还是“这是传播推断”，让公众知道一句话的依据在哪里。</p>
                <p><b>“非遗”</b>把食物从消费品转成需要传承的文化实践。它可以增加传承人可见度，也可能被企业当作质量或历史的万能背书。非遗认证证明某项技艺被列入保护体系，不等于每件商品自动正宗，更不等于工艺不能变化。判断非遗话语是否成立，关键要看相关社区是否参与、知识是否持续传递、展示和收益是否回到实践者<Cite id={37} /><Cite id={45} />。</p>
                <p><b>“烟火气”</b>把家庭饭桌、热汤、方言、老街和普通劳动连接起来，是《六姊妹》最容易引发亲近感的框架<Cite id={75} /><Cite id={76} />。它使工业城市不再只剩煤矿和能源，也让日常生活获得表达位置。但烟火气一旦被固定为旧砖墙、红塑料凳和拥挤摊位，也会变成旅游模板，遮住新城区、整洁门店和居民对生活改善的期待。</p>
                <p><b>“正宗”</b>表面讨论味道，实际同时涉及产地、技艺、标准和利益。监管部门通过商标、授权和标准划出公共品牌边界<Cite id={3} /><Cite id={4} /><Cite id={5} />，商家用它承诺商品，本地食客则可能凭个人口味和长期关系作判断。三种标准并不完全重合。论文不能替各方指定唯一配方，而应说明谁拥有定义权、哪些底线需要统一、哪些地方差异应当保留。</p>
                <p>多主体参与也没有取消权力差异。政府与主流媒体拥有稳定渠道，影视公司掌握剧集素材和演员资源，企业可以购买曝光，头部用户更容易进入推荐；普通门店、老年居民、回民家庭和不接受主流起源说法的人则可能只作为背景出现。记忆权研究提醒，数字平台扩大表达的同时也会产生新的可见性不平等<Cite id={67} />。因此，“人人都能发视频”不能替代对发言位置和资源分配的分析。</p>
                <p>媒介文本本身也不能独自完成集体记忆。相关研究区分“媒体写了什么”与人们围绕媒体进行的讲述、观看、消费和身体实践，指出真正需要研究的是媒介如何成为记忆实践的对象与载体<Cite id={73} />。对淮南案例而言，节目播出只能证明公共材料出现；居民反复讲述、游客按图到访、家庭继续进食、门店用或不用某个标签，才显示这些材料是否进入社会生活。</p>
                <p>正式研究可以据此建立“同一事件的多版本对照表”。以武王墩为例，分别记录考古发布、央视节目、地方专题、商业文案和用户视频怎样描述大鼎与牛类遗存；以《六姊妹》为例，比较开播宣传、剧情片段、演员Vlog、政府活动、游客打卡与评论怎样使用牛肉汤。每条材料都编码发言者、证据类型、时间框架、画面、标签、情感和行动号召，才能看到意义是在何处发生变化。</p>
                <p>还应主动寻找不顺从主线的材料：考古专家对推论的限定、不喜欢电视剧的居民、不相信“千年”的经营者、觉得游客打扰生活的原住民、未从流量中受益的普通门店。反例不会削弱论文，反而能够判断一种意义究竟是广泛共享，还是因为机构资源和平台推荐而显得占据多数。没有反例，研究很容易把宣传材料重新写一遍。</p>
                <p>综合三节，本章形成一条更具体的过程链：<b>事件制造注意窗口 → 媒体提取可识别符号 → 不同载体重排证据和情感 → 组织把观看接入活动、空间与商品 → 用户用评论、共食和打卡继续解释 → 新痕迹返回下一轮传播。</b>这不是封闭循环，每一环都可能中断或产生争议。它比“媒介赋能地方文化”更能说明谁做了什么、内容在哪里变化以及结论需要什么证据。</p>
                <p>本章能够较有把握地证明：武王墩与《六姊妹》提供了不同类型的触发；地方机构迅速把影视注意力接入非遗、商品、空间和活动；同一碗汤在考古新闻、家庭剧、短视频和共食现场中获得了不同含义。它仍不能仅凭公开网页证明居民认同已经增强，也不能把游客和销售变化全部归因于媒介事件。下一章因此将从“内容怎样被建构”转向“被看见以后怎样进入情感、到访、消费和城市制度”，并检验这条转化链在哪些条件下才成立。</p>
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
          <p>网站里的83项公开来源只是前期材料，不能代替你自己的调查。下面这套办法既能写进研究方法章节，也确实可以照着执行。</p>
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
          <article><span>A · 政策、新闻和研究资料</span><h3>网站现有83项</h3><p>用来整理政策节点、事件时间线、理论和图片。要保存标题、日期、发布者、网址、关键段落和授权信息，防止原链接以后失效。</p></article>
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
          {[22, 23, 24, 25, 26, 27, 28, 78].map((id, index) => {
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
          <div><p className="section-kicker">所有材料都放在这里</p><h2>83项网页、文章、视频、图片和学术资料。</h2></div>
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
          <article><h3>这个网站已经做了什么</h3><p>83项政策、统计、新闻、视频、图片、典籍和学术资料都已逐条登记。开放图片记录了作者和许可证，论文各章也配好了可以使用的材料和不能说过头的地方。</p></article>
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
