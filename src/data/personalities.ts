export interface BeerIdentity {
  key: string;
  title: string;
  img: string;
  desc: string;
}

export const BEER_IDENTITIES: Record<string, BeerIdentity> = {
  G: {
    key: 'G',
    title: "传统派",
    img: "/imgs/G.png",
    desc: "你对传统风格的忠诚超过了对初恋的记忆，也是啤酒纯净法最后的信徒。在这个追求酒花和木桶的狂热世界里，你知道那些疯狂终究会褪去，始终陪伴你日日夜夜的，还是那杯清澈透亮的液体。"
  },
  A: {
    key: 'A',
    title: "过桶主义者",
    img: "/imgs/A.png",
    desc: "时间是最好的酿酒师，橡木桶是它的画笔。你对波本、雪莉、波特桶的痴迷近乎信仰。没有过桶的那些啤酒似乎永远少了些什么，只有在木桶里沉睡过的液体才配得上你深沉的灵魂。"
  },
  Y1: {
    key: 'Y1',
    title: "下水道赞助商",
    img: "/imgs/Y1.png",
    desc: "那一夜，你和下水道都喝多了。哪怕是再顶级的瓶瓶罐罐，只要风味偏了或有一丝氧化，你也会毫不犹豫地把它请进下水道。你对品质的坚持，是酒厂最害怕的噩梦。"
  },
  H: {
    key: 'H',
    title: "浑浊的神",
    img: "/imgs/H.png",
    desc: "No Hazy, No Life。你的血管里流的都是西楚和马赛克的果汁。你对新鲜日期的偏执近乎强迫症，如果你在店里，那一定是在顶光下观察那杯果汁的透明度（最好是零）。"
  },
  M: {
    key: 'M',
    title: "陈醋收藏家",
    img: "/imgs/M.png",
    desc: "家里包饺子再也不用买醋了。你对兰比克和野菌发酵的热爱常人难以理解。当别人被马厩味劝退时，你正沉浸在时间的艺术中，品味那份优雅的尖锐。"
  },
  S: {
    key: 'S',
    title: "甜水爱好者",
    img: "/imgs/S.png",
    desc: "日子已经够苦了，啤酒必须是甜的。水果、甜品、焦糖……你享受那种血糖飙升的满足感。糖分是你快乐的合法来源，或者说，你只是在喝含酒精的奶茶？"
  },
  DI: {
    key: 'DI',
    title: "酒蒙子",
    img: "/imgs/D-I.png",
    desc: "度数要高，速度要快。你就是酒精的终结者。无论是18度的世涛还是大杯拉格，在你面前都只有干杯这一个结局。谁说精酿不能喝断片？"
  },
  U: {
    key: 'U',
    title: "Untappd分奴",
    img: "/imgs/U.png",
    desc: "手机先喝。没打卡的酒等于没喝。你是Untappd忠实的信徒，日夜追逐那个不断增长的 Unique Check-in 数字。Untappd也许早就成为了你最离不开的社交媒体？"
  },
  B: {
    key: 'B',
    title: "酒花本花",
    img: "/imgs/B.png",
    desc: "喝得苦中苦，方为人上人。你对苦度和酒花的追求没有上限，或者说，只有足够苦，才能证明他们投了足够多的酒花。谁说这是苦呢？这是酒花在口腔中最后的狂欢。"
  },
  Y2: {
    key: 'Y2',
    title: "液体蛋糕er",
    img: "/imgs/Y2.png",
    desc: "你喜欢这样有咀嚼感的液体，像是在喝一杯可以让人微醺的下午茶。你是“液态甜品”的忠实信徒，任何能让啤酒喝起来像黑森林蛋糕的增味都会让你疯狂。"
  },
  E: {
    key: 'E',
    title: "老懂哥",
    img: "/imgs/E.png",
    desc: "“这款酒的干投逻辑其实是……”你是移动的精酿百科全书。无论是酒花组合还是发酵曲线都能信手拈来。虽然有时让人压力山大，但没人能否定你对专业的敬畏。"
  },
  R: {
    key: 'R',
    title: "溢价受害者",
    img: "/imgs/R.png",
    desc: "啤酒成为了你日常最不眨眼的消费。你永远在为那些全球最顶尖的啤酒买单，哪怕你并不知道它实际如何。账单已经爆炸，但你相信一切都值得。"
  },
  Z: {
    key: 'Z',
    title: "颜值协会会长",
    img: "/imgs/Z.png",
    desc: "你是感觉的信徒。一张设计精良的酒标或是一个好听的名字，就能瞬间击溃你的防线。毕竟，审美也是一种生产力。但在无人的夜里，那些好看的酒是否好喝，只有你自己知道。"
  },
  D: {
    key: 'D',
    title: "大卫·戴",
    img: "/imgs/D.png",
    desc: "干杯这一块。你有着仿佛能容纳一切的雷霆大胃袋，往往朋友还在拍照时，你的那一杯已经见底。没有人知道那杯酒是怎么消失的，也没人知道你的容量。"
  },
  I: {
    key: 'I',
    title: "最硬の肝",
    img: "/imgs/I.png",
    desc: "酒精对你来说只是数字。你是夜晚的守望者，当所有人都倒下时，你依然能清醒地叫出下一轮酒。你肝脏的硬度和你一样早已成为传说，也许，你并不在乎杯子里究竟是什么酒。"
  },
  Y3: {
    key: 'Y3',
    title: "忍者",
    img: "/imgs/Y3.png",
    desc: "我绝不浪费。你知道，酒花和麦芽都是农作物，所以酒也是粮食的一种。无论这杯有多难喝，你也永远忍着坚持喝完。忍者绝不浪费一滴粮食。"
  },
  N: {
    key: 'N',
    title: "酒单收割机",
    img: "/imgs/N.png",
    desc: "当别人还在犹豫喝哪一个的时候，你选择一个一个来。你从不在意自己要喝多少杯，而是看今晚的酒单有多少自己没喝过的酒。老板，下一杯！"
  },
  T: {
    key: 'T',
    title: "社交之王",
    img: "/imgs/T.png",
    desc: "喝什么酒不重要，和谁喝酒才重要。你是广大酒友的粘合剂，能从酒花聊到宇宙起源。一群人喝才叫精酿文化，一个人喝那叫酒精摄入。"
  },
  L: {
    key: 'L',
    title: "Taproom背景板",
    img: "/imgs/L.png",
    desc: "你已经和店里的装修融为一体了。店员甚至不需要问你喝什么，因为你永远在那张固定的椅子上，沉默不语，只是享受那一品脱的时光。"
  },
  V: {
    key: 'V',
    title: "精酿pdd大亨",
    img: "/imgs/V.png",
    desc: "性价比才是灵魂。你总能找到全网最低的拼团价，或者是突然打折的顶级大货。你用最少的预算喝到了最多的高分酒，谁说这不是一种智慧呢？"
  },
};

export function computeTopTag(finalScores: Record<string, number>): string {
  const sorted = Object.entries(finalScores)
    .filter(([tag]) => tag !== 'W')
    .sort((a, b) => b[1] - a[1]);
  const topTwo = sorted.slice(0, 2).map(([tag]) => tag);
  const topTag = sorted[0]?.[0] || 'G';

  if (topTag === 'Y1') return 'Y1';
  if (topTag === 'Y3') return 'Y3';
  if (topTwo.includes('Y2')) return 'Y2';
  if (topTwo.includes('D') && topTwo.includes('I')) return 'DI';

  return topTag;
}

export function getTopIdentity(finalScores: Record<string, number>): BeerIdentity {
  const tag = computeTopTag(finalScores);
  return BEER_IDENTITIES[tag] || BEER_IDENTITIES['G'];
}
