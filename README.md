# doXmind - AI-Powered Writing Assistant

A minimalist marketing website for doXmind, an AI-powered writing assistant that helps you write better, faster.

## About doXmind

doXmind is a Markdown editor with:
- **AI Autocomplete** - Smart suggestions as you type, press Tab to accept
- **Quick Edit** - Select text and instantly fix grammar, improve, simplify, expand, or translate
- **AI Chat Assistant** - Chat with Claude AI about your document
- **Version History** - Track all changes with automatic snapshots
- **Full Markdown Support** - Code blocks, tables, formatting toolbar

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations
- **Headless UI** - Accessible UI components
- **Lucide React** - Icon library

## Design Language

Minimalist black and white design with:
- Pure monochrome color palette (no accent colors)
- Brand typography: "do**X**mind" (light + black weight contrast)
- X-shaped logo icon

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- npm or yarn

### Installation

```sh
git clone https://github.com/anthropics/doXmind-Web.git
cd doXmind-Web
npm install
```

### Development

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view in browser.

### Production Build

```sh
npm run build
npm run preview
```

## Project Structure

```
src/
  components/
    layout/       # Header, Footer
    ui/           # Reusable UI components
    guide/        # User guide components
  pages/          # Page components (Home, Features, Pricing, etc.)
  core/           # Constants, utilities, theme
  constants/      # Navigation data
public/
  logo.svg        # Main logo (white for dark backgrounds)
  logo-light.svg  # Logo for light backgrounds
  favicon.svg     # Browser favicon
docs/
  DESIGN_LANGUAGE.md  # Design system specification
  PROGRESS.md         # Development progress tracking
```

## Pages

- **Home** - Hero, features overview, Quick Edit commands, CTA
- **Features** - Detailed feature descriptions
- **Pricing** - Beta access information
- **Solutions** - Use cases for different writers
- **Guide** - User documentation

## Links

- Website: [doxmind.com](https://doxmind.com)
- App: [beta.doxmind.com](https://beta.doxmind.com)
- Documentation: [docs.doxmind.com](https://docs.doxmind.com)
