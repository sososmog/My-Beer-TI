export interface Option {
  text: string;
  impact: Record<string, number>;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export const questions: Question[] = [
  {
    id: 1,
    text: "你是否对某一种酒花特别喜爱/厌恶？",
    options: [
      { text: "是", impact: { E: 0.4 } },
      { text: "否", impact: { W: 0.4 } }
    ]
  },
  {
    id: 2,
    text: "你买了一罐需要预售并且配货的酒，等待了一个月，终于到手，但却发现有点难喝，但又没有难喝到完全喝不下去，你会把它倒掉，还是忍忍继续喝完？",
    options: [
      { text: "直接进入下水道", impact: { E: 0.4, Y1: 7.0 } },
      { text: "再喝几口等等看，也许等会儿会有变化呢？", impact: { V: 0.6 } },
      { text: "我的钱不是钱啊？绝不浪费，保证喝完！", impact: { V: 0.6, Y3: 7.0 } }
    ]
  },
  {
    id: 3,
    text: "你是否会因为某家酒厂的酒标设计/酒款名称符合你的审美而剁手？",
    options: [
      { text: "是。酒标/酒名设计也是啤酒的一部分，直接下单！", impact: { Z: 7.0 } },
      { text: "否。我买的是罐子里的酒又不是罐子…", impact: { V: 0.6 } }
    ]
  },
  {
    id: 4,
    text: "你认为啤酒应该是什么颜色的？",
    options: [
      { text: "透亮的黄色", impact: { G: 3.5 } },
      { text: "浑浊的鹅黄色", impact: { H: 7.0 } },
      { text: "深邃的黑色", impact: { A: 3.5 } },
      { text: "高雅的琥珀色", impact: { M: 2.0 } },
      { text: "I don't car", impact: { W: 0.9 } }
    ]
  },
  {
    id: 5,
    text: "你走进一家taproom，上面有一款最近才上枪的新酒看起来非常对你的胃口，今晚你只能喝一杯，但你查到Untappd上这款的分比你想象中低的多，你会喝这款吗？",
    options: [
      { text: "群众的眼睛是雪亮的，大概率不好喝，还是算了吧", impact: { U: 4.0 } },
      { text: "没人比我更懂酒。我喜欢哪个喝哪个！", impact: { E: 1.5 } },
      { text: "什么是Untappd？没听过", impact: { W: 0.9 } }
    ]
  },
  {
    id: 6,
    text: "一款刚刚发售的IPA，有非常新鲜的罐子，500ml售价95元，同时你所在的城市有生啤上枪，330ml售价110元，生啤和罐子的灌装日期相同。你会选择哪个？",
    options: [
      { text: "既然日期一样，罐子比生啤能差到哪去？肯定买罐子", impact: { W: 0.9, V: 0.6 } },
      { text: "既然它叫生啤肯定有它的道理，有生啤我肯定不喝罐子", impact: { R: 2.0, E: 0.4 } }
    ]
  },
  {
    id: 7,
    text: "你愿意为喝一次IPA花多少钱？",
    options: [
      { text: "50左右吧，啤酒能值多少钱？", impact: { V: 0.6 } },
      { text: "80-120？罐子大概就是这个价", impact: { E: 0.4 } },
      { text: "200多也随它去，只要够好喝，不差这一点", impact: { E: 0.4, R: 2.0 } }
    ]
  },
  {
    id: 8,
    text: "你对待合酿的看法是？",
    options: [
      { text: "我喜欢合酿！强强联手结果不会差", impact: { R: 2.0 } },
      { text: "没什么感觉，就是一款酒罢了", impact: { W: 0.9 } },
      { text: "合酿都是圈钱的", impact: { V: 0.6 } }
    ]
  },
  {
    id: 9,
    text: "你在taproom喝酒，今晚的预算只够买一杯了，酒单上有一款你喝过的还不错的生啤，还有一款名气很大刚刚签了进口商的生啤，第一次引进国内，你会选择哪款？",
    options: [
      { text: "喝过的谁还再喝啊，我要试试新的", impact: { N: 3.5 } },
      { text: "新的说不定踩雷，我还是求稳喝杯好喝的吧", impact: { G: 2.0 } },
      { text: "都快没钱了还喝啊？我回家了", impact: { V: 1.5 } }
    ]
  },
  {
    id: 10,
    text: "周五你累了一天，晚上决定去喝点，你会准备喝多少？",
    options: [
      { text: "小酌一杯刚刚好", impact: { V: 0.6 } },
      { text: "我要爽喝，喝到量就停", impact: { E: 0.4 } },
      { text: "我既然来了，就没打算醒着回去", impact: { D: 2.0 } }
    ]
  },
  {
    id: 11,
    text: "如果你中了诅咒，这一辈子只能喝一款酒，你会选择喝什么？",
    options: [
      { text: "稳定又清爽的拉格/皮尔森", impact: { G: 3.5 } },
      { text: "充满香气的IPA", impact: { H: 7.0 } },
      { text: "复杂厚重的世涛", impact: { A: 3.5 } },
      { text: "优雅明亮的酸", impact: { M: 3.5 } },
      { text: "甜美的果泥", impact: { S: 3.0 } }
    ]
  },
  {
    id: 12,
    text: "你是否愿意加价/搭货购买一款号称非常好喝非常稀缺的IPA？",
    options: [
      { text: "没必要，溢价就是智商税，好喝的多得是", impact: { V: 3.5 } },
      { text: "我愿意，体验无法用金钱衡量", impact: { R: 2.0 } }
    ]
  },
  {
    id: 13,
    text: "如果一款酒的IBU为100，你会选择喝吗？",
    options: [
      { text: "啤酒就应该是苦的！我准备好了", impact: { B: 7.3 } },
      { text: "我不是m，我不想受虐，还是喝点好喝的吧", impact: { S: 2.0 } },
      { text: "IBU是什么？", impact: { W: 0.9 } }
    ]
  },
  {
    id: 14,
    text: "你认为一杯好喝的浑浊IPA应该是多少度？",
    options: [
      { text: "8度以下吧。淡淡的就会顺顺的", impact: { T: 1.0 } },
      { text: "8度以上但别太高吧。Double刚好，Single太淡，平衡一点刚好", impact: { E: 0.4 } },
      { text: "三倍四倍才够猛！有点度数才够爆炸！", impact: { D: 1.0, I: 5.0 } }
    ]
  },
  {
    id: 15,
    text: "你在啤酒节买了畅饮票，进去发现有一款你之前喝过的生啤A，同时还有四五款你今天非常想要尝试的，但你的酒量只有三罐，你决定先喝A，你会选择什么杯型？",
    options: [
      { text: "先干他一品脱（473ml）再说", impact: { D: 3.0 } },
      { text: "一大杯太多了，喝个330ml刚刚好", impact: { E: 0.4 } },
      { text: "尝一个Taster拿拿味吧，我还有其他的要喝", impact: { N: 3.5 } }
    ]
  },
  {
    id: 16,
    text: "你对于大蒜增味啤酒怎么看?",
    options: [
      { text: "啤酒里出现这玩意是倒反天罡，应该判酿酒师几年", impact: { G: 1.75 } },
      { text: "不管加什么，只要酿的好喝就行了", impact: { E: 1.0 } },
      { text: "你怎么知道我喜欢大蒜的？", impact: { D: 1.0 } }
    ]
  },
  {
    id: 17,
    text: "你喝到一款非常好喝的酒，是否会再次下单多买几罐（同一批次）？",
    options: [
      { text: "会，好喝肯定多买几罐啊", impact: { D: 2.0 } },
      { text: "不会，再好喝喝一罐也够了，我宁愿喝点其他的", impact: { E: 0.4 } }
    ]
  },
  {
    id: 18,
    text: "你觉得桶味对于世涛的影响有多大？",
    options: [
      { text: "世涛就要过桶！不过桶的世涛谁喝啊", impact: { A: 1.0 } },
      { text: "影响不大吧，甜品世涛不过桶也很好喝", impact: { S: 2.0, Y2: 3.5 } },
      { text: "什么是桶味？", impact: { D: 1.0 } }
    ]
  },
  {
    id: 19,
    text: "你怎么看待加入香草/巧克力的“液体蛋糕”帝国世涛？",
    options: [
      { text: "这也太腻了，我不喜欢", impact: { G: 1.75 } },
      { text: "我喜欢甜品，很甜的世涛也会很好喝", impact: { S: 3.0, Y2: 3.5 } }
    ]
  },
  {
    id: 20,
    text: "当你拿起一罐啤酒时，你会去查询它的酒花品种吗？",
    options: [
      { text: "会。我喜欢研究酒花", impact: { E: 1.5 } },
      { text: "不会。好喝就行了，酒花组合不重要", impact: { W: 0.9 } }
    ]
  },
  {
    id: 21,
    text: "有人说酒体里有轻微的臭鼬味，你会怎么看？",
    options: [
      { text: "你在这装什么b呢？", impact: { W: 0.9 } },
      { text: "查查什么是臭鼬味，自己尝一尝", impact: { E: 1.5 } },
      { text: "动物我不懂，我喝着没怪味就行", impact: { D: 1.0 } }
    ]
  },
  {
    id: 22,
    text: "一个人去taproom喝酒，你会坐到吧台吗？",
    options: [
      { text: "会", impact: { T: 3.0 } },
      { text: "不会", impact: { L: 3.6 } }
    ]
  },
  {
    id: 23,
    text: "你会自己一个人喝酒吗？",
    options: [
      { text: "会", impact: { L: 3.6 } },
      { text: "不会", impact: { T: 3.0 } }
    ]
  },
  {
    id: 24,
    text: "朋友说有款啤酒喝着像醋，闻着像没洗的袜子，你的第一反应是？",
    options: [
      { text: "这酒坏了吧", impact: { G: 1.25 } },
      { text: "离我远点", impact: { D: 1.0 } },
      { text: "这是时间的艺术，是桶陈的吗？", impact: { M: 2.0, A: 2.0, E: 0.5 } }
    ]
  },
  {
    id: 25,
    text: "关于混酿(Blending)的概念，如将不同年份的兰比克混合，你有什么看法？",
    options: [
      { text: "太复杂了bro，我只在乎最后整出来好不好喝", impact: { W: 0.9 } },
      { text: "这也太能体现酿酒师的水平了，比例就是艺术", impact: { M: 2.0, A: 2.0, E: 2.0 } }
    ]
  },
  {
    id: 26,
    text: "一群朋友打电话约你出去喝酒，但他们平时不喝精酿，你会怎么说：",
    options: [
      { text: "白的红的我都能喝，大绿棒子我也来者不拒", impact: { W: 0.9, D: 1.0 } },
      { text: "大家有没有想喝点精酿，你们之前没喝过的？", impact: { T: 1.0 } },
      { text: "我不喝工业拉格，没喝过精酿的算你这辈子白活了", impact: { D: 1.0, E: 0.5 } }
    ]
  },
  {
    id: 27,
    text: "你从店员手上接到一杯刚打出来的酒，你会：",
    options: [
      { text: "谁能忍住不先喝一口？", impact: { D: 1.0 } },
      { text: "先看一看，再闻一闻，最后喝一口尝一尝", impact: { E: 1.0 } },
      { text: "找个有顶光的地方先拍照，要不等会儿不好打卡了", impact: { U: 4.0 } }
    ]
  }
];