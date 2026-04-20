import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import posthog from 'posthog-js' // 1. 导入 PostHog
import './index.css'
import App from './App.tsx'

// 2. 初始化 PostHog
// 注意：'phc_...' 这一串建议放在 .env 文件里
posthog.init(import.meta.env.VITE_POSTHOG_KEY || '你的_API_KEY_粘贴在这里', {
  api_host: 'https://t.sososmog.com', // 官方推荐的最快接入地址
  ui_host: 'https://us.posthog.com',
  request_batching: true,
  person_profiles: 'always', // 捕获用户信息，方便后续看录屏回放
  capture_pageview: true,    // 自动记录页面访问量 (PV)
  capture_pageleave: true,   // 自动记录用户离开时间，计算停留时长
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
