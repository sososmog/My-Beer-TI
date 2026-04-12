import { useState } from 'react';
import { ResultPage } from './components/ResultPage';
import { motion, AnimatePresence } from 'framer-motion';

const totalQuestions = 26;

function App() {
  const [step, setStep] = useState<'home' | 'quiz' | 'result'>('home');
  const [currentIndex, setCurrentIndex] = useState(0); 
  
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setStep('result');
    }
  };

  const reset = () => {
    setStep('home');
    setCurrentIndex(0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-beer-soft-bg font-sans selection:bg-beer-light">
      
      {/* --- Topbar --- */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white/70 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-beer-gold rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white font-black text-sm">B</span>
          </div>
          <span className="font-bold text-gray-800 tracking-tight">Beer Identity</span>
        </div>
        
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
      </nav>

      {/* --- Main Content --- */}
      <main className="flex-1 flex flex-col items-center px-4 pt-24 pb-6 max-w-lg mx-auto w-full">
        
        {/* --- 首页 --- */}
        {step === 'home' && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
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
              由 26 道深度感官题目组成，<br />揭示你在精酿世界的真实身份。
            </p>
            <button 
              onClick={() => setStep('quiz')}
              className="w-full py-5 bg-beer-gold text-white rounded-[2rem] font-bold text-lg shadow-xl shadow-beer-gold/30 hover:scale-[1.02] active:scale-95 transition-all"
            >
              开始性格鉴定
            </button>
            <p className="mt-8 text-[9px] font-bold text-gray-300 tracking-[0.3em] uppercase">
              Methodology v2.0 Beta
            </p>
          </motion.div>
        )}

        {/* --- 测试页 --- */}
        {step === 'quiz' && (
          <div className="w-full space-y-4">
            {/* 进度条卡片 */}
            <motion.div layoutId="progress" className="w-full beer-card p-6">
              <div className="flex justify-between items-baseline mb-3">
                <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">
                  Progress <span className="text-beer-gold text-lg ml-1">{currentIndex + 1}</span> / {totalQuestions}
                </span>
                <span className="text-sm font-black text-beer-gold">{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-4 bg-gray-100 rounded-full p-[2px]">
                <motion.div 
                  className="h-full foam-progress rounded-full" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </motion.div>

            {/* 题目卡片 */}
            <motion.div 
              key={currentIndex}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full beer-card p-8 flex flex-col min-h-[420px]"
            >
              <div className="mb-8">
                <span className="px-3 py-1 bg-beer-light text-beer-gold text-[10px] rounded-md font-bold uppercase tracking-wider">
                  Sensory Question
                </span>
              </div>
              <h2 className="text-2xl font-bold leading-snug mb-12 text-gray-800">
                看到酒单上标着 IBU 80+ 的双倍 IPA，你的第一反应是？
              </h2>

              <div className="space-y-3 mb-10">
                {['血液开始沸腾，这就是我要找的苦', '先看下度数，太重了今晚可能回不去', '礼貌拒绝，我还是选那杯酸的'].map((text, i) => (
                  <button 
                    key={i} 
                    onClick={handleNext}
                    className="group w-full flex items-center p-5 bg-gray-50/50 border border-gray-100 rounded-2xl hover:border-beer-gold hover:bg-white hover:shadow-md transition-all active:scale-[0.98]"
                  >
                    <span className="w-8 h-8 flex items-center justify-center bg-white rounded-lg font-bold text-gray-400 mr-4 group-hover:bg-beer-gold group-hover:text-white transition-colors">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-sm text-gray-600 font-medium group-hover:text-gray-800">{text}</span>
                  </button>
                ))}
              </div>

              <div className="mt-auto">
                <div className="flex gap-3">
                  {/* 之前是文本链接，现在改成了按钮 */}
                  <button 
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex(prev => prev - 1)}
                    className="flex-1 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-[10px] font-black text-gray-400 hover:border-beer-gold hover:text-beer-gold transition-all disabled:opacity-0 active:scale-95 uppercase tracking-widest"
                  >
                    PREV
                  </button>
                  
                  <button 
                    onClick={handleNext}
                    className="flex-[2] py-4 bg-beer-gold text-white rounded-2xl text-[10px] font-black shadow-lg shadow-beer-gold/20 hover:scale-[1.01] transition-transform active:scale-95 uppercase tracking-widest"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* --- 结果页 --- */}
        {step === 'result' && (
          <ResultPage onRestart={reset} />
        )}

        <footer className="w-full py-10 text-center">
          <div className="h-[1px] w-8 bg-gray-200 mx-auto mb-6" />
          <p className="text-gray-300 text-[9px] font-bold tracking-[0.2em] uppercase">
            Crafted for enthusiasts · 2026
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;