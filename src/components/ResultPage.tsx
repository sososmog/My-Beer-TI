import { motion } from 'framer-motion';

interface ResultPageProps {
  onRestart: () => void;
  finalScores: Record<string, number>;
}

// 映射表：包含标题和对应的图片路径
const BEER_IDENTITIES: Record<string, { title: string; img: string }> = {
  G: { title: "拉格守门员 / 传统派", img: "/imgs/G.png" },
  A: { title: "过桶主义者", img: "/imgs/A.png" },
  Y1: { title: "下水道赞助商", img: "/imgs/Y1.png" },
  H: { title: "浑浊的神", img: "/imgs/H.png" },
  M: { title: "陈醋收藏家", img: "/imgs/M.png" },
  S: { title: "甜水爱好者", img: "/imgs/S.png" },
  DI: { title: "酒蒙子", img: "/imgs/D-I.png" }, // 匹配你截图中的文件名
  U: { title: "Untappd分奴", img: "/imgs/U.png" },
  B: { title: "酒花本花", img: "/imgs/B.png" },
  Y2: { title: "液体蛋糕er", img: "/imgs/Y2.png" },
  E: { title: "老懂哥", img: "/imgs/E.png" },
  R: { title: "溢价受害者", img: "/imgs/R.png" },
  Z: { title: "颜值协会会长", img: "/imgs/Z.png" },
  D: { title: "大卫·戴", img: "/imgs/D.png" },
  I: { title: "最硬の肝", img: "/imgs/I.png" },
  Y3: { title: "忍者", img: "/imgs/Y3.png" },
  N: { title: "酒单收割机", img: "/imgs/N.png" },
  T: { title: "社交之王", img: "/imgs/T.png" },
  L: { title: "Taproom背景板", img: "/imgs/L.png" },
  V: { title: "精酿pdd大亨", img: "/imgs/V.png" }
};

export const ResultPage = ({ onRestart, finalScores }: ResultPageProps) => {
  
  // 判定逻辑：找出最高分
  const getTopResult = () => {
    const dScore = finalScores['D'] || 0;
    const iScore = finalScores['I'] || 0;
    
    const sorted = Object.entries(finalScores)
      .filter(([tag]) => tag !== 'W')
      .sort((a, b) => b[1] - a[1]);

    const topTag = sorted[0]?.[0] || 'G';

    // 酒蒙子特殊判定
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
      {/* --- 核心结果卡片 --- */}
      <div className="beer-card overflow-hidden relative">
        <div className="p-8 flex flex-col items-center">
          <span className="text-[10px] font-black text-beer-gold tracking-[0.3em] uppercase mb-6">
            Identity Unlocked
          </span>

          {/* 身份图片展示区 */}
          <div className="w-full aspect-square max-w-[280px] mb-8 overflow-hidden rounded-[2.5rem] shadow-2xl bg-gray-50 border-4 border-white">
            <img 
              src={result.img} 
              alt={result.title} 
              className="w-full h-full object-cover"
              // 如果图片加载失败的保底处理
              onError={(e) => (e.currentTarget.src = "https://placehold.co/400x400?text=Beer")} 
            />
          </div>

          <h1 className="text-3xl font-black text-gray-800 tracking-tight text-center">
            {result.title}
          </h1>
        </div>
      </div>

      {/* --- 维度分析 (进度条保持不变) --- */}
      <div className="beer-card p-8">
        <h3 className="text-[10px] font-black text-gray-400 tracking-widest mb-6 uppercase">Data Analysis</h3>
        <div className="space-y-4">
          {Object.entries(finalScores)
            .filter(([tag, val]) => val > 0 && tag !== 'W')
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([tag, val]) => (
              <div key={tag} className="flex items-center gap-4">
                <span className="text-[10px] font-bold text-gray-400 w-8">{tag}</span>
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(val * 20, 100)}%` }}
                    className="h-full bg-beer-gold"
                  />
                </div>
                <span className="text-[10px] font-black text-beer-gold">+{val}</span>
              </div>
            ))}
        </div>
      </div>

      {/* --- 操作按钮 --- */}
      <div className="pt-6 space-y-3">
        <button className="w-full py-5 bg-beer-gold text-white rounded-[2rem] font-bold text-lg shadow-xl shadow-beer-gold/20 active:scale-95 transition-all">
          保存身份卡片
        </button>
        <button 
          onClick={onRestart}
          className="w-full py-5 bg-white border border-gray-100 text-gray-400 rounded-[2rem] font-bold text-sm"
        >
          重新鉴定
        </button>
      </div>
    </motion.div>
  );
};