import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BEER_IDENTITIES } from '../data/personalities';
import { getAllStats } from '../lib/resultStats';

interface AllPersonalitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AllPersonalitiesModal = ({ isOpen, onClose }: AllPersonalitiesModalProps) => {
  const [stats, setStats] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    getAllStats()
      .then(data => setStats(data))
      .finally(() => setLoading(false));
  }, [isOpen]);

  const total = Object.values(stats).reduce((s, v) => s + v, 0);

  const identities = Object.values(BEER_IDENTITIES)
    .map(identity => ({
      ...identity,
      count: stats[identity.key] || 0,
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/20 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* 面板：从底部滑入 */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-[100] bg-beer-soft-bg rounded-t-[2rem] overflow-hidden"
            style={{ maxHeight: '92dvh' }}
          >
            {/* 拖动条 */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-gray-200 rounded-full" />
            </div>

            {/* 标题栏 */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100">
              <div>
                <h2 className="font-black text-gray-800 text-lg tracking-tight">精酿人格图鉴</h2>
                {total > 0 && (
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    共 <span className="text-beer-gold font-bold">{total.toLocaleString()}</span> 次测试结果
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* 滚动内容 */}
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(92dvh - 100px)' }}>
              <div className="max-w-lg mx-auto px-4 py-4 space-y-3 pb-10">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-16 space-y-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      className="w-8 h-8 border-2 border-beer-gold border-t-transparent rounded-full"
                    />
                    <p className="text-xs text-gray-400">加载中...</p>
                  </div>
                ) : (
                  identities.map(({ key, title, img, desc, count }) => {
                    const pct = total > 0 ? (count / total * 100).toFixed(1) : null;
                    return (
                      <div key={key} className="beer-card overflow-hidden">
                        <div className="flex gap-4 p-5">
                          <img
                            src={img}
                            alt={title}
                            className="w-20 h-20 rounded-2xl object-cover flex-shrink-0 bg-gray-100"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-black text-gray-800 text-base mb-1">{title}</h3>
                            <p className="text-[11px] text-gray-500 leading-relaxed italic line-clamp-3">
                              "{desc}"
                            </p>
                            <div className="flex items-center gap-1.5 mt-2">
                              <span className="text-[10px] font-black text-beer-gold">
                                {pct !== null
                                  ? `${count.toLocaleString()} 人 · 占比 ${pct}%`
                                  : '暂无数据'}
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* 底部进度条 */}
                        {pct !== null && (
                          <div className="h-0.5 bg-gray-100">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.8, delay: 0.1 }}
                              className="h-full bg-beer-gold/40"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
