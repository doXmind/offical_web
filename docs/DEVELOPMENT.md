# doXmind 官网开发指南

## 项目概述

### 产品定位
doXmind是一个企业级AI智能文档管理和创作平台，深度集成多种AI模型，提供从文档创建、编辑到数据分析的一站式解决方案。

### 核心价值主张
"AI-Powered Intelligent Document Creation Platform - Transform Every Idea into Professional Content"

### 目标用户
1. **知识工作者**: 咨询顾问、分析师、研究员
2. **企业团队**: 市场、产品、研发部门
3. **教育工作者**: 教师、培训师、课程开发者
4. **内容创作者**: 技术文档撰写者、报告撰写者

## 技术架构

### 技术栈
- **框架**: React 18 + Vite
- **样式**: Tailwind CSS
- **UI组件**: Headless UI
- **图标**: Lucide React
- **路由**: React Router (待实现)
- **开发环境**: Port 3000

### 项目结构
```
doXmind/
├── pages/               # 页面组件
├── components/          # 可复用组件
│   ├── layout/         # 布局组件
│   ├── sections/       # 页面区块
│   └── ui/             # 基础UI组件
├── core/               # 核心功能
│   ├── theme.js        # 主题配置
│   ├── constants.js    # 常量数据
│   └── utils.js        # 工具函数
├── assets/             # 静态资源
└── styles/             # 样式文件
```

## 开发原则

### 1. 设计原则
- **极简主义**: 黑白主色调，蓝色(#11c4d4)点缀
- **内容优先**: 突出产品价值，减少视觉干扰
- **响应式设计**: 移动端优先，适配所有设备
- **性能优化**: 快速加载，流畅交互

### 2. 代码原则
- **简单直接**: 避免过度抽象和复杂设计
- **页面驱动**: 组件服务于页面需求
- **可维护性**: 清晰的命名和结构
- **渐进增强**: 先实现核心功能，再优化细节

### 3. 组件开发规范
```jsx
// 组件模板
import React from 'react';

const ComponentName = ({ prop1, prop2, className = '' }) => {
  return (
    <div className={`base-styles ${className}`}>
      {/* 组件内容 */}
    </div>
  );
};

export default ComponentName;
```

## 设计系统

### 颜色系统
```javascript
const colors = {
  primary: '#11c4d4',      // 主色 - 青蓝色
  black: '#000000',        // 纯黑
  white: '#ffffff',        // 纯白
  gray: {
    900: '#0a0a0a',        // 深黑
    800: '#1a1a1a',        // 次深黑
    700: '#2a2a2a',        // 中黑
    600: '#4a4a4a',        // 深灰
    500: '#6a6a6a',        // 中灰
    400: '#8a8a8a',        // 浅灰
    300: '#aaaaaa',        // 次浅灰
    200: '#cccccc',        // 亮灰
    100: '#e5e5e5',        // 极浅灰
    50: '#f5f5f5'          // 近白
  }
}
```

### 字体系统
```javascript
const typography = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem'   // 60px
  }
}
```

### 间距系统
使用8的倍数作为基础间距单位：
- 8px, 16px, 24px, 32px, 40px, 48px, 56px, 64px, 80px, 96px

## 页面开发流程

### 1. 开发前准备
- 查看 `PAGE_SPECS.md` 了解页面详细规格
- 在 `PROGRESS.md` 中标记任务开始
- 确认所需组件和资源

### 2. 开发步骤
1. 创建页面文件
2. 实现页面结构
3. 添加样式和交互
4. 测试响应式布局
5. 优化性能

### 3. 完成标准
- [ ] 页面内容完整
- [ ] 响应式适配
- [ ] 交互流畅
- [ ] 代码规范
- [ ] 性能达标

### 4. 更新文档
- 更新 `PROGRESS.md` 状态
- 记录重要决策
- 添加使用说明

## Git工作流程

### 分支策略
- `main`: 生产分支
- `develop`: 开发分支
- `feature/[功能名]`: 功能分支
- `fix/[问题描述]`: 修复分支

### 提交规范
```
类型(范围): 简短描述

详细说明（可选）

关联问题（可选）
```

类型：
- feat: 新功能
- fix: 修复
- docs: 文档
- style: 样式
- refactor: 重构
- test: 测试
- chore: 构建/工具

## 质量标准

### 代码审查清单
- [ ] 符合编码规范
- [ ] 组件可复用性
- [ ] 样式一致性
- [ ] 性能考虑
- [ ] 可访问性

### 测试要求
- 页面渲染正确
- 交互功能正常
- 响应式布局完善
- 跨浏览器兼容

## 部署流程

### 构建命令
```bash
npm run build
```

### 预览命令
```bash
npm run preview
```

### 部署检查
- [ ] 构建成功
- [ ] 资源优化
- [ ] SEO配置
- [ ] 性能测试

## 常见问题

### Q: 如何添加新页面？
A: 
1. 在 `pages/` 创建页面组件
2. 添加路由配置
3. 更新导航链接
4. 编写页面内容

### Q: 如何使用主题颜色？
A: 使用Tailwind自定义类或直接引用theme.js中的颜色值

### Q: 组件应该放在哪里？
A: 
- 通用UI组件 -> `components/ui/`
- 布局组件 -> `components/layout/`
- 页面专属组件 -> `components/sections/`

## 联系方式

如有问题，请联系项目架构师或查看相关文档。