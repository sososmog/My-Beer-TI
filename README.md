# 🍺 My Beer TI — 精酿啤酒人格测试

一款基于 React + TypeScript 的精酿啤酒人格测试 Web 应用。通过 27 道趣味题目，分析你的饮酒偏好与行为特征，最终生成专属的啤酒人格标签，并支持一键生成可分享的个性卡片。

---

## 功能特性

- **27 道人格测试题** — 涵盖口味偏好、饮酒习惯、社交风格、消费倾向等维度
- **20 种人格类型** — 精细化的标签体系，精准描述你的精酿人格；含 Y1/Y2/Y3 三个特殊触发标签
- **四维度分析图** — 直观展示独饮/社交、经典/潮流、理性/狂欢、性价比/溢价四个人格轴
- **一键生成分享卡** — 导出高质量 PNG 图片，内嵌二维码，适合发布到社交媒体
- **人格图鉴** — 查看全部人格类型，并展示基于真实用户数据的出现频率与占比
- **流畅动画体验** — 全程 Framer Motion 动画，泡沫进度条等沉浸式细节

---

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | React 19 + TypeScript |
| 构建工具 | Vite 8 |
| 样式 | Tailwind CSS 4 |
| 动画 | Framer Motion |
| 图片导出 | html2canvas |
| 二维码 | qrcode.react |
| 剪贴板 | copy-to-clipboard |
| 用户行为分析 | PostHog |
| 结果统计存储 | Firebase Firestore |

---

## 快速开始

**环境要求：** Node.js >= 18

```bash
# 克隆项目
git clone <your-repo-url>
cd My-Beer-TI

# 安装依赖
npm install

# 配置环境变量（见下方说明）
cp .env.example .env.local

# 启动开发服务器（默认端口 5173）
npm run dev
```

打开浏览器访问 `http://localhost:5173` 即可体验。

---

## 环境变量配置

项目使用 Firebase Firestore 统计真实用户的测试结果分布，需要配置以下环境变量。

复制 `.env.example` 为 `.env.local`，填入你的 Firebase 项目配置：

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

**获取配置的步骤：**
1. 前往 [Firebase 控制台](https://console.firebase.google.com) 创建项目
2. 在项目中启用 **Firestore Database**（测试模式即可）
3. 进入「项目设置」→「您的应用」→ 添加 Web 应用，复制 firebaseConfig 中的各字段值

> **注意：** 未配置 Firebase 时应用可正常运行，人格图鉴中的统计数据将显示"暂无数据"。

---

## 可用脚本

```bash
npm run dev      # 启动开发服务器（HMR 热更新）
npm run build    # 构建生产版本（输出至 dist/）
npm run preview  # 本地预览生产构建
npm run lint     # 运行 ESLint 代码检查
```

---

## 项目结构

```
My-Beer-TI/
├── public/
│   ├── imgs/                    # 20 种人格对应的头像图片
│   └── favicon.svg
├── src/
│   ├── App.tsx                  # 应用主组件（页面状态与路由）
│   ├── components/
│   │   ├── ResultPage.tsx       # 结果页：人格展示 + 记录统计
│   │   ├── AnalysisBlock.tsx    # 四维度分析可视化
│   │   ├── ShareBlock.tsx       # 分享卡片生成
│   │   └── AllPersonalitiesModal.tsx  # 人格图鉴弹窗
│   ├── data/
│   │   ├── questions.ts         # 题目、选项及隐藏评分权重
│   │   └── personalities.ts     # 人格定义 & 结果计算逻辑
│   ├── lib/
│   │   ├── firebase.ts          # Firebase 初始化
│   │   └── resultStats.ts       # 结果统计读写（Firestore）
│   └── index.css                # 全局样式 & 主题色变量
├── .env.example
├── index.html
└── vite.config.ts
```

---

## 测试流程

```
首页（开始测试）
    ↓
答题页（27 道题，可前后切换，题目顺序随机）
    ↓
结果页（人格标签 + 四维分析 + 分享卡）
```

每道题的选项带有隐藏的人格权重（`impact`），答题完成后累计各人格标签得分，根据以下规则确定最终人格：

- **特殊标签优先**：Y1（下水道赞助商）、Y2（液体蛋糕er）、Y3（忍者）只需进入得分前两名即触发
- **DI 合并规则**：若 D、I 同时得分且 D 或 I 为最高分，则结果为 DI（酒蒙子）
- **其余标签**：取得分最高的标签

---

## 主题色

| 变量 | 色值 | 用途 |
|------|------|------|
| `--color-beer-gold` | `#f5b016` | 主色调、按钮、高亮 |
| `--color-beer-soft-bg` | `#fdfaf2` | 暖色背景 |
| `--color-beer-light` | `#fef4d1` | 浅色强调 |
| `--color-beer-text` | `#2d2926` | 正文深棕色 |

---

## License

[MIT](./LICENSE)
