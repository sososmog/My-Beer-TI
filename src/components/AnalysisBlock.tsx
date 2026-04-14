import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface AnalysisBlockProps {
  scores: Record<string, number>;
}

export const AnalysisBlock = ({ scores }: AnalysisBlockProps) => {
  const dimensions = useMemo(() => {
    // 辅助函数：计算 A 占 (A+B) 的百分比，保底 50%
    const calcRatio = (sideA: number[], sideB: number[]) => {
      const scoreA = sideA.reduce((sum, tag) => sum + (scores[tag] || 0), 0);
      const scoreB = sideB.reduce((sum, tag) => sum + (scores[tag] || 0), 0);
      if (scoreA === 0 && scoreB === 0) return 50;
      return Math.round((scoreA / (scoreA + scoreB)) * 100);
    };

    return [
      {
        label: "社交倾向",
        left: "独饮者",
        right: "社交达人",
        // T 是社交，L 是独饮
        value: calcRatio(['T'], ['L']), 
      },
      {
        label: "品类倾向",
        left: "经典派",
        right: "潮流极客",
        // H/B/A/M/S 是潮流，G 是经典
        value: calcRatio(['H', 'B', 'A', 'M', 'S', 'Y2'], ['G']),
      },
      {
        label: "清醒倾向",
        left: "理性品鉴",
        right: "派对战神",
        // D/I 是战斗，E/N/U 是理性
        value: calcRatio(['D', 'I'], ['E', 'N', 'U']),
      },
      {
        label: "消费倾向",
        left: "性价比党",
        right: "颜值溢价",
        // R/Z 是溢价，V 是性价比
        value: calcRatio(['R', 'Z'], ['V']),
      }
    ];
  }, [scores]);

  return (
    <div className="beer-card p-8">
      <div className="mb-8">
        <h3 className="text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase mb-1 text-center">Dimension Analysis</h3>
        <h2 className="text-2xl font-black text-gray-800 tracking-tight text-center">品味维度图谱</h2>
      </div>

      <div className="space-y-8">
        {dimensions.map((dim, index) => (
          <div key={dim.label} className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-beer-gold bg-beer-light px-2 py-0.5 rounded uppercase">
                {dim.label}
              </span>
              <span className="text-[10px] font-bold text-gray-300 italic">
                {dim.value > 50 ? `偏向${dim.right}` : `偏向${dim.left}`}
              </span>
            </div>
            
            <div className="relative flex items-center h-6">
              {/* 背景轨道 */}
              <div className="absolute w-full h-1.5 bg-gray-100 rounded-full" />
              
              {/* 进度条 (从 50% 向两边或单向延伸，这里采用直观的滑动点设计) */}
              <motion.div 
                initial={{ left: "50%" }}
                animate={{ left: `${dim.value}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className="absolute w-4 h-4 bg-white border-4 border-beer-gold rounded-full shadow-md z-10"
                style={{ translateX: "-50%" }}
              />

              {/* 填充色 */}
              <motion.div 
                initial={{ width: 0, left: "50%" }}
                animate={dim.value > 50 
                  ? { width: `${dim.value - 50}%`, left: "50%" } 
                  : { width: `${50 - dim.value}%`, left: `${dim.value}%` }
                }
                className="absolute h-1.5 bg-beer-gold/30 rounded-full"
              />
            </div>

            <div className="flex justify-between px-1">
              <span className={`text-[10px] font-bold ${dim.value <= 50 ? 'text-gray-800' : 'text-gray-300'}`}>
                {dim.left}
              </span>
              <span className={`text-[10px] font-bold ${dim.value > 50 ? 'text-gray-800' : 'text-gray-300'}`}>
                {dim.right}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
        <p className="text-[11px] text-gray-400 text-center leading-relaxed">
          维度越偏向两端，代表你的精酿偏好越极端。<br />
          50% 代表你在该领域处于平衡或尚未解锁特定偏好。
        </p>
      </div>
    </div>
  );
};