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
  thumbnailUrl?: string;
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
  { id: 22, type: "视频", date: "2022-04", publisher: "央视网 · 消费主张", title: "历史文化厚重的淮南牛肉汤", note: "较早的中央电视节目片段，展示大众媒介如何包装地方美食历史。", url: "https://tv.cctv.com/2022/04/21/VIDElEViajJZ7FDhwdedfumg220421.shtml", thumbnailUrl: "https://p5.img.cctvpic.com/fmspic/2022/04/21/13bead3a2b344e7d9f233b9d82e28817-1.jpg" },
  { id: 23, type: "视频", date: "2024-05", publisher: "央视网 · 新闻联播", title: "武王墩考古获重要进展", note: "国家级新闻节点把楚墓、大鼎与淮南历史推入公共视野。", url: "https://tv.cctv.com/2024/05/18/VIDEtbnF5n4gJDHtT0WCSe7l240518.shtml", thumbnailUrl: "https://p4.img.cctvpic.com/photoAlbum/page/performance/img/2021/9/28/1632795780652_242.jpg" },
  { id: 24, type: "视频", date: "2024-05", publisher: "央视网 · 焦点访谈", title: "探秘武王墩", note: "专家讨论15种动物遗存与楚国礼制；可防止把出土牛骨直接等同现代牛肉汤。", url: "https://tv.cctv.com/2024/05/21/VIDEVh649e0kY32OWAQbXEVl240521.shtml", thumbnailUrl: "https://p4.img.cctvpic.com/photoAlbum/page/performance/img/2021/9/28/1632795780652_242.jpg" },
  { id: 25, type: "视频", date: "2025-02", publisher: "央视网 · 剧说很好看", title: "《六姊妹》主创访谈", note: "呈现“家”“代际”“地方生活”如何成为影视记忆的情感框架。", url: "https://tv.cctv.com/2025/02/25/VIDEvyKZNJy6V415mgtDFwew250225.shtml", thumbnailUrl: "https://p4.img.cctvpic.com/photoAlbum/page/performance/img/2021/9/28/1632795780652_242.jpg" },
  { id: 26, type: "视频", date: "2025-03", publisher: "新华网", title: "安徽淮南：飘香牛肉汤 文旅新动能", note: "1分52秒新华社视频，记录万人共品活动与城市消费场景。", url: "https://www.news.cn/government/20250331/d81ea60397bc44c5bcba3eb438dc7138/c.html", thumbnailUrl: "https://lib.news.cn/common/sharelogo.jpg" },
  { id: 27, type: "视频", date: "2025-05", publisher: "央视网 · 非遗里的中国", title: "省级非遗：淮南牛肉汤制作技艺", note: "把制作过程转化为国家级屏幕中的非遗展示。", url: "https://tv.cctv.com/2025/05/10/VIDESQT8zBU2r1wPwqem596m250510.shtml", thumbnailUrl: "https://p4.img.cctvpic.com/photoAlbum/page/performance/img/2021/9/28/1632795780652_242.jpg" },
  { id: 28, type: "视频", date: "2025-12", publisher: "央视网 · 新闻联播", title: "武王墩再现楚国礼乐文明", note: "检测显示鼎内动物包括黄牛等且经历烹饪；仍不能推出具体菜谱。", url: "https://tv.cctv.com/2025/12/21/VIDElHeKJzmgFQljHx7C3zJt251221.shtml", thumbnailUrl: "https://p4.img.cctvpic.com/photoAlbum/page/performance/img/2021/9/28/1632795780652_242.jpg" },
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
  { id: 78, type: "视频", date: "2025-12", publisher: "央视网 · 新闻直播间", title: "跟着影视去旅行：探访《六姊妹》拍摄地", note: "电视剧播出十个月后，总台新闻仍以取景地和老街区再利用为主题报道淮南，可用于观察影视记忆的长尾传播和空间再媒介化。", url: "https://tv.cctv.com/2025/12/20/VIDEFuve6lZR4SmvWuMOHSmB251220.shtml", thumbnailUrl: "https://p4.img.cctvpic.com/photoAlbum/page/performance/img/2021/9/28/1632795780652_242.jpg" },
  { id: 79, type: "新闻/专题", date: "2025-08", publisher: "淮南市人民政府", title: "田家庵文旅融合中的《六姊妹》传播矩阵", note: "披露定档预热、30余处实拍场地、10余条地方视频、全网阅读量超100万及小红书话题和游客二次创作，呈现地方组织如何主动延长影视热度。", url: "https://www.huainan.gov.cn/zwgk/xqdt/1260702473.html" },
  { id: 80, type: "新闻/专题", date: "2025-03", publisher: "淮南市人民政府", title: "《六姊妹》取景地名特优产品展销会", note: "地方部门把观剧、游小镇、品美食和购商品设计为连续场景，36家企业携200余种产品参展，是屏幕记忆进入消费空间的具体节点。", url: "https://www.huainan.gov.cn/zwgk/jrhn/1260555520.html" },
  { id: 81, type: "新闻/专题", date: "2025-02", publisher: "淮南市文化和旅游局", title: "看《六姊妹》寻觅淮南非遗市集", note: "电视剧播出后不到两周，地方即在取景地组织近20家非遗企业和传承人展示、互动，使剧情、工业街区与地方技艺发生现场连接。", url: "https://wlj.huainan.gov.cn/jgsz/jgks/shwhhfwzwhyck/gzqk/551795196.html" },
  { id: 82, type: "新闻/专题", date: "2025-04", publisher: "淮南市人民政府", title: "织好规划“点线面” 留住老城“人景情”", note: "记录九龙岗被重新定位为近代工矿文化体验区，以及微改造、原住民保留、公众参与和商业文化混合开发等计划，显示屏幕记忆开始反向改造现实空间。", url: "https://www.huainan.gov.cn/zwgk/bmdt/1260600274.html" },
  { id: 83, type: "新闻/专题", date: "2025-03", publisher: "淮南发布 · 澎湃政务", title: "从《六姊妹》到淮南牛肉汤", note: "记录陆毅在电视剧播出前发布牛肉汤探店Vlog，及剧集、演员讲述、非遗展馆、直播带货被串联为“一碗汤一座城”叙事；适合研究预热与跨媒介引用。", url: "https://m.thepaper.cn/newsDetail_forward_30491976" },
  { id: 84, type: "政策/统计", date: "2025-12", publisher: "淮南市人民政府 / 淮南日报", title: "淮南牛肉汤产业实现品质效率双提升", note: "披露23项专利、三类速食形态、24家加工企业及数字化改造等行政口径；可观察地方食品怎样被重新定义为技术和生产问题，企业效率数据仍需第三方核验。", url: "https://www.huainan.gov.cn/zwgk/jrhn/1260825112.html" },
  { id: 85, type: "政策/统计", date: "2025-11", publisher: "淮南市市场监管局", title: "首条淮南牛肉汤产业数据知识产权登记成功", note: "记录协会、监管部门、高校和企业把注册、经营与区域需求整理为产业数据集；登记证明治理对象出现，不等于算法及区域评级已被独立验证。", url: "https://scjgj.huainan.gov.cn/ztgz/sszdgg/551846488.html" },
  { id: 86, type: "学术/典籍", date: "2023", publisher: "Journal of Hospitality and Tourism Management", title: "Celebrity involvement and film tourist loyalty", note: "以横店413名游客为样本，发现明星卷入通过目的地形象与地方依恋影响忠诚，直接路径不显著；为拆分“追剧—到访—忠诚”提供经验参照。", url: "https://www.sciencedirect.com/science/article/pii/S1447677022001814" },
  { id: 87, type: "学术/典籍", date: "2009", publisher: "Journal of Sustainable Tourism", title: "Food, place and authenticity", note: "Rebecca Sims基于英国两地游客与生产者访谈，讨论地方食物如何因被感知为真实而连接目的地文化，也提醒“地方”与“真实”本身需要被解释。", url: "https://www.tandfonline.com/doi/abs/10.1080/09669580802359293" },
  { id: 88, type: "学术/典籍", date: "2022", publisher: "Journal of Vacation Marketing", title: "Tell me your story: Branding destinations through residents’ (place) stories", note: "提出以居民地方故事参与目的地品牌建构，反对品牌身份脱离居民赋予地方的意义与情感。", url: "https://journals.sagepub.com/doi/abs/10.1177/13567667211060567" },
  { id: 89, type: "学术/典籍", date: "2026", publisher: "Sustainability", title: "Authenticity, Restaurant Quality, and Place Attachment", note: "以中国西安食旅游客为样本，检验食物真实感、餐厅品质、地方依恋、满意度与忠诚之间的多阶段关系；可用于设计淮南游客问卷，不可直接替代本地证据。", url: "https://www.mdpi.com/2071-1050/18/4/1957" },
  { id: 90, type: "学术/典籍", date: "2021", publisher: "Asia Pacific Journal of Tourism Research", title: "What serves as the best bridge in food consumption?", note: "实证研究发现真实性感知可影响消费行为意向，但体验价值的中介作用比地方依恋更明确，提示认同与复购应分开测量。", url: "https://www.tandfonline.com/doi/abs/10.1080/10941665.2021.1983627" },
  { id: 91, type: "学术/典籍", date: "2021", publisher: "Sustainability", title: "Social Media-Based Content towards Image Formation", note: "以中国国内旅行者调查区分机构内容、用户内容、认知形象、情感形象和行为意向，可为“看见—想去”的分阶段测量提供参照。", url: "https://www.mdpi.com/2071-1050/13/8/4241" },
  { id: 92, type: "学术/典籍", date: "2021", publisher: "Policy Press / Oxford Academic", title: "The Computational Surfacing of Memories", note: "Jacobsen与Beer分析平台怎样通过分类和排序决定哪些旧内容被重新提示为“记忆”，说明算法不仅储存过去，也主动分配过去的可见性。", url: "https://academic.oup.com/policy-press-scholarship-online/book/42922/chapter-abstract/361076181" },
  { id: 93, type: "学术/典籍", date: "2021", publisher: "Memory Studies", title: "Capture the feeling: Memory practices between heritage sites and digital media", note: "基于现场访谈、网络访谈和800条社交媒体帖文，分析游客拍摄怎样既表达现场情感，也重新塑造遗产地体验；不能把打卡预设为纯粹浅薄。", url: "https://journals.sagepub.com/doi/10.1177/17506980211010695" },
  { id: 94, type: "学术/典籍", date: "2026", publisher: "ISPRS International Journal of Geo-Information", title: "Study on the Public Perception Characteristics of Intangible Cultural Heritage in China", note: "基于微博非遗数据发现机构宣传与宏观叙事占主导，公共体验和参与内容比例较低；可作为淮南平台样本的比较参照。", url: "https://www.mdpi.com/2220-9964/15/4/159" },
  { id: 95, type: "学术/典籍", date: "2024", publisher: "Journal of Ethnic Foods", title: "Savoring traditions: Culinary memory, familial identity, and authenticity", note: "通过访谈和烹饪情境说明同一道地方鱼咖喱存在多种社区与家庭版本，没有单一版本能够代表全部地方真实性。", url: "https://link.springer.com/article/10.1186/s42779-024-00256-0" },
  { id: 96, type: "学术/典籍", date: "2021", publisher: "Journal of Rural Studies", title: "Tradition (re-)defined: Farm v factory trade-offs in geographical indications", note: "比较小型农场与工厂生产者对地理标志的不同理解，揭示法律编码传统食品时在规模生产、手工价值与执行能力之间的张力。", url: "https://wrap.warwick.ac.uk/id/eprint/150282/" },
  { id: 97, type: "学术/典籍", date: "2007", publisher: "Annals of Tourism Research", title: "Beyond authenticity and commodification", note: "长期田野研究显示商业旅游不必然破坏真实性，也可能为当地人带来自豪与行动资源；关键要问真实性由谁界定、收益与权力怎样分配。", url: "https://www.sciencedirect.com/science/article/pii/S0160738307000552" },
  { id: 98, type: "学术/典籍", date: "2020", publisher: "Tourism Management Perspectives", title: "Constructing an intangible cultural heritage experiencescape", note: "通过澳门节庆多主体访谈区分政府、组织者、表演者、商户和游客的作用，发现游客参与虽多为自发，普通商户对体验建构的参与仍较有限。", url: "https://www.sciencedirect.com/science/article/pii/S221197362030026X" },
  { id: 99, type: "学术/典籍", date: "2023", publisher: "Equality, Diversity and Inclusion", title: "Can tourism enhance inclusivity for indigenous peoples?", note: "基于35名越南占族祭司的民族志与访谈，揭示遗产旅游收入分配和社区守护者生计之间可能失衡，强调公平收益对活态保护的重要性。", url: "https://www.emerald.com/insight/content/doi/10.1108/EDI-08-2022-0243/full/html" },
  { id: 100, type: "学术/典籍", date: "2025", publisher: "Applied Sciences", title: "User engagement metrics and Cantonese Opera videos on Bilibili", note: "区分情感、互动与经济参与，讨论青年平台怎样扩大传统文化接触；互动指标能说明传播参与，不能单独证明技艺已经代际传承。", url: "https://www.mdpi.com/2076-3417/15/21/11335" },
  { id: 101, type: "学术/典籍", date: "2024修订", publisher: "UNESCO", title: "Operational Directives for the Implementation of the 2003 Convention", note: "《保护非物质文化遗产公约》操作指南把社区参与、提高认识、可持续生计、体面就业与旅游影响纳入保护过程，适合把抽象的“活化”改写为可检查的治理条件。", url: "https://ich.unesco.org/en/directives" },
  { id: 102, type: "学术/典籍", date: "2019", publisher: "UNESCO World Heritage Centre", title: "Culture|2030 Indicators", note: "由22项定量与定性指标构成，强调汇集分散的文化数据并观察环境韧性、繁荣与生计、知识与技能、参与和治理，而非只用客流或产值代表文化发展。", url: "https://whc.unesco.org/en/culture2030indicators" },
  { id: 103, type: "学术/典籍", date: "2019", publisher: "Sustainability", title: "Residents’ attitudes toward industrial heritage tourism in a resource-exhausted city", note: "以中国黄石336名居民为样本，将旅游参与、认知、情感、地方依恋与支持行为拆开检验；可为同有工业城市记忆的淮南设计居民调查，但不能替代本地证据。", url: "https://www.mdpi.com/2071-1050/11/19/5151" },
  { id: 104, type: "学术/典籍", date: "2022", publisher: "Tourism Management / Cardiff University", title: "Competing for legitimacy in the place branding process", note: "两座城市的多案例研究解释地方政府、旅游机构、企业与社区如何凭借知识、组织程序和关系网络争取品牌话语权，提示“邀请参与”不等于实际影响力平等。", url: "https://orca.cardiff.ac.uk/id/eprint/149234/" },
];

const sourceById = (id: number) => sources.find((source) => source.id === id)!;

function Cite({ id }: { id: number }) {
  const source = sourceById(id);
  return <a className="cite" href={source.url} target="_blank" rel="noreferrer" aria-label={`来源 ${id}：${sourceDisplayTitle(source)}`}>[{String(id).padStart(2, "0")}]</a>;
}

const cases = [
  {
    id: "archaeology",
    eyebrow: "案例一 · 武王墩考古",
    title: "一只大鼎，如何触发了“千年牛肉汤”的记忆？",
    body: <>武王墩考古确认了战国晚期楚国高等级墓葬、青铜礼器与丰富动物遗存。后续检测显示黄牛等动物曾被烹饪。这能够证明楚国礼制与饮食生活已经与牛肉相关，却仍不足以证明今天的牛肉汤配方连续存在两千年。传播中被压缩掉的，恰好是<strong>“牛骨烹饪→牛肉汤→淮南牛肉汤”</strong>之间的三次跳跃。</>,
    insight: "考古发掘了看得见的器物，地方传播又把这些器物同熟悉的牛肉汤连在一起。两者一结合，传说就显得有了历史证据。",
    sources: [14, 23, 24, 28, 29],
  },
  {
    id: "television",
    eyebrow: "案例二 · 电视剧《六姊妹》",
    title: "《六姊妹》没有具体介绍牛肉汤，而是让它反复出现在“家”里。",
    body: "剧中牛肉汤并非硬性插入，而是日常生活的布景、家庭关系的黏合剂和城市年代感的感官线索。主创访谈、演员短视频和游客打卡又把屏幕里的味觉记忆搬回寻常街巷：2025年春季，九龙岗时光小镇官方统计日均接待游客超过1.2万人次；五一期间日均1.5万人次，其中市外游客占65%以上。",
    insight: "电视剧先让观众把牛肉汤同“家”这个文化氛围联系起来，短视频让这种文化印象更方便模仿和转发，取景地与门店宣传再把文化印象变成实地到访和消费数据。",
    sources: [6, 16, 17, 19, 25],
  },
  {
    id: "industry",
    eyebrow: "案例三 · 标准定义与集体商标",
    title: "标准越来越多，谁来决定什么叫“正宗”？",
    body: "从方便食品、中央厨房到集体商标，淮南牛肉汤正在从千店千味进入可复制体系。2025年集体商标获批，2026年首批30家企业获授权；截至2026年5月，官方已发布17项团体标准和1项省级地方标准。统一质量有助于品牌与食品安全，却也可能损失地方风味差异。",
    insight: "真正需要保护的不是某个永远不变的配方，而是传承人、门店、食客仍能参与定义和更新这碗汤味道的活力。",
    sources: [2, 3, 4, 5, 9, 36, 37, 38],
  },
];

const caseImages = {
  archaeology: {
    src: "media/events/wuwangdun-bronze-fang.jpg",
    alt: "武王墩墓出土的青铜钫",
    caption: "武王墩墓出土铜钫。淮南市政府页面注明图片来自武王墩墓考古工作队。器物能够证明楚国礼制与物质生活，也为后来有关牛肉汤历史的联想提供了可见材料，但不能直接印证现代牛肉汤的来源。",
    sourceId: 14,
  },
  television: {
    src: "media/events/six-sisters-mass-tasting.jpg",
    alt: "六姊妹粉丝见面会暨万人共品淮南牛肉汤活动现场",
    caption: "《六姊妹》粉丝见面会暨万人共品淮南牛肉汤活动现场。电视剧带来的注意力在这里被转化为集体活动、城市宣传和可拍摄的公共场景。",
    sourceId: 47,
  },
  industry: {
    src: "media/events/industry-packaging.jpg",
    alt: "工人在食品企业包装淮南牛肉汤产品",
    caption: "2024年1月，工人在淮南一家食品企业包装牛肉汤产品。门店里的现做食物进入生产线以后，配方、分量和包装都需要变得可复制。摄影：新华社记者黄博涵。",
    sourceId: 15,
  },
} as const;

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

const coreReferences = [
  { sourceId: 31, group: "媒介记忆", entry: "VAN DIJCK J. Mediated Memories in the Digital Age[M]. Stanford: Stanford University Press, 2007.", use: "界定媒介不是记忆的外部容器，而是参与个人经验、文化记忆与身份形成的条件。" },
  { sourceId: 35, group: "媒介记忆", entry: "ERLL A. Media and the Dynamics of Memory: From Cultural Paradigms to Transcultural Premediation[A]//WAGONER B, ed. Handbook of Culture and Memory[M]. Oxford: Oxford University Press, 2017: 305-324.", use: "支撑再媒介化、预媒介化以及记忆在不同媒介之间持续运动的分析。" },
  { sourceId: 40, group: "媒介记忆", entry: "HOSKINS A, ed. Digital Memory Studies: Media Pasts in Transition[M]. New York: Routledge, 2018.", use: "解释连接、平台、数字档案和记忆经济共同造成的数字记忆悖论。" },
  { sourceId: 61, group: "媒介记忆", entry: "陈振华. 集体记忆研究的传播学取向[J]. 国际新闻界, 2016, 38(4): 109-126.", use: "用于梳理国内传播学记忆研究，并提示媒介权力、个体缺失与连续／断裂问题。" },
  { sourceId: 62, group: "媒介记忆", entry: "胡康, 郑一卉. “记忆”之辨：新闻传播学领域记忆研究的概念辨析与方法论反思[J]. 新闻与写作, 2024(8): 62-72.", use: "帮助区分媒介记忆、数字记忆和一般的过去叙事，防止概念无限扩张。" },
  { sourceId: 63, group: "媒介记忆", entry: "刘晗. 参与·网络·仓储：记忆实践路径下的数字记忆建构[J]. 新闻与传播评论, 2023, 76(4): 60-70.", use: "用于分析政府、媒体、门店和用户怎样通过参与、连接与数字存储共同建构记忆。" },
  { sourceId: 73, group: "媒介记忆", entry: "谢卓潇. 春晚作为记忆实践——媒介记忆的书写、承携和消费[J]. 国际新闻界, 2020, 42(1): 154-176.", use: "说明节目文本本身不能直接等于集体记忆，仍需受众叙述、身体经验和长期实践。" },
  { sourceId: 32, group: "食物与地方", entry: "HOLTZMAN J D. Food and Memory[J]. Annual Review of Anthropology, 2006, 35: 361-378.", use: "连接味觉、怀旧、身份、身体记忆与被发明的饮食传统。" },
  { sourceId: 70, group: "食物与地方", entry: "于雯静, 郭永锐, 侯欣宜. 食物景观对地方社会记忆的表征和塑造——以《舌尖上的中国》为例[J]. 热带地理, 2021, 41(3): 495-504.", use: "为味道、家庭、身体实践与环境性、功能性、情感性记忆的分析提供国内经验。" },
  { sourceId: 53, group: "食物与地方", entry: "刘雪, 叶晓煌, 刘后继, 等. 淮南牛肉汤风味特征研究进展[J]. 中国食品, 2024(12): 104-106.", use: "提供淮南牛肉汤风味与地方叙事的专门研究，同时要把文中的起源传说继续作为传说使用。" },
  { sourceId: 87, group: "食物与地方", entry: "SIMS R. Food, place and authenticity: Local food and the sustainable tourism experience[J]. Journal of Sustainable Tourism, 2009, 17(3): 321-336.", use: "讨论地方食品、真实性、目的地文化与可持续旅游之间的关系。" },
  { sourceId: 90, group: "食物与地方", entry: "CHANG J, OKUMUS B, LI Z W, et al. What serves as the best bridge in food consumption: experiential value or place attachment?[J]. Asia Pacific Journal of Tourism Research, 2021, 26(12): 1302-1317.", use: "提示体验价值、地方依恋与消费意向必须分开测量。" },
  { sourceId: 41, group: "城市形象", entry: "KAVARATZIS M, ASHWORTH G J. City branding: An effective assertion of identity or a transitory marketing trick?[J]. Tijdschrift voor Economische en Sociale Geografie, 2005, 96(5): 506-514.", use: "把城市品牌从广告口号拉回地方身份、公共治理和多方关系。" },
  { sourceId: 42, group: "城市形象", entry: "RABBIOSI C. Place branding performances in tourist local food shops[J]. Annals of Tourism Research, 2016, 60: 154-168.", use: "解释地方食品门店中的物质、话语与身体实践怎样共同表演地方品牌。" },
  { sourceId: 65, group: "城市形象", entry: "杨莉明, 周文怡. 美食短视频中的广州城市形象建构及其传播策略研究[J]. 城市观察, 2022(1): 116-128, 163.", use: "提供美食短视频城市形象的内容分析维度，可与淮南样本进行比较。" },
  { sourceId: 71, group: "城市形象", entry: "曾一果, 凡婷婷. 重识“地方”：网红空间与媒介地方感的形成——以短视频打卡“西安城墙”为考察中心[J]. 新闻与传播研究, 2022, 29(11): 71-89, 128.", use: "支撑人—媒介—地方关系以及远程观看、实地打卡和地方感之间的分析。" },
  { sourceId: 88, group: "城市形象", entry: "HAY N A, CHIEN P M, RUHANEN L. Tell me your story: Branding destinations through residents’ (place) stories[J]. Journal of Vacation Marketing, 2022, 28(3): 319-334.", use: "说明居民地方故事不是宣传素材，而应当进入目的地品牌的参与式建构。" },
  { sourceId: 86, group: "城市形象", entry: "ZHOU B, XIONG Q, LI P, et al. Celebrity involvement and film tourist loyalty: Destination image and place attachment as mediators[J]. Journal of Hospitality and Tourism Management, 2023, 54: 32-41.", use: "用于拆分明星／影视接触、目的地形象、地方依恋和游客忠诚，避免直接因果推断。" },
  { sourceId: 103, group: "城市形象", entry: "YUAN Q, SONG H, CHEN N, et al. Roles of tourism involvement and place attachment in determining residents’ attitudes toward industrial heritage tourism in a resource-exhausted city in China[J]. Sustainability, 2019, 11(19): 5151.", use: "为淮南工业城市居民调查提供参与、认知、情感、地方依恋和支持行为的比较结构。" },
  { sourceId: 104, group: "城市形象", entry: "REYNOLDS L, KOENIG-LEWIS N, DOERING H, et al. Competing for legitimacy in the place branding process: (Re)negotiating the stakes[J]. Tourism Management, 2022, 91: 104532.", use: "解释为什么地方品牌虽然邀请多方参与，实际影响力仍可能因知识、程序与关系资源而不平等。" },
  { sourceId: 36, group: "非遗与治理", entry: "中华人民共和国主席令第四十二号. 中华人民共和国非物质文化遗产法[Z/OL]. (2011-02-25)[2026-08-17].", use: "确定国内非遗保护、调查、代表性项目与合理使用的法律边界。" },
  { sourceId: 37, group: "非遗与治理", entry: "UNESCO. Convention for the Safeguarding of the Intangible Cultural Heritage[Z/OL]. (2003-10-17)[2026-08-17].", use: "界定非遗是社区持续再创造并代际传递的活态实践。" },
  { sourceId: 45, group: "非遗与治理", entry: "UNESCO. Ethical Principles for Safeguarding Intangible Cultural Heritage[EB/OL]. (2015)[2026-08-17].", use: "支撑社区主体、持续知情同意、物质与精神收益以及避免误表征的伦理要求。" },
  { sourceId: 101, group: "非遗与治理", entry: "UNESCO. Operational Directives for the Implementation of the Convention for the Safeguarding of the Intangible Cultural Heritage[Z/OL]. (2024)[2026-08-17].", use: "把社区参与、提高认识、生计、体面就业和旅游影响转化为保护治理条件。" },
  { sourceId: 102, group: "非遗与治理", entry: "UNESCO. Culture|2030 Indicators[R/OL]. Paris: UNESCO, 2019[2026-08-17].", use: "为文化保护和城市发展建立兼顾生计、知识、参与和治理的多维评估框架。" },
  { sourceId: 43, group: "研究方法", entry: "KRIPPENDORFF K. Content Analysis: An Introduction to Its Methodology[M]. 4th ed. Thousand Oaks: SAGE, 2018.", use: "用于确定分析单位、编码手册、编码员训练以及信度与效度检验。" },
  { sourceId: 44, group: "研究方法", entry: "BRAUN V, CLARKE V. Using thematic analysis in psychology[J]. Qualitative Research in Psychology, 2006, 3(2): 77-101.", use: "为访谈材料的熟悉、编码、主题生成、修订与命名提供方法路径。" },
] as const;

const citationRoutes = [
  { chapter: "绪论", question: "媒介记忆到底指什么？", instruction: "概念界定先引用国外基础理论，再用国内概念辨析限定研究对象。", sources: [31, 35, 40, 61, 62] },
  { chapter: "第二章", question: "为什么食物能够唤起地方记忆？", instruction: "把人类学食物记忆、国内食物景观研究和淮南专门材料放在同一段中。", sources: [32, 33, 53, 70] },
  { chapter: "第二、三章", question: "历史材料怎样进入当代叙事？", instruction: "古籍、考古事实、新闻解释和起源传说分层引用。", sources: [14, 24, 28, 29, 53, 69] },
  { chapter: "第三章", question: "影视和平台怎样激活并重构记忆？", instruction: "剧集材料证明文本与传播节点，媒介记忆文献负责解释机制。", sources: [17, 25, 34, 39, 63, 73, 83, 92] },
  { chapter: "第四章", question: "看见怎样转成认同？", instruction: "按曝光、形象、探索欲、行动分层引用。", sources: [6, 19, 42, 86, 89, 90, 91, 103] },
  { chapter: "第四章、结语", question: "牛肉汤怎样参与城市形象建构？", instruction: "同时引用城市品牌、居民故事、地方食品门店和淮南空间承接材料。", sources: [41, 42, 65, 71, 82, 88, 104] },
  { chapter: "第五章、结语", question: "传播、标准化与非遗保护的边界在哪里？", instruction: "法律和约束材料确定规范边界，案例研究解释参与、版本与收益问题。", sources: [5, 36, 37, 45, 46, 95, 96, 99, 101, 102] },
  { chapter: "研究方法", question: "研究怎样真正执行？", instruction: "方法教材说明程序，经验研究只用于借鉴量表和变量，不能替代研究者实地调查。", sources: [43, 44, 89, 91, 93, 103] },
] as const;

const referenceGroups = ["媒介记忆", "食物与地方", "城市形象", "非遗与治理", "研究方法"] as const;
type ReferenceGroup = (typeof referenceGroups)[number];

const thesisArgumentMatrix = [
  {
    question: "为什么淮南牛肉汤容易成为媒介记忆对象？",
    finding: "它同时拥有传说、典籍、考古、非遗技艺、矿区生活、家庭早餐和感官经验等多层资源。资源丰富提高了可讲性，但不同资源的证据性质并不相同。",
    evidence: "地方史料、古籍、考古发布、非遗节目、门店与开放图片",
    boundary: "古代烹牛和现代牛肉汤之间没有得到证明的连续配方链。",
    chapter: "第二章",
  },
  {
    question: "考古、影视和平台怎样激活并重构这些记忆？",
    finding: "事件先打开注意窗口，新闻、电视剧、短视频、直播和线下活动再按各自形式选择符号、压缩时间并重新组织主体位置；同一材料在跨媒介流动中不断改变含义。",
    evidence: "武王墩报道、《六姊妹》、演员视频、万人共食与传播矩阵",
    boundary: "平台可见性上升不等于受众已经形成稳定共同记忆。",
    chapter: "第三章",
  },
  {
    question: "网上可见度怎样可能转化为认同、到访和产业价值？",
    finding: "曝光需要经过目的地形象、情感、空间体验、门店服务和制度承接，才可能进入到访、购买、推荐与品牌；地方线路、商标、标准和政策构成了现实承接条件。",
    evidence: "游客报道、取景地与市集、门店奖补、网销、商标和产业政策",
    boundary: "同期增长只能说明关联，不能单独证明影视或短视频造成全部增长。",
    chapter: "第四章",
  },
  {
    question: "传播和制度化会遗漏什么，又该怎样改进？",
    finding: "古老、统一和增长叙事更容易占据中心，普通劳动、门店差异和社区知识可能退到背景。改进关键不是拒绝媒介与商业，而是公开证据、保留版本、扩大参与、让收益回到实践和学习。",
    evidence: "标题与视频比较、标准和授权文件、非遗伦理与参与研究",
    boundary: "现有资料不能预先宣布居民被剥夺、青年断层或商业化必然损害传统。",
    chapter: "第五章与结语",
  },
] as const;

const terminologyGuide = [
  { term: "媒介记忆", use: "与牛肉汤有关的过去，在媒介生产、流通、接受和再使用中被选择、组织并形成阶段性公共理解的过程。", avoid: "不要把任何提到过去的新闻都直接称为媒介记忆。" },
  { term: "记忆资源", use: "尚未被当代传播完整组织，但可以被调用的传说、物证、技艺、感官和生活经验。", avoid: "不要默认资源天然带有统一意义或会自动转化为品牌。" },
  { term: "记忆激活", use: "考古、影视、政策或节庆在特定时间集中提高某些资源的公共可见性。", avoid: "不要用“激活”直接替代受众认同和长期影响。" },
  { term: "再媒介化／记忆重构", use: "同一材料进入新闻、影视、短视频、直播或活动时，被重新剪辑、命名和赋予主体位置。", avoid: "不要写成不同媒介对原故事的无损搬运。" },
  { term: "记忆转化", use: "可见性经过情感、空间、消费与制度等中间环节，可能进入到访、购买、认同或治理。", avoid: "不要把热搜、客流、复购和城市认同合并成一个指标。" },
  { term: "制度化", use: "记忆中的名称与版本被商标、标准、条例、课程、档案或常态项目相对稳定地固定。", avoid: "制度化不等于所有居民接受，也不等于地方差异已经消失。" },
  { term: "城市形象", use: "居民与外来者对城市历史、生活、空间和情感形成的综合认知与评价。", avoid: "不要把城市形象缩成一句宣传口号或一个视觉标志。" },
  { term: "城市品牌", use: "公共部门、企业、居民和游客围绕地方识别、承诺与治理持续协商的过程。", avoid: "不要把淮南当作可以由单一机构完全设计和控制的普通商品。" },
  { term: "地方性", use: "食物同具体人群、环境、历史、劳动、知识和日常实践之间仍然存在的关系。", avoid: "不要只用“正宗”“古老”两个标签代替地方性。" },
  { term: "研究推断", use: "研究者依据多项材料提出、但仍需平台样本、访谈、观察或统计进一步验证的解释。", avoid: "必须与可核事实、机构公开口径和地方传说明确区分。" },
] as const;

const sourceTitleCN: Record<number, string> = {
  15: "淮南牛肉汤，著名的地方特色美食",
  31: "《数字时代的媒介记忆》",
  32: "《食物与记忆》",
  34: "互联网与社交媒体时代的记忆重构",
  35: "《媒体与记忆动力学》",
  38: "非物质文化遗产与生计",
  39: "文学、电影与文化记忆的媒介性",
  40: "《数字记忆研究：转变中的媒介过去》",
  41: "城市品牌：有效的身份建构还是短期市场噱头？",
  42: "地方食品店中的地方品牌表演",
  44: "心理学中的主题分析应用",
  45: "非物质文化遗产保护伦理原则",
  46: "在不断演化中进行保护",
  54: "一碗淮南牛肉汤",
  55: "淮南牛肉汤餐馆",
  56: "葱花淮南牛肉汤",
  57: "酥饼配淮南牛肉汤",
  58: "江基淮南牛肉汤",
  59: "酥饼配汤",
  86: "名人参与与电影旅游忠诚度",
  87: "食物、场所与真实性",
  88: "告诉我你的故事：通过居民（地方）叙事进行目的地品牌塑造",
  89: "真实性、餐厅品质与地方依恋",
  90: "什么是促成饮食消费转化的最佳桥梁？",
  91: "基于社交媒体内容的形象建构",
  92: "记忆的计算性显影",
  93: "捕捉感受：遗产场所与数字媒体之间的记忆实践",
  94: "中国非物质文化遗产公众认知特征研究",
  95: "品味传统：烹饪记忆、家庭身份与真实性",
  96: "传统的重定义：地理标志中的农场与工厂权衡",
  97: "超越真实性与商品化",
  98: "建构非物质文化遗产体验场景",
  99: "旅游能提升土著群体的包容性吗？",
  100: "Bilibili粤剧视频的用户参与度指标",
  101: "2003年公约执行的操作性指引",
  102: "文化2030指标",
  103: "资源枯竭型城市居民对工业遗产旅游的态度",
  104: "地方品牌建构中的合法性竞争",
};

function sourceDisplayTitle(source: Source) {
  return sourceTitleCN[source.id] ?? source.title;
}

const methodTools = [
  { id: "sampling", number: "01", label: "平台抽样", note: "320条分层样本", output: "平台样本登记表" },
  { id: "coding", number: "02", label: "内容编码", note: "变量、代码与置信度", output: "内容编码表" },
  { id: "interview", number: "03", label: "半结构访谈", note: "12—18人、六类主体", output: "访谈提纲与登记表" },
  { id: "observation", number: "04", label: "场景观察", note: "门店、街区与活动", output: "现场观察记录表" },
  { id: "survey", number: "05", label: "双问卷", note: "居民版＋游客版", output: "问卷题库" },
  { id: "ethics", number: "06", label: "数据分析", note: "对象授权与统计分析", output: "数据字典与知情同意书" },
] as const;

const samplingQuotas = [
  { window: "基线窗口", period: "2022.04—2023.12", event: "考古与影视热点出现前", official: 20, media: 20, business: 20, user: 20 },
  { window: "考古窗口", period: "2024.04—2024.07", event: "武王墩进入公共视野", official: 20, media: 20, business: 20, user: 20 },
  { window: "影视窗口", period: "2025.02—2025.05", event: "《六姊妹》与万人共食", official: 20, media: 20, business: 20, user: 20 },
  { window: "制度窗口", period: "2025.08—2026.05", event: "商标、标准与条例", official: 20, media: 20, business: 20, user: 20 },
] as const;

const codingRows = [
  { variable: "样本编号", name: "每条样本的唯一编号", codes: "按“事件窗口—主体—序号”编号" },
  { variable: "账号主体", name: "发布账号的主体类型", codes: "政府、媒体、企业／门店、普通用户" },
  { variable: "记忆资源", name: "内容调用的过去与生活材料", codes: "传说、典籍、考古、非遗技艺、矿区生活、家庭日常、感官经验" },
  { variable: "时间框架", name: "内容主要指向的时间", codes: "古代、矿业城市、改革开放后、数字当下、跨时期连续" },
  { variable: "叙事框架", name: "内容组织故事的主要方式", codes: "千年历史、非遗技艺、家乡家庭、城市名片、产业增长、烟火日常、争议纠偏" },
  { variable: "解释主体", name: "获得解释权的主体", codes: "政府、专家、媒体、企业、传承人、普通门店、居民、游客或创作者" },
  { variable: "情感线索", name: "内容中可观察的情感表达", codes: "乡愁、家庭亲情、自豪、新奇、怀旧、愉悦食欲、质疑争议" },
  { variable: "城市形象", name: "内容指向的淮南形象", codes: "历史古城、工业城市、烟火生活、美食之城、文旅目的地、产业新城" },
  { variable: "行动指向", name: "内容展示或要求的行动", codes: "观看、评论、转发、打卡、到访、购买、学习、参加活动" },
  { variable: "证据强度", name: "内容说明材料性质的程度", codes: "可核事实、机构口径、地方传说、研究推断、混合但未区分" },
  { variable: "证据越界", name: "是否跨越证据边界", codes: "古代烹牛等于现代配方、相关增长等于单一事件因果等" },
  { variable: "声画关系", name: "关键声音与画面的组合顺序", codes: "大鼎→热汤、剧情→打卡、人物→产品、技艺→舞台、数据→消费" },
  { variable: "互动量快照", name: "采集时可见的平台互动数据", codes: "播放、点赞、评论、收藏、转发及采集日期" },
] as const;

const interviewGroups = [
  { group: "传承人／老店", quota: "2—3人", focus: "技艺边界、学徒培养、不能标准化的知识、传播中的误读" },
  { group: "普通门店／企业", quota: "2—3人", focus: "经营变化、平台流量、商标标准、成本收益与门店差异" },
  { group: "政府／协会／媒体", quota: "2—3人", focus: "指标口径、议题选择、授权治理、文旅转化与部门分工" },
  { group: "本地老居民", quota: "2—3人", focus: "最早记忆、矿区与街区生活、味道变化、宣传与生活的距离" },
  { group: "年轻本地人", quota: "2—3人", focus: "家庭传递、平台接触、地方自豪、反感或者沉默的叙事" },
  { group: "外地游客／创作者", quota: "2—3人", focus: "来访前想象、现场体验、发布选择、消费与推荐" },
] as const;

const interviewModules = [
  { step: "开场与定位", questions: "你与淮南、牛肉汤或相关工作的关系是什么？这种关系从什么时候开始？" },
  { step: "具体记忆", questions: "请讲一次印象最深的喝汤、做汤、卖汤或传播经历。当时在哪里、和谁、有哪些感官细节？" },
  { step: "媒介接触", questions: "你看过哪些考古、电视剧、短视频或直播内容？哪一条改变了你的理解，哪一条让你觉得不准确？" },
  { step: "正宗与变化", questions: "你判断“正宗”的依据是什么？哪些变化可以接受，哪些变化让这道食物失去地方性？" },
  { step: "城市关系", questions: "牛肉汤代表了一个怎样的淮南？它遮住了这座城市的哪些人、地方或经历？" },
  { step: "收益与治理", questions: "传播热度给谁带来了什么？商标、标准和活动如何影响你？你希望谁参与决定？" },
  { step: "反例与收束", questions: "有没有与你刚才说法相反的经历？如果只能给传播者一条建议，你会说什么？" },
] as const;

const observationDomains = [
  { domain: "空间与时间", items: "地点类型、日期时段、天气、客流、停留时间、附近交通与其他城市符号" },
  { domain: "可见叙事", items: "门头、菜单、价目、证书、商标、非遗／千年／影视标签、城市地图与人物故事" },
  { domain: "制作与劳动", items: "备料、熬汤、烫制、分工、身体动作、师徒互动、顾客可见与不可见环节" },
  { domain: "感官环境", items: "汤色、热气、气味、声音、温度、器物、桌面、排队节奏；区分观察与个人感受" },
  { domain: "互动与差异", items: "点单问答、外地／本地口音、拍摄、打卡、投诉、熟客关系、不同吃法与版本" },
  { domain: "传播进入现场", items: "电视剧海报、平台团购、直播设备、推荐路线、活动装置，以及顾客是否真的使用" },
  { domain: "研究者反思", items: "自己的身份如何影响现场、哪些人没有被听见、哪些判断需要访谈或文件复核" },
] as const;

const surveyInstruments = [
  {
    id: "resident",
    label: "居民问卷",
    target: "在淮南连续居住1年以上、年满18周岁的居民",
    suggestion: "建议有效样本250—350份；按年龄、居住区与是否从业做配额，最终数量以预测试后的功效分析为准。",
    constructs: [
      { name: "媒介接触", items: "过去3个月是否经常看到相关内容，是否接触过不止一种来源。" },
      { name: "叙事识别", items: "能否区分历史事实、地方传说和宣传说法。" },
      { name: "地方身份", items: "牛肉汤是否让受访者想到自己与淮南的联系。" },
      { name: "收益与公平", items: "传播机会是否惠及普通门店和社区，从业者能否参与品牌与标准决策。" },
      { name: "发展支持", items: "是否支持在保留差异的前提下推广，是否愿意向外地人解释而不只是转发口号。" },
    ],
  },
  {
    id: "visitor",
    label: "游客问卷",
    target: "非淮南常住、已在淮南实际消费牛肉汤、年满18周岁的游客",
    suggestion: "建议有效样本250—350份；在老街、普通门店、交通节点分时段拦截，避免只在网红点采样。",
    constructs: [
      { name: "内容来源", items: "来访前接触渠道、最早知道的内容、是否看过《六姊妹》、是否主动搜索。" },
      { name: "认知与情感形象", items: "是否认为淮南具有鲜明的饮食和生活特色，是否觉得城市亲切、有活力、值得探索。" },
      { name: "真实性感知", items: "现场体验是否符合对地方生活的理解，门店是否只是为游客搭建的表演。" },
      { name: "门店品质与满意度", items: "食物、卫生、服务、价格和信息说明是否符合预期。" },
      { name: "地方依恋与行为意向", items: "是否愿意进一步了解淮南、复访、推荐或者购买相关产品。" },
    ],
  },
] as const;

const methodDownloads = [
  { file: "00-实证研究工具包.zip", label: "一键下载全部模板", forTool: "all" },
  { file: "01-平台样本登记表.csv", label: "平台样本登记表", forTool: "sampling" },
  { file: "02-内容编码表.csv", label: "内容编码表", forTool: "coding" },
  { file: "03-访谈登记表.csv", label: "访谈登记表", forTool: "interview" },
  { file: "04-现场观察记录表.csv", label: "现场观察记录表", forTool: "observation" },
  { file: "05-居民问卷题库.csv", label: "居民问卷题库", forTool: "survey" },
  { file: "06-游客问卷题库.csv", label: "游客问卷题库", forTool: "survey" },
  { file: "07-文件与变量字典.csv", label: "文件与变量字典", forTool: "ethics" },
  { file: "08-知情同意书模板.md", label: "知情同意书模板", forTool: "ethics" },
] as const;

const downloadVersion = "20260818-zh4";

const mediaAssets = [
  { id: "bowl", src: "media/commons/huainan-bowl.jpg", title: "一碗汤里的视觉层次", alt: "俯拍的一碗淮南牛肉汤，能看到牛肉、香菜、葱花和清汤", author: "Franklin Rainier", license: "Public Domain Mark", licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/", sourceId: 54, note: "俯视拍到肉片、绿叶、汤面和大碗。分析时可以记录哪些食材最显眼、颜色怎样形成对比，留下强烈视觉印象。" },
  { id: "onion", src: "media/commons/huainan-onion.jpg", title: "浇头让“正宗”出现差异", alt: "一碗加入洋葱和红辣椒浇头的淮南牛肉汤", author: "Franklin Rainier", license: "Public Domain Mark", licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/", sourceId: 56, note: "洋葱与辣椒让同一菜名呈现不同版本，提醒我们不要把正统配方当作唯一标准。" },
  { id: "shortbread", src: "media/commons/huainan-shortbread.jpg", title: "汤与酥饼是一组吃法", alt: "淮南牛肉汤与一盘酥饼摆在木桌上", author: "Franklin Rainier", license: "Public Domain Mark", licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/", sourceId: 57, note: "主食搭配把牛肉汤从“单碗菜品”扩展为一顿正餐的组合，体现了劳动人民对于饱腹的需求。" },
  { id: "dip", src: "media/commons/huainan-dip.jpg", title: "动作也是感官记忆", alt: "酥饼靠近汤碗，呈现蘸汤或搭配食用的场景", author: "Franklin Rainier", license: "Public Domain Mark", licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/", sourceId: 59, note: "掰、蘸、咬等身体动作很少出现在正式文本中，却是访谈和场景观察可以追问的生活经验。" },
  { id: "restaurant", src: "media/commons/huainan-restaurant.jpg", title: "菜名成为街道招牌", alt: "写有淮南牛肉汤字样的街边门店外观", author: "Franklin Rainier", license: "Public Domain Mark", licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/", sourceId: 55, note: "门头、价格、桌椅和开放式入口共同构成了消费者的消费预期，也让“淮南”字样逐渐走向世界各处，其形式也在变化。" },
  { id: "jiangji", src: "media/commons/huainan-jiangji.jpg", title: "从淮南名称到上海门店", alt: "上海黄浦区蒋记淮南牛肉汤清真门店外观", author: "Chongkian", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", sourceId: 58, note: "照片明确记录于上海黄浦区门店，可用于研究地方食品迁移后怎样保留产地名称、新增了清真标识与店面形态。" },
] as const;

const siteTabs = [
  { id: "overview", number: "01", label: "研究首页", note: "问题与证据" },
  { id: "atlas", number: "02", label: "牛肉汤图鉴", note: "实物、吃法与门头" },
  { id: "mechanism", number: "03", label: "案例与机制", note: "传播与反思" },
  { id: "draft", number: "04", label: "论文正文", note: "依原提纲逐节写作" },
  { id: "methods", number: "05", label: "研究方法", note: "六类实证工具" },
  { id: "references", number: "06", label: "参考资料", note: "核心文献与来源材料" },
] as const;

const essayChapterIndex = [
  {
    id: "abstract",
    number: "摘要",
    label: "摘要",
    title: "中英文摘要、关键词与全文论证总表",
    status: "已补齐 · 中英文摘要",
    purpose: "用最短篇幅交代研究对象、方法、发现、价值与边界，并统一全文核心概念。",
    question: "全文最终研究了什么、发现了什么？",
    evidence: "104项公开来源、事件链与前五章交叉证据",
    boundary: "摘要只概括现有材料支持的发现，不把待完成的田野调查写成既有结果。",
    sections: [
      { id: "chinese", label: "中文摘要与关键词" },
      { id: "english", label: "英文摘要与关键词" },
      { id: "argument-map", label: "研究问题与核心发现" },
      { id: "terminology", label: "全文统一术语表" },
    ],
  },
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
    status: "已深写 · 约9800字",
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
    status: "已深写 · 约9500字",
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
    status: "已深写 · 约1.2万字",
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
type MethodToolId = (typeof methodTools)[number]["id"];

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [activeCase, setActiveCase] = useState(cases[0].id);
  const [sourceFilter, setSourceFilter] = useState("全部");
  const [activeTab, setActiveTab] = useState<SiteTab>("overview");
  const [activeEssayChapter, setActiveEssayChapter] = useState<EssayChapterId>("intro");
  const [activeMethodTool, setActiveMethodTool] = useState<MethodToolId>("sampling");
  const [activeReferenceGroup, setActiveReferenceGroup] = useState<ReferenceGroup>("媒介记忆");

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
      const normalizedRequested = requested === "sources" ? "references" : requested;
      const matched = siteTabs.find((tab) => tab.id === normalizedRequested);
      if (matched) {
        setActiveTab(matched.id);
        if (matched.id === "draft") {
          const chapter = essayChapterIndex.find((item) => item.id === requestedChapter);
          if (chapter) {
            setActiveEssayChapter(chapter.id);
            requestAnimationFrame(() => requestAnimationFrame(() => {
              const reader = document.getElementById("draft-reader");
              const target = requestedSection
                ? document.getElementById(`essay-${chapter.id}-${requestedSection}`) ?? reader
                : reader;
              target?.scrollIntoView({ behavior: "auto", block: "start" });
            }));
          } else {
            requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "auto" }));
          }
        } else if (matched.id === "methods") {
          const tool = methodTools.find((item) => item.id === requestedChapter);
          if (tool) {
            setActiveMethodTool(tool.id);
            requestAnimationFrame(() => requestAnimationFrame(() => {
              document.getElementById("empirical-toolkit")?.scrollIntoView({ behavior: "auto", block: "start" });
            }));
          } else {
            requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "auto" }));
          }
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
  const selectedCaseImage = caseImages[activeCase as keyof typeof caseImages];
  const activeEssayEntry = essayChapterIndex.find((chapter) => chapter.id === activeEssayChapter)!;
  const activeEssayChapterIndex = essayChapterIndex.findIndex((chapter) => chapter.id === activeEssayChapter);
  const previousEssayChapter = activeEssayChapterIndex > 0 ? essayChapterIndex[activeEssayChapterIndex - 1] : null;
  const nextEssayChapter = activeEssayChapterIndex < essayChapterIndex.length - 1 ? essayChapterIndex[activeEssayChapterIndex + 1] : null;
  const activeMethodEntry = methodTools.find((tool) => tool.id === activeMethodTool)!;
  const activeMethodDownloads = methodDownloads.filter((download) => download.forTool === "all" || download.forTool === activeMethodTool);

  return (
    <main id="top">
      <div className="reading-progress" style={{ width: `${progress}%` }} />
      <header className="site-header">
        <a className="brand" href="#overview" onClick={() => openTab("overview")} aria-label="淮南牛肉汤媒介记忆研究首页">
          <span className="brand-mark">淮</span>
          <span>媒介记忆研究-淮南牛肉汤</span>
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
          <p className="eyebrow">媒介记忆研究-淮南牛肉汤</p>
          <h1>一碗汤，一座城，<br />百万人，共相忆</h1>
          <p className="dek">
            本研究关注一道美食的前世今生、穿梭时空，研究传说、考古、日常生活、影视和数字平台怎样共同组织着江淮儿女对淮南牛肉汤的记忆。
          </p>
        </div>

        <figure className="hero-photo">
          <img src="media/commons/huainan-bowl.jpg" alt="俯拍的一碗淮南牛肉汤实物，碗中可见牛肉、香菜和葱花" />
          <figcaption>
            <span>淮南牛肉汤实拍</span>
            <span>Franklin Rainier · Public Domain Mark</span>
            <a href="https://commons.wikimedia.org/wiki/File:A_Bowl_of_Huainan_Beef_Soup.jpg" target="_blank" rel="noreferrer">查看原始图片与授权 ↗</a>
          </figcaption>
        </figure>
      </section>

      <section className="question-strip" aria-label="研究路径">
        <span className="strip-label">研究路径</span>
        <ol>
          <li><b>01</b> 因何记忆</li>
          <li><b>02</b> 如何记忆</li>
          <li><b>03</b> 谁在建构</li>
          <li><b>04</b> 怎样转化</li>
          <li><b>05</b> 有何障碍</li>
        </ol>
      </section>

      <section className="overview-entry page-section">
        <div className="section-heading">
          <div><p className="section-kicker">首页阅读说明</p><h2>一碗汤的重量，是由品尝它的人决定的</h2></div>
        </div>

        <div className="overview-scope">
          <article><span>研究对象</span><h3>淮南牛肉汤</h3><p>研究围绕淮南牛肉汤的历史叙事、制作与消费实践、媒介形象、城市意义和制度化过程展开。</p></article>
          <article><span>研究视角</span><h3>媒介记忆</h3><p>关注有关淮南牛肉汤的过去，怎样被新闻、影视、短视频、城市活动和政策文件选择、改写、传播并再次使用。</p></article>
          <article><span>核心问题</span><h3>日常食物怎样成为城市记忆</h3><p>研究追踪“记忆资源—事件激活—跨媒介重构—主体参与—价值转化—制度化”的完整过程。</p></article>
        </div>

        <nav className="overview-directory" aria-label="研究栏目入口">
          <a href="#atlas" onClick={() => openTab("atlas")}><span>02</span><div><h3>牛肉汤图鉴</h3><p>查看淮南牛肉汤的实物、吃法、感官经验和门店空间。</p></div><b>→</b></a>
          <a href="#mechanism" onClick={() => openTab("mechanism")}><span>03</span><div><h3>媒介案例</h3><p>分析考古、影视、新闻和数字平台怎样激活并重构淮南牛肉汤记忆。</p></div><b>→</b></a>
          <a href="#draft" onClick={() => openTab("draft")}><span>04</span><div><h3>论文正文</h3><p>查看论文框架并阅读全文。</p></div><b>→</b></a>
          <a href="#methods" onClick={() => openTab("methods")}><span>05</span><div><h3>研究方法</h3><p>查看不同研究方法与背后的数据支撑逻辑。</p></div><b>→</b></a>
          <a href="#references" onClick={() => openTab("references")}><span>06</span><div><h3>参考资料</h3><p>核对核心文献、全文引文路线和全部来源材料（含视频）。</p></div><b>→</b></a>
        </nav>
      </section>
      </div>}

      {activeTab === "atlas" && <div className="tab-page" data-page="atlas">
      <section className="atlas-hero page-section" id="atlas">
        <figure className="atlas-hero-figure">
          <img src="media/commons/huainan-shortbread.jpg" alt="淮南牛肉汤与酥饼摆在同一张木桌上" />
          <figcaption>淮南牛肉汤与酥饼 · Franklin Rainier · Public Domain Mark <Cite id={57} /></figcaption>
        </figure>
        <div className="atlas-hero-copy">
          <p className="section-kicker">初相识</p>
          <h2>先别急着看文章了，<br />一起尝尝看吧。</h2>
          <p>淮南牛肉汤能够成为文化符号，重要的是它真好吃。这一部分把镜头拉回冒着热气的碗里：汤底、肉片、粉丝、豆制品、香菜葱花、辣油和酥饼缺一不可；一顿美餐如何从后厨工序走到桌面；“淮南牛肉汤”又怎样作为门店招牌走向世界。</p>
        </div>
      </section>

      <section className="bowl-anatomy page-section">
        <div className="section-heading">
          <div><p className="section-kicker">01 · 碗里有什么</p><h2>先把一碗汤拆成六个部分。</h2></div>
          <p>央视网的地方小吃介绍：牛骨汤、牛肉或牛杂、粉丝、干丝、葱段和红油等共同组成了一碗淮南牛肉汤<Cite id={60} />；2009年地方制作规范则把原辅料、熬汤、烫制与卫生要求写成技术文本<Cite id={52} />，秘方是淮南人民的真材实料和真情实感。</p>
        </div>
        <div className="anatomy-layout">
          <figure>
            <img src="media/commons/huainan-onion.jpg" alt="从上方观察加入洋葱与辣椒浇头的淮南牛肉汤" loading="lazy" />
            <figcaption>加洋葱与辣椒的版本，直观显示同一菜名下，也存在诸多变化 <Cite id={56} /></figcaption>
          </figure>
          <div className="anatomy-list">
            <article><span>01</span><div><h3>汤底</h3><p>牛骨和肉类熬出的热汤承担香气、温度与口感的基础。人们常用“清”“浓”“鲜醇”描述它。</p></div></article>
            <article><span>02</span><div><h3>牛肉与牛杂</h3><p>薄切牛肉提供更纯粹的口感，与它的名字相对应，牛杂则大大增加口感层次和物尽其用的饮食逻辑。</p></div></article>
            <article><span>03</span><div><h3>粉丝</h3><p>粉丝吸附汤汁、增加饱腹感，也让“喝汤”变成可作为正餐的选择。</p></div></article>
            <article><span>04</span><div><h3>干丝 / 千张 / 豆饼</h3><p>来到淮南，怎么能不尝尝豆制品呢？豆制品带来与肉片不同的纤维和咀嚼感，是当地人的最爱。</p></div></article>
            <article><span>05</span><div><h3>香菜与葱花</h3><p>绿色点缀符合中华美食色香味俱全的理念，同时以新鲜香气完成出碗前的最后一层味觉。</p></div></article>
            <article><span>06</span><div><h3>红油、浇头与桌边选择</h3><p>辣椒油、洋葱、盐度和其他浇头把最终味道交给门店与食客共同完成。“正宗”由此不是一份秘方单方面决定，而是人民群众的共同选择。</p></div></article>
          </div>
        </div>

        <div className="flavor-reading">
          <article><b>看</b><h3>画面里有哪些颜色</h3><p>浅色汤面、灰褐肉片、绿色香菜与红色辣油，是短视频和照片里很容易认出的组合。</p></article>
          <article><b>听</b><h3>哪些声音让人感受到“烟火气”</h3><p>滚汤、漏勺、切肉、碗筷和门店叫单共同制造现场感。未见其汤，先闻其声，烟火人间值得。</p></article>
          <article><b>闻 / 尝</b><h3>屏幕怎样替味道说话</h3><p>屏幕传不出气味和味道，只能用“鲜、香、辣、浓、不腻”等词和食客表情来代替。研究要分清真实味觉和视频对味觉的描述。</p></article>
          <article><b>动</b><h3>食客是怎么品尝的</h3><p>端碗、吹热气、夹肉、掰饼、蘸汤和加辣，进食动作表明人们吃食的状态。到门店观察时，可以直接把这些动作记录下来。</p></article>
        </div>
      </section>

      <section className="making-section page-section">
        <div className="section-heading light-heading">
          <div><p className="section-kicker">02 · 端上桌</p><h2>从后厨到桌面，观察五个步骤。</h2></div>
          <p>这不是家庭复刻菜谱，而是依据公开技术规范和节目材料整理的研究观察表。2009年规范可用于理解传统的标准工序，但不是世界各地的唯一现行版本<Cite id={52} />。</p>
        </div>
        <ol className="making-steps">
          <li><span>01</span><div><h3>原料处理</h3><p>牛肉、骨和牛杂经过清洗、浸泡、分拣，每一步都会影响汤的基础状态。观察时要记下店家口述的原料来源、卫生流程，也要注意哪些信息不愿公开。</p></div><em>观察时可以记：产地、清真、鲜货 / 冻货、能否溯源</em></li>
          <li><span>02</span><div><h3>大锅熬汤</h3><p>时间、火候、骨肉比例和香料，是门店经验最集中的部分。媒体爱拍沸腾大锅，因为它看起来有专业度，也有温度。</p></div><em>观察时可以记：老汤、火候、秘方、劳动者</em></li>
          <li><span>03</span><div><h3>熟制与切配</h3><p>肉片厚薄、牛杂种类、粉丝和豆制品预先处理，会影响口感，也能看出门店对于手工制作和效率的取舍倾向。</p></div><em>观察时可以记：刀工、分量、预制、中央厨房</em></li>
          <li><span>04</span><div><h3>烫制与冲汤</h3><p>漏勺把粉丝、干丝等配料送入滚汤，再和肉片一起装碗。这一串动作连贯、声音热闹，是短视频最爱拍的“手艺画面”。</p></div><em>观察时可以记：速度、热气、声音、镜头感</em></li>
          <li><span>05</span><div><h3>桌边完成</h3><p>香菜、葱花、红油、盐度和酥饼，让食客也参与决定最后的味道。一碗汤最终怎么吃，是后厨做法、门店习惯和个人选择共同决定的。</p></div><em>观察时可以记：顾客加料、早餐节奏、进食动作</em></li>
        </ol>
      </section>

      <section className="media-gallery-section page-section">
        <div className="section-heading">
          <div><p className="section-kicker">03 · 共品尝</p><h2>六张图片素材，分别能看出什么？</h2></div>
          <p>图片已经下载到网站本地，避免外链失效，图片保留了作者、授权许可。</p>
        </div>
        <div className="media-gallery-grid">
          {mediaAssets.map((asset, index) => (
            <article className={index === 0 || index === 5 ? "wide" : ""} key={asset.id}>
              <a className="media-image" href={sourceById(asset.sourceId).url} target="_blank" rel="noreferrer">
                <img src={asset.src} alt={asset.alt} loading="lazy" />
                <span>查看原始文件 ↗</span>
              </a>
              <div className="media-copy"><h3>{asset.title}</h3><p>{asset.note}</p><div>摄影：{asset.author} · <a href={asset.licenseUrl} target="_blank" rel="noreferrer">{asset.license}</a> · <Cite id={asset.sourceId} /></div></div>
            </article>
          ))}
        </div>
        <aside className="license-ledger"><b>授权账本</b><p>素材54—57、59由Franklin Rainier拍摄，Commons文件页标记为Public Domain Mark；素材58由Chongkian拍摄，采用CC BY-SA 4.0。网站对所有图片均保留署名与原始文件链接。Commons专题目前收录6个淮南牛肉汤文件<Cite id={54} /><Cite id={58} />。</p></aside>
      </section>
      </div>}

      {activeTab === "mechanism" && <div className="tab-page" data-page="mechanism">
      <section className="mechanism-section page-section" id="mechanism">
        <div className="section-heading">
          <div><p className="section-kicker">01 · 这碗汤的故事</p><h2>媒体每讲一次，故事都会变一点。</h2></div>
          <p>媒体不会把现成记忆原样搬过来。它会挑选、排序、强调，也会省略。一个故事从新闻进入电视剧、短视频和活动现场时，都会被重新讲述一遍<Cite id={31} /><Cite id={34} /><Cite id={35} />。</p>
        </div>

        <div className="mechanism-photo-strip" aria-label="淮南牛肉汤传播事件公开图片">
          <figure>
            <a href={sourceById(14).url} target="_blank" rel="noreferrer" aria-label="查看武王墩考古图片出处">
              <img src="media/events/wuwangdun-wooden-figurine.jpg" alt="武王墩墓出土的木俑首" loading="lazy" />
            </a>
            <figcaption><b>考古材料进入公共视野</b><span>武王墩墓出土木俑首；图片来自考古工作队，经淮南市政府公开发布。</span><Cite id={14} /></figcaption>
          </figure>
          <figure>
            <a href={sourceById(47).url} target="_blank" rel="noreferrer" aria-label="查看六姊妹万人共品活动图片出处">
              <img src="media/events/six-sisters-giant-pot.jpg" alt="六姊妹相关活动现场的巨型牛肉汤锅" loading="lazy" />
            </a>
            <figcaption><b>影视热度催生线下活动</b><span>巨型汤锅把电视剧话题改写为能够围观、品尝和传播的城市事件。</span><Cite id={47} /></figcaption>
          </figure>
          <figure>
            <a href={sourceById(15).url} target="_blank" rel="noreferrer" aria-label="查看淮南牛肉汤生产线图片出处">
              <img src="media/events/industry-production-line.jpg" alt="工人在淮南牛肉汤食品生产线上作业" loading="lazy" />
            </a>
            <figcaption><b>地方味道进入生产体系</b><span>生产线让淮南牛肉汤变成可运输、可销售、可统一管理的产品。摄影：新华社记者黄博涵。</span><Cite id={15} /></figcaption>
          </figure>
        </div>
        <p className="mechanism-image-note">本栏图片均来自政府部门或新闻机构的公开报道，点击图片可回到原发布页面。网站仅作论文研究与材料分析使用，图片版权归原发布方或摄影者所有。</p>

        <div className="memory-loop" aria-label="媒介记忆循环的六个步骤">
          <article><span>01</span><b>原有材料</b><p>传说、典籍、技艺、门店和家族回忆</p></article>
          <article><span>02</span><b>突然升温</b><p>考古发现、电视剧、节庆和平台热点</p></article>
          <article><span>03</span><b>贴上标签</b><p>“千年”“非遗”“烟火气”“正宗地道”</p></article>
          <article><span>04</span><b>各说各话</b><p>政府、商家、媒体和食客的不同解释</p></article>
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
            <p>方便装、冷冻款、中央厨房和直播带货确保“离了淮南还能喝到淮南味”<Cite id={8} /><Cite id={11} />，同时也把“正宗”转化为品牌承诺。</p>
            <div className="voice-effect">带来的结果：方便购买、方便复制、规模更大</div>
          </article>
          <article>
            <span className="voice-number">03 / 普通人怎么讲</span>
            <h3>“那一碗牛肉汤”保留着个人差异</h3>
            <p>老店、返乡者、演员Vlog与普通游客把宏大历史落回味觉、家乡和每个平凡日子<Cite id={17} />。差异化口味本身就是地方生活仍然鲜活的证据。</p>
            <div className="voice-effect">带来的结果：亲切、可信，保留个人口味</div>
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
          <figure className="case-figure">
            <a href={sourceById(selectedCaseImage.sourceId).url} target="_blank" rel="noreferrer" aria-label="查看这张图片的公开出处">
              <img src={selectedCaseImage.src} alt={selectedCaseImage.alt} loading="lazy" />
            </a>
            <figcaption>{selectedCaseImage.caption} <Cite id={selectedCaseImage.sourceId} /></figcaption>
          </figure>
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
          <div><p className="section-kicker">03 · 从看见，到认同</p><h2>一段视频不会自动变成城市认同，更不会自动变成收入。</h2></div>
          <p>它需要让人先产生情感，再寻找可去的地方、产生购买欲望，也要有人把短期热度续写为长期体验<Cite id={32} /><Cite id={33} />。</p>
        </div>
        <div className="conversion-grid">
          <article><span>先有情感</span><h3>“咱家的味道”变成共同话题</h3><p>人们公开讲述“回家第一碗”“家里的味道”，原本私密的经验慢慢变成一群人的共同认同。</p></article>
          <article><span>再到现场</span><h3>屏幕之外，探店现场</h3><p>《六姊妹》取景地、非遗展馆和门店，把在线关注变成导航、打卡和美食体验一条龙<Cite id={17} /><Cite id={19} />。</p></article>
          <article><span>商业化</span><h3>带着“淮南”名字走向外地</h3><p>集体商标、标准、加工技术和电商，让牛肉汤可以跨地区销售，也让商品一直带着家乡印记<Cite id={3} /><Cite id={5} /><Cite id={8} />。</p></article>
        </div>
        <div className="tourism-proof">
          <div><span>2025 · 春季</span><strong>12,000+</strong><p>九龙岗时光小镇官方报道的日均游客量</p></div>
          <div className="proof-arrow">看见淮南 <i>→</i> 真正来到淮南</div>
          <div><span>2025 · 五一</span><strong>65%</strong><p>报道中的市外游客占比</p></div>
          <p className="proof-note">这些数据能够支持“影视带来显著到访”，也提示牛肉汤作为淮南的美食代表参与了旅游体验；但仍不能据此计算牛肉汤单独创造了多少旅游收入。<Cite id={6} /><Cite id={19} /></p>
        </div>
      </section>

      <section className="reflection-section page-section" id="reflection">
        <div className="section-heading light-heading">
          <div><p className="section-kicker">04 · 传播的选择性</p><h2>故事越被广泛传播，越可能把复杂的事讲简单了。</h2></div>
          <p>媒体总要做选择：醒目的画面更容易留下，复杂历史、门店差异和普通人的声音则可能被剪辑掉。</p>
        </div>
        <div className="risk-grid">
          <article><b>01</b><h3>大故事盖住普通人</h3><p>“两千年前喝同款牛肉汤”很好转发，却容易盖过矿区清晨、回民技艺和普通店主的生活经历。</p><span>建议：每个起源故事都标明证据、出处。</span></article>
          <article><b>02</b><h3>统一标准压平个性化差异</h3><p>食品安全需要共同底线，但清汤、红汤、香料和配料的门店差异，也是地方知识的一部分。</p><span>建议：统一食品安全底线，保留不同的个性化风味。</span></article>
          <article><b>03</b><h3>有流量，不等于有人传承</h3><p>节庆、直播和爆款活动宣传能带来一时关注，却不能证明美食技艺已经得到传承。</p><span>建议：鼓励加盟和教学，定期公布培训策略、学习周期和传承收益。</span></article>
          <article><b>04</b><h3>数字规模大，统计方法却未统一</h3><p>产值、门店和就业数字不断增加，但计算范围和方法很少完整公开。</p><span>建议：政府部门按年度公开可以复核的统计表。</span></article>
        </div>
        <blockquote>
          <p>保护非遗，不是牢牢锁住一种做法，而是让相关的人仍有能力传承、发展和决定它怎样变化，让淮南牛肉汤的味道走得更远。</p>
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
            <p>摘要与六章正文不再连续铺在一页。每一部分先说明要回答的问题、主要材料和论证边界，再进入正文；章节与小节都有独立链接，便于引用、讨论和逐段修改。</p>
          </div>

          <aside className="draft-disclaimer">
            <b>材料范围</b>
            <p>正文以104项公开资料为基础，能够说明政策、媒体和产业主体公开说了什么；涉及本地居民记忆、游客动机和平台接受效果的判断，仍需访谈、抽样或统计验证。</p>
          </aside>

          <div className="essay-reader" id="draft-reader">
            <aside className="essay-toc">
              <div className="essay-toc-head">
                <div><span>论文目录</span><b>摘要＋六章正文</b></div>
                <p>一次只读一个部分。先用摘要核对全文结论，再看各章要解决的问题，并用本章索引直达具体小节。</p>
              </div>
              <nav aria-label="论文章节目录">
                {essayChapterIndex.map((chapter) => (
                  <a
                    key={chapter.id}
                    href={`#draft/${chapter.id}`}
                    className={activeEssayChapter === chapter.id ? "active" : ""}
                    aria-current={activeEssayChapter === chapter.id ? "page" : undefined}
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

          {activeEssayChapter === "abstract" && (
          <article className="essay-chapter abstract-chapter">
            <header><span>摘要</span><div><p>中英文摘要、关键词与全文论证总表</p><h3>先把全文真正证明了什么说清楚</h3></div></header>
            <div className="essay-prose abstract-prose">
              <section className="essay-subsection" id="essay-abstract-chinese">
                <h4>一、中文摘要与关键词</h4>
                <div className="abstract-title-card"><span>论文题目</span><h3>淮南牛肉汤的媒介记忆建构研究</h3></div>
                <p className="abstract-body"><b>摘要：</b>地方食物既是日常生活的一部分，也可能在新闻、影视、数字平台和公共政策中被重新组织为城市记忆。本文以淮南牛肉汤为案例，考察传说、典籍、考古、非遗技艺、矿区生活和个人味觉经验怎样成为可调用的记忆资源，武王墩考古、电视剧《六姊妹》及相关短视频和城市活动又怎样激活并重构这些资源，以及媒介可见度在何种条件下可能转化为地方认同、游客到访、消费行为、城市形象和产业制度。研究以媒介记忆为主要视角，结合食物记忆、城市品牌和非物质文化遗产保护研究，通过文献分析、事件链梳理与多源互证，对2022年至2026年间104项政策、统计、新闻、视频、图片、典籍和学术资料进行整理，并为后续平台内容分析、半结构访谈、现场观察与问卷调查建立研究方案。研究发现：第一，淮南牛肉汤的可记忆性来自历史叙事、地方生活和感官经验的叠加，但古代烹牛材料、地方起源传说与现代菜品之间不存在已被证明的连续配方链。第二，考古和影视事件提供注意窗口，新闻、电视剧、短视频、直播和线下活动则通过标签、画面、情感框架与主体安排持续改变记忆内容，同一材料在跨媒介流动中并非原样复制。第三，政府、媒体、企业、传承人、门店、居民和游客共同参与意义生产，但各主体掌握的传播资源与制度权力并不平等。第四，媒介曝光需要经过目的地形象、情感、空间体验、门店服务和组织承接，才可能进入到访、购买、推荐与认同；现有公开数据可以确认地方已建立活动、线路、商标、标准和政策等承接机制，却不足以证明单一媒介事件造成全部客流与产业增长。第五，记忆制度化能够稳定名称、质量和公共识别，也可能使古老、统一和增长叙事占据中心，将普通劳动、门店差异与社区知识推到背景。由此，淮南牛肉汤的媒介记忆建构应被理解为“资源调用—事件激活—跨媒介重构—主体参与—价值转化—制度化—再次传播”的循环过程。城市传播与非遗保护不应只追求曝光、客流和产值，还应公开证据边界、保留多种实践版本、扩大社区参与、说明收益分配，并以持续学习和可核数据判断传承效果。本文的贡献在于把地方食物从静态文化符号还原为持续协商的记忆过程，并为理解地方饮食、城市形象与活态遗产之间的关系提供一套可检验的分析路径。受公开资料性质所限，居民认同、游客动机、普通门店收益和代际传承效果仍需通过平台抽样、田野调查与纵向数据进一步验证。</p>
                <p className="abstract-keywords"><b>关键词：</b><span>媒介记忆</span><span>地方食物</span><span>城市形象</span><span>非物质文化遗产</span><span>淮南牛肉汤</span><span>数字传播</span></p>
              </section>

              <section className="essay-subsection english-abstract" id="essay-abstract-english">
                <h4>二、英文摘要与关键词</h4>
                <div className="abstract-title-card"><span>Title</span><h3>The Construction of Mediated Memory around Huainan Beef Soup</h3><p>From Everyday Food to a City Symbol</p></div>
                <div className="english-abstract-body">
                  <p><b>Abstract:</b> Local food is part of everyday life, but it can also be reorganized as public memory through news, television drama, digital platforms, urban events, and policy. Taking Huainan beef soup as a case, this study examines how legends, classical texts, archaeology, intangible cultural heritage practices, industrial-city life, and personal sensory experience become mnemonic resources. It then traces how the excavation of the Wuwangdun tomb, the television drama <i>Six Sisters</i>, short videos, livestreams, and offline events activated and reconstructed these resources, and under what conditions media visibility might be converted into place identity, tourist visits, consumption, city image, and institutional arrangements.</p>
                  <p>The study adopts mediated memory as its main perspective and brings it into dialogue with research on food and memory, place branding, and intangible cultural heritage safeguarding. Through literature analysis, event-chain reconstruction, and cross-checking of multiple sources, it organizes 104 policy documents, statistical releases, news reports, videos, photographs, classical texts, and academic publications issued or accessed mainly between 2022 and 2026. The public-source analysis is also used to formulate a subsequent empirical design involving platform content analysis, semi-structured interviews, field observation, and surveys.</p>
                  <p>Five findings are proposed. First, the memorability of Huainan beef soup results from the overlap of historical narratives, local life, and embodied sensory experience. However, ancient evidence of cattle consumption, contemporary origin legends, and the modern dish do not constitute a verified, continuous recipe history. Second, archaeological and television events create windows of attention, while news, drama, short video, livestreaming, and public events continually alter memory through labels, images, emotional framing, and the positioning of social actors. Material is therefore transformed rather than simply copied when it moves across media. Third, local government, media organizations, businesses, heritage bearers, restaurants, residents, and tourists all participate in meaning-making, but they possess unequal communicative and institutional resources. Fourth, exposure can lead to visits, purchases, recommendations, or identification only through intermediate links such as destination image, emotion, spatial experience, service quality, and organizational support. Public records confirm the development of events, routes, trademarks, standards, and policies, but do not establish that a single media event caused all increases in tourism or industry. Fifth, institutionalization can stabilize names, quality expectations, and public recognition, while also privileging narratives of antiquity, uniformity, and growth over everyday labor, restaurant diversity, and community knowledge.</p>
                  <p>The mediated memory of Huainan beef soup is therefore conceptualized as a recurring process of resource mobilization, event activation, cross-media reconstruction, actor participation, value conversion, institutionalization, and renewed circulation. City communication and heritage safeguarding should not be evaluated only through exposure, visitor numbers, or industrial output. They should also clarify evidential boundaries, preserve multiple versions of practice, expand community participation, disclose benefit distribution, and assess transmission through sustained learning and verifiable data. Because this study is primarily based on public sources, claims concerning resident identification, tourist motivation, ordinary restaurant income, and intergenerational transmission remain propositions to be tested through systematic sampling, fieldwork, and longitudinal evidence.</p>
                </div>
                <p className="abstract-keywords english-keywords"><b>Keywords:</b><span>mediated memory</span><span>local food</span><span>city image</span><span>intangible cultural heritage</span><span>Huainan beef soup</span><span>digital media</span></p>
              </section>

              <section className="essay-subsection" id="essay-abstract-argument-map">
                <h4>三、研究问题—核心发现—证据—边界总表</h4>
                <p className="abstract-tool-intro">这张表不是放进摘要正文的内容，而是全文统稿的“总控制表”。每一章的段落都应能回到其中一个研究问题；如果某段既不能贡献发现，也不能说明证据或边界，就要考虑删除、合并或移到研究背景。</p>
                <div className="argument-matrix-wrap">
                  <table className="argument-matrix">
                    <thead><tr><th>研究问题</th><th>核心发现</th><th>主要证据</th><th>不能说过头</th><th>落在章节</th></tr></thead>
                    <tbody>{thesisArgumentMatrix.map((item) => <tr key={item.question}><td>{item.question}</td><td>{item.finding}</td><td>{item.evidence}</td><td>{item.boundary}</td><td>{item.chapter}</td></tr>)}</tbody>
                  </table>
                </div>
                <div className="thesis-loop"><span>全文总机制</span><p>记忆资源 → 事件激活 → 跨媒介重构 → 主体参与 → 价值转化 → 制度化 → 再次传播</p></div>
              </section>

              <section className="essay-subsection" id="essay-abstract-terminology">
                <h4>四、全文统一术语表</h4>
                <p className="abstract-tool-intro">下面十个词是后续逐章统稿的固定用法。它们不是为了让论文显得“理论化”，而是防止同一个词在不同章节随意变义。</p>
                <div className="terminology-grid">
                  {terminologyGuide.map((item, index) => <article key={item.term}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.term}</h3><p>{item.use}</p><em>{item.avoid}</em></article>)}
                </div>
              </section>
            </div>
          </article>
          )}

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
                <p><b>公开资料库承担“重建事件与提出命题”的作用。</b>当前104项来源包括政策统计、新闻专题、8条可观看视频、学术与典籍、开放授权图片。研究将它们按发布者、日期、材料类型、核心说法、证据强度和可用于哪一章登记，并保存标题、网址与关键内容。公开资料能够确认某项政策何时发布、节目展示了什么、机构使用了哪些数字，却不能直接代表受众想法。因此，本文把可核事实、机构公开口径、地方传说和研究推断分开标注；前期资料只用来建立事件链和研究假设，不冒充完整样本。</p>
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
                <p>本章讨论的“价值跃迁”，不是把播放量、游客数和产业产值排成一条上升曲线，而是追问媒介记忆怎样跨过不同门槛，进入人的情感、身体行动、消费选择和城市制度。比较稳妥的过程应当写成：<b>被看见 → 能识别 → 愿讲述 → 感到与自己有关 → 产生行动意向 → 实际到访或购买 → 形成复访、复购与公共规则。</b>每一步都可能中断，也可能由别的因素推动。只有把这些环节拆开，论文才不会用“出圈”“赋能”两个词替代真正的解释。</p>
                <p>一位淮南人记得小时候在哪家店喝汤、家里谁去端碗、冬天上学前怎样吃完，这首先是自传性记忆。它依附于气味、温度、亲属和生活节奏，不会因为研究者把它称作“地方文化”就自动变成集体记忆。个体经验需要被说出来、被别人听懂，还要在持续互动中获得“这不只是我一个人的事”的共享感，才可能进入群体层面的记忆。数字媒介在这里提供的不是一座现成仓库，而是一套公开讲述、互相确认和继续改写的条件<Cite id={31} /><Cite id={63} />。</p>
                <p>食物尤其适合承担这种转换，因为它同时连接语言和身体。图片可以呈现汤色、肉片与红油，影视可以把它放进家庭饭桌，评论可以补充“我家那边不是这样吃”，而门店又允许人用味觉重新验证。食物景观研究发现，味道、家庭、身体实践和环境会共同组织地方社会记忆<Cite id={70} />；对《舌尖上的中国》字幕、弹幕与评论的研究也说明，媒介中的食物可能唤醒家乡联想<Cite id={33} />。这里的关键词是“可能”：相关研究能提供分析路径，不能替淮南受众回答。</p>
                <p>《六姊妹》为这种唤醒提供了一个容易进入的家庭框架。总台开播材料和后续研讨把剧集概括为跨越数十年的普通家庭故事，地方、代际与社会变化被放进吃饭、工作和亲属关系之中<Cite id={74} /><Cite id={75} />。牛肉汤因此不只是镜头里的地方特产，还可能被观众读成“家里人一起生活过的证据”。这种情感作用并不要求观众真的吃过淮南牛肉汤：外地观众也可以借剧中早餐想起自己的家乡食物。</p>
                <p>这也意味着，认同对象至少有三个层次。第一层是“这像我的生活”，观众认同的是普通家庭经验；第二层是“这就是淮南”，食物、方言、矿区和街道共同形成地方形象；第三层才是“我是淮南人／我愿意与淮南建立关系”，涉及较稳定的地方身份。三层可以重合，也可以分离。一个人可能喜欢剧中家庭，却记不住城市；可能知道淮南牛肉汤，却不接受“千年古方”；也可能因为长期离乡，把牛肉汤当作身份线索，却并不认可所有官方品牌表达。</p>
                <p>从私人讲述到“我们”的出现，还要经过公共确认。评论区里“小时候就吃这个”“看见老街想家”之类表达，若被点赞、回复和二次转发，就会产生一种“很多人和我一样”的可见共享感。演员探店Vlog、地方媒体报道和用户内容彼此引用，又能让原本分散的回忆进入同一个话题网络<Cite id={79} /><Cite id={83} />。但大量相似评论最多证明表达在聚集，不能直接证明整个城市形成一致认同；算法推荐、账号粉丝结构与媒体选评都可能让某类声音显得比实际更普遍。</p>
                <p>因此，本文不把“集体记忆”理解为所有人记得同一版本，而把它理解为不同主体围绕共同对象持续协商。有人强调回民技艺，有人记得矿区早餐，有人只关心粉丝和豆饼，有人因电视剧才第一次知道这碗汤；这些差异本身构成群体记忆的内部结构。传播学研究提醒，互联网改变了记忆建构机制，却没有取消媒介权力、个体缺失与记忆断裂<Cite id={61} />。一味追求整齐的“共同记忆”，反而可能把真正的地方经验排除出去。</p>
                <p>“主体重塑”首先表现为普通经验获得发言位置。过去，城市名片往往由机构挑选；现在，返乡者能拍旧街，店主能展示熬汤，年轻用户能记录夜宵，游客也能发布“第一次吃”的感受。电视剧播出后，当地持续制作地方视频、经营社交话题并吸引游客二次创作<Cite id={79} />。这些材料说明表达者的数量和类型在增加，也说明城市叙事不再完全停留在官方宣传片里。</p>
                <p>然而，能发内容不等于拥有同等的定义权。政府与主流媒体决定活动主题，影视制作方掌握剧集与演员资源，平台决定推荐，企业能够购买营销，集体商标的授权则由制度规则划定。普通门店、老年居民、回民家庭、对“千年”说法持保留意见的人，即使能够留言，也未必进入头部内容或决策程序。记忆权研究所说的可见性不平等<Cite id={67} />，正应在这里被具体化：谁能讲、谁被引用、谁能决定“正宗”、谁能从公共符号中获益。</p>
                <p>为了避免把参与写得过于乐观，可以把主体参与分成四级。<b>表达参与</b>是评论、投稿、讲述；<b>体验参与</b>是共食、打卡、购买和制作；<b>规则参与</b>是进入路线设计、商标标准、非遗展示与社区协商；<b>收益参与</b>是门店、传承人和居民能够从客流、销售与公共项目中得到可持续回报。前两级容易在网页上看见，后两级往往需要访谈、会议记录与利益分配材料才能判断。没有规则和收益参与，“用户共创”仍可能只是替既定品牌免费生产内容。</p>
                <p>粉丝见面会和万人共品活动把这四级参与的差异呈现得很清楚。参与者可以见演员、说方言、喝牛肉汤，电视剧人物、地方语言和共食被组织成一次城市仪式<Cite id={47} />。这种仪式能够制造强烈的同时在场感，让“我看过”变成“我们一起经历过”；但活动流程、发言席位、商家准入和收益分配仍由组织者掌握。论文既可以肯定仪式对共享记忆的强化，也要追问哪些居民只是被当成场景。</p>
                <p>情感转化还必须容纳负面和矛盾感受。当地人可能因城市被看见而自豪，也可能嫌游客拥挤、担心老街被舞台化；老顾客可能高兴牛肉汤走向全国，也可能认为方便装和统一口味失去原来的吃法；年轻人可能通过短视频重新接近家乡，也可能觉得“烟火气”把淮南固定在过去年代。正面、负面和复杂情感都属于地方关系。只统计“喜欢”“想吃”会把认同误写成宣传满意度。</p>
                <p>身份也会在行动中反过来被加强。返乡者带朋友去老店、外地淮南人购买方便装、居民向游客解释吃法，都是用行动表明“我和这个地方有关”。媒介文本只是提供了可用的词和画面，身份要靠重复讲述、带路、进食、比较和辩论才能稳定。把媒介文本与围绕媒介发生的记忆实践区分开来<Cite id={73} />，可以解释为什么同一部剧对不同人产生不同后果，也可以避免把一次观看当成长期认同。</p>
                <p>本研究可以据此建立一套“情感—认同”证据阶梯。最弱证据是播放、阅读和搜索，只能说明接触机会；其次是能否正确识别淮南、牛肉汤和矿区等符号；再其次是自发讲述个人经历、与他人对话；更强证据是稳定的地方自豪、归属或批判性关切；最强证据则是持续行动，如主动推荐、参与保护或愿意为公共事务承担责任。不同证据不能互相替代，尤其不能从流量直接跳到城市认同。</p>
                <p>正式的评论分析可在剧集播出前、热播期和播出后各取时间截面，对同一平台按高互动与普通互动分层抽样。编码至少包括：发言者自报地域、记忆对象、家庭关系、情感方向、是否讲具体经历、是否提出到访或购买、是否质疑主流说法。还要记录评论所依附的视频类型和账号身份，因为同一句“想家了”出现在演员账号、政府账号或普通店主视频下，社会语境并不相同。平台没有提供完整数据时，应明确样本只是可见评论，不代表全部受众。</p>
                <p>访谈则应覆盖本地老居民、青年、外出淮南人、回民从业者、普通门店、授权企业、外地游客和没有追剧的人。可以先让受访者自由回答“提到淮南最先想到什么”，再展示剧照或牛肉汤图片，比较提示前后的联想变化；还可追问“你从什么时候开始用牛肉汤介绍淮南”“你不同意哪种说法”。这样的设计比直接问“电视剧是否增强了城市认同”更少诱导，也能让反例进入分析。</p>
                <p>这一节能够提出的判断是：影视、短视频和线下仪式为私人食物记忆提供了公共表达和互相确认的机会，牛肉汤因可讲述、可观看、可再品尝而成为连接家庭经验与地方身份的媒介。但公开资料仍不足以证明淮南居民整体认同已经增强。更准确的结论是，<b>认同的基础设施被搭建出来了，认同是否发生、对谁发生以及能否持续，要由评论、访谈和后续行动来证明。</b></p>
              </section>

              <section className="essay-subsection" id="essay-chapter-4-practice-space">
                <h4>二、实践与空间转化：从屏幕观看到消费和到访</h4>
                <p>媒介记忆进入现实行动，也不是观众关掉屏幕后立刻出发。更完整的旅游转化链至少包含：<b>看见地方 → 形成初步形象 → 搜索路线和信息 → 产生到访意向 → 克服距离、时间与费用 → 实际进入空间 → 用现场体验验证想象 → 发布内容或再次到访。</b>影视旅游研究以横店游客为样本发现，明星卷入并未直接显著通向旅游忠诚，而是通过目的地形象与地方依恋发挥作用<Cite id={86} />。这项结论不能直接套到淮南，却足以提醒本文：喜欢演员、想去看看、真正到访和以后再来，是不同变量。</p>
                <p>社交媒体内容研究也常把机构内容与用户内容、认知形象与情感形象、行为意向分别测量<Cite id={91} />。放到淮南，认知形象是观众知道哪里有《六姊妹》取景地、牛肉汤是什么；情感形象是觉得亲切、怀旧或新鲜；行为意向是想搜索、收藏或规划；实际行为才是到访和消费。论文若只有“我想去”的评论，结论最多到意向，不能写成旅游拉动已经发生。</p>
                <p>电视剧取景地、老街、门店和节庆活动，为抽象的“淮南”提供了可以行走和拍摄的坐标。观众原先在镜头里认识人物生活，到了九龙岗以后，会寻找相似墙面、院落、街道和老物件，把剧情位置与现实地理叠在一起。有关媒介地方感的研究指出，远程观看和现场打卡会共同塑造地方理解<Cite id={71} />。所谓从屏幕到空间，不是丢下媒介进入“真实”，而是带着镜头给出的期待去重新看现实。</p>
                <p>现有公开数据确实显示了一个值得研究的时间窗口。2025年五一相关报道给出的口径是九龙岗日均接待游客约1.5万人次，市外游客占比超过65%<Cite id={19} />；另一份地方材料称时光小镇日均游客超过1.2万人次<Cite id={6} />；更早的同期新闻也记录过日客流过万<Cite id={76} />。这些数字的统计周期、入口计数、去重方式并未在页面中完整披露，因此只能作为“客流显著出现”的线索，不能相加，也不宜计算出精确增长率。</p>
                <p>更重要的是，同期发生不等于单一因果。节假日、天气、交通、地方活动、免费开放、社交平台推荐和亲友出游都可能影响客流。即使游客看过《六姊妹》，牛肉汤也可能只是旅途中的一个环节；即使在店里消费，也不能证明其主要动机来自影视。要检验媒介作用，至少应询问游客最早从哪里知道地点、此行首要动机、是否看剧、是否在到访前搜索牛肉汤，并与没有看剧的游客作比较。</p>
                <p>地方机构并非被动等待观众到来，而是在主动设计转换接口。电视剧播出后，当地组织非遗市集，把取景地、技艺展示和互动体验放在一起<Cite id={81} />；名特优产品展销会汇集36家企业、200余种产品，把“观剧—游小镇—品美食—购商品”编成连续场景<Cite id={80} />；粉丝见面会又把演员、方言挑战和万人共食连接起来<Cite id={47} />。这些活动的研究价值，正在于它们把分散的注意力变成一条可走、可吃、可买的路线。</p>
                <p>但设计出路线不等于游客按照路线行动。有人只拍取景墙，有人专程吃汤，有人陪家人而来，还有人逛完就走。现场研究可以采用“到访轨迹访谈”：在入口询问预期，在离开时记录实际停留点、消费、满意或失望，再在一周后回访是否发布内容、是否仍能记住地点。这样能把规划、行动与事后记忆区分开，也能看出哪个环节发生流失。</p>
                <p>现场体验对媒介想象具有确认和修正作用。影视把老街拍成有情节的生活空间，游客抵达后则会遇见真实的居民、交通、商业设施和空间限制。九龙岗后续规划提出微改造、保留原住民、公众参与以及文化商业混合开发<Cite id={82} />，说明屏幕热度已经开始反向影响空间治理。问题是，改造要服务剧情复制、游客便利，还是居民日常生活；三者发生冲突时，谁拥有优先权。</p>
                <p>牛肉汤使这种现场验证多了一层身体尺度。观众在屏幕里只能看见热气和人物表情，到店后才会接触香气、温度、肉量、粉丝口感、酥饼搭配、排队和服务。地方食物之所以常被理解为“真实”，并不只是因为产地标签，而是游客在生产者、环境和进食过程中感到自己接近地方文化<Cite id={87} />。因此，一碗汤能否把影视兴趣变成地方依恋，取决于具体体验，而不只取决于故事讲得多动人。</p>
                <p>这里还要防止把“真实”写成一种固定配方。老街小店、现代门店、中央厨房产品和家庭吃法都可能是真实生活的一部分；游客预先相信“必须是旧摊、大锅、红油”时，反而会用媒介模板筛选现实。所谓现场验证，应当比较预期与经验怎样互动：游客是因为味道、店主讲述和街区关系而理解地方，还是只寻找能复制剧照的背景。后一种到访可以带来流量，却未必形成对地方复杂性的认识。</p>
                <p>可达性是情感转成行动的现实门槛。路线是否清楚、公共交通是否方便、开放时间是否准确、节假日能否承载客流，都会决定“想去”能不能变成“去了”。地方对机场、高铁站、服务区、商圈和景区门店设置奖补<Cite id={51} />，表明政策正在把牛肉汤嵌入人流节点。研究不应只把这些门店当作销售渠道，还应考察它们是否承担城市入口功能：能否提供可靠信息、展示制作差异、引导游客进入更多社区空间。</p>
                <p>从消费角度看，至少存在两条不同路径。第一条是<b>人在淮南消费</b>：游客进入门店、市场、活动和街区，味觉与地方空间同时发生；第二条是<b>淮南牛肉汤离开淮南</b>：方便装、冷冻产品、直播和异地门店把产地名称送到消费者身边。前者更容易形成多感官地方经验，后者降低接触成本、扩大传播范围。两者不能用同一指标评价，也不能假设产品离开产地后一定失去地方性。</p>
                <p>公开报道显示，2024年当地有13家牛肉汤电商企业，全年网销额约1.5亿元，并尝试全平台直播布局<Cite id={8} />；2025年的电商直播带货大赛说明政府和平台组织进一步介入<Cite id={11} />，但页面没有公布成交额、退款率和复购率。因而，这些材料可以证明销售渠道和传播活动存在，不能证明直播已稳定提高企业收益，更不能把全产业链产值与网销额混为一谈。</p>
                <p>工业化产品改变了记忆的物质载体。官方报道把常温、冷冻、冲泡三类速食产品，保鲜、浓缩等专利，以及数字化生产线作为产业升级成果<Cite id={84} />。传统门店中的大锅、现切和现烫，被转译为配方参数、保质期、包装和物流。消费者带走的不是完整早餐场景，而是一套可储存、可赠送、可在异地复现的味道承诺。这个变化既可能延长记忆，也可能因体验落差损害产地形象。</p>
                <p>所以，购买还要继续分成初次尝试、满意、再次购买和主动推荐。影视曝光最可能推动尝试，但复购更依赖口味稳定、价格、便利、食品安全与售后。以食旅游客为对象的研究把真实性感知、餐厅品质、地方依恋、满意度和忠诚拆成多阶段关系<Cite id={89} />；另一项研究甚至发现，地方依恋没有在其模型中直接推动购买行为意向，体验价值的中介作用更清楚<Cite id={90} />。这些结果不能证明淮南消费者怎样选择，却能阻止本文用情怀代替产品体验。</p>
                <p>“地方记忆商品化”也不是纯粹负面过程。方便产品和异地门店能让外出淮南人维持日常联系，让从未到访的人先建立味觉线索；包装上的产地、吃法和从业者故事还可能把消费变成进一步搜索的入口。上海街头以“淮南牛肉汤”为招牌的门店照片，至少证明地方名称能随着餐饮空间跨城出现<Cite id={58} />。是否构成有效再嵌入，则要看消费者记住的是“某种速食汤”，还是能辨认淮南、理解其生活语境。</p>
                <p>与此同时，异地复制会产生新的版本。门店根据当地口味改汤色、配料和主食，包装为运输改变质地，平台主播为了讲解压缩历史。变化不是天然的“失真”，因为活态饮食本来就会适应环境；真正需要问的是，变化有没有被说明，产地名称有没有被滥用，基本质量能否兑现，原有实践者有没有参与和受益。把所有差异排除在“正宗”之外，会把地方性误写成一套静止标准。</p>
                <p>空间转化还会回到媒介。游客拍下同款街角、试吃过程和路线攻略，发布后成为下一批观众的预期来源；门店根据热门角度调整招牌和陈设，街区根据打卡点安排设施，现实空间因可拍性而改变。2025年末央视仍以《六姊妹》拍摄地和老街再利用报道淮南<Cite id={78} />，说明影视记忆并未随播出结束立即消失，而是在游客内容、地方建设与新闻报道之间继续循环。</p>
                <p>正式研究可建立一张分阶段数据表：曝光看播放、阅读和搜索；意向看收藏、路线查询和问卷；到访看去重客流、游客来源与停留；消费看客单、品类和商户分布；体验看预期差、满意与投诉；持续性看复访、复购、推荐和半年后的记忆。数据还应按看剧／未看剧、本地／外地、首次／重复游客分组。只有相邻环节都获得证据，才能讨论转化率；只有设置时间比较或对照，才有资格接近因果解释。</p>
                <p>本节因此不把九龙岗客流、万人活动、电商销售和产业升级合并成一个笼统“文旅价值”。它们分别证明空间注意、组织承接、销售渠道和生产能力。现阶段能够较稳妥地说的是：淮南已经搭建了从屏幕到取景地、从取景地到展销和共食、从地方门店到电商产品的多种接口；哪些接口真正促成长期到访、复购和地方理解，仍需要游客调查、商户数据和时间序列来检验。</p>
              </section>

              <section className="essay-subsection" id="essay-chapter-4-city-symbol">
                <h4>三、地方与符号跃升：从一碗汤到一座城</h4>
                <p>当牛肉汤被称作“城市名片”时，发生的不是简单知名度提升，而是符号层级变化：原本属于街坊早餐和具体门店的食物，开始代表整座城市，对外承担识别功能，对内承担身份和发展叙事。这个跃升需要三个条件同时出现：一是公众看到牛肉汤时能联想到淮南；二是实际产品和城市体验能够兑现这种联想；三是居民、经营者与公共机构愿意共同维护名称。缺少任何一项，城市符号都可能只是短期口号。</p>
                <p>方便食品、电商内容和异地门店使食物离开原有早餐时间与街边空间，产生“脱域”；包装上的产地、门头上的“淮南”、集体商标和短视频故事又把它重新嵌回地方。再嵌入不是把地名印大一点，而是让消费者知道这套味道与什么人、什么生活和什么生产规则有关。只有名称、叙事、产品与责任能够相互对应，“淮南”才不只是营销前缀。</p>
                <p>从传播过程看，一碗汤成为城市符号至少经历四次扩展。首先是<b>品类扩展</b>，从本地小吃变为可包装、可连锁的商品；其次是<b>场景扩展</b>，从早餐店进入节庆、影视、景区和交通节点；再次是<b>意义扩展</b>，从饱腹食物承担家乡、非遗、历史与城市形象；最后是<b>制度扩展</b>，名称进入商标、标准、条例、项目与数据系统。前三次让符号变得可见，最后一次让符号变成可治理、可投资和可考核的公共对象。</p>
                <p>产业行动方案把全产业链规模、品牌传播、标准建设和文旅消费写进同一发展框架，并提出2027年目标<Cite id={1} />。这不是已经发生的结果，而是政府对未来的组织蓝图。它的重要性在于：政策开始把牛肉汤视为跨越农业、加工、餐饮、电商、文旅和城市形象的产业链，而不再只是市场监管中的一种小吃。论文引用目标时必须写“计划达到”，不能把目标数字当作当前产值。</p>
                <p>集体商标进一步把地名与使用资格连接起来。2025年“淮南牛肉汤”集体商标获批<Cite id={3} />，2026年首批30家企业获得授权<Cite id={4} />，后续监管材料还披露授权指导、标准发布与不规范使用整改<Cite id={5} />。这意味着“淮南牛肉汤”从任何经营者都可自由声称的名称，逐步变成需要满足条件、接受监督的公共品牌。制度能够降低冒用和质量风险，也会重新划分谁能合法代表地方。</p>
                <p>这种划分不只是技术问题。授权条件更适合规模企业还是街坊小店，传统小店能否承担检测和申请成本，异地经营者如何证明关系，回民技艺与不同街区吃法是否进入标准，都会影响公共品牌的社会边界。若品牌保护只让头部企业受益，城市符号可能越响，普通实践者越沉默；若完全没有底线，个别食品安全问题又会由全体经营者共同承担。制度设计要在公共信誉与参与公平之间取得平衡。</p>
                <p>地方条例把这一治理继续扩展到食品安全、产业发展、品牌、标准、非遗与文旅等领域<Cite id={2} />。条例的出现说明媒介记忆已经不只停留在“人们如何回忆”，而是进入正式制度：哪些技艺被保护、哪些名称受规范、哪些空间和企业得到支持，都可能被法律政策影响。换言之，制度不仅保存既有记忆，也在选择将来什么版本最容易继续存在。</p>
                <p>标准化同样具有双重作用。早期制作技术规范把主辅料、熬汤、烫制和卫生要求写成技术文本<Cite id={52} />，后续又出现多项团体标准和省级标准<Cite id={5} />。标准可以让跨地域产品获得最低质量承诺，降低消费者第一次尝试的风险；但如果把口味差异、门店经验和族群知识全部转成唯一参数，也可能让城市记忆只剩可复制版本。较合理的区分是：安全、标签、追溯和责任应有共同底线，味型、吃法与工艺差异则应允许被说明和保存。</p>
                <p>产业数字是城市符号被“成绩化”的另一表现。公开材料称2024年全产业链产值超过300亿元、获证加工企业20家<Cite id={7} />；2025年上半年计划执行报告称招引项目21个、总投资10.8亿元、产值增长20.1%<Cite id={50} />；产业大会又披露29个集中签约项目、总投资超过122亿元<Cite id={13} />。这些数字来自不同时间、不同口径，签约投资也不等于已经到位或形成产值，不能并排相加后证明媒介传播带来某个总收益。</p>
                <p>更严格的论文应要求每个数字回答四个问题：统计期是什么，包含种养、加工、餐饮还是文旅；企业与个体户怎样纳入；名义增长还是可比价格增长；数据由谁汇总、能否复核。若这些边界没有公开，就把数字标为“行政发布口径”，用来分析政府怎样描述产业，而不是把它当成精确因果证据。尤其不能因为数据出现在电视剧热播之后，就把全部增长归因于电视剧。</p>
                <p>技术升级则展示了地方食物怎样成为工业创新对象。官方材料披露专利、常温／冷冻／冲泡产品、数字化改造和中央厨房等进展<Cite id={84} />。这些变化提高了规模化和远距离流通的可能，也把“老手凭经验”改写为配比、时长和合格率。对媒介记忆研究而言，值得关注的不是技术先进本身，而是哪些传统知识被转换成参数、谁拥有专利、包装产品如何继续讲述地方，以及消费者是否仍把它识别为淮南牛肉汤。</p>
                <p>2025年登记的产业数据知识产权又让牛肉汤成为数据治理对象。相关页面称，监管部门、产业协会、高校和技术企业整理成员注册、经营等信息，用于区域需求和等级评估<Cite id={85} />。登记能够证明数据集及协作机制出现，不能证明算法预测已经准确。它提示了一种新的记忆形式：门店分布、经营数据和区域评级被存入系统，未来政策与选址可能据此作决定，而未被采集的小店和生活经验则可能继续留在数据之外。</p>
                <p>从城市品牌角度看，牛肉汤还是一项公共承诺。消费者在外地看到“淮南牛肉汤”，会把一次产品体验部分归因于城市；游客在淮南遇到价格混乱、服务不足或空间过度商业化，也会修正对城市的判断。地方食品商店研究指出，地方品牌是在物质陈设、语言讲述和身体实践中被持续“表演”出来的<Cite id={42} />。所以品牌不是标志完成的一刻，而是每家门店、每次服务和每段讲述反复兑现或破坏承诺的过程。</p>
                <p>城市品牌也不能只对外。经典研究提醒，城市不是可以由单一主体包装和销售的普通产品，品牌必须处理地方身份和公共治理<Cite id={41} />。居民故事研究进一步指出，目的地品牌若忽略内部主体，就可能产生与居民情感和地方意义不相符的品牌身份；居民的地方故事应成为真正参与的基础<Cite id={88} />。对淮南而言，矿工家庭、回民从业者、女性家务劳动、外出经营者、年轻创作者和普通顾客都应进入“这碗汤代表谁”的讨论。</p>
                <p>这里尤其要警惕“符号替代城市”。牛肉汤可以降低外界认识淮南的门槛，却不能覆盖城市全部经验。若所有宣传都只剩热汤、旧街和怀旧，煤电产业转型、新城区生活、豆腐文化、楚文化和现实社会问题就会退到背景。好的城市符号应当是入口而非封面：人们因为一碗汤开始了解淮南，而不是用一碗汤结束对淮南的理解。</p>
                <p>城市符号的长期价值，还要看收益怎样落地。产值增长可能集中于加工龙头，游客客流可能集中在少数取景点，商标授权可能首先覆盖规范化企业；小店、原住民、传承人和原料生产者是否改善收入与议价能力，需要单独核查。UNESCO关于非遗与生计的材料强调社区主导和公平受益，同时提醒去语境化与过度商业化风险<Cite id={38} /><Cite id={45} />。因此，文化价值与经济价值不能互相代替：卖得更多不必然表示传承更好。</p>
                <p>可以为淮南建立一套比“知名度”更完整的城市符号评估。<b>识别度</b>测外地受众能否从牛肉汤联想到淮南；<b>解释度</b>测他们是否理解历史、生活和技艺而非只会说“千年”；<b>兑现度</b>测门店、产品与旅游体验是否匹配承诺；<b>参与度</b>测居民和从业者是否进入讲述与规则；<b>共享度</b>测收益是否覆盖不同主体；<b>持续度</b>测热播结束后搜索、复购、复访与传承是否仍存在。六项指标可以分别收集证据，避免一项流量数字代表全部价值。</p>
                <p>因果评估还需要时间和比较。可以收集电视剧播出前后的搜索指数、客流、销售与商标申请，但必须保留同期节假日和其他政策事件；可以比较取景地与未取景但条件相近的街区，比较看剧与未看剧游客，比较进入活动／授权体系与未进入的门店。即使不能完成严格实验，也应绘制事件时间线、说明竞争性解释，并把“相关”“贡献”“主要原因”三个判断等级分开。</p>
                <p>综合三节，本章提出一条带有门槛的价值转化链：<b>媒介曝光提供共同对象 → 个人借食物和家庭框架唤起记忆 → 公开讲述产生可见共享感 → 目的地形象与地方依恋提高行动可能 → 路线、活动、门店和电商承接行动 → 实际体验决定满意、复购与推荐 → 商标、标准、条例、技术和数据把名称制度化 → 制度结果再成为下一轮传播材料。</b>其中任何一环体验失败、参与不足或证据失真，都可能使转化中断。</p>
                <p>这条链条也说明“媒介赋能”并不是媒介单方面把价值注入地方。真正的转化由居民记忆、影视叙事、平台分发、公共活动、交通设施、产品品质、企业能力和制度治理共同完成。媒介更像打开注意窗口并组织意义，地方主体则决定窗口之后有没有可到达的空间、可信的产品和公平的规则。把二者区分开，才既能看见传播作用，也不会掩盖现实生产和治理劳动。</p>
                <p>本章现有公开证据能够证明：私人食物经验获得了新的公开表达机会；地方机构已经把影视注意力接入取景地、非遗市集、共食、展销和电商；牛肉汤名称进一步进入商标、标准、条例、技术与数据系统。它仍不能证明全体居民形成认同、游客增长主要由影视引起、初次购买已经转成稳定复购，或产业收益实现公平分配。下一章将从这些未被证明的地方出发，讨论选择性记忆、平台压缩、标准化损伤与代际断裂，检验价值跃迁同时付出了什么代价。</p>
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
                <p>前两章说明了媒介记忆怎样被激活、重构并转成地方价值，本章则讨论这条链上的阻力和代价。所谓“记忆障碍”，不是说传播一多，文化就必然受损；它指的是某些过去因为不够醒目、难以量化或不符合发展叙事而持续缺席，某些复杂关系在媒介转换中被压短，以及人们虽然频繁接触内容，却没有获得理解、实践和传递知识的条件。障碍可能来自传播者，也可能来自媒介形式、平台机制和现实利益结构。</p>
                <p>选择本身不可避免。一条新闻、一分钟视频或一次活动都不可能装下全部历史，研究者写论文也在选择。真正的问题不是“有没有选择”，而是<b>谁在选择、根据什么标准选择、哪些版本能反复出现、被省略者有没有纠正机会</b>。当一种选择因政府资源、商业投放或平台推荐长期占据可见位置，它就可能从“一个版本”变成“不言自明的唯一版本”。</p>
                <p>淮南牛肉汤的公开叙事最容易选择具有时间深度和视觉冲击的材料。帝王传说有明确主角，武王墩有大鼎、墓室和动物遗存，“千年”又能把漫长历史压成一个标签；这些元素天然适合标题、海报和短视频。相比之下，改革开放后的流动经营、矿区轮班生活、回民家庭技艺、普通小店的成本变化，很难用一张图讲完。结果可能是古代故事越来越清晰，现代形成过程反而越来越模糊。</p>
                <p>这种时间偏好会制造“年代很长、过程很短”的城市记忆。考古资料只能证明楚墓、礼制与牛类烹饪痕迹<Cite id={14} /><Cite id={24} /><Cite id={28} />，地方长文却可能把考古、赵匡胤传说、族群迁徙、矿区城市和现代产业连接成一条连续线<Cite id={69} />。连续叙事便于公众理解，也能增加文化分量；若不标明其中哪些是事实、传说和推断，就会把历史的断裂、迁移和重新发明藏起来。</p>
                <p>政府传播有自己的选择标准。行动方案、条例、商标、项目和产值等材料需要呈现政策目标、治理进度与可考核成绩<Cite id={1} /><Cite id={2} /><Cite id={3} /><Cite id={50} />。这些数字和制度当然是研究事实，却会让容易统计的企业数、投资额和销售额获得更多页面位置。师徒关系是否稳定、普通门店能否受益、居民是否赞同城市名片、回民技艺怎样传递等问题，由于难以在工作简报中量化，往往退到背景。</p>
                <p>商业传播则倾向于选择能够降低购买犹豫的材料。“正宗”承诺质量，“非遗”增加文化可信度，“千年”制造稀缺感，演员探店提供熟人式见证。它们能帮助消费者迅速识别产品，也能为经营者带来实际收益。障碍出现在标签脱离证据之后：非遗身份被当成所有商品的质量证明，地方传说被写成确定历史，某家门店的口味被包装成全城唯一标准。商业文本不是因为追求销售就不可信，而是需要说明每种承诺依据什么。</p>
                <p>平台和用户也在选择。创作者会根据完播、点赞、评论和转发调整标题、时长和情绪；观众则更愿意转发自己能迅速理解或产生立场的内容。数字记忆研究指出，平台通过分类和排序决定哪些旧内容会被重新提示、何时再次出现，算法因此不仅保存过去，也参与生产“什么算值得记住”<Cite id={92} />。对淮南而言，热气、大锅、演员、古墓和夸张起源更容易成为可计算互动，工艺细节和证据限定则可能因节奏慢而失去可见度。</p>
                <p>“人人都能发”并不自动抵消机构优势。对中国非遗微博内容的研究发现，机构推广、政策保护和宏观传承叙事占据主体，普通公众的体验与参与内容比例明显较低<Cite id={94} />。这不是淮南样本的直接结论，却提供了一个值得检验的比较命题：网站和平台上看似材料丰富，是否仍由政府、文化机构、媒体和头部传承人主导；普通食客究竟是在讲自己的经验，还是主要转发已经写好的话语。</p>
                <p>重复还会制造“共识的外观”。同一段起源故事可能先出现在地方专题，随后被新闻、企业公众号、主播和用户视频复制；搜索结果里出现几十条页面，实际上只有一个最初来源。演员Vlog在拍摄期发布，剧集播出后又被地方媒体和粉丝重新解释<Cite id={83} />，这类跨媒介引用能够延长记忆，却也容易让信息来源变得不清。论文不能按页面数量计算证据强度，而应追踪文本的出处和改写关系。</p>
                <p>选择性还体现在“谁被当成主角”。政策页面常以产业、项目和城市为主语，节目偏爱有代表性的传承人和龙头企业，游客视频则追随热门门店与固定机位。原料供应者、凌晨备料者、服务员、女性家庭劳动、街坊顾客、经营失败者和没有进入授权体系的小店，很少成为完整叙事主体。他们并非天然更真实，但他们的缺席会让一碗汤看起来只由名人、品牌和宏大历史构成。</p>
                <p>女性劳动尤其容易被家庭叙事遮住。《六姊妹》使家庭、照料和代际经验进入公共视野<Cite id={74} /><Cite id={75} />，但“家的味道”若只作为温暖修辞，就会省略买菜、清洗、熬煮、端饭和照顾家人的具体劳动。同样，门店中的切配、清洁和服务若只出现在背景画面，研究者就看不到味道怎样由持续劳动维持。讨论家庭记忆时，应追问谁在做、谁有权讲、劳动是否获得承认，而不只记录观众是否感动。</p>
                <p>族群知识也可能被“地方共同味道”覆盖。地方材料把淮南牛肉汤的现代形成与回民技艺、城市流动和市场发展联系起来<Cite id={21} />，但统一城市品牌容易把族群差异重新包装成不具名的公共传统。清真规范、家庭配方、师徒关系和经营迁移若不由相关实践者自己说明，就可能只剩一个起源标签。论文应把“回民”从历史说明词变成受访主体，询问他们怎样理解技艺归属、开放边界和商业使用。</p>
                <p>选择性记忆并不只发生在强势机构一侧。本地居民也会根据自己的年代、街区和生活轨迹判断什么值得保留；老顾客可能把童年口味当作标准，年轻店主可能强调卫生、效率和新口味，外出经营者则更关心异地消费者能否接受。不同经验没有天然高低。研究者若预设“老人的记忆一定真实、年轻人的创新一定浅薄”，只是用另一种浪漫化替代官方或商业选择。</p>
                <p>商业化同样不能预设为记忆损伤。长期田野研究显示，旅游商业可能被当地人转化为自豪、身份和行动资源，真实性应当放回“由谁界定、为谁服务、产生何种后果”的具体关系中判断<Cite id={97} />。淮南牛肉汤的销售、节庆和工业化可以提供生计，推动技艺被重新学习；问题不在收钱，而在实践者能否决定怎样展示、能否拒绝错误叙事、能否分享收益。</p>
                <p>因此，本节使用“选择性障碍”而不是“虚假宣传”概括全部问题。前者允许同时看到必要的编辑劳动和不平等的可见性。可以为每条材料记录七个项目：发言者、面向对象、选中的历史阶段、核心人物、证据类型、行动目的和缺席主体。再比较政府、主流媒体、企业、传承人、普通门店和用户内容，就能判断某种缺席是单条材料的篇幅限制，还是跨主体、跨平台的结构性重复。</p>
                <p>抽样还要主动加入“不热门材料”。只抓高赞视频，会把平台已经完成的选择当作社会整体偏好。正式研究可在同一关键词下分别抽取高互动、中低互动和最新发布内容，保留删除、失效和无法播放记录；同时搜索“难吃”“不正宗”“扰民”“没生意”“不看剧”等反向词。负面内容不是为了制造争议，而是检验主流叙事有没有能力容纳失望、异议和未受益者。</p>
                <p>访谈可以采用“版本排序法”：把考古说、帝王说、回民技艺说、矿区生活说、现代产业说做成不带评价的材料卡，请受访者选择最熟悉、最可信和最愿意向外地人讲的版本，并说明原因。熟悉度、可信度与传播意愿可能并不相同。这样既能观察媒介曝光，也能判断人们是否真正接受，还能发现某种说法虽然到处可见，却没有进入日常理解。</p>
                <p>现有公开资料已经能够证明不同传播者确实在使用不同的历史标签、产业指标和城市框架，也能发现某些页面之间存在明显引用关系。它仍不足以证明普通居民、回民实践者或小店长期被系统排除。更稳妥的阶段性判断是：<b>淮南牛肉汤的公共记忆出现了向古老化、品牌化和成绩化集中的倾向，正式论文需要通过分层平台样本与多主体访谈，判断这种倾向是否形成稳定的话语不平等。</b></p>
              </section>

              <section className="essay-subsection" id="essay-chapter-5-media-damage">
                <h4>二、传播媒介的记忆损伤</h4>
                <p>“媒介损伤”不是说媒介把一段完整记忆原封不动地弄坏，而是指记忆在文字、镜头、平台、包装和标准之间转换时，某些关系被放大、某些细节被舍弃，公众却把转换后的版本误认成全部。损伤的核心是<b>语境丢失而不是单纯变短</b>：十五秒也能准确说明一个事实，长篇文章也可能反复复制没有出处的故事。</p>
                <p>淮南案例中最明显的损伤发生在证据链压缩。武王墩发现动物遗存、检测涉及黄牛并有烹饪痕迹，可以支持楚国礼制与饮食研究<Cite id={24} /><Cite id={28} />；《淮南子》涉及屠牛和烹肉，可以说明文本中的牛肉烹饪观念<Cite id={29} />。当这些材料被缩成“楚王吃过淮南牛肉汤”时，中间的时代、菜品、配方和连续传承都被跳过。公众记住的不是错误的一个年份，而是一条从未被证明的直线。</p>
                <p>短视频并非唯一原因。报纸标题、活动主持词、包装文案、展板和论文摘要同样要求简化。不同媒介只是损伤方式不同：镜头偏爱可见动作，标题偏爱确定判断，包装偏爱购买理由，政策偏爱可考核目标，平台偏爱可互动内容。研究者应分析每种媒介“擅长留下什么、容易丢掉什么”，而不是把所有问题推给用户注意力短。</p>
                <p>数字平台还把记忆纳入自动排序。平台先把内容分类，再依据互动、关系和预测价值决定哪些材料进入推荐、热榜或回忆功能；被重复推送的过去因此显得更重要<Cite id={92} />。这种机制不必秘密删除某段历史，只要让它长期排在搜索和推荐后面，就能降低公众接触概率。可见性不等于真实性，却会影响哪些版本有机会成为常识。</p>
                <p>数字指标进一步把“记得”改写为可计数行为。点赞可以表示认同、礼貌、收藏甚至顺手，评论可以赞美也可以纠错，完播可能来自内容短而不是理解深。创作者和机构若把高互动直接解释为文化认同，就会忽略指标的多义性；如果又根据高互动复制相同模板，平台偏好便会反过来改变文化内容。论文应把互动量当作传播痕迹，不当作受众内心的直接读数。</p>
                <p>视觉模板会产生另一种压缩。热气、红油、大锅、切肉、香菜和食客表情能迅速构成“好吃”“烟火气”，但卫生流程、原料来源、等待时间、价格和劳动关系很难进入同样有吸引力的画面。节目对制作技艺的展示能够增加非遗可见度<Cite id={27} />，若镜头只留下最有表演性的步骤，观众便可能把完整知识误解成几次翻滚、抓料和浇汤。</p>
                <p>不过，打卡和拍照不能先被判定为浅薄。遗产地数字影像研究通过现场观察、访谈和800条社交媒体内容发现，游客会借拍摄、文字和身体姿态表达现场情感，数字实践也可能让物质空间重新被感知<Cite id={93} />。这对淮南的启示是：同款照片既可能只复制热门机位，也可能承载返乡、家庭和工业城市记忆。判断深浅要看图片如何被说明、与什么行动相连，而不是看有没有自拍。</p>
                <p>同一内容跨平台搬运时，语境还会再次减少。长视频被截成片段，新闻被改写为口播，口播再被截图成为图文；原文中的“可能”“相传”“行政统计口径”常在每次转述中消失。演员探店、地方专题和粉丝剪辑之间的循环<Cite id={17} /><Cite id={83} />说明再媒介化能够扩大触达，也说明研究者必须找到最早可核页面，记录每一版增加了什么判断。</p>
                <p>链接失效和内容更新构成较隐蔽的损伤。网页可能改版，播放量会变化，评论会删除，账号会私密，搜索排序也不会保持不变。数字记忆看似保存无限，实际依赖平台接口、商业策略和检索能力<Cite id={34} /><Cite id={40} />。研究资料只保存网址不够，还应记录抓取日期、标题、发布者、关键段落、页面存档或合规截图，并说明哪些动态指标只是当日快照。</p>
                <p>碎片化还会破坏因果时间。电视剧热播、取景地游客增加、产业大会、商标注册和产值报道密集发生在2025年前后，短内容容易把它们剪成“电视剧带火一碗汤、创造百亿产业”。事实上，淮南牛肉汤产业政策、加工企业、外地门店和非遗体系在此之前已经存在。影视可能贡献注意窗口，但产业结果还受长期投资、消费、渠道和统计口径影响。把长期积累压成单一爆点，是典型的时间损伤。</p>
                <p>标准、商标和白名单也是媒介，因为它们把分散实践翻译成条款、参数、名单和标识。食品安全、原料质量、标签和责任需要共同底线，制作规范、消费白名单和授权制度确实回应了市场扩张中的信任问题<Cite id={5} /><Cite id={9} /><Cite id={52} />。制度文本的价值正在于明确责任；风险则在于可写成条款的知识更容易被保护，不易量化的经验、关系和变化可能被排除。</p>
                <p>“正宗”尤其不应被等同于唯一味道。关于印度喀拉拉鱼咖喱的访谈与烹饪研究发现，不同社区和家庭都有自己的制作方式，没有单一版本足以代表整个地方的真实性<Cite id={95} />。淮南牛肉汤同样存在汤色、香料、配菜、粉丝、干丝、豆饼和主食搭配差异<Cite id={54} /><Cite id={56} /><Cite id={57} /><Cite id={59} />。这些差异需要田野核实，但至少说明“一城一方”不能未经调查就成为研究前提。</p>
                <p>法律和技术编码还会遇到规模张力。地理标志研究比较小型农场与工厂生产者后发现，双方都需要品牌保护，却对非传统生产方法能否进入标准持不同意见；制度既要支持手工价值，也面对规模化生产的经济意义<Cite id={96} />。这与淮南的门店、中央厨房和方便产品关系相似：全部按照小店方式要求，远距离流通困难；完全按工厂效率定义，街坊经验和手工知识又可能失去位置。</p>
                <p>集体商标授权因此不仅是“管得更严”，还涉及记忆版本的准入。首批30家企业获授权、后续进行使用指导和不规范整改<Cite id={4} /><Cite id={5} />，能够减少冒用并建立责任链。研究要继续追问申请成本、技术门槛、授权类别和退出机制：普通小店若没有资源申请，是否仍能合法讲述自身历史；授权企业若口味不同，商标保证的是安全、产地关系还是统一风味。</p>
                <p>工业化又把身体经验翻译成技术参数。常温、冷冻、冲泡产品以及数字化生产线<Cite id={84} />，需要把“看火候”“凭手感”转成温度、时间、配比和检验。翻译可以保存过去难以复制的知识，也可能只记录能够工业执行的部分。论文不应浪漫化口传经验，也不应把参数当作全部技艺，而要比较哪些知识被写入流程、哪些仍掌握在具体人手中、两者如何互相校正。</p>
                <p>舞台化的风险同样需要分层。非遗市集、万人共食和展销会让制作技艺与城市空间被更多人接触<Cite id={47} /><Cite id={72} /><Cite id={81} />；为了活动节奏，日常熬制、采购、清洁和试味会被压成可观看环节。表演不是假的，它是特定场景的版本。损伤发生在组织者没有告诉观众“这是为展示重排的流程”，或展示版本反过来要求日常实践服从舞台。</p>
                <p>修复的第一步是给说法加上证据标签。网站目前区分可核事实、机构公开口径、地方传说和研究推断；正式论文还可为每条重要判断附上原始来源和发布日期。标题可以简短，正文必须交代推论边界。例如“楚墓发现黄牛遗存”与“地方传播将其连接牛肉汤”应写成两句，让读者看见连接动作是谁完成的。</p>
                <p>第二步是建立“短内容引路、长内容托底”的分层结构。短视频可以用一碗汤或一个动作吸引注意，但应在简介、置顶评论或关联页面提供完整起源版本、制作差异和来源链接；展板可以突出时间线，同时设置二维码进入口述史、标准和访谈；包装可以讲简短故事，也应明确传说与事实。长内容不是为了显得学术，而是给愿意追问的人留下路径。</p>
                <p>第三步是保存版本和出处。地方部门、协会或研究团队可以建立公开资料库，保存考古发布、政策、节目、门店口述史、照片授权和标准版本；每次修改标明时间，不用新页面覆盖旧说法。普通门店与居民应能提交补充、异议和更正。这样做不是追求一个永远不变的“最终真相”，而是让公众看见地方记忆如何形成和变化。</p>
                <p>正式研究可开展“同一材料的转换实验”：从考古原文、新闻长文、60秒视频、15秒片段到包装文案逐层比较，编码事实保留率、限定词、人物、时间跨度、情绪、行动号召和来源可见度。再让不同年龄受访者观看各版本，测试他们记住什么、误解什么、愿不愿继续查证。这样才能把“碎片化造成损伤”从常识判断变成可检验结果。</p>
                <p>也要记录媒介带来的增益。视频能保存动作和声音，评论能让个人经验互相校正，数字档案能连接分散材料，标准能明确安全责任，包装能让异地消费者接触产地。媒介研究不应只做损失清单，而应比较每次转换的“获得—损失—补偿”。否则，本章会陷入一种不现实的想象：仿佛存在完全没有经过媒介、没有选择的纯粹记忆。</p>
                <p>本节的阶段性结论是：淮南牛肉汤的历史证据、制作知识和生活语境在短视频、活动、包装与制度文本中面临不同类型的压缩，尤其容易出现推论跳跃、时间缩短和单一正宗化。但平台、影像、标准和工业技术也能扩大参与、保存动作并提供质量责任。<b>问题不是拒绝媒介转换，而是为每种转换建立出处、版本、差异说明和纠错通道。</b></p>
              </section>

              <section className="essay-subsection" id="essay-chapter-5-generations">
                <h4>三、受众的被动接受与代际断裂</h4>
                <p>“受众被动”不能被理解为观众没有判断力。平台确实会通过推荐限制可见范围，政府和商业叙事也提供现成解释；但用户会质疑、比较、恶搞、拒绝和补充。被动更准确地指一种结构处境：人们拥有点赞和评论按钮，却未必能接触多种版本，未必知道材料出处，也未必能进入商标、活动和保护规则。研究重点应从责怪受众转向分析他们可以选择什么。</p>
                <p>同样，“代际断裂”不能简化为年轻人不爱传统。老年居民可能从家庭、矿区和长期进食进入牛肉汤记忆；中年经营者更多经历市场化、迁移和门店生计；年轻人可能从电视剧、短视频、外卖和方便食品认识它。三代人面对的不是同一对象，使用的也不是同一媒介。差异首先是进入路径改变，不等于后代完全失忆。</p>
                <p>判断传承是否发生，需要把“知道”拆成多个层次。<b>符号识别</b>是看到图片知道淮南牛肉汤；<b>叙事理解</b>是能区分传说、考古和现代形成；<b>身体知识</b>是会选料、熬汤、调味和判断火候；<b>关系知识</b>是知道技艺由谁教、在什么场景使用、需要遵守哪些族群和行业规范；<b>传递能力</b>则是能够向下一代解释并示范。播放和点赞主要支持前两层，不能直接证明后三层。</p>
                <p>青年平台确实可能打开入口。关于B站粤剧视频的研究区分情感、互动和经济参与，讨论用户指标如何影响传统文化内容的传播<Cite id={100} />。这项研究不能替淮南证明年轻受众已经形成认同，却提示研究者不要只统计年龄和观看量：弹幕补充知识、二次创作、打赏、报名体验和实际学习代表不同参与深度，需要分别记录。</p>
                <p>互动指标也容易制造“传承幻觉”。一条制作视频获得大量点赞，证明内容获得可见互动；如果观众说不出步骤、没有接触实践者、创作者也无法持续生产，它仍停留在传播参与。反过来，只有几十人参加但持续数月的学徒课程，平台数据很小，却可能真正完成技能传递。评估数字传承时，应把触达广度和学习深度分开。</p>
                <p>家庭仍是饮食记忆的重要场所。关于地方鱼咖喱的研究显示，家庭配方、烹饪示范和怀旧共同维持身份，同一地方内部也存在多个真实版本<Cite id={95} />。淮南牛肉汤是否具有类似家庭传递，需要实地验证：它可能更多是街坊门店早餐，而不是家家在厨房完成的菜。若研究者先认定“祖传家常菜”，就会把门店师徒、社区消费和外出经营等更重要的传承路径排除。</p>
                <p>老一辈有经验也不等于自然会教。身体知识常以“差不多”“看着办”“闻到这个味”表达，熟练者能够做，却未必能拆解步骤；经营压力也可能让店主没有时间带学徒。年轻人则可能习惯精确配方、视频回放和职业回报。代际障碍因此既有语言和媒介差异，也有工时、收入、信任和知识产权问题，不能只靠拍一条纪录片解决。</p>
                <p>线下活动可以把接触变成实践，但参与深度仍不一致。澳门非遗节庆研究发现，政府、组织者、表演者、商户和游客共同构成体验，游客参与多为自发，普通商户的参与却相对有限<Cite id={98} />。淮南的非遗市集、万人共食和粉丝见面会<Cite id={47} /><Cite id={81} />同样需要问：参与者是在看和吃，还是能询问、动手、理解差异；门店和传承人是在执行节目，还是共同设计活动。</p>
                <p>可以据此建立五级传承阶梯：<b>看见—听懂—尝试—持续实践—能够再教</b>。宣传片和市集首先完成看见；讲解、评论和资料页帮助听懂；工作坊、门店观察和家庭示范支持尝试；学徒制、稳定岗位和持续课程才可能形成实践；当学习者能够说明来历、纠正错误并带新人时，传承才开始跨代。每一级都需要不同时间和证据，不能用一次活动覆盖全部。</p>
                <p>传承还取决于收益。越南活态遗产地研究通过对35名社区守护者的民族志和访谈发现，旅游收入分配与承担文化责任者的生计之间可能出现明显失衡，经济压力会反过来削弱持续保护能力<Cite id={99} />。这一案例不能类推淮南已经存在同样问题，却给出关键问题：因牛肉汤获得客流和品牌价值后，谁得到门店收入、项目补贴、商标溢价和内容流量，谁继续承担低报酬的备料、教学与表演。</p>
                <p>因此，商业化既可能推动传承，也可能抽走传承条件。产品销量和旅游收入可以让年轻人看见职业前景，工厂研发可以形成新的技能岗位，城市品牌也可能提升从业者自豪；若收益集中在营销和头部企业，传统小店只承担“烟火气背景”，年轻人仍不会愿意长期学习。商业是否有益，应以实践者的收入、决策位置、学习机会和知识控制权来判断<Cite id={97} />。</p>
                <p>非遗保护的关键不是把一个版本原样冻结。国际公约和保护说明强调，非遗由社区持续再创造，并在代际间传递<Cite id={37} /><Cite id={46} />。年轻人改用新设备、调整口味、制作短视频或开发方便产品，不必然构成断裂；如果他们仍能解释变化、尊重知识来源、保留核心关系并获得社区承认，这可能是活态延续。真正的断裂是只剩标签，不再有人能够实践、解释和协商。</p>
                <p>社区的“同意”也不能只由协会或代表人物代替。UNESCO伦理原则强调社区、群体和个人的持续知情同意，以及精神与物质收益<Cite id={45} />。对淮南而言，集体商标、标准、活动和数字档案应有不同规模经营者、族群实践者与年轻学习者的参与渠道。参与不意味着每个人否决一切，而是重要决定有信息公开、讨论、异议记录和可申诉程序。</p>
                <p>第一项可执行改进，是把传承岗位化。地方可与门店、加工企业和职业院校共同设置有报酬的学徒岗位，学习内容同时覆盖原料、熬制、卫生、经营、地方历史和媒介表达；考核不只看能否复刻某碗汤，还看能否说明工艺选择与安全责任。稳定收入比一次性“青年传承人”称号更能支撑长期学习。</p>
                <p>第二项改进，是建立“活态厨房档案”。档案不只录一位大师的标准演示，而应记录不同街区、家庭、回民实践者、传统小店与现代生产线的版本；同一动作可以同时保存视频、口述、参数、工具和适用场景。参与者保留署名、授权范围和更正权，商业使用另行协商。数字化由此服务实践，而不是把知识一次性抽走。</p>
                <p>第三项改进，是让年轻人参与解释而不只是出镜。可以由长者和从业者提供经验，青年负责拍摄、字幕、资料核对和互动设计，两代人共同决定什么能公开、什么需要保护。短视频后附长资料，评论中的质疑进入下一期回应。这样既利用青年熟悉的平台语言，也避免把长者变成只会重复固定台词的“文化素材”。</p>
                <p>第四项改进，是把一次活动改成连续学习。非遗市集可设置预约小班、门店跟访和后续线上课程；取景地路线可连接矿区口述史、牛肉汤门店和生产空间，而不只提供同款机位；学校活动可让学生访谈家人、记录早餐路线、核对起源材料，再把成果交回社区。连续反馈比单次热闹更能判断记忆是否留下。</p>
                <p>正式研究应做“三代对照访谈”。可在同一家庭或同一门店中访问老、中、青三代，分别询问第一次接触、判断正宗的依据、熟悉的起源、实际会做的步骤、使用的平台和愿不愿教／学。让受访者现场解释图片、工具或步骤，比抽象问“重不重视传统”更容易发现知识在哪一层断开。</p>
                <p>还可以加入任务型观察。请不同年龄参与者完成“向外地朋友介绍牛肉汤”“给一段千年起源视频找证据”“跟随示范完成一个步骤”等任务，记录他们如何搜索、向谁求助、哪里发生误解。任务结果能区分平台熟练、历史理解和身体技能，也能发现老年人可能实践强却检索困难，青年人可能传播强却缺少现场经验。</p>
                <p>纵向追踪同样必要。活动结束当天的满意度不能证明传承，可以在一个月、半年后询问参与者还记得什么、是否再次到店、有没有继续学习或制作内容；学徒和门店则追踪留任、收入和独立操作。只有时间进入研究，才能区分一次情绪高点与稳定记忆。</p>
                <p>研究也要保留“不参与”的合理性。年轻人可能因工作、收入、兴趣不同而不愿学习，居民可能不希望生活空间持续游客化，店主可能拒绝公开核心配方。这些选择不应被道德化为缺乏文化自觉。保护体系要提供机会和公平条件，而不是要求所有地方人都成为城市品牌表演者。</p>
                <p>综合本章，淮南牛肉汤媒介记忆面临三类相互连接的障碍：<b>传播者的选择使古老、品牌和成绩版本更容易占据中心；媒介转换使证据、时间和地方差异被压缩；参与和传承若停留在观看与互动，便难以进入技能、规则和收益。</b>但这些障碍不是媒介和商业的宿命。分层抽样、出处追踪、差异说明、社区参与、收益共享和持续学习，都可以改变记忆生产条件。</p>
                <p>本章能够依据公开资料提出风险位置和研究方案，却不能预先宣布居民被剥夺、青年已经断层或商业化造成文化衰退。正式论文需要用平台样本、门店田野、多代访谈、利益材料和时间追踪验证。结语将据此收束全文：在承认媒介能打开注意和发展机会的同时，讨论淮南怎样把一时可见度转成可核证、可参与、可持续的城市记忆与非遗保护机制。</p>
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
                <p>全文要回答的核心问题是：淮南牛肉汤为什么会在近年的考古、影视和数字传播中，被越来越频繁地当作“淮南的记忆”来讲？研究得到的答案不是“因为它历史悠久”，也不是“因为政府宣传得好”，而是一条由多种材料、事件、媒介和行动共同构成的链条。牛肉汤先是被当地人制作、食用和回忆的生活实践，后来才在新闻、电视剧、短视频、节庆、商标和政策中获得更稳定的公共名称与城市位置。</p>
                <p>因此，本文研究的并不是一件静止的文化物品，而是一个不断发生的记忆过程。汤里的牛肉、粉丝、豆饼和红油当然重要，但更重要的是：谁把这些东西同楚文化、矿区家庭、回民技艺、城市早餐或百亿产业放在一起；这种组合通过什么媒介被看见；受众又是否把它带入讲述、到访、消费和学习。媒介记忆视角的价值，正在于把“菜本身”和“菜怎样被记住”区分开来<Cite id={31} /><Cite id={35} /><Cite id={39} />。</p>
                <p>全文可以把这一过程概括为：<b>地方生活与历史材料提供可调用资源 → 考古、影视和政策事件打开注意窗口 → 新闻与平台提取容易识别的符号 → 多个主体重新解释并争夺含义 → 受众通过评论、共食、到访和购买参与 → 商标、标准、空间和产业政策将部分记忆固定下来 → 新的制度与实践再次成为传播材料。</b>它是一条循环链，而不是从“文化资源”自动通向“城市发展”的直线。</p>
                <p>第一项发现是，淮南牛肉汤具有丰富但性质不同的记忆资源。帝王与将领传说容易讲故事，《淮南子》中的烹牛文字与武王墩动物遗存带来历史可信感，回民饮食技艺与矿区早餐提供地方社会背景，热汤、辣油、香气和掰饼动作则把记忆落实到身体经验<Cite id={21} /><Cite id={24} /><Cite id={29} /><Cite id={32} /><Cite id={59} />。这些材料共同增加了可讲性，却不能被拼成一条没有断裂的两千年配方史。</p>
                <p>这一区分是全文最重要的证据原则。古代文本证明当时存在对屠牛与烹肉的描述；考古检测证明楚国礼制饮食中有黄牛等动物并经历烹饪；地方报道记录现代社会怎样讲牛肉汤起源；非遗名录与技艺节目说明今天有哪些实践得到制度承认。四种材料都可用，但证明对象不同<Cite id={14} /><Cite id={20} /><Cite id={27} /><Cite id={28} /><Cite id={53} />。把它们分层，并不会削弱地方文化，反而能避免一个过度断言拖累整套叙事的可信度。</p>
                <p>第二项发现是，记忆资源要经过事件激活才会集中进入公共视野。武王墩考古为淮南历史提供了可拍摄的大鼎、墓葬与动物遗存，《六姊妹》则把工业城市、家庭关系和牛肉汤放进连续剧情。两者作用不同：考古提高历史叙事的权威感，电视剧提高地方生活的情感可接近性<Cite id={16} /><Cite id={23} /><Cite id={25} /><Cite id={49} />。事件本身只打开窗口，是否形成较长的记忆周期，还取决于地方机构、媒体、商家和用户是否持续承接。</p>
                <p>第三项发现是，不同媒介不是把同一故事原样搬运，而是在每次转换中重新组织记忆。新闻偏好明确事实与公共意义，电视剧把食物嵌入人物关系，短视频需要迅速可识别的画面和标签，直播把讲述接到购买，线下活动则把屏幕内容变成共食和打卡。所谓“再媒介化”，在本案例中并非抽象术语，而是同一碗汤在不同场景里先后被写成历史证据、家庭道具、视觉奇观、城市礼物和产业商品<Cite id={17} /><Cite id={26} /><Cite id={35} /><Cite id={47} /><Cite id={83} />。</p>
                <p>这种转换既扩大记忆，也改变记忆的比例。“千年”“非遗”“家乡味”“正宗”“百亿产业”都是高效率标签，它们让受众很快知道该怎样理解内容；代价是复杂历史、门店差异、普通劳动者和统计边界更容易退到背景。平台还会通过分类、推荐和旧内容再提示，决定什么过去更常被重新看见<Cite id={92} />。因此，记忆不是简单地“保存下来”，而是在可见性排序中被持续编辑。</p>
                <p>第四项发现是，媒介记忆必须经过主体参与，才可能从传播内容变成社会关系。政府提供政策、活动和城市叙事，媒体提供公共议题与影像框架，企业和门店把名称落实到商品和服务，传承人解释技艺，居民把个人早餐经验讲成地方故事，游客与平台用户则通过拍摄、评论和评价补写意义。没有任何一个主体能够独自拥有完整记忆，但不同主体掌握的发布渠道、资金、知识和制度权力并不相等<Cite id={88} /><Cite id={104} />。</p>
                <p>受众参与也不能只按点赞数量理解。观看让人接触一个符号，评论让人公开表态，打卡让记忆进入空间，购买让它进入日常消费，学习制作才可能进入技能传递。研究应把这些行为分开，而不是把“有互动”直接写成“形成认同”或“实现传承”。对传统文化视频的研究同样提示，情感、互动与经济参与是不同层次，平台指标不能单独证明代际延续<Cite id={94} /><Cite id={100} />。</p>
                <p>第五项发现是，记忆转化存在多个中间环节。电视剧或短视频首先提高可见性，受众形成认知与情感形象后，才可能产生到访意愿；到达淮南以后，交通、空间、门店品质、价格、讲解和城市服务继续影响体验；满意与地方依恋又可能影响复访、推荐或购买<Cite id={86} /><Cite id={89} /><Cite id={90} /><Cite id={91} />。所以，“热播带动文旅”可以作为待检验命题，不能只凭事件先后和两组增长数字宣布因果成立。</p>
                <p>现有公开资料能够确认地方确实进行了组织承接：建设取景地和旅游线路，举办非遗市集与万人共食，设置机场、高铁站、服务区门店奖补，把地方产品接入展销与直播，并推进集体商标、标准和产业条例<Cite id={2} /><Cite id={3} /><Cite id={47} /><Cite id={51} /><Cite id={80} /><Cite id={81} />。这些材料说明“注意力怎样被接住”，却仍不能替游客回答为何到访，也不能替普通门店回答实际获得多少收益。</p>
                <p>第六项发现是，记忆一旦制度化，就会同时获得稳定与边界。集体商标明确谁可以使用名称，标准建立质量与安全预期，白名单降低消费者识别成本，地方条例把品牌、非遗、产业和文旅纳入长期治理<Cite id={2} /><Cite id={4} /><Cite id={5} /><Cite id={9} />。但制度也会选择某些版本进入文本。若制定过程只容纳头部企业和管理部门，街巷小店、家庭版本与族群知识便可能“还在生活里，却不在官方定义里”。</p>
                <p>第五章讨论的三类障碍由此不是传播链外部的意外，而是链条自身可能产生的结果。传播者会选择适合自身目标的过去；媒介转换会压缩时间、证据和地方差异；居民与年轻人若只有观看和配合活动的机会，就很难获得解释、决策和持续实践的位置。问题不在于媒介必然失真或商业必然破坏传统，而在于选择是否透明、差异能否表达、收益是否回到实践者、参与能否影响决定<Cite id={45} /><Cite id={96} /><Cite id={97} /><Cite id={99} />。</p>
                <p>综合起来，淮南牛肉汤成为城市媒介记忆，需要四个条件同时存在：<b>有可反复调用但证据边界清楚的地方资源；有能够激活注意并持续再叙述的媒介事件；有把线上关注接到空间、服务和制度的组织能力；有居民、门店、传承人和受众能够参与解释与受益的社会基础。</b>少一项，记忆都可能停在传说、热搜、景观或商品中的某一层。</p>
                <p>这也修正了一种常见写法：淮南牛肉汤并非先拥有一套完整、统一的文化意义，然后等待媒介去传播。恰恰是在考古报道、剧情、短视频、门店实践、城市活动、标准和争论不断相遇的过程中，它才被临时组织成“淮南代表”。这种代表性可以加强，也可以被质疑；可以给城市带来机会，也会暴露内部差异。媒介记忆建构的真实含义，不是制造一个永远正确的符号，而是建立一套能够持续讲述、核证、协商和更新的关系。</p>
              </section>

              <section className="essay-subsection" id="essay-conclusion-city-image">
                <h4>二、媒介记忆如何参与城市形象建构</h4>
                <p>媒介记忆参与城市形象建构的第一种方式，是给淮南提供一组可以同时理解的“城市坐标”。武王墩考古把城市放进楚文化历史，《六姊妹》让矿区、老街和家庭生活进入当代屏幕，牛肉汤则用味觉把宏大历史与普通早晨接在一起。对外地受众来说，一碗汤比抽象口号更容易接近；对本地居民来说，它又可能唤起上班、上学、家庭和街区的具体经验<Cite id={16} /><Cite id={32} /><Cite id={33} /><Cite id={78} />。</p>
                <p>第二种方式，是通过重复组合形成符号联想。大鼎、热气、红油、粉丝、老街、家庭饭桌和“正宗”并非天然属于同一叙事，新闻、影视、短视频与活动把它们反复并置，才逐渐形成“看到这些就想到淮南”的认知捷径。城市品牌研究提醒，地方不是可以像普通商品那样由一个机构完全设计的产品；它同时是居民生活空间、公共治理对象和外部想象<Cite id={41} />。所以识别度只是城市形象的一部分，不是全部。</p>
                <p>第三种方式，是让受众能够用身体完成对城市形象的确认。影视画面可以让人想象一碗汤，真正到店以后，香气、温度、份量、门店节奏、同桌交流和街区环境会重新判断屏幕印象。地方食品商店研究把城市品牌看成由物质、话语和身体共同完成的表演<Cite id={42} />。这意味着游客喝到的汤、居民面对的生活秩序和从业者提供的服务，本身也是传播，不能与宣传片分开管理。</p>
                <p>由此看，牛肉汤对于淮南的价值不只是“增加一道城市标签”，而是把城市的几种时间放进同一个可体验对象：古代楚文化是长时段，近现代矿业与移民是城市形成史，家庭早餐是日常时间，考古与影视热度是事件时间，商标与条例则把记忆推向制度时间。网站前几章分别分析这些时间，结语需要说明：城市形象有深度，恰恰因为它不是只讲一个年代。</p>
                <p>但多层时间不能被写成虚假连续性。若传播把战国烹牛、五代传说、回民技艺、矿区早餐和现代产业直接串成“秘方传承两千年”，受众虽然容易记住，却难以区分证据与想象。更稳妥的城市叙事可以说：淮南拥有丰富的古代饮食材料，现代牛肉汤又生长于具体族群、市场和城市生活，今天的人借考古和媒介重新理解两者。这样的表达没有神话式确定感，却更经得起核对<Cite id={14} /><Cite id={21} /><Cite id={28} />。</p>
                <p>城市形象还要同时面对三类人。对居民，它应当能够容纳生活记忆和现实利益；对游客，它需要兑现可到达、可理解、可体验的承诺；对产业参与者，它要形成清楚、公平、可持续的质量和名称规则。三者并不总是一致：游客喜欢统一机位，居民可能需要安静街区；品牌需要稳定口味，小店依赖差异；传播喜欢宏大起源，研究需要保留不确定性。城市治理的任务不是消灭矛盾，而是让矛盾能够公开协商。</p>
                <p>居民在这里不是城市形象的“背景群众”。居民地方故事研究发现，若品牌身份脱离居民赋予地方的意义与情感，外部形象和内部认同可能分开<Cite id={88} />。对淮南而言，可以系统采集矿工家庭、回民从业者、老店顾客、年轻创业者和异地经营者的牛肉汤故事，让它们进入展览、线路、课程和平台内容；同时保留受访者的署名、匿名、授权和更正权。</p>
                <p>“参与”也不能停在征集照片、邀请出席或转发官方话题。地方品牌研究显示，政府、旅游机构和企业更熟悉会议、项目与专业表达，普通居民和小商户即使被邀请，也可能缺少时间、知识与关系网络，难以获得实际影响<Cite id={104} />。因此，应记录谁提出意见、意见怎样进入方案、未采纳的理由是什么，并给不同规模门店和社区代表提供有报酬的参与机会。</p>
                <p>建议建立第一套工具：<b>城市叙事证据台账</b>。所有公共宣传中的起源、考古、非遗、门店、客流和产值说法，都注明原始来源、发布日期、发布主体、统计范围和证据等级；将“可核事实”“机构口径”“地方传说”“研究推断”用统一标识展示。台账不是为了把城市宣传写成论文，而是减少不同部门复制旧错误，让创作者知道哪些内容可以肯定说、哪些需要限定。</p>
                <p>第二套工具是<b>内容长短链</b>。短视频负责用一只鼎、一碗热汤或一个家庭场景打开兴趣，链接页提供较完整的历史说明、原始材料、版本差异和门店信息；深度视频再让考古人员、传承人、店主、居民和研究者分别解释。短内容不可能承载全部复杂性，但可以为复杂内容留下入口。评论中反复出现的质疑，应进入后续更正或问答，而不是只把互动当作热度。</p>
                <p>第三套工具是<b>从屏幕到现场的空间链</b>。现有取景地、非遗市集、门店、展馆和旅游线路已经构成承接基础<Cite id={47} /><Cite id={48} /><Cite id={51} /><Cite id={81} /><Cite id={82} />。下一步不应只增加拍照点，而要说明空间之间为什么有关：在九龙岗讲工业生活，在门店观察早餐节奏，在非遗展示中理解工艺与族群，在武王墩相关展陈中学习证据边界。路线把不同时间层连接起来，才不是一串“网红同款”。</p>
                <p>第四套工具是<b>服务兑现清单</b>。对每条宣传线路同步检查交通、开放时间、排队、卫生、价格标示、无障碍、投诉、居民通行和淡旺季容量；对授权门店公开使用标志的条件与查询方式。游客实际体验与传播承诺之间的落差，会直接影响地方形象。门店品质、真实性感知、满意度和忠诚之间存在分阶段关系<Cite id={89} />，所以不能把“来过”当作“认可”。</p>
                <p>第五套工具是<b>多维评估表</b>。UNESCO Culture|2030框架用22项定量与定性指标观察文化与环境韧性、繁荣生计、知识技能、参与和治理的关系<Cite id={102} />。淮南不必照搬整套国际框架，但可以改变只有客流和产值的汇报习惯：同时发布叙事纠错数、社区参与人数与构成、普通门店收益、学徒岗位、活动复访、居民满意、游客投诉、开放档案使用和不同版本保存情况。</p>
                <p>对于媒体热度，建议使用“看见—理解—参与—认同—行动—制度化”六级指标。播放量只属于看见；能否正确区分考古事实与起源传说属于理解；评论、共食和打卡属于不同参与；愿意把牛肉汤讲成自己的地方经验才接近认同；到访、复购、学习和推荐属于行动；商标、课程、档案、岗位和协商程序才进入制度化。六级不能互相替代，也不一定按顺序发生。</p>
                <p>行政数据应当同时公开分子、分母和时间。比如“全产业链产值”包括哪些企业和环节，“游客接待量”按人次还是去重人数，“市外游客占比”如何识别，“网销额”是否包含异地企业使用淮南名称。现有官方页面已经提供多个重要口径<Cite id={3} /><Cite id={6} /><Cite id={7} /><Cite id={8} /><Cite id={50} />，论文引用时必须保留“官方披露”“政策目标”等限定；公共治理若进一步开放计算说明，反而能增强品牌信任。</p>
                <p>影视与考古热度也要建立基线。应比较事件前后的搜索、内容数量、游客、门店销售和城市认知，并控制节假日、季节、奖补、广告和其他旅游项目影响。若只拿2025年热播期数据与多年以前相比，无法知道变化来自电视剧、整体旅游恢复还是政策投入。城市形象研究最怕把同时发生写成单一原因；承认多个原因，比抢占“唯一功劳”更符合事实。</p>
                <p>淮南作为工业城市，还应避免牛肉汤把矿业历史完全覆盖。黄石资源型城市研究把居民的旅游参与、认知、情感、地方依恋与支持行为拆开，发现参与和情感态度对居民支持工业遗产旅游很重要<Cite id={103} />。这一结果不能直接套用淮南，却提示一种组合思路：牛肉汤不是替代矿区记忆的新包装，而可以成为进入工人家庭、迁移、街区和劳动生活的感官入口。</p>
                <p>最终，城市形象建构应从“替淮南说一句最好听的话”，转向“让不同的人能够用可靠材料继续讲淮南”。一个有生命力的城市符号不需要所有门店同味、所有居民同意、所有故事同源；它需要公共事实不被随意改写，需要游客承诺能够兑现，需要地方差异有表达位置，也需要从业者和社区能在品牌增长中得到具体好处。牛肉汤的城市意义，正是在这种可核证、可体验、可协商的关系里变得稳定。</p>
              </section>

              <section className="essay-subsection" id="essay-conclusion-heritage">
                <h4>三、媒介记忆在非遗保护与地方性延续中的双重角色</h4>
                <p>媒介对于非遗保护具有明显的双重作用。一方面，视频能够保存过去只能现场观察的动作，直播和社交平台让传承人、小店与年轻学习者直接发声，异地经营和方便食品又扩大地方名称的接触范围；另一方面，镜头会优先选择翻锅、热气、红油等视觉瞬间，平台排序会放大容易消费的版本，标准和商品则可能把多种做法压成一个版本。扩大可见性与保护地方性，不能被假设为自动一致。</p>
                <p>首先要明确保护对象。牛肉汤制作技艺不是一张固定配方表，而是原料判断、熬制时间、火候、切配、搭配、卫生、门店节奏、师徒关系、族群知识和食客习惯组成的实践网络。中国非遗法强调真实性、整体性与传承性<Cite id={36} />，UNESCO公约把非遗界定为社区不断再创造并代际传递的实践<Cite id={37} />。因此，“活着”比“原样”更重要，但变化必须仍由相关实践者理解和承认。</p>
                <p>这使“正宗”需要被拆成至少四层：食品安全与质量底线、地方名称使用资格、关键技艺与知识来源、门店或家庭的合理差异。前两层可以较多依靠标准、商标与监管，后两层必须给实践者和食客留下解释空间。2009年地方技术规范记录了当时的原辅料与操作要求<Cite id={52} />，2026年官方又披露形成更多团体和地方标准<Cite id={5} />；研究应比较标准如何变化，而非把某一版文本当成永恒传统。</p>
                <p>标准化有现实必要。跨地销售、加工产品、中央厨房和大量门店需要稳定的卫生、成分、标识与追溯规则，集体商标也需要防止无关经营者随意使用“淮南”名称<Cite id={2} /><Cite id={3} /><Cite id={4} />。问题不是要不要标准，而是标准管到哪一层、由谁参与制定、怎样允许差异。地理标志研究显示，小型生产者与工厂会对传统、手工价值和执行能力形成不同理解<Cite id={96} />，这类张力在牛肉汤产业扩张中同样值得实地检验。</p>
                <p>建议对每项标准建立“核心—可变—创新”三栏。核心栏写食品安全、产地名称和社区普遍认可的关键关系；可变栏记录辣度、浇头、粉丝、豆饼、配饼、门店节奏等已存在的版本；创新栏说明速食、数字化设备、新口味与跨地域经营为何出现、由谁提出、消费者和实践者如何评价。三栏可以持续更新，避免标准一方面过度僵化，另一方面又宽到只剩品牌名称。</p>
                <p>第二个原则是让社区参与贯穿全过程。UNESCO最新操作指南把社区参与、提高认识、可持续生计、体面就业和旅游影响纳入保护治理<Cite id={101} />，伦理原则强调持续知情同意和精神、物质收益<Cite id={45} />。对淮南而言，相关社区至少包括传承人与学徒、不同规模门店、回民实践者、家庭制作者、消费者、行业协会和相关街区居民，不能只由一个代表人物代替所有人。</p>
                <p>参与要有清楚程序。标准起草前公开问题与材料，讨论时提供不同时间和表达方式，会后发布意见与修改对照；数字拍摄前说明用途、平台、保存期限和商业授权，参与者可以选择匿名、限制公开或要求更正；重大活动后公开收入、补贴、采购与反馈。做到这些，不会让项目失去效率，反而能减少知识被误用和“被代表”的冲突。</p>
                <p>第三个原则是让收益支持实践，而不是只支持传播。旅游和商业化并非天然损害非遗，长期田野研究也提示，商业可能带来自豪、收入和行动资源<Cite id={97} />；但越南活态遗产案例显示，若旅游收入与承担文化责任者的生计脱节，保护能力会受到削弱<Cite id={99} />。所以应追问谁获得平台流量、授权溢价、活动采购和项目补贴，谁承担备料、教学、表演与知识提供。</p>
                <p>可以设立公开的“传承回流比例”。集体商标授权、政府采购、节庆摊位或品牌联名中的一定资源，进入有报酬学徒、老店口述档案、社区工作坊、食品安全培训和困难从业者支持；同时公布使用项目和受益构成。它不必是一刀切的固定税费，可以通过协议、补贴与项目采购实现，关键是让品牌增长与日常传承之间出现可追踪的资金路径。</p>
                <p>第四个原则是把传承人从“出镜者”变成知识共同作者。非遗节目让制作技艺进入国家级屏幕<Cite id={27} />，但舞台时间有限，很多判断只能被压成几个动作。网站、展馆和课程可以把短片延伸为逐步说明：原料如何判断，为什么这样熬，不同店怎样变，哪些是个人经验，哪些尚有争议。传承人应参与脚本、审核、署名和后续更正，而不只是按导演要求完成演示。</p>
                <p>第五个原则是建设可治理的数字档案。每一份视频、照片、配方口述和门店故事都应保存采集时间、地点、讲述者、版本、拍摄者、授权范围、修改记录和关联来源；开放浏览不等于开放商用，知识提供者可以对敏感技艺设置层级访问。算法会重新分配旧内容的可见性<Cite id={92} />，因此档案还应提供时间、地区、主体和版本检索，让热门排序之外的材料也能被找到。</p>
                <p>“活态厨房档案”不宜只录名人和获奖门店。可以每年选择老店、社区小店、新创业者、家庭、异地门店和生产线各若干案例，记录同一环节的差异；邀请食客说明判断依据，并保存未被采用或正在消失的工具与吃法。地方鱼咖喱研究表明，同一道地方食物可以同时存在多个家庭与社区版本<Cite id={95} />。多版本不是档案混乱，而是地方性真实存在的方式。</p>
                <p>第六个原则是把学习从一次体验延长为岗位和课程。第五章提出“看见—听懂—尝试—持续实践—能够再教”的传承阶梯。结语进一步把它落实：短视频负责看见，资料页和讲解负责听懂，小班工作坊支持尝试，有报酬的学徒与职业课程支撑持续实践，能够独立解释、操作、纠错并带新人，才接近代际传递。每一级分别记录人数、时长、完成内容和后续状态。</p>
                <p>学徒岗位不能只学“老手手感”，也不能只学工业参数。课程可同时包括原料与火候、卫生与营养、门店经营、地方历史、证据判断、拍摄表达和知识权利；由传承人、门店、企业、职业院校和研究者共同授课。年轻人使用新设备、做短视频或开发产品并不等于背离传统，只要他们能够说明改变了什么、为什么改变、谁同意、核心关系是否仍在<Cite id={46} />。</p>
                <p>第七个原则是把文旅从“观看非遗”改为“理解实践”。现有非遗市集和万人共食已经创造了接触机会<Cite id={47} /><Cite id={81} />，下一步可以加入预约观摩、原料比较、证据辨析、门店跟访和家庭口述；游客不必接触商业机密，但应知道一碗汤为何有多种版本、标准解决什么、传说与考古有什么边界。澳门节庆研究显示，不同主体的参与深度并不相同<Cite id={98} />，活动评估应分别询问组织者、表演者、普通商户、居民和游客。</p>
                <p>对年轻群体，重点不是“让他们爱上传统”的口号，而是降低进入门槛并提供真实位置。青年可以做字幕、资料核对、口述史采集、视觉档案、门店数据和互动设计，也可以对陈旧或夸大的叙事提出质疑。长者提供实践与历史经验，青年提供数字工具与新消费观察，两代人共同决定哪些内容公开、哪些知识保护、哪些改变可以接受，才可能把代际差异变成协作资源。</p>
                <p>同时应尊重不参与和保密。店主有权不公开核心配方，居民有权拒绝生活空间被持续拍摄，年轻人也不必因没有从业意愿而被评价为缺乏文化自觉。非遗保护的责任是维护实践机会、知识尊严和公平条件，不是要求每个地方人都为城市品牌表演。持续知情同意意味着参与者可以在项目过程中重新协商，而不是签一次授权就永久失去控制<Cite id={45} /><Cite id={101} />。</p>
                <p>保护成效需要一张与产业数据并列的年度表。可记录：仍在实践的版本与门店类型、传承人与有报酬学徒、学习时长和留任、社区参与决策的构成、知识授权与收益回流、公开档案与更正、居民和从业者满意、游客理解程度、食品安全和名称侵权。UNESCO Culture|2030指标强调把分散的定量与定性数据汇集起来<Cite id={102} />，这比单独宣布“开展多少场活动”更能发现政策空白。</p>
                <p>最后，非遗保护与产业发展不应被写成简单的“相互赋能”。真正可持续的关系是：产业收入让从业和学习有尊严，标准守住安全与名称边界，媒介为多个版本提供解释空间，社区能够参与变化与收益分配，游客得到诚实而丰富的体验。若只剩统一视觉和授权商品，即使曝光增加，地方性也可能变薄；若拒绝所有变化，实践又可能失去现实生计。淮南需要的不是在冻结与商业化之间二选一，而是一套能够说明、协商、纠错和持续回流的制度。</p>
              </section>

              <section className="essay-subsection" id="essay-conclusion-limits">
                <h4>四、研究局限与未来展望</h4>
                <p>这项研究的第一项局限来自材料性质。网站目前登记的104项来源，可以较可靠地确认文件何时发布、新闻怎样表述、公开视频展示什么、学术研究提出哪些概念，也能重建武王墩、《六姊妹》、活动、商标与条例之间的事件链。但公开资料天然更容易留下政府、媒体、平台机构和有传播资源者的声音，沉默、拒绝、家庭记忆和普通门店的日常往往不会主动成为网页。</p>
                <p>因此，本文能够分析的是“公共叙事如何形成”，还不能代表“淮南人共同怎样记忆”。一篇官方报道说居民自豪，不能等于居民访谈；一条高赞评论说想去，不能等于实际到访；一场活动有人排队，也不能证明参与者理解了技艺。前文所有关于认同、动机、地方依恋和传承效果的判断，都应保留“可能”“提示”“需要验证”等限定。</p>
                <p>第二项局限是平台材料不完整且持续变化。推荐算法、搜索结果、账号权限和内容删除都会改变研究者能看到的样本，播放量、点赞和评论也只是采集当日快照。平台会主动“浮现”某些旧内容<Cite id={92} />，研究者使用关键词搜索，又会进一步选择哪些内容进入资料库。因此，未来采集必须保存日期、入口、排序方式、关键词、账号类型、截图或存档链接，不能把一次搜索结果当作互联网全貌。</p>
                <p>第三项局限是时间范围。近年的考古、影视与制度事件得到较密集记录，但改革开放以前的门店、回民社区、矿区家庭和异地经营史主要依赖零散地方材料。现代牛肉汤怎样从地方市场走向跨省门店，哪些劳动、迁移和供应链变化真正关键，现有网页还不能给出连续答案。未来需要地方档案、老报纸、工商资料、菜单、照片和口述史补足长时段。</p>
                <p>第四项局限是因果识别不足。2025年电视剧热播、取景地客流、活动、政策和市场变化同时发生，公开报道能证明它们在时间上相邻，却不能排除节假日、整体旅游恢复、广告投放、交通改善和其他项目影响。影视旅游研究也显示，明星卷入可能通过目的地形象和地方依恋间接影响忠诚，直接路径并不一定显著<Cite id={86} />。本文提出的是机制链，而不是已经被实验确认的因果效应。</p>
                <p>第五项局限是行政与产业数据的统计边界不完全公开。不同页面出现全产业链企业、产值、项目投资、网销额、游客人次等数字<Cite id={3} /><Cite id={6} /><Cite id={7} /><Cite id={8} /><Cite id={50} />，但是否包含原料、加工、物流、外地门店和关联文旅，常缺少统一说明。本文只能按发布主体和时间准确转述，不能把不同口径直接相加，也不能用政策目标代替完成结果。</p>
                <p>第六项局限是研究者位置。本网站先依据论文提纲组织材料，容易在采集时更关注能进入既有章节的内容；“媒介记忆”视角也会把研究重心放在叙事、媒介和参与，而相对弱化营养、供应链、宗教规范、劳动关系和食品安全等问题。后续研究应保留研究日志，记录为什么加入或排除材料，并邀请不同背景的研究者和实践者检查分类。</p>
                <p>第七项局限是案例外推。淮南拥有资源型城市历史、楚文化考古、影视事件与强地方食品产业的特殊组合，不能因本案例出现某种机制，就宣布所有地方美食都按同一路径成为城市记忆。黄石工业遗产、其他地方食品和海外非遗研究可以提供比较变量<Cite id={87} /><Cite id={95} /><Cite id={103} />，但比较的目的应是发现条件差异，不是为淮南结论寻找外地“证明”。</p>
                <p>下一步研究可以按六个相互配合的模块推进。第一，建立平台内容样本。以2022年前期节目、2024年考古、2025年影视活动和2025—2026年制度化四个窗口为中心，在每个窗口分别抽取政府、媒体、商家与普通用户内容；建议总量240—400条。每条登记叙事来源、视觉符号、主体位置、证据强度、互动与链接去向，再由两名编码者试编码并报告一致性<Cite id={43} />。</p>
                <p>平台研究不能只抽“最热视频”。可以在每类账号中同时保留高互动、中位互动和低互动内容，并记录搜索不到但由访谈者提供的社区内容；对已删除内容只在符合伦理与授权的前提下使用存档。评论样本按时间和立场分层，主动寻找质疑千年起源、反对统一口味、对取景地无感或批评价格服务的反例。</p>
                <p>第二，完成30—40人的半结构访谈。样本应覆盖传承人和老店、普通门店与加工企业、政府和协会、回民实践者、本地老居民、年轻本地人、游客和内容创作者。访谈不只问态度，还要请受访者讲第一次喝汤、判断正宗、看过哪些内容、为何到访或不去、谁从产业中受益，并用图片、视频、工具或路线帮助回忆。</p>
                <p>访谈分析可采用主题分析：熟悉全文、初步编码、生成主题、检查边界、命名并写作<Cite id={44} />。同时建立“反例表”，记录与主要判断不一致的材料；让部分受访者核对研究者对其意思的概括；涉及族群知识、商业配方和个人收入时，允许匿名、删节和撤回。研究伦理不是结尾的一段声明，而是贯穿采集、解释、保存和发布的程序<Cite id={45} />。</p>
                <p>第三，进行多点现场观察。选择早市或社区店、授权品牌店、异地门店、加工企业、九龙岗取景地、非遗活动和交通枢纽门店，记录谁在什么时间来、怎样点餐和搭配、店员如何解释淮南、游客拍什么、居民如何使用空间。观察应跨工作日与节假日、活动期与普通期，避免把节庆舞台当作日常生活。</p>
                <p>第四，分别设计居民与游客问卷。居民问卷将媒介接触、地方故事参与、地方身份、旅游影响认知、收益公平和发展支持分开；游客问卷将内容来源、认知形象、情感形象、真实性感知、门店品质、满意、地方依恋、复访和推荐分开。既有研究可提供量表结构<Cite id={89} /><Cite id={91} /><Cite id={103} />，但题项要经过淮南访谈、本地语言检查与小样本预测，不能整份照搬。</p>
                <p>第五，对产业和客流进行口径核验。向发布部门或协会索取指标说明，明确企业去重、地域边界、全产业链范围、价格口径和数据周期；用企业年报、税务或统计资料、平台店铺、门店抽样和交通数据交叉验证。若无法得到原始数据，论文应明确写“无法独立核验”，并把政策目标、行政口径与研究估计分表呈现。</p>
                <p>第六，增加时间与比较设计。可以比较《六姊妹》播出前后同季搜索、内容和到访，设置未被剧集集中呈现的相近城市或景点作为参照；对参加工作坊的学习者在当天、一个月和半年后追踪；对标准实施前后门店操作与消费者判断进行同店比较。即使无法完成严格因果识别，这些设计也比单次横截面更能判断变化发生在何处。</p>
                <p>资料保存同样属于研究结果。建议为每项来源保留标题、作者或机构、日期、原网址、访问日期、网页存档、关键摘录、证据等级、章节用途和版权状态；访谈与观察建立匿名编号、同意记录和访问权限；统计数据保留版本与清洗说明。网站可以继续作为公开索引，但涉及个人和敏感知识的原始材料应进入受控档案，不能因为“数字化”就默认全部公开。</p>
                <p>未来研究还应预先写出哪些发现会推翻现有判断。如果访谈显示多数居民并不把牛肉汤视为重要城市记忆，结论就要降低“共同记忆”的范围；如果游客主要因亲友、商务或价格而到访，影视影响应重新定位；如果小店在标准实施后仍保持差异且收益增加，就不能预设标准必然同质化；如果年轻人通过短视频进入长期学习，平台也不能只被描述为浅表化力量。</p>
                <p>这些反证条件很重要，因为严肃论文的目标不是保护原提纲，而是让提纲接受材料检验。本文目前最有把握的结论是：淮南牛肉汤的公共意义确实在考古、影视、数字平台、城市活动和制度治理之间被反复重组；地方也确实建立了多种承接机制。至于这些变化在多大范围内形成居民认同、带来持续游客、改善普通从业者收益并促进代际传承，还需要下一阶段实证研究回答。</p>
                <p>研究的理论贡献，可以收束为三点。其一，把地方食物记忆从“历史资源”改写为资源、事件、媒介、主体、实践与制度循环生产的过程；其二，把城市品牌从外部形象设计拉回居民故事、身体体验和治理权力；其三，把非遗传播成效从曝光与活动数量推进到知识、参与、收益和传承条件。三点都指向同一判断：记忆不是传播完成后的结果，而是社会持续协商过去、当下与未来的方式。</p>
                <p>对淮南最实际的启示则很朴素：<b>不要急着把每一种材料都说成千年证据，不要把一次热搜写成长期认同，不要让统一品牌抹掉真实差异，也不要让居民和从业者只在镜头里出现。</b>把出处说清，把现场做好，把收益讲明，把不同的人请进决定过程，再用持续数据检查效果。一碗汤成为一座城的记忆，靠的从来不是一次“出圈”，而是许多人愿意继续做、继续吃、继续讲，也有能力对讲错的地方说不。</p>
              </section>
            </div>
          </article>
          )}

              <nav className="chapter-pager" aria-label="前后章节">
                <div>
                  {previousEssayChapter && (
                    <a href={`#draft/${previousEssayChapter.id}`}>
                      <span>← 上一章</span>
                      <b>{previousEssayChapter.label} · {previousEssayChapter.title}</b>
                    </a>
                  )}
                </div>
                <div>
                  {nextEssayChapter && (
                    <a href={`#draft/${nextEssayChapter.id}`}>
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
        <div className="section-heading methods-section-heading">
          <div><p className="section-kicker">实证研究工具包 · 可直接执行</p><h2>六套研究方法，呈现全面报告。</h2></div>
        </div>

        <div className="toolkit-overview">
          <article><span>平台内容</span><strong>建议320条</strong><p>4个事件窗口 × 4类主体 × 每格20条</p></article>
          <article><span>深度访谈</span><strong>12—18人</strong><p>覆盖六类主体，尊重群体差异</p></article>
          <article><span>问卷对象</span><strong>2类</strong><p>居民与游客分开，不把身份认同和旅游满意混成一套问题</p></article>
          <article><span>现场材料</span><strong>4类</strong><p>老店、普通门店、传播空间、活动／生产现场</p></article>
        </div>

        <div className="method-lead">
          <div><span>建议执行顺序</span><strong>预测试 → 正式采集<br />→ 交叉验证 → 成文</strong></div>
          <p>先用平台样本确定常见叙事，内容编码数据化输出样本报告，再用访谈追问人们怎样理解，用现场观察检查传播说法怎样进入真实空间，最后用居民和游客问卷验证这些关系是否具有普遍性，数据整理寻找内部联系并得出结论。方法不是越多越好，每一种方法都要对应具体研究问题，并且说明它的局限性，相互补充形成完备报告。</p>
        </div>

        <nav className="method-tool-tabs" aria-label="实证研究工具分类">
          {methodTools.map((tool) => <a
            key={tool.id}
            href={`#methods/${tool.id}`}
            className={activeMethodTool === tool.id ? "active" : ""}
            aria-current={activeMethodTool === tool.id ? "page" : undefined}
          ><span>{tool.number}</span><strong>{tool.label}</strong><small>{tool.note}</small></a>)}
        </nav>

        <section className="method-tool-panel" id="empirical-toolkit">
          <header className="method-tool-header">
            <div><span>{activeMethodEntry.number} / 当前工具</span><h3>{activeMethodEntry.label}</h3><p>{activeMethodEntry.output}</p></div>
            <div className="tool-downloads"><b>下载空白模板</b>{activeMethodDownloads.map((item) => <a key={item.file} href={`downloads/${item.file}?v=${downloadVersion}`} download={item.file}>{item.label}<span>↓</span></a>)}</div>
          </header>

          {activeMethodTool === "sampling" && <div className="tool-body">
            <div className="tool-question"><span>它回答什么</span><p>四次关键变化中，政府、媒体、商业主体和普通用户分别选择了哪些记忆资源？同一个故事怎样从机构发布流向平台内容，又在哪些地方被改写？</p></div>
            <div className="sampling-rules">
              <article><b>纳入</b><p>标题、正文、画面或声音明确涉及“淮南牛肉汤”，且发布时间落在研究窗口内；原始页面可以访问，并且能够判断发布账号的主体类型。</p></article>
              <article><b>排除</b><p>完全重复转载、只有商品价格而没有地方叙事、无法确认发布日期、搜索结果中存在摘要但原始页面已经不存在，以及同一账号机械发布的营销内容。</p></article>
              <article><b>去重</b><p>同一个视频由原作者发布到不同平台，可以保留为不同平台版本，但标记为同源内容；没有任何改动的转载，只保留发布时间最早或者互动信息最完整的一条。</p></article>
              <article><b>替补</b><p>先为每一个样本配额格准备5条候补。原样本失效时，按照相同事件窗口、主体类型和平台顺序替换，不能主观临时选择更符合论文结论的内容。</p></article>
            </div>
            <div className="tool-table-wrap">
              <table className="tool-table quota-table"><thead><tr><th>事件窗口</th><th>时间范围</th><th>比较重点</th><th>政府</th><th>媒体</th><th>企业／门店</th><th>普通用户</th><th>合计</th></tr></thead>
              <tbody>{samplingQuotas.map((row) => <tr key={row.window}><td>{row.window}</td><td>{row.period}</td><td>{row.event}</td><td>{row.official}</td><td>{row.media}</td><td>{row.business}</td><td>{row.user}</td><td>{row.official + row.media + row.business + row.user}</td></tr>)}</tbody>
              <tfoot><tr><td colSpan={3}>总样本</td><td>80</td><td>80</td><td>80</td><td>80</td><td>320</td></tr></tfoot></table>
            </div>
            <ol className="execution-steps">
              <li><b>固定检索式</b><p>主词使用“淮南牛肉汤”，事件词分别加入“武王墩／楚墓”“六姊妹／万人共品”“商标／标准／条例”等。每次检索都要保存检索日期、关键词和排序方式。</p></li>
              <li><b>先建立候选池</b><p>按照相关性或时间顺序连续浏览，记录所有符合条件的候选材料，不先凭标题选择所谓的“好材料”。</p></li>
              <li><b>分层抽取</b><p>在每一个事件窗口和主体类型中分别编号。候选材料过多时，使用等距抽样或随机数抽样；候选材料不足时，如实报告并调整整体方案。</p></li>
              <li><b>保存证据快照</b><p>记录网址、标题、账号、发布时间、抓取日期、互动量和关键画面时间点。遵守平台规则，不采集非公开个人信息。</p></li>
              <li><b>绘制样本流程图</b><p>报告候选数量、去重数量、排除原因、替补数量和最终样本数量，让读者知道320条样本是怎样获得的。</p></li>
            </ol>
            <aside className="method-boundary"><b>结论边界</b><p>320条样本不能代表“整个互联网”。它代表的是在明确的时间窗口、检索式、平台范围和主体分层下获得的一组可复核内容。</p></aside>
          </div>}

          {activeMethodTool === "coding" && <div className="tool-body">
            <div className="tool-question"><span>分析单位</span><p>一条能够被独立观看、阅读或者转发的帖子、视频或报道，算作一个分析单位。编码的是内容中能够被观察到的特征，而不是发布者的真实动机，也不是研究者对内容好坏的主观评价。</p></div>
            <div className="coding-protocol">
              <article><span>01</span><b>训练</b><p>两名编码者共同学习编码手册，再用不进入正式样本的20条材料进行练习。</p></article>
              <article><span>02</span><b>试编</b><p>两名编码者分别独立编码正式样本的10%，即32条材料，过程中不能互相影响。</p></article>
              <article><span>03</span><b>检验</b><p>名义变量报告Krippendorff&apos;s α。目标达到0.80左右；一致性较低的变量必须回到定义和案例进行修改，不能为了获得高数值而直接删除分歧。</p></article>
              <article><span>04</span><b>正式编码</b><p>修订编码手册后，再独立完成全部样本。最终数据表同时保留两名编码者的原始判断和协商后的结果。</p></article>
            </div>
            <div className="tool-table-wrap">
              <table className="tool-table codebook-table"><thead><tr><th>变量</th><th>含义</th><th>主要代码或判断内容</th></tr></thead><tbody>{codingRows.map((row) => <tr key={row.variable}><td><b>{row.variable}</b></td><td>{row.name}</td><td>{row.codes}</td></tr>)}</tbody></table>
            </div>
            <div className="decision-cards">
              <article><b>多选变量怎样填写</b><p>记忆资源等变量可以多选，CSV中使用英文分号分隔，例如“3;6;7”。没有出现填0，无法判断填9，空白只表示漏填。</p></article>
              <article><b>编码分歧怎样处理</b><p>先让两名编码者分别说明自己的判断依据，再核对编码手册。协商后的值写入“协商终值”列，原始值分别保存在“编码者A原值”和“编码者B原值”列。</p></article>
              <article><b>定量之后怎样分析</b><p>先进行频数统计和交叉表分析，再选择典型材料与反常材料进行细读。高频不自动等于重要，低频反例也可能改变最终解释。</p></article>
            </div>
            <p className="method-source-note">编码单位、可重复性与信度设计依据内容分析方法<Cite id={43} />；广州美食短视频研究只用于比较城市形象分析维度，不能直接照搬其结论<Cite id={65} />。</p>
          </div>}

          {activeMethodTool === "interview" && <div className="tool-body">
            <div className="tool-question"><span>招募原则</span><p>采用目的性抽样，保证六类研究主体都能进入样本；再通过滚雪球方式寻找关键知情人。每一类都要主动寻找不同意见。访谈人数以“新的访谈是否仍然产生重要的新主题”为判断标准，不把人数当作机械合格线。</p></div>
            <div className="interview-sample-grid">{interviewGroups.map((item) => <article key={item.group}><span>{item.quota}</span><h4>{item.group}</h4><p>{item.focus}</p></article>)}</div>
            <div className="interview-runbook">
              <div><span>访谈前</span><p>说明研究者身份、研究用途、录音方式、匿名处理、撤回方式和预计45—70分钟的访谈时长。先取得参与者同意，再开始录音。涉及配方、商业数据和家庭经历时，允许参与者拒绝回答或者跳过问题。</p></div>
              <div><span>访谈中</span><p>先询问具体经历，再询问评价。使用“能讲一个例子吗”“当时谁在场”等问题继续追问，不使用“你是否也认为宣传过度”等具有诱导性的表达。</p></div>
              <div><span>访谈后</span><p>24小时内完成情境备忘录。转写时删除姓名、电话号码和具体住址；重要事实需要另找文件或者第二位知情人核对。</p></div>
            </div>
            <ol className="interview-modules">{interviewModules.map((item, index) => <li key={item.step}><span>{String(index + 1).padStart(2, "0")}</span><div><b>{item.step}</b><p>{item.questions}</p></div></li>)}</ol>
            <aside className="consent-script"><b>可直接念出的开场说明</b><p>“我正在研究淮南牛肉汤怎样在媒体、城市生活和个人记忆中被理解。访谈大约60分钟，你可以拒绝任何问题，也可以随时停止。经你同意后我会录音，只用于研究整理；论文默认使用化名并删除能识别个人的信息。涉及配方或经营秘密的内容，未经再次确认不会公开。你是否理解并愿意参加？是否同意录音？”</p></aside>
            <p className="method-source-note">转写后的材料按照熟悉全文、初始编码、生成主题、检查主题、命名主题和正式写作的路径处理，同时保留反例和研究者备忘录<Cite id={44} />。</p>
          </div>}

          {activeMethodTool === "observation" && <div className="tool-body">
            <div className="tool-question"><span>观察不是拍照打卡</span><p>场景观察要记录传播标签怎样进入菜单、门头、制作、点单和顾客互动。每一条笔记必须区分现场看见或者听见的事实、研究者当时的感受，以及离开现场后形成的分析。</p></div>
            <div className="site-plan-grid">
              <article><span>A</span><h4>老店／传承场所</h4><p>至少2处。观察技艺、熟客和历史叙事怎样同时存在。</p></article>
              <article><span>B</span><h4>普通社区门店</h4><p>至少3处。避免只观察获得品牌授权或者媒体曝光的门店。</p></article>
              <article><span>C</span><h4>影视／文旅空间</h4><p>至少2处。观察游客路线、海报、打卡行为和实际消费。</p></article>
              <article><span>D</span><h4>活动／生产现场</h4><p>至少1场。观察舞台展示、直播、标准和后台劳动。</p></article>
            </div>
            <div className="observation-grid">{observationDomains.map((item, index) => <article key={item.domain}><span>{String(index + 1).padStart(2, "0")}</span><div><h4>{item.domain}</h4><p>{item.items}</p></div></article>)}</div>
            <div className="observation-timing">
              <div><b>同一个地点至少观察两次</b><p>工作日与周末，或者早餐高峰与平峰各观察一次。每次持续60—120分钟，才能看到节奏差异。</p></div>
              <div><b>拍摄必须有边界</b><p>先征得门店同意；不拍摄未经同意的清晰人脸、付款信息和后台配方。照片编号与文字笔记分开保存。</p></div>
              <div><b>离场后立即补充笔记</b><p>记录遗漏、不确定判断和下一次需要追问的问题。不能几天后依靠印象补写成所谓的“现场事实”。</p></div>
            </div>
          </div>}

          {activeMethodTool === "survey" && <div className="tool-body">
            <div className="tool-question"><span>先分开两类人</span><p>居民问卷测量地方身份、传播参与和收益公平；游客问卷测量内容接触、目的地形象、真实感、现场体验和行为意向。两套问卷都可以采用5点同意量表，但不能把所有题目拼成一个总分。</p></div>
            <div className="survey-instrument-grid">{surveyInstruments.map((survey) => <article key={survey.id}>
              <header><span>{survey.label}</span><h4>{survey.target}</h4><p>{survey.suggestion}</p></header>
              <div>{survey.constructs.map((construct) => <section key={construct.name}><b>{construct.name}</b><p>{construct.items}</p></section>)}</div>
              <a href={`downloads/${survey.id === "resident" ? "05-居民问卷题库.csv" : "06-游客问卷题库.csv"}?v=${downloadVersion}`} download={survey.id === "resident" ? "05-居民问卷题库.csv" : "06-游客问卷题库.csv"}>下载完整题库 <span>↓</span></a>
            </article>)}</div>
            <div className="survey-flow">
              <article><span>01</span><b>认知访谈 5—8人／版</b><p>让目标对象边阅读边解释题目，找出“不知道怎样回答”“一个句子里包含两个问题”和地方用语不自然的题项。</p></article>
              <article><span>02</span><b>预测试 30—50份／版</b><p>检查完成时间、缺失、连续选择相同选项、天花板或地板效应，以及初步内部一致性。</p></article>
              <article><span>03</span><b>正式抽样</b><p>居民按照年龄和居住区配额；游客按照调查地点、日期和时段进行拦截。记录拒访人数，通过二维码转发得到的样本需要单独标记。</p></article>
              <article><span>04</span><b>分析与限定</b><p>先报告样本结构、信度和各构念得分，再进行相关分析或者回归分析。横截面关系只能写成“相关”，不能写成长期因果。</p></article>
            </div>
            <aside className="method-boundary"><b>量表来源说明</b><p>目的地形象、真实感、地方依恋和行为意向参考既有研究中的构念关系<Cite id={89} /><Cite id={91} /><Cite id={103} />。这些题项已经按照本研究对象改写，必须经过认知访谈与小样本预测试，不能声称它们已经在淮南“验证有效”。</p></aside>
          </div>}

          {activeMethodTool === "ethics" && <div className="tool-body">
            <div className="tool-question"><span>先保护人，再保护结论</span><p>数据管理不是论文完成后的整理工作。编号、授权、匿名、版本和备份从采集第一天就要执行，否则既可能伤害参与者，也无法说明研究的分析过程。</p></div>
            <div className="data-pipeline">
              <article><span>RAW</span><h4>原始区</h4><p>保存原始录音、导出文件和网页快照。文件只读保存，不直接覆盖，也不上传到公开仓库。</p></article>
              <article><span>CLEAN</span><h4>去标识区</h4><p>姓名和联系方式放在独立加密对应表中；转写、编码和问卷统一使用研究编号。</p></article>
              <article><span>ANALYSIS</span><h4>分析区</h4><p>保存数据清洗规则、代码本版本、统计脚本、主题备忘录和图表生成日期。</p></article>
              <article><span>OUTPUT</span><h4>论文输出区</h4><p>只放匿名引语、汇总表和经过授权的图片，每一项都能够追溯到内部研究编号。</p></article>
            </div>
            <div className="id-convention"><div><span>平台样本</span><code>W3-U-017</code><p>影视窗口 · 普通用户 · 第17条</p></div><div><span>访谈</span><code>INT-YR-03</code><p>年轻居民 · 第3位</p></div><div><span>观察</span><code>OBS-B-02-PM</code><p>社区门店2 · 平峰</p></div><div><span>问卷</span><code>V-0248</code><p>游客有效问卷 · 第248份</p></div></div>
            <div className="ethics-grid">
              <article><b>持续知情同意</b><p>签字不是一次性许可。引用敏感经历、配方知识或可识别照片前再次确认；参与者可撤回尚未匿名汇总的材料。</p></article>
              <article><b>最少必要采集</b><p>不因“可能有用”收身份证、精确住址和私人账号；人口学信息只保留分析确实需要的范围。</p></article>
              <article><b>社区知识不是免费素材</b><p>说明研究用途、反馈研究结果；商业使用、收益或公开展示需要另行协商，不能用学术同意替代全部授权。</p></article>
              <article><b>反例进入论文</b><p>保留不认同“千年”、不支持品牌化或没有被影视影响的人，不因其破坏主线而删除。</p></article>
            </div>
            <div className="analysis-map">
              <h4>数据怎样进入论文</h4>
              <div className="tool-table-wrap"><table className="tool-table"><thead><tr><th>研究问题</th><th>主要数据</th><th>分析办法</th><th>论文输出</th><th>结论边界</th></tr></thead><tbody>
                <tr><td>哪些记忆被反复选择？</td><td>320条平台内容</td><td>频数、交叉表、典型与反例细读</td><td>第三章叙事与主体比较</td><td>只代表设定的样本框</td></tr>
                <tr><td>不同人怎样理解“正宗”？</td><td>访谈＋现场</td><td>主题分析、主体对照、负面案例</td><td>第三、五章意义协商</td><td>不声称统计代表性</td></tr>
                <tr><td>传播怎样进入空间与行动？</td><td>观察＋游客问卷</td><td>场景描述、分组比较、相关或回归</td><td>第四章转化路径</td><td>横截面数据不能证明因果</td></tr>
                <tr><td>居民是否认同且公平受益？</td><td>居民问卷＋居民／门店访谈</td><td>构念得分、群体差异、主题互证</td><td>第五章治理反思</td><td>配额样本不等于全市民意</td></tr>
              </tbody></table></div>
            </div>
            <p className="method-source-note">涉及非遗知识时，遵循社区主体、持续同意、公平受益和避免错误呈现等伦理原则<Cite id={45} />。最终方案还需要服从所在学校的伦理审查和数据保存要求。</p>
          </div>}
        </section>
      </section>
      </div>}

      {activeTab === "references" && <div className="tab-page" data-page="references">
      <section className="bibliography-hero page-section">
        <div className="bibliography-title">
          <div><p className="section-kicker">第八步 · 参考资料整合</p><h2>核心学术与来源材料索引</h2></div>
        </div>
        <div className="bibliography-metrics">
          <article><span>核心文献</span><strong>{coreReferences.length}</strong><p>已核作者、题名、年份与主要卷期页码</p></article>
          <article><span>引文路线</span><strong>{citationRoutes.length}</strong><p>从论文问题直接定位到应引用的材料组</p></article>
          <article><span>来源材料</span><strong>{sources.length}</strong><p>政策、新闻、视频、图片与学术网页全部保留</p></article>
        </div>
      </section>

      <section className="citation-route-section page-section">
        <div className="section-heading">
          <div><p className="section-kicker">快速检索</p><h2>按命题检索相关文献</h2></div>
          <p>同一段通常需要两类材料配合：学术文献解释概念或机制，案例材料证明实际发生了什么。</p>
        </div>
        <div className="citation-route-list">
          {citationRoutes.map((route, index) => (
            <article key={route.question}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><b>{route.chapter}</b><h3>{route.question}</h3><p>{route.instruction}</p></div>
              <aside><em>建议引文组</em><p>{route.sources.map((id) => <Cite key={id} id={id} />)}</p></aside>
            </article>
          ))}
        </div>
      </section>

      <section className="core-reference-section page-section">
        <div className="section-heading">
          <div><h2>核心参考文献</h2></div>
        </div>
        <div className="reference-group-index" role="tablist" aria-label="参考文献分类索引">
          {referenceGroups.map((group) => {
            const isActive = activeReferenceGroup === group;
            return <button
              key={group}
              id={`reference-tab-${group}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`reference-panel-${group}`}
              className={isActive ? "active" : ""}
              onClick={() => setActiveReferenceGroup(group)}
            >{group}<span>{coreReferences.filter((item) => item.group === group).length}</span></button>;
          })}
        </div>
        {referenceGroups.map((group) => group === activeReferenceGroup && (
          <section className="reference-group" id={`reference-panel-${group}`} key={group} role="tabpanel" aria-labelledby={`reference-tab-${group}`}>
            <header><span>{String(referenceGroups.indexOf(group) + 1).padStart(2, "0")}</span><h3>{group}</h3><p>{coreReferences.filter((item) => item.group === group).length}条</p></header>
            <ol>
              {coreReferences.filter((item) => item.group === group).map((reference) => {
                const source = sourceById(reference.sourceId);
                return <li key={reference.sourceId}>
                  <span>[{String(coreReferences.indexOf(reference) + 1).padStart(2, "0")}]</span>
                  <div><p>{reference.entry}</p><em>{reference.use}</em></div>
                  <a href={source.url} target="_blank" rel="noreferrer">原文 {String(reference.sourceId).padStart(2, "0")} ↗</a>
                </li>;
              })}
            </ol>
          </section>
        ))}
      </section>

      <section className="video-section page-section">
        <div className="section-heading">
          <div><p className="section-kicker">看视频</p><h2>公开视频材料</h2></div>
        </div>
        <div className="video-grid">
          {[22, 23, 24, 25, 26, 27, 28, 78].map((id) => {
            const source = sourceById(id);
            const title = sourceDisplayTitle(source);
            return (
              <a className="video-card" key={id} href={source.url} target="_blank" rel="noreferrer">
                <div className="video-visual">
                  <img src={source.thumbnailUrl} alt={`${title} 视频封面`} loading="lazy" />
                  <span className={`play`}>▶</span>
                  <b>{source.date.slice(0, 4)}</b>
                </div>
                <span>{source.publisher}</span>
                <h3>{title}</h3>
                <p>{source.note}</p>
                <em>观看原视频 ↗</em>
              </a>
            );
          })}
        </div>
      </section>

      <section className="sources-section page-section" id="sources">
        <div className="section-heading">
          <div><p className="section-kicker">参考资料列表</p><h2>网页、文章、视频、图片和学术资料。</h2></div>
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
            <a href={source.url} target="_blank" rel="noreferrer" className={`source-row${source.type === "视频" ? " source-row--video" : ""}`} key={source.id}>
              <span className="source-id">{String(source.id).padStart(2, "0")}</span>
              {source.type === "视频" ? (
                source.thumbnailUrl ? <img className="source-thumbnail" src={source.thumbnailUrl} alt={`${sourceDisplayTitle(source)} 封面`} loading="lazy" /> : <span className="source-spacer" aria-hidden="true" />
              ) : null}
              <div className="source-main"><div><span className={`source-type type-${source.type.replace("/", "-")}`}>{source.type}</span><span className="source-meta">{source.date} · {source.publisher}</span></div><h3>{sourceDisplayTitle(source)}</h3><p>{source.note}</p></div>
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
          <article><h3>这个网站已经做了什么</h3><p>简单介绍了研究对象、案例分析样例、研究方法政策、研究方法，统计、新闻、视频、图片、典籍和学术资料都已逐条登记，论文各章也打好底稿。</p></article>
          <article><h3>正式论文还要自己做什么</h3><p>还要按规则收集平台内容，进行实人访谈，到现场观察，并独立核对数字统计方法。</p></article>
          <article><h3>使用这些材料时要记住</h3><p>网站中的“研究推断”只能当作分析起点，不能直接当做调查结论。正式论文要扩充部分内容，重点在于交代样本怎样选取、每条材料怎样分析，还要给出反例和原始访谈依据，综合得出你的结论，祝毕业顺利，论文大爆！Q</p></article>
        </div>
      </section>

      </div>}

      <footer>
        <div><span className="brand-mark">淮</span><p>淮南牛肉汤媒介记忆研究志<br /><small>公开资料型可视化研究 · 2026</small></p></div>
        <p>一碗汤会冷却，记忆仍在沸腾。</p>
        <a href="#overview" onClick={() => openTab("overview")}>回到首页 ↑</a>
      </footer>

      {progress > 1 && (
        <button
          className="back-to-top"
          type="button"
          aria-label="回到顶部"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑
        </button>
      )}
    </main>
  );
}
