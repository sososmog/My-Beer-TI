import { motion } from 'framer-motion';
import { ShareBlock } from './ShareBlock'; 
import { AnalysisBlock } from './AnalysisBlock';


interface ResultPageProps {
  onRestart: () => void;
  finalScores: Record<string, number>;
}

// 1. 完善后的映射表：包含标题、图片路径和深度评语
const BEER_IDENTITIES: Record<string, { title: string; img: string; desc: string }> = {
  G: { 
    title: "拉格守门员 / 传统派", 
    img: "/imgs/G.png", 
    desc: "“任尔东西南北风，我自岿然喝拉格。”你对《纯净法》的忠诚超过了对初恋的记忆。在充满果泥的混乱世界里，你手里那一杯清亮干爽的皮尔森就是最后的文明。"
  },
  A: { 
    title: "过桶主义者", 
    img: "/imgs/A.png", 
    desc: "“时间是最好的酿酒师，橡木桶是它的画笔。”你对波本、雪莉、波特桶的痴迷近乎信仰。10度以下的酒对你来说只是饮料，只有在木桶里睡过两年的液体才配得上你深沉的灵魂。"
  },
  Y1: { 
    title: "下水道赞助商", 
    img: "/imgs/Y1.png", 
    desc: "“人生苦短，不喝烂酒。”哪怕是千元一瓶的顶级货，只要风味偏了一丝氧化，你也会毫不犹豫地把它请进下水道。你对品质的坚持，是酿酒师最害怕的噩梦。"
  },
  H: { 
    title: "浑浊的神", 
    img: "/imgs/H.png", 
    desc: "“不浑，不喝。”你的血管里流的都是西楚和马赛克的果汁。你对新鲜日期的偏执近乎强迫症，如果你在店里，那一定是在顶光下观察那杯果汁的透明度（最好是零）。"
  },
  M: { 
    title: "陈醋收藏家", 
    img: "/imgs/M.png", 
    desc: "“酸到眯眼，才是真爱。”你对兰比克和野菌发酵的热爱常人难以理解。当别人被“马厩味”劝退时，你正沉浸在时间的艺术中，品味那份优雅的尖锐。"
  },
  S: { 
    title: "甜水爱好者", 
    img: "/imgs/S.png", 
    desc: "“生活已经够苦了，啤酒必须是甜的。”香草、巧克力、枫糖……你致力于把精酿喝成液态甜品店。你是甜品世涛和果泥酸的死忠，糖分是你快乐的合法来源。"
  },
  DI: { 
    title: "酒蒙子", 
    img: "/imgs/D-I.png", 
    desc: "“度数要高，速度要快。”你就是酒精的终结者。无论是15度的帝国世涛还是大杯拉格，在你面前都只有干杯这一个结局。你是精酿圈酒精耐受力的天花板。"
  },
  U: { 
    title: "Untappd分奴", 
    img: "/imgs/U.png", 
    desc: "“手机先喝，徽章先拿。”没打卡的酒等于没喝，没评分的酒没有灵魂。你的人生成就感有一半来自于那个不断增长的 Unique Check-in 数字。"
  },
  B: { 
    title: "酒花本花", 
    img: "/imgs/B.png", 
    desc: "“如果不够苦，那一定是你没放够酒花。”你对 IBU 的追求没有上限。当别人在抱怨西海岸 IPA 像药水时，你正闭眼享受那种直击灵魂的松脂香。"
  },
  Y2: { 
    title: "液体蛋糕er", 
    img: "/imgs/Y2.png", 
    desc: "比起酒，你更像是在喝一杯可以让人微醺的下午茶。你是“液态甜品”的忠实信徒，任何能让啤酒喝起来像黑森林蛋糕的增味都会让你疯狂。"
  },
  E: { 
    title: "老懂哥", 
    img: "/imgs/E.png", 
    desc: "“这款酒的干投逻辑其实是……”你是移动的精酿百科全书。无论是酒花组合还是发酵曲线都能信手拈来。虽然让同桌压力山大，但没人能否定你对专业的敬畏。"
  },
  R: { 
    title: "溢价受害者", 
    img: "/imgs/R.png", 
    desc: "“贵不是它的缺点，穷才是我的错。”你永远在追求需要配货、搭售、人肉代购的稀缺货。虽然钱包在滴血，但当神酒开启时，那份虚荣感比酒精更醉人。"
  },
  Z: { 
    title: "颜值协会会长", 
    img: "/imgs/Z.png", 
    desc: "“酒标好看，酒就好喝了一半。”你是视觉系的信徒。一张设计精良的纸标或是一个异形的酒瓶，就能瞬间击穿你的钱包。毕竟，审美也是一种生产力。"
  },
  D: { 
    title: "大卫·戴", 
    img: "/imgs/D.png", 
    desc: "你是一个稳定输出的饮酒机器。不求最贵，但求最稳。你是精酿圈里的“劳模”，哪里有酒，哪里就有你忙碌的身影。"
  },
  I: { 
    title: "最硬の肝", 
    img: "/imgs/I.png", 
    desc: "酒精对你来说只是数字。你是夜晚的守望者，当所有人都倒下时，你依然能清醒地叫出下一轮酒。你的肝脏大概是钛合金做的。"
  },
  Y3: { 
    title: "忍者", 
    img: "/imgs/Y3.png", 
    desc: "“大隐隐于市，好酒藏于喉。”你从不吹嘘，很少打卡。你只是坐在角落，默默喝掉全场最贵、评分最高的神酒，然后像风一样消失在夜色中。"
  },
  N: { 
    title: "酒单收割机", 
    img: "/imgs/N.png", 
    desc: "进店第一件事不是看酒，而是看酒单上有几个坑没填过。你对新鲜感的追求永无止境，是酒厂最喜欢的“开荒者”。"
  },
  T: { 
    title: "社交之王", 
    img: "/imgs/T.png", 
    desc: "“酒不重要，和你喝酒才重要。”你是 Taproom 里的粘合剂，能从酒花聊到宇宙起源。一群人喝才叫精酿生活，一个人喝那叫酒精摄入。"
  },
  L: { 
    title: "Taproom背景板", 
    img: "/imgs/L.png", 
    desc: "你已经和店里的装修融为一体了。店员甚至不需要问你喝什么，因为你永远在那张固定的椅子上，见证着每一桶酒的开启与枯竭。"
  },
  V: { 
    title: "精酿pdd大亨", 
    img: "/imgs/V.png", 
    desc: "“性价比是灵魂。”你总能找到全网最低的拼团价，或者是临期打折的顶级大货。你用最少的预算喝到了最多的高分酒，精酿圈的理财大师。"
  }
};

export const ResultPage = ({ onRestart, finalScores }: ResultPageProps) => {
  
  const getTopResult = () => {
    const dScore = finalScores['D'] || 0;
    const iScore = finalScores['I'] || 0;
    const sorted = Object.entries(finalScores)
      .filter(([tag]) => tag !== 'W')
      .sort((a, b) => b[1] - a[1]);
    const topTag = sorted[0]?.[0] || 'G';

    if ((topTag === 'D' || topTag === 'I') && (dScore > 0 && iScore > 0)) {
      return BEER_IDENTITIES['DI'];
    }
    return BEER_IDENTITIES[topTag] || BEER_IDENTITIES['G'];
  };

  const result = getTopResult();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-4 pb-12"
    >
      {/* 核心结果 Block */}
      <div className="beer-card overflow-hidden text-center relative border-t-8 border-beer-gold">
        <div className="p-8 flex flex-col items-center">
          <h2 className="text-sm font-black text-gray-400 mb-6 tracking-widest uppercase">
            你的精酿人格是：
          </h2>

          {/* 图片容器 */}
          <div className="w-full aspect-square max-w-[280px] mb-8 overflow-hidden rounded-[2.5rem] shadow-2xl bg-white border-4 border-gray-50 p-2">
            <img 
              src={result.img} 
              alt={result.title} 
              className="w-full h-full object-cover rounded-3xl" 
            />
          </div>

          <h1 className="text-3xl font-black text-gray-800 mb-4">{result.title}</h1>
          
          {/* 新增：评语展示区 */}
          <div className="px-4 py-6 bg-gray-50/50 rounded-2xl border border-gray-100">
            <p className="text-sm text-gray-600 leading-relaxed font-medium italic">
              “{result.desc}”
            </p>
          </div>
        </div>
      </div>

      {/* --- 2. 插入维度分析 Block --- */}
      <AnalysisBlock scores={finalScores} />

      {/* 分享block */}
      <ShareBlock result={result} scores={finalScores} />

      {/* 按钮区 */}
      <div className="pt-6 space-y-3">
        <button className="w-full py-5 bg-beer-gold text-white rounded-[2rem] font-bold text-lg shadow-xl shadow-beer-gold/20 active:scale-95 transition-all">
          分享这张身份卡
        </button>
        <button onClick={onRestart} className="w-full py-5 bg-white border border-gray-100 text-gray-400 rounded-[2rem] font-bold text-sm">
          重新鉴定
        </button>
      </div>
    </motion.div>
  );
};