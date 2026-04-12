import { useState } from 'react';
import { questions } from './data/questions';
import { ResultPage } from './components/ResultPage';

function App() {
  const [step, setStep] = useState<'home' | 'quiz' | 'result'>('home');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});

  const totalQuestions = questions.length;
  // 进度条计算
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  // 处理选项点击逻辑
  const handleOptionClick = (impact: Record<string, number>) => {
    // 1. 累加分数
    const newScores = { ...scores };
    Object.entries(impact).forEach(([tag, value]) => {
      newScores[tag] = (newScores[tag] || 0) + value;
    });
    setScores(newScores);

    // 2. 检查是否是最后一题
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setStep('result');
    }
  };

  const reset = () => {
    setStep('home');
    setCurrentIndex(0);
    setScores({});
  };

  return (
    <div className="min-h-screen flex flex-col bg-beer-soft-bg font-sans">
      
      {/* --- Topbar: 固定在顶部 --- */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white/70 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-beer-gold rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white font-black text-sm">B</span>
          </div>
          <span className="font-bold text-gray-800 tracking-tight">Beer Identity</span>
        </div>
        
        {/* 只要不在首页，就显示退出/重置按钮 */}
        {step !== 'home' && (
          <button 
            onClick={reset}
            className="text-[10px] font-bold text-gray-400 border border-gray-200 px-3 py-1 rounded-full hover:border-beer-gold hover:text-beer-gold transition-colors"
          >
            {step === 'result' ? 'RESTART' : 'QUIT'}
          </button>
        )}
      </nav>

      {/* --- 主体内容区域 --- */}
      <main className="flex-1 flex flex-col items-center px-4 pt-24 pb-6 max-w-lg mx-auto w-full">
        
        {/* 1. 首页视图 */}
        {step === 'home' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-beer-light rounded-full flex items-center justify-center mb-8 text-4xl shadow-inner">
              🍺
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">
              探索你的<span className="text-beer-gold">精酿人格</span>
            </h1>
            <p className="text-gray-400 text-sm mb-12 leading-relaxed max-w-[280px]">
              基于 {totalQuestions} 个饮酒行为维度，<br />通过算法深度分析你的品味基因。
            </p>
            <button 
              onClick={() => setStep('quiz')}
              className="w-full py-5 bg-beer-gold text-white rounded-[2rem] font-bold text-lg shadow-xl shadow-beer-gold/30 hover:scale-[1.02] active:scale-95 transition-all"
            >
              开始性格鉴定
            </button>
          </div>
        )}

        {/* 2. 测试页视图 */}
        {step === 'quiz' && (
          <div className="w-full space-y-4">
            {/* 进度条卡片 */}
            <div className="w-full beer-card p-6">
              <div className="flex justify-between items-baseline mb-3">
                <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">
                  Progress <span className="text-beer-gold text-lg ml-1">{currentIndex + 1}</span> / {totalQuestions}
                </span>
                <span className="text-sm font-black text-beer-gold">{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full foam-progress rounded-full" 
                  style={{ width: `${progress}%` }} 
                />
              </div>
            </div>

            {/* 题目内容卡片 */}
            <div className="w-full beer-card p-8 flex flex-col min-h-[420px]">
              <div className="mb-8">
                <span className="px-3 py-1 bg-beer-light text-beer-gold text-[10px] rounded-md font-bold uppercase tracking-wider">
                  Sensory Question
                </span>
              </div>
              
              <h2 className="text-2xl font-bold leading-snug mb-10 text-gray-800">
                {questions[currentIndex].text}
              </h2>

              <div className="space-y-3 mb-10">
                {questions[currentIndex].options.map((opt, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleOptionClick(opt.impact)}
                    className="group w-full flex items-center p-5 bg-gray-50/50 border border-gray-100 rounded-2xl hover:border-beer-gold hover:bg-white hover:shadow-md transition-all active:scale-[0.98]"
                  >
                    <span className="w-8 h-8 flex items-center justify-center bg-white rounded-lg font-bold text-gray-400 mr-4 group-hover:bg-beer-gold group-hover:text-white transition-colors">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-sm text-gray-600 font-medium group-hover:text-gray-800 text-left">
                      {opt.text}
                    </span>
                  </button>
                ))}
              </div>

              {/* 底部导航 */}
              <div className="mt-auto">
                <button 
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex(prev => prev - 1)}
                  className="w-full py-4 bg-gray-50 border border-gray-100 rounded-2xl text-[10px] font-black text-gray-400 hover:text-gray-600 disabled:opacity-0 transition-all uppercase tracking-widest"
                >
                  ← PREV QUESTION
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 3. 结果页视图 */}
        {step === 'result' && (
          <ResultPage onRestart={reset} finalScores={scores} />
        )}

        {/* --- Footer --- */}
        <footer className="w-full py-10 text-center">
          <div className="h-[1px] w-8 bg-gray-200 mx-auto mb-6" />
          <p className="text-gray-300 text-[9px] font-bold tracking-[0.2em] uppercase">
            Beer Identity Project © 2026
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;