function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Beer Identity Test</h1>
      <button className="w-full max-w-xs py-4 border-2 border-beer-amber rounded-none font-bold active:bg-beer-amber active:text-beer-bg transition-colors">
        开始测试
      </button>
      <p className="mt-8 text-sm opacity-50">#1F1F1F + #FFBF00 审美验证</p>
    </div>
  )
}

export default App