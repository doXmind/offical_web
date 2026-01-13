# doXmind Design Language Specification

## 1. Color System
- **Primary Palette**: Black and white minimalism
  - Background: Pure black (`bg-black`)
  - Text: White primary, gray hierarchy
  - Primary Color: Pure white (`#FFFFFF`) for interactive elements
  - No accent colors - pure monochrome design

- **Gray Scale Hierarchy**:
  - Text hierarchy: `text-white` → `text-gray-300` → `text-gray-400` → `text-gray-500` → `text-gray-600`
  - Borders: `border-white/10` (10% opacity white)
  - Hover states: `hover:border-white/20` or `hover:border-white/30`

## 2. Logo & Brand Typography
- **Logo**: X-shaped icon with four quadrants converging at center
  - Rounded corners (6-8% radius)
  - White fill on dark backgrounds, black fill on light backgrounds

- **Brand Name Typography**: "doXmind"
  - "do" and "mind": `font-light` (300)
  - "X": `font-black` (900)
  - Letter-spacing: `tracking-tight` (-1.5px equivalent)

## 3. Typography
- **Font Stack**: System default fonts (SF Pro, Segoe UI, Roboto)
- **Font Weights**:
  - Headlines: `font-extralight` (200) or `font-light` (300)
  - Body text: `font-normal` (400)
  - Emphasis: `font-medium` (500) or `font-semibold` (600)
  - Brand "X": `font-black` (900)
- **Font Sizes**:
  - Main title: `text-5xl md:text-7xl`
  - Subtitle: `text-3xl md:text-4xl`
  - Body: `text-lg` or `text-base`
  - Small text: `text-sm` or `text-xs`

## 4. Spacing System
- Page padding: `px-6` (mobile) to `px-4` (desktop)
- Section spacing: `py-20` to `py-32`
- Content max width: `max-w-6xl` or `max-w-7xl`
- Card padding: `p-8 md:p-10`

## 5. Animation Guidelines
- **Framer Motion**:
  - Entry animation: `initial={{ opacity: 0, y: 20 }}` → `animate={{ opacity: 1, y: 0 }}`
  - Transition duration: `duration: 0.5` to `duration: 0.8`
  - Delays: `delay: index * 0.1` (for progressive list reveals)
- **Hover Effects**:
  - Buttons: `whileHover={{ scale: 1.02 }}` + `whileTap={{ scale: 0.98 }}`
  - Card borders: `hover:border-white/20` or `hover:border-white/30`

## 6. Component Styles
- **Cards**:
  - Border: `border border-white/10`
  - Radius: `rounded-lg` or `rounded-2xl`
  - Hover: Subtle white glow, no colors
- **Buttons**:
  - Primary: `bg-white text-black hover:bg-gray-200`
  - Secondary: `border border-white/20 hover:bg-white/5`
- **Badges/Tags**:
  - Style: `rounded-full border border-white/30 bg-white/10`
  - Padding: `px-4 py-2`
  - Text: `text-white text-sm font-medium`

## 7. Layout Principles
- Responsive grid: `grid-cols-1 md:grid-cols-2` or `lg:grid-cols-4`
- Gap spacing: `gap-6` or `gap-8`
- Center alignment: `mx-auto text-center`

## 8. Special Effects
- **No Background Patterns**: Avoid grids or other decorative backgrounds
- **Glow Effects**: White glow for interactive elements (10-20% opacity)
- **No Colored Gradients**: Pure black/white design only
- **Ping Animation**: Status indicators use `animate-ping` with white color

## 9. Interactive Feedback
- Transition animations: `transition-all duration-300` or `duration-500`
- Hover states: Subtle changes, avoid over-design
- Click feedback: Use scale animations

## Core Principles
This design language emphasizes **minimalism, elegance, and professionalism** through a strict black and white palette. Avoid excessive decorative elements and let the content be the focus. The overall aesthetic should feel clean, modern, and sophisticated.

**Key Rules:**
- No emoji usage
- No colored accents (purple, indigo, etc.)
- Pure monochrome design
- Brand name always uses light/black weight contrast for "doXmind"
