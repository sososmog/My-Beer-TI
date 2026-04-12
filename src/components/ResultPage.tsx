import { motion } from 'framer-motion';

interface ResultPageProps {
  onRestart: () => void;
  finalScores: Record<string, number>;
}

// 1. 严格对应你图片中的 21 种结果映射
const BEER_IDENTITIES: Record<string, string> = {
  G: "拉格守门员 / 传统派",
  A: "过桶主义者",
  Y1: "下水道赞助商",
  H: "浑浊的神",
  M: "陈醋收藏家",
  S: "甜水爱好者",
  DI: "酒蒙子",
  U: "Untappd分奴",
  B: "酒花本花",
  Y2: "液体蛋糕er",
  E: "老懂哥",
  R: "溢价受害者",
  Z: "颜值协会会长",
  D: "大卫·戴",
  I: "最硬の肝",
  Y3: "忍者",
  N: "酒单收割机",
  T: "社交之王",
  L: "Taproom背景板",
  V: "精酿pdd大亨"
};

export const ResultPage = ({ onRestart, finalScores }: ResultPageProps) => {
  
  // 2. 判定逻辑：找出得分最高的标签
  const getTopResult = () => {
    // 1. 拿到 D 和 I 的原始分数
    const dScore = finalScores['D'] || 0;
    const iScore = finalScores['I'] || 0;
    
    // 2. 排序拿到最高分的标签
    const sorted = Object.entries(finalScores)
      .filter(([tag]) => tag !== 'W') 
      .sort((a, b) => b[1] - a[1]); 

    const topTag = sorted[0]?.[0] || 'G';
    // 这里删掉了刚才报错的那行 const topScore...

    // 3. 执行判定
    if ((topTag === 'D' || topTag === 'I') && (dScore > 0 && iScore > 0)) {
       return BEER_IDENTITIES['DI'];
    }

    return BEER_IDENTITIES[topTag] || BEER_IDENTITIES['G'];
  };

  const userTitle = getTopResult();

  // 模拟雷达图数据展示（你可以根据实际 scores 动态映射这里）
  const metrics = [
    { label: 'Bitterness 苦度', val: `${Math.min((finalScores['B'] || 0) * 20, 100)}%`, desc: '苦味逻辑判定' },
    { label: 'Freshness 新鲜度', val: `${Math.min((finalScores['E'] || 0) * 15, 100)}%`, desc: '对新鲜日期的偏执' },
    { label: 'Hops 酒花香气', val: `${Math.min((finalScores['H'] || 0) * 20, 100)}%`, desc: '酒花炸弹受众' },
    { label: 'Body 醇厚度', val: `${Math.min((finalScores['A'] || 0) * 20, 100)}%`, desc: '对酒体厚度的追求' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-4 pb-12"
    >
      {/* Block 1: 核心身份卡 */}
      <div className="beer-card overflow-hidden text-center relative">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-beer-light rounded-full opacity-50 blur-3xl" />
        <div className="relative p-10 flex flex-col items-center text-gray-800">
          <span className="px-4 py-1 bg-beer-gold/10 text-beer-gold text-[10px] font-black rounded-full mb-4 tracking-widest uppercase">
            Your Identity
          </span>
          {/* 动态显示的标题 */}
          <h1 className="text-4xl font-black mb-2">{userTitle}</h1>
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] italic mb-6">
            Beer-TI Personality Analysis
          </p>
          
          <div className="w-24 h-24 bg-beer-light rounded-[2.5rem] flex items-center justify-center text-5xl shadow-inner mb-6">
             {userTitle.includes("浑浊") ? "🍹" : userTitle.includes("拉格") ? "🍺" : "🍷"}
          </div>
        </div>
      </div>

      {/* Block 2: 深度解读 (根据不同结果可以配置不同文本) */}
      <div className="beer-card p-8 border-l-4 border-beer-gold bg-white">
        <h3 className="text-[10px] font-black text-gray-400 tracking-widest mb-4 uppercase">Profile / 性格小样</h3>
        <p className="text-sm text-gray-600 leading-relaxed font-medium">
          经过算法对 27 道题目的深度扫描，你在精酿世界的行为模式更趋向于 <span className="text-beer-gold font-bold">{userTitle}</span>。
          这代表了你在饮酒选择上有着鲜明的个人风格，无论是对酒花的狂热还是对传统工艺的坚守，都是你品味基因的一部分。
        </p>
      </div>

      {/* Block 3: 感官指标 (由 finalScores 动态推导) */}
      <div className="beer-card p-8">
        <h3 className="text-[10px] font-black text-gray-400 tracking-widest mb-6 uppercase">Sensory Radar / 数据指标</h3>
        <div className="space-y-6">
          {metrics.map((item, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-[10px] font-bold mb-2 text-gray-600 uppercase">
                <span>{item.label}</span>
                <span className="text-beer-gold">{item.val}</span>
              </div>
              <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: item.val }}
                  transition={{ delay: 0.3 + idx * 0.1, duration: 1 }}
                  className="h-full bg-beer-gold rounded-full" 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Block 4: 社交推荐 */}
      <div className="flex gap-4">
        <div className="flex-1 beer-card p-6 flex flex-col items-center">
          <span className="text-[9px] font-bold text-gray-400 mb-3 uppercase tracking-tighter">Best Match</span>
          <span className="text-xs font-black text-gray-700">拉格清流</span>
        </div>
        <div className="flex-1 beer-card p-6 flex flex-col items-center">
          <span className="text-[9px] font-bold text-gray-400 mb-3 uppercase tracking-tighter">Avoid</span>
          <span className="text-xs font-black text-gray-700">工业水啤</span>
        </div>
      </div>

      {/* Action Block */}
      <div className="pt-6 space-y-3">
        <button className="w-full py-5 bg-beer-gold text-white rounded-[2rem] font-bold text-lg shadow-xl shadow-beer-gold/20 active:scale-95 transition-all">
          分享结果卡片
        </button>
        <button 
          onClick={onRestart} 
          className="w-full py-5 bg-white border border-gray-100 text-gray-400 rounded-[2rem] font-bold text-sm"
        >
          重新测试
        </button>
      </div>
    </motion.div>
  );
};