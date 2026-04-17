import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { questions } from './data/questions'; 
import { ResultPage } from './components/ResultPage';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function App() {
  // --- 状态管理 ---
  const [step, setStep] = useState<'home' | 'quiz' | 'result'>('home');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userChoices, setUserChoices] = useState<Record<number, number>>({});
  const [shuffledQuestions, setShuffledQuestions] = useState(questions);

  const totalQuestions = shuffledQuestions.length;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  // --- 逻辑处理 ---

  const handleOptionClick = (optionIndex: number) => {
    // 1. 记录选择
    setUserChoices(prev => ({
      ...prev,
      [currentIndex]: optionIndex
    }));

    // 2. 瞬间跳转，不留残影
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const getFinalScores = () => {
    const finalScores: Record<string, number> = {};
    Object.entries(userChoices).forEach(([qIdx, optIdx]) => {
      const impact = shuffledQuestions[Number(qIdx)].options[optIdx].impact;
      Object.entries(impact).forEach(([tag, value]) => {
        finalScores[tag] = (finalScores[tag] || 0) + value;
      });
    });
    return finalScores;
  };

  const reset = () => {
    setStep('home');
    setCurrentIndex(0);
    setUserChoices({});
    setShuffledQuestions(questions);
  };

  return (
    <div className="min-h-screen flex flex-col bg-beer-soft-bg font-sans selection:bg-beer-light">
      
      {/* --- 1. Topbar --- */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white/70 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-beer-gold rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white font-black text-sm">B</span>
          </div>
          <span className="font-bold text-gray-800 tracking-tight">Beer Identity</span>
        </div>
        
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/sososmog/My-Beer-TI"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-700 transition-colors"
            aria-label="GitHub"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <AnimatePresence>
          {step !== 'home' && (
            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onClick={reset}
              className="text-[10px] font-bold text-gray-400 border border-gray-200 px-3 py-1 rounded-full hover:border-beer-gold hover:text-beer-gold transition-colors"
            >
              {step === 'result' ? 'RESTART' : 'QUIT'}
            </motion.button>
          )}
        </AnimatePresence>
        </div>
      </nav>

      {/* --- 2. 主体内容 --- */}
      <main className="flex-1 flex flex-col items-center px-4 pt-24 pb-6 max-w-lg mx-auto w-full">
        
        {/* --- 场景 A: 首页 --- */}
        {step === 'home' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center px-4"
          >
            <div className="w-24 h-24 bg-beer-light rounded-[2.5rem] flex items-center justify-center mb-10 text-5xl shadow-inner relative">
              🍺
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-beer-gold rounded-full border-4 border-beer-soft-bg" />
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
              探索你的<br /><span className="text-beer-gold">精酿品味基因</span>
            </h1>
            <p className="text-gray-400 text-sm mb-12 leading-relaxed max-w-[280px]">
              基于 {totalQuestions} 道深度感官题目，<br />揭示你在精酿世界的真实身份。
            </p>
            <button 
              onClick={() => { setShuffledQuestions(shuffle(questions)); setStep('quiz'); }}
              className="w-full py-5 bg-beer-gold text-white rounded-[2rem] font-bold text-lg shadow-xl shadow-beer-gold/30 hover:scale-[1.02] active:scale-95 transition-all"
            >
              开始性格鉴定
            </button>
          </motion.div>
        )}

        {/* --- 场景 B: 测试页 --- */}
        {step === 'quiz' && (
          <div className="w-full space-y-4">
            <div className="w-full beer-card p-6">
              <div className="flex justify-between items-baseline mb-3 px-2">
                <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">
                  Progress <span className="text-beer-gold text-lg ml-1">{currentIndex + 1}</span> / {totalQuestions}
                </span>
                <span className="text-sm font-black text-beer-gold">{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full foam-progress rounded-full" 
                  animate={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <motion.div 
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }} // 缩短卡片切题动画时间，让反馈更快
              className="w-full beer-card p-8 flex flex-col min-h-[450px]"
            >
              <div className="mb-8">
                <span className="px-3 py-1 bg-beer-light text-beer-gold text-[10px] rounded-md font-bold uppercase tracking-wider">
                  Question {currentIndex + 1}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold leading-snug mb-10 text-gray-800">
                {shuffledQuestions[currentIndex].text}
              </h2>

              <div className="space-y-3 mb-10">
                {shuffledQuestions[currentIndex].options.map((opt, i) => {
                  const isSelected = userChoices[currentIndex] === i;
                  return (
                    <button 
                      key={i} 
                      onClick={() => handleOptionClick(i)}
                      className={`group w-full flex items-center p-5 rounded-2xl border transition-all active:scale-[0.98] ${
                        isSelected 
                        ? 'border-beer-gold bg-beer-light' 
                        : 'bg-gray-50/50 border-gray-100 hover:border-beer-gold hover:bg-white'
                      }`}
                    >
                      <span className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold mr-4 transition-colors text-xs ${
                        isSelected ? 'bg-beer-gold text-white' : 'bg-white text-gray-400 group-hover:bg-beer-gold group-hover:text-white'
                      }`}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className={`text-sm font-medium text-left leading-tight ${
                        isSelected ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-800'
                      }`}>
                        {opt.text}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* 底部导航区域 */}
              <div className="mt-auto flex gap-3">
                <button 
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex(prev => prev - 1)}
                  className={`py-4 bg-gray-50 border border-gray-100 rounded-2xl text-[10px] font-black text-gray-400 hover:text-gray-600 disabled:opacity-0 transition-all uppercase tracking-widest active:scale-95 ${
                    userChoices[currentIndex] !== undefined ? 'px-6' : 'w-full'
                  }`}
                >
                  ← PREV
                </button>
                
                {/* 已经选过的题显示 NEXT */}
                {currentIndex < totalQuestions - 1 && userChoices[currentIndex] !== undefined && (
                  <button 
                    onClick={() => setCurrentIndex(prev => prev + 1)}
                    className="flex-1 py-4 bg-beer-gold text-white rounded-2xl font-black text-[10px] tracking-widest uppercase shadow-lg shadow-beer-gold/30 active:scale-95"
                  >
                    NEXT →
                  </button>
                )}

                {/* 最后一题显示结果 */}
                {currentIndex === totalQuestions - 1 && userChoices[currentIndex] !== undefined && (
                  <button 
                    onClick={() => setStep('result')}
                    className="flex-1 py-4 bg-beer-gold text-white rounded-2xl font-black text-[10px] tracking-widest uppercase shadow-lg shadow-beer-gold/30 active:scale-95"
                  >
                    View Result →
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {/* --- 场景 C: 结果页 --- */}
        {step === 'result' && (
          <ResultPage onRestart={reset} finalScores={getFinalScores()} />
        )}

        <footer className="w-full py-10 text-center">
          <div className="h-[1px] w-8 bg-gray-200 mx-auto mb-6" />
          <div className="flex items-center justify-center gap-2 mb-2">
            <a
              href="https://github.com/sososmog/My-Beer-TI"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-gray-500 transition-colors"
              aria-label="GitHub"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
          <p className="text-gray-300 text-[9px] font-bold tracking-[0.2em] uppercase">
            Crafted for Enthusiasts · 2026
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;