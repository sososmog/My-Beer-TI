import { motion } from 'framer-motion';

interface ResultPageProps {
  onRestart: () => void;
  finalScores: Record<string, number>;
}

export const ResultPage = ({ onRestart, finalScores }: ResultPageProps) => {
  //Test
  console.log("最终得分:", finalScores);

  const metrics = [
    { label: 'Bitterness 苦度', val: '40%', desc: '点到为止的社交礼仪' },
    { label: 'Sweetness 甜感', val: '85%', desc: '糖分是快乐的合法来源' },
    { label: 'Hops 酒花香气', val: '95%', desc: '热带水果的忠实信徒' },
    { label: 'Body 醇厚度', val: '75%', desc: '拒绝水感，追求肉质' }
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
          <h1 className="text-4xl font-black mb-2">浑浊发烧友</h1>
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] italic mb-6">
            Hazy IPA Evangelist
          </p>
          <div className="w-24 h-24 bg-beer-light rounded-[2.5rem] flex items-center justify-center text-5xl shadow-inner mb-6">🍹</div>
          <div className="flex flex-wrap justify-center gap-2">
            {['柑橘调', '厚重质感', '酒花炸弹'].map(tag => (
              <span key={tag} className="px-3 py-1 bg-gray-50 text-gray-400 text-[10px] rounded-lg font-bold border border-gray-100 italic">#{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Block 2: 深度解读 (Profile - 已移至上方) */}
      <div className="beer-card p-8 border-l-4 border-beer-gold bg-white">
        <h3 className="text-[10px] font-black text-gray-400 tracking-widest mb-4 uppercase">Profile / 性格小样</h3>
        <p className="text-sm text-gray-600 leading-relaxed font-medium">
          你并不在乎啤酒是否透明。对你来说，那层像橙汁一样的浑浊酒液才蕴含着灵魂。你追求热带水果的爆发力，宁愿在超市排队抢最新的配货，也不愿喝一口索然无味的工业拉格。
        </p>
      </div>

      {/* Block 3: 感官指标 (Radar - 已移至下方) */}
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
          <span className="text-xs font-black text-gray-700">世涛老炮</span>
        </div>
      </div>

      {/* Action Block */}
      <div className="pt-6 space-y-3">
        <button className="w-full py-5 bg-beer-gold text-white rounded-[2rem] font-bold text-lg shadow-xl shadow-beer-gold/20 active:scale-95 transition-all">保存结果卡片</button>
        <button onClick={onRestart} className="w-full py-5 bg-white border border-gray-100 text-gray-400 rounded-[2rem] font-bold text-sm">重新测试</button>
      </div>
    </motion.div>
  );
};