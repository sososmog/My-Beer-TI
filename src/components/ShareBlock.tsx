import { useRef } from 'react';
import { toPng } from 'html-to-image';
import { QRCodeCanvas } from 'qrcode.react';
import copy from 'copy-to-clipboard';

interface ShareBlockProps {
  result: { title: string; img: string; desc: string };
  scores?: Record<string, number>;
}

export const ShareBlock = ({ result }: ShareBlockProps) => {
  const posterRef = useRef<HTMLDivElement>(null);

  // 1. 生成海报并下载 (高清采样)
  const saveImage = async () => {
    if (!posterRef.current) return;
    try {
      const dataUrl = await toPng(posterRef.current, {
        pixelRatio: 3,
        backgroundColor: '#ffffff',
      });
      const link = document.createElement('a');
      link.download = `Beer-ID-${result.title}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('生成图片失败:', err);
      alert('图片生成失败，请尝试长按截图保存');
    }
  };

  // 2. 复制文案
  const copyText = () => {
    const text = `【精酿人格鉴定】我是“${result.title}”，快来my-beer-ti.vercel.app解锁你的精酿基因！`;
    copy(text);
    alert('分享文案已复制！');
  };

  return (
    <div className="w-full space-y-6 mt-8">
      {/* 栏目标题 */}
      <div className="px-2">
        <h3 className="text-gray-400 text-xs font-bold mb-1 tracking-widest uppercase">分享卡片</h3>
        <div className="h-[1px] w-full bg-gray-100" />
      </div>

      {/* 预览区域 (手机显示预览) */}
      <div className="bg-[#f2f6f4] p-6 rounded-[2.5rem] flex flex-col items-center shadow-inner">
        
        {/* --- 这里是真正生成图片的容器 (Poster Content) --- */}
        <div 
          ref={posterRef}
          className="w-full bg-white rounded-3xl p-8 shadow-xl flex flex-col items-center border border-gray-50 text-center"
          style={{ maxWidth: '340px' }}
        >
          {/* 顶部装饰 */}
          <div className="w-full flex justify-between items-center mb-8">
            <span className="px-2 py-0.5 bg-[#e8f2ee] text-[#4a7a67] text-[8px] font-black rounded-full uppercase tracking-widest">
              Beer-TI Personality Card
            </span>
            <span className="text-[10px] font-bold text-gray-300 tracking-tighter font-mono">
              BEER-TI
            </span>
          </div>

          {/* 1. 图片放在上方 */}
          <div className="w-full aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 relative shadow-inner mb-8">
             <div className="absolute top-3 left-3 text-[7px] text-gray-300 uppercase font-black tracking-[0.2em]">
               MyBeerTI
             </div>
             <img src={result.img} className="w-full h-full object-cover" alt="result" />
          </div>

          {/* 2. 描述放在下面 */}
          <div className="flex flex-col items-center px-2 mb-10">
            <h4 className="text-3xl font-black text-gray-800 mb-3 uppercase tracking-tight leading-none">
              {result.title}
            </h4>
            {/* 装饰短线 */}
            <div className="h-[2px] w-10 bg-beer-gold/30 mb-5 rounded-full" />
            
            <p className="text-[13px] text-gray-500 leading-relaxed font-medium italic px-2">
              “{result.desc}”
            </p>
          </div>

          {/* 3. 底部：二维码区域 */}
          <div className="w-full flex justify-between items-end border-t border-dashed border-gray-100 pt-6">
            <div className="text-left">
              <div className="text-[8px] text-gray-400 font-bold uppercase tracking-widest mb-1">
                Scan to find yours
              </div>
              {/* 这里改成了大写的展示域名，更有品牌感 */}
              <div className="text-[14px] font-black text-gray-800 tracking-tighter font-mono uppercase">
                MY-BEER-TI.VERCEL.APP
              </div>
            </div>
            <div className="p-1.5 bg-white border border-gray-100 rounded-lg shadow-sm">
              {/* --- 👇 二维码跳转目标修改处 --- */}
              <QRCodeCanvas 
                value="https://my-beer-ti.vercel.app" 
                size={52} 
              />
            </div>
          </div>
        </div>

        {/* 外部说明文案 */}
        <div className="mt-10 px-4 text-left w-full">
          <h2 className="text-3xl font-black text-gray-800 mb-4 tracking-tight leading-tight">
            晒出你的<br />精酿人格名片
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            去掉复杂的维度数据，让你的形象更加纯粹、突出。这张图更适合直接发朋友圈或小红书。
          </p>
        </div>

        {/* 操作按钮 */}
        <div className="w-full flex gap-3">
          <button 
            onClick={saveImage}
            className="flex-1 py-4 bg-[#1a4331] text-white rounded-[2rem] font-bold text-sm shadow-xl shadow-green-900/20 active:scale-95 transition-all"
          >
            保存卡片图片
          </button>
          <button 
            onClick={copyText}
            className="flex-1 py-4 bg-white border border-gray-200 text-gray-600 rounded-[2rem] font-bold text-sm active:scale-95 transition-all"
          >
            复制分享文案
          </button>
        </div>
      </div>
    </div>
  );
};