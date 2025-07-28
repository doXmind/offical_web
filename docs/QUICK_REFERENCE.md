# DocMindLLM 快速参考手册

## 🎨 设计令牌快查

### 颜色
```css
primary: #11c4d4    /* 青蓝色 - CTA、链接、强调 */
black: #000000      /* 主背景 */
white: #ffffff      /* 主文字 */
gray-900: #0a0a0a   /* 深色背景 */
gray-500: #6a6a6a   /* 次要文字 */
gray-400: #8a8a8a   /* 辅助文字 */
```

### 常用样式组合
```jsx
// Primary Button
className="px-6 py-3 bg-primary text-black font-medium rounded-lg hover:bg-primary/90 transition-colors"

// Secondary Button
className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors"

// Ghost Button
className="px-6 py-3 text-white font-medium hover:text-primary transition-colors"

// Card
className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors"

// Section Container
className="py-20 px-4 md:py-24 lg:py-32"

// Content Container
className="max-w-7xl mx-auto"
```

## 📁 项目结构
```
src/
├── pages/          # 页面组件
├── components/     
│   ├── layout/     # Header, Footer, Layout
│   ├── sections/   # Hero, Features, CTA等
│   └── ui/         # Button, Card, Typography
├── core/
│   ├── theme.js    # 主题配置
│   ├── constants.js # 静态数据
│   └── utils.js    # 工具函数
└── styles/         # 全局样式
```

## 📋 开发检查清单

### 开始新任务前
- [ ] 查看 PROGRESS.md 确认任务状态
- [ ] 阅读 PAGE_SPECS.md 相关章节
- [ ] 确认设计规范

### 开发中
- [ ] 使用规定的颜色系统
- [ ] 遵循组件命名规范
- [ ] 实现响应式设计
- [ ] 添加必要的hover效果

### 完成后
- [ ] 更新 PROGRESS.md
- [ ] 测试响应式布局
- [ ] 检查代码规范
- [ ] 提交代码

## 🔧 常用命令

```bash
# 开发
npm run dev

# 构建
npm run build

# 预览
npm run preview

# 检查代码
npm run lint
```

## 📱 响应式断点

```css
sm: 640px   /* 手机横屏 */
md: 768px   /* 平板 */
lg: 1024px  /* 桌面 */
xl: 1280px  /* 大屏 */
```

## 🚀 页面开发顺序

1. **Phase 1**: 基础设施（主题、布局、UI组件）
2. **Phase 2**: Home页面
3. **Phase 3**: Product页面
4. **Phase 4**: Solutions页面
5. **Phase 5**: Pricing页面
6. **Phase 6**: 其他页面（Developers、About、Auth）
7. **Phase 7**: 路由系统
8. **Phase 8**: 优化测试

## ⚡ 性能优化要点

- 使用 `React.memo` 优化纯组件
- 图片使用 WebP 格式
- 实现懒加载
- 代码分割（路由级别）

## 🔗 重要链接

- 产品信息：见项目根目录
- 设计参考：Anthropic官网风格
- 图标库：[Lucide Icons](https://lucide.dev/)

---

**提示**: 这是一个快速参考，详细信息请查看完整文档。