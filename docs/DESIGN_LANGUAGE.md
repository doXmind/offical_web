# doXmind Design Language Specification

## 1. Color System
- **Primary Palette**: Black and white minimalism with purple accents
  - Background: Pure black (`bg-black`)
  - Text: White primary, gray hierarchy
  - Primary Accent: Indigo Purple (#6366f1 / `bg-indigo-500`) - Main interactive elements
  - Secondary Accent: Purple (#8b5cf6 / `bg-purple-500`) - Secondary emphasis

- **Gray Scale Hierarchy**:
  - Text hierarchy: `text-white` → `text-gray-400` → `text-gray-500` → `text-gray-600`
  - Borders: `border-white/10` (10% opacity white)
  - Hover states: `hover:border-white/20` or `hover:border-white/30`

## 2. Typography
- **Font Stack**: System default fonts (SF Pro, Segoe UI, Roboto)
- **Font Weights**: 
  - Headlines: `font-extralight` (200) or `font-light` (300)
  - Body text: `font-normal` (400)
  - Emphasis: `font-medium` (500) or `font-semibold` (600)
- **Font Sizes**:
  - Main title: `text-5xl md:text-7xl`
  - Subtitle: `text-3xl md:text-4xl`
  - Body: `text-lg` or `text-base`
  - Small text: `text-sm` or `text-xs`

## 3. Spacing System
- Page padding: `px-6` (mobile) to `px-4` (desktop)
- Section spacing: `py-20` to `py-32`
- Content max width: `max-w-6xl` or `max-w-7xl`
- Card padding: `p-8 md:p-10`

## 4. Animation Guidelines
- **Framer Motion**:
  - Entry animation: `initial={{ opacity: 0, y: 20 }}` → `animate={{ opacity: 1, y: 0 }}`
  - Transition duration: `duration: 0.5` to `duration: 0.8`
  - Delays: `delay: index * 0.1` (for progressive list reveals)
- **Hover Effects**:
  - Buttons: `whileHover={{ scale: 1.02 }}` + `whileTap={{ scale: 0.98 }}`
  - Card borders: `hover:border-white/20` or `hover:border-white/30`

## 5. Component Styles
- **Cards**:
  - Border: `border border-white/10`
  - Radius: `rounded-lg` or `rounded-2xl`
  - Hover: Subtle white glow, no colors
- **Buttons**:
  - Primary: `bg-indigo-500 text-white hover:bg-indigo-600`
  - Secondary: `border border-white/20 hover:bg-white/5`
- **Badges/Tags**:
  - Style: `rounded-full border border-white/10`
  - Padding: `px-3 py-1.5`
  - Beta Badge: `bg-purple-500/10 border-purple-500/20 text-purple-400` with pulse animation

## 6. Layout Principles
- Responsive grid: `grid-cols-1 md:grid-cols-2` or `lg:grid-cols-4`
- Gap spacing: `gap-6` or `gap-8`
- Center alignment: `mx-auto text-center`

## 7. Special Effects
- **No Background Patterns**: Avoid grids or other decorative backgrounds
- **Glow Effects**: Purple glow for primary elements, white for secondary (10-30% opacity)
- **Text Gradients**: Limited use, purple gradient for special emphasis
- **Pulse Animation**: Beta badges use `animate-pulse-slow` for subtle attention

## 8. Interactive Feedback
- Transition animations: `transition-all duration-300` or `duration-500`
- Hover states: Subtle changes, avoid over-design
- Click feedback: Use scale animations

## Core Principles
This design language emphasizes **minimalism, elegance, and professionalism**. Avoid excessive decorative elements and let the content be the focus. The overall aesthetic should feel clean, modern, and sophisticated.