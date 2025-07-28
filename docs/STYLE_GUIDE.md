# DocMindLLM 样式与代码规范指南

## 设计规范

### 颜色使用规范

#### 主要颜色
```css
/* 主色 */
primary: #11c4d4       /* 青蓝色 - 用于CTA、链接、强调元素 */

/* 中性色 */
black: #000000         /* 纯黑 - 主背景 */
white: #ffffff         /* 纯白 - 主文字 */

/* 灰度 */
gray-900: #0a0a0a      /* 深黑 - 次要背景 */
gray-800: #1a1a1a      /* 次深黑 - 卡片背景 */
gray-700: #2a2a2a      /* 中黑 - 边框 */
gray-600: #4a4a4a      /* 深灰 - 禁用状态 */
gray-500: #6a6a6a      /* 中灰 - 次要文字 */
gray-400: #8a8a8a      /* 浅灰 - 辅助文字 */
gray-300: #aaaaaa      /* 次浅灰 - 占位符 */
gray-200: #cccccc      /* 亮灰 - 分割线 */
gray-100: #e5e5e5      /* 极浅灰 - 背景高亮 */
gray-50: #f5f5f5       /* 近白 - hover背景 */
```

#### 使用场景
- **背景**: 主要使用black (#000000)，区块交替使用gray-900
- **文字**: 
  - 主要内容: white
  - 次要内容: gray-400
  - 辅助说明: gray-500
- **按钮**:
  - Primary: bg-primary text-black
  - Secondary: bg-white text-black
  - Ghost: text-white hover:text-primary
- **边框**: 使用gray-700或white的低透明度(10-20%)

### 排版规范

#### 字体大小
```css
text-xs:   0.75rem   (12px) - 版权信息、标签
text-sm:   0.875rem  (14px) - 辅助文字、说明
text-base: 1rem      (16px) - 正文
text-lg:   1.125rem  (18px) - 强调正文
text-xl:   1.25rem   (20px) - 小标题
text-2xl:  1.5rem    (24px) - 章节标题
text-3xl:  1.875rem  (30px) - 页面副标题
text-4xl:  2.25rem   (36px) - 页面标题
text-5xl:  3rem      (48px) - Hero副标题
text-6xl:  3.75rem   (60px) - Hero主标题
```

#### 字重
```css
font-normal: 400  - 正文
font-medium: 500  - 按钮、导航
font-semibold: 600 - 标题
font-bold: 700 - Hero标题
```

#### 行高
```css
leading-tight: 1.25   - 标题
leading-snug: 1.375   - 副标题  
leading-normal: 1.5   - 正文
leading-relaxed: 1.625 - 长文本
```

### 间距规范

#### 基础间距单位 (8px体系)
```css
space-1: 8px
space-2: 16px  
space-3: 24px
space-4: 32px
space-5: 40px
space-6: 48px
space-8: 64px
space-10: 80px
space-12: 96px
space-16: 128px
space-20: 160px
```

#### 使用原则
- **组件内间距**: 8px, 16px, 24px
- **组件间间距**: 32px, 48px, 64px
- **区块间间距**: 80px, 96px, 128px
- **页面上下间距**: 128px, 160px

### 组件样式规范

#### 按钮
```jsx
// Primary Button
<button className="px-6 py-3 bg-primary text-black font-medium rounded-lg hover:bg-primary/90 transition-colors">
  Get Started
</button>

// Secondary Button  
<button className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors">
  Learn More
</button>

// Ghost Button
<button className="px-6 py-3 text-white font-medium hover:text-primary transition-colors">
  View Docs
</button>

// Outline Button
<button className="px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-white hover:text-black transition-all">
  Contact Sales
</button>
```

#### 卡片
```jsx
// 基础卡片
<div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors">
  {/* 内容 */}
</div>

// 带边框卡片
<div className="bg-black border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-colors">
  {/* 内容 */}
</div>

// 高亮卡片
<div className="bg-gray-800 border border-primary rounded-xl p-6">
  {/* 内容 */}
</div>
```

#### 输入框
```jsx
// 基础输入框
<input className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-primary focus:outline-none transition-colors" />

// 带图标输入框
<div className="relative">
  <input className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white" />
  <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
</div>
```

### 动画规范

#### 过渡时间
```css
transition-all duration-200  /* 默认过渡 */
transition-all duration-300  /* 复杂过渡 */
transition-all duration-500  /* 页面切换 */
```

#### 常用动画
```css
/* Hover效果 */
hover:scale-105     /* 轻微放大 */
hover:translate-y-1 /* 轻微下移 */
hover:shadow-lg     /* 阴影加深 */

/* 淡入动画 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 使用动画 */
animation: fadeIn 0.5s ease-out;
```

## 代码规范

### React组件规范

#### 组件结构
```jsx
import React from 'react';
import { Icon } from 'lucide-react';

// 组件定义
const ComponentName = ({ 
  title,
  description,
  className = '',
  children,
  ...props 
}) => {
  // 状态定义
  const [state, setState] = useState(false);
  
  // 副作用
  useEffect(() => {
    // 副作用逻辑
  }, [dependency]);
  
  // 事件处理
  const handleClick = () => {
    // 处理逻辑
  };
  
  // 渲染
  return (
    <div className={`base-styles ${className}`} {...props}>
      <h2>{title}</h2>
      <p>{description}</p>
      {children}
    </div>
  );
};

// Props类型定义（如使用TypeScript）
ComponentName.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node
};

export default ComponentName;
```

#### 命名规范
- **组件名**: PascalCase (如 `UserProfile`)
- **文件名**: PascalCase.jsx (如 `UserProfile.jsx`)
- **函数/变量**: camelCase (如 `getUserData`)
- **常量**: UPPER_SNAKE_CASE (如 `API_ENDPOINT`)
- **CSS类**: kebab-case (如 `user-profile`)

#### Props规范
1. 始终解构props
2. 提供默认值
3. 保留className用于样式扩展
4. 使用...props传递其余属性

### Tailwind CSS使用规范

#### 类名顺序
```jsx
<div className="
  {/* 布局 */}
  flex items-center justify-between
  {/* 尺寸 */}
  w-full h-16
  {/* 间距 */}
  px-6 py-4
  {/* 背景 */}
  bg-black
  {/* 边框 */}
  border-b border-gray-700
  {/* 文字 */}
  text-white text-sm font-medium
  {/* 效果 */}
  hover:bg-gray-900
  {/* 过渡 */}
  transition-colors
  {/* 响应式 */}
  md:px-8 lg:px-12
">
```

#### 响应式断点
```css
sm: 640px   /* 手机横屏 */
md: 768px   /* 平板 */
lg: 1024px  /* 桌面 */
xl: 1280px  /* 大屏 */
2xl: 1536px /* 超大屏 */
```

使用移动端优先原则：
```jsx
<div className="text-sm md:text-base lg:text-lg">
  响应式文字
</div>
```

### 文件组织规范

#### import顺序
```jsx
// 1. React相关
import React, { useState, useEffect } from 'react';

// 2. 第三方库
import { motion } from 'framer-motion';
import { Icon } from 'lucide-react';

// 3. 组件
import Header from '../components/layout/Header';
import Button from '../components/ui/Button';

// 4. 工具/常量
import { formatDate } from '../core/utils';
import { API_ENDPOINT } from '../core/constants';

// 5. 样式
import '../styles/custom.css';
```

### 注释规范

#### 组件注释
```jsx
/**
 * 功能卡片组件
 * @param {string} title - 标题
 * @param {string} description - 描述
 * @param {string} icon - 图标名称
 * @param {string} className - 自定义样式类
 */
const FeatureCard = ({ title, description, icon, className }) => {
  // 组件实现
};
```

#### 复杂逻辑注释
```jsx
// 计算折扣价格
// 基础价格 * (1 - 折扣率) * 数量
const discountedPrice = basePrice * (1 - discountRate) * quantity;
```

### 性能优化规范

1. **使用React.memo优化纯组件**
```jsx
export default React.memo(ComponentName);
```

2. **使用useMemo缓存计算结果**
```jsx
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);
```

3. **使用useCallback缓存函数**
```jsx
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

4. **图片优化**
- 使用WebP格式
- 实现懒加载
- 提供响应式图片

### Git提交规范

#### 提交信息格式
```
<type>(<scope>): <subject>

<body>

<footer>
```

#### 示例
```
feat(home): 添加Hero区块动画效果

- 实现淡入动画
- 添加滚动触发
- 优化移动端显示

Closes #123
```

## 质量检查清单

### 代码审查要点
- [ ] 组件是否可复用
- [ ] 样式是否符合设计规范
- [ ] 是否有重复代码
- [ ] 性能是否优化
- [ ] 响应式是否完善
- [ ] 可访问性是否考虑

### 发布前检查
- [ ] 所有链接可点击
- [ ] 图片都已优化
- [ ] 控制台无错误
- [ ] 页面加载快速
- [ ] SEO标签完整