# Client Dashboard

_[🇩🇪 Deutsche Version](README.de.md)_

A professional client dashboard as a portfolio project, built with modern frontend technologies.

## 📋 Project Goal

This project demonstrates the implementation of a realistic client dashboard, as used in agency and client projects. The focus is on **code quality**, **clean architecture**, and **best practices** – not on gimmicks or excessive design.

The dashboard serves as a portfolio for frontend developer positions with React & Next.js.

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Library**: React 18
- **Language**: TypeScript (strict mode)
- **Styling**: CSS Modules
- **API**: JSONPlaceholder (public REST API)
- **Data Fetching**: Native Fetch API

### Deliberate Decisions

- ✅ **No UI Frameworks** (Material-UI, Chakra, Tailwind) – Focus on fundamental CSS skills
- ✅ **No complex state management libs** – React Hooks are sufficient
- ✅ **App Router instead of Pages Router** – Modern Next.js architecture
- ✅ **TypeScript without `any`** – Complete type safety

## 📁 Project Architecture

```
client-dashboard/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root Layout with Meta Tags
│   ├── page.tsx                 # Dashboard (Homepage)
│   ├── globals.css              # Global Styles & Design System
│   └── users/                   # Users Feature
│       ├── page.tsx             # User List
│       └── [id]/                # Dynamic Routing
│           └── page.tsx         # User Detail Page
├── components/                   # React Components
│   ├── layout/                  # Layout Components
│   │   ├── MainLayout.tsx       # Main Layout Wrapper
│   │   └── Navigation.tsx       # Navigation with Mobile Menu
│   └── ui/                      # Reusable UI Components
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── ErrorMessage.tsx
│       ├── LoadingSpinner.tsx
│       ├── LoadingSkeleton.tsx  # Modern Skeleton Loaders
│       ├── StatCard.tsx
│       └── UserTable.tsx
├── hooks/                        # Custom React Hooks
│   └── index.ts                 # useMediaQuery, useWindowSize, etc.
├── i18n/                         # Internationalization
│   ├── de.json                  # German translations
│   ├── en.json                  # English translations
│   ├── i18n.config.ts           # i18n configuration
│   └── I18nProvider.tsx         # i18n context provider
├── lib/                          # Utilities & Helpers
│   ├── constants.ts             # App-wide constants
│   └── utils.ts                 # Helper functions
├── services/                     # API Service Layer
│   └── api.ts                   # Centralized API functions
├── types/                        # TypeScript Definitions
│   └── index.ts                 # Shared types
├── .editorconfig                # Code style consistency
├── .eslintrc.js                 # ESLint configuration
├── .prettierrc                  # Prettier configuration
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

### Architecture Principles

1. **Separation of Concerns**
   - UI components (`components/ui/`) are reusable and presentation-oriented
   - Layout components (`components/layout/`) structure pages
   - Service layer (`services/`) encapsulates API logic
   - Types (`types/`) centralize TypeScript definitions
   - Hooks (`hooks/`) for reusable React logic
   - Lib (`lib/`) for utilities, constants, and helpers

2. **Component Design**
   - Small, focused components
   - Props interface for each component
   - CSS Modules for scoped styling
   - Clear separation of logic and presentation

3. **Error & Loading Handling**
   - Consistent loading states with `LoadingSpinner`
   - Professional error messages with retry functionality
   - Type-safe error handling via TypeScript

4. **API Integration**
   - Centralized fetch logic in `services/api.ts`
   - Reusable `fetchApi` function
   - Error handling at service level
   - Parallel API calls where appropriate (`Promise.all`)

## 🚀 Installation & Setup

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build
npm start
```

The application runs at [http://localhost:3000](http://localhost:3000)

## 📄 Features

### Dashboard (`/`)

- Overview with statistics cards
- Number of users and posts
- Last update timestamp
- Project information
- Bilingual support (German/English)

### User List (`/users`)

- Tabular display of all users
- Shows name, email, company, and city
- Click "Details" to navigate to detail page
- Loading and error states

### User Detail (`/users/[id]`)

- Detailed user information
- Contact details, address, and company
- List of all user posts
- "Back" navigation
- Robust error handling for invalid IDs

## 🌐 Internationalization

- Custom i18n implementation (no external libraries)
- Support for German and English
- Language switcher in navigation
- Persistent language selection (localStorage)
- Type-safe translation keys

## 🎯 Best Practices

### Code Quality

- ✅ Consistent naming conventions
- ✅ TypeScript without `any`
- ✅ Clean code without unnecessary comments
- ✅ ESLint-compliant code structure

### React & Next.js

- ✅ Client Components with `'use client'` directive
- ✅ App Router for modern routing
- ✅ Proper use of hooks (`useEffect`, `useState`)
- ✅ Dynamic routing with `[id]` pattern

### Performance

- ✅ Parallel API calls with `Promise.all`
- ✅ CSS Modules for optimized styling
- ✅ No unnecessary re-renders

### UX/UI

- ✅ Consistent design system
- ✅ Clear feedback mechanisms
- ✅ Responsive design (mobile-first)
- ✅ Accessibility basics

## 📝 Evaluation Criteria Met

### Functional

- ✅ All required pages implemented
- ✅ Dynamic routing works
- ✅ Complete API integration
- ✅ Loading and error states present

### Technical

- ✅ Clean component architecture
- ✅ TypeScript consistently used
- ✅ Reusable UI components
- ✅ Service layer for API calls

### Quality

- ✅ No massive components
- ✅ Meaningful naming
- ✅ Maintainable, readable code
- ✅ Professional error handling

## 🔄 Possible Extensions

If you want to further develop the project:

- Pagination for user list
- Filter and search functions
- Error Boundary for global error handling
- Unit tests with Jest/React Testing Library
- E2E tests with Playwright
- Authentication (optional)
- Dark mode

## 📧 Author

Daniel  
Portfolio project for frontend developer applications

---

**Note**: This project uses the public [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) for demonstration purposes. The data is placeholder and not persistent.
