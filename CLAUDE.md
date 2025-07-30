# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Architecture

This is a React-based single-page application (SPA) for DocMindLLM, an AI-powered writing assistant.

**IMPORTANT: This is an English-language website. All UI text, navigation labels, and content should be in English.**

### Technology Stack
- **React 18** - UI framework
- **Vite** - Build tool and dev server (configured on port 3000)
- **Tailwind CSS** - Utility-first CSS framework
- **Headless UI** - Unstyled, accessible UI components
- **Lucide React** - Icon library

### Key Components
- **App.jsx** - Root component that renders DocMindLLM
- **DocMindLLM.jsx** - Main component containing the entire landing page (hero, features, pricing, etc.)

### Styling Approach
- Tailwind CSS for utility classes
- Custom animations defined in `tailwind.config.js` (fadeInUp, slideInRight, pulse-slow, blink)
- Custom utility classes in `index.css` (gradient-border, hover-glow, text-gradient)
- Dark theme with purple/blue gradient accents

### Component Structure
The DocMindLLM component manages:
- Navigation with mobile responsiveness
- Animated hero section with live demo editor
- Features showcase with hover effects
- Interactive writing tools section with switchable demos
- Pricing tiers
- Integration capabilities section
- Footer with links

### State Management
Local component state using React hooks:
- `isMenuOpen` - Mobile menu toggle
- `activeFeature` - Currently selected writing tool demo
- `scrolled` - Navigation bar scroll state
- `isTyping` - Demo typing animation
- `demoText` - Animated typing demo content
- `isVisible` - Scroll-triggered animations

## UI Development Guidelines

### Design Language Compliance
1. **IMPORTANT: Before editing or adding any pages/styles**, you MUST:
   - Review the design language specification in `docs/DESIGN_LANGUAGE.md`
   - Confirm with the user if any deviations are needed
   - Prioritize user requirements while maintaining design consistency
   - Ensure all new components follow the established design system

### Styling Rules
1. **Always use Tailwind CSS** for styling - avoid inline styles or separate CSS files
2. **Follow the Design Language**: Refer to `docs/DESIGN_LANGUAGE.md` for:
   - Color palette (primarily black/white with cyan accent)
   - Typography scales and weights
   - Spacing and layout patterns
   - Animation specifications
3. **Use Headless UI components** for interactive elements:
   - `Dialog` for modals
   - `Menu` for dropdowns
   - `Transition` for animations
   - `Switch` for toggles
   - `Combobox` for autocomplete
   - `Listbox` for selects
   - `Disclosure` for accordions
   - `RadioGroup` for radio buttons
   - `Tab` for tab interfaces

### Animation Guidelines
- Use Headless UI's `Transition` component for enter/leave animations
- Combine with Tailwind's transition utilities for smooth effects
- Follow animation specs from design language (0.5-0.8s duration, y: 20px entry)
- Prefer Headless UI transitions over custom CSS animations when possible

### Component Patterns
```jsx
// Example: Modal with Headless UI Dialog
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

// Example: Dropdown with Headless UI Menu
import { Menu, Transition } from '@headlessui/react'

// Example: Animated disclosure
import { Disclosure, Transition } from '@headlessui/react'
```

### Best Practices
- Ensure all interactive components are accessible (Headless UI handles this)
- Use Tailwind's responsive utilities for mobile-first design
- Maintain the minimalist aesthetic - avoid decorative elements
- Use consistent spacing and typography from the design system
- Leverage Tailwind's dark mode utilities if implementing dark theme
- Combine Headless UI with Tailwind classes for consistent styling
- **IMPORTANT: DO NOT use any emoji in this project** - Keep all content professional without emoji

## Code Organization Guidelines

### File Length Rules
1. **Keep files under 800 lines** - All code files should aim to stay within 700-800 lines maximum
2. **Split large components** - If a file approaches 800 lines, refactor by:
   - Extracting sub-components into separate files
   - Moving utility functions to dedicated modules
   - Separating concerns into logical units
3. **Notify when limit is reached** - When implementing features that would exceed the 800-line limit, inform the user and suggest file splitting strategies before proceeding

## Progress Tracking

### Development Progress Updates
1. **Update docs/PROGRESS.md** - After completing each phase or significant work session, update the progress tracking document
2. **Include in updates**:
   - Mark completed tasks with [x]
   - Update completion percentages
   - Add milestone records with date and description
   - Note any risks or issues encountered
   - Update the "最后更新" (last updated) date
3. **Be specific** - Include what was accomplished, any changes made, and next steps