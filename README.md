# Charlie Garcia Portfolio

A modern, responsive portfolio built with [Astro](https://astro.build) featuring a theme toggle, timeline, and contact form.

## 🚀 Development

### Getting Started

```sh
npm install      # Install dependencies
npm run dev      # Start local dev server at http://localhost:4321
npm run build    # Build for production
npm run preview  # Preview the production build locally
```

## ✅ Testing

The project includes a comprehensive three-layer test suite:

### Run All Tests

```sh
npm test
```

This runs unit tests, built-site assertions, and E2E tests in sequence.

### Test Layers

#### 1. Unit Tests (`npm run test:unit`)
- **What**: Tests for the theme state management and store behavior
- **Where**: `tests/unit/`
- **Tools**: Vitest with jsdom
- **Coverage**: Default theme selection, toggle transitions, localStorage persistence
- **Watch mode**: `npm run test:watch`

#### 2. Built Site Tests (`npm run test:site`)
- **What**: Static HTML assertions on the built site
- **Where**: `tests/site/`
- **Tools**: Vitest + Cheerio
- **Coverage**: Section structure, navigation links, form labels, accessibility attributes
- **Requires**: Build runs first (`npm run build`)

#### 3. E2E Browser Tests (`npm run test:e2e`)
- **What**: Full user journeys in a real browser
- **Where**: `tests/e2e/`
- **Tools**: Playwright
- **Coverage**: Theme toggle interactive behavior, persistence across reload, page visibility
- **Dev server**: Runs at `http://127.0.0.1:4321` (auto-started if needed)

### Testing Workflow

For local development, use the watch mode:
```sh
npm run test:watch
```

This runs unit tests and re-runs on file changes.

For pre-commit validation:
```sh
npm test    # Full suite
```

For isolated debugging:
```sh
npx vitest tests/unit/theme.test.ts           # Single unit test
npx playwright test tests/e2e/home.spec.ts    # Single E2E test
```

## 📋 Project Structure

```
/
├── src/
│   ├── assets/          # Images and static files
│   ├── components/      # Astro components (Header, Footer, etc.)
│   ├── layouts/         # Page layout wrapper
│   ├── pages/           # Page routes (index.astro)
│   ├── store/           # Nanostores state (theme)
│   └── styles/          # Global CSS
├── tests/
│   ├── unit/            # Store and logic tests
│   ├── site/            # Built HTML structure tests
│   └── e2e/             # Browser interaction tests
├── public/              # Static assets
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript config
├── astro.config.mjs     # Astro config
├── vitest.config.ts     # Unit test runner config
└── playwright.config.ts # E2E test runner config
```

## 🎨 Features

- **Dark Mode Toggle**: Persists to localStorage and syncs across page reloads
- **Responsive Design**: Built with Tailwind CSS
- **Timeline**: Experience history with links
- **Testimonies**: Animated carousel
- **Contact Form**: Email and message inputs
- **Social Links**: GitHub, LinkedIn, Email

## 🛠️ Technology Stack

- **Framework**: Astro 6
- **Styling**: TailwindCSS 4
- **State**: Nanostores
- **Testing**: Vitest + Playwright
- **Type Safety**: TypeScript

## 📝 Known Issues & Future Work

- Timeline dates have low contrast ratios (color-contrast a11y rule); fix text color or background
- Contact form does not submit anywhere; wire to email service
- Treadmill animation can be tested with visual regression tools once styling stabilizes

## 📖 Further Reading

- [Astro Documentation](https://docs.astro.build)
- [Vitest Guide](https://vitest.dev)
- [Playwright Testing](https://playwright.dev)
