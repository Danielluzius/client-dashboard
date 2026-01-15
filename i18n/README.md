# Internationalization (i18n) – Client Dashboard

> 🌍 **[Deutsche Version](./README.de.md)** | **English Version** (you are here)

## Overview

This dashboard uses a **custom i18n solution** without external libraries (like i18next or next-intl). The implementation is specifically optimized for React/Next.js and provides full TypeScript support.

### Supported Languages

- **German (de)** – Default
- **English (en)**

---

## Architecture

### Why This Solution?

**1. No External Dependencies**

- Reduces bundle size
- Avoids breaking changes from library updates
- Full control over implementation

**2. React Context for State Management**

- Global access without prop drilling
- Optimized performance through `useCallback`
- Automatic persistence via `localStorage`

**3. TypeScript-First**

- Complete type safety for translation keys
- IDE autocomplete
- Compile-time errors for invalid keys

**4. Easy Extensibility**

- New languages: Add JSON file + extend config
- New keys: Add to JSON, immediately available
- Clear, flat structure

---

## Structure

```
/i18n
├── de.json              # German translations
├── en.json              # English translations
├── i18n.config.ts       # Language configuration & types
└── I18nProvider.tsx     # React Context Provider
```

### File Overview

**`de.json` / `en.json`**

- Contain all translations in nested structure
- Identical structure for all languages
- Dot notation for access: `dashboard.title`

**`i18n.config.ts`**

- Defines available languages (`Locale`)
- Default language (`DEFAULT_LOCALE`)
- TypeScript types for translations

**`I18nProvider.tsx`**

- React Context for language management
- `useI18n()` hook for components
- `t('key')` function for translations
- localStorage integration

---

## Usage

### 1. In Components

```tsx
'use client';

import { useI18n } from '@/i18n/I18nProvider';

export const MyComponent = () => {
  const { t, locale, setLocale } = useI18n();

  return (
    <div>
      <h1>{t('dashboard.title')}</h1>
      <p>{t('dashboard.subtitle')}</p>
      <span>Current language: {locale}</span>
    </div>
  );
};
```

### 2. Language Switcher

The `LanguageSwitcher` is already implemented and integrated in navigation:

```tsx
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

// Already used in Navigation.tsx
<LanguageSwitcher />;
```

### 3. Dynamic Values

For pluralization or dynamic text:

```tsx
const { t } = useI18n();
const count = posts.length;

// Pluralization
const text =
  count === 1
    ? t('userDetail.posts.count') // "Post"
    : t('userDetail.posts.countPlural'); // "Posts"

// Combined with values
<p>
  {count} {text}
</p>; // "5 Posts"
```

---

## Adding Translations

### Add New Language

**1. Create JSON file:**

```
/i18n/es.json  # Example: Spanish translations
```

**2. Extend config:**

```typescript
// i18n.config.ts
import es from './es.json';

export type Locale = 'de' | 'en' | 'es';

export const translations = {
  de,
  en,
  es,
};

export const LOCALE_LABELS = {
  de: 'Deutsch',
  en: 'English',
  es: 'Español',
};
```

### Add New Translation Keys

Simply add to **all** language files:

```json
// de.json
{
  "settings": {
    "title": "Einstellungen",
    "theme": "Design"
  }
}

// en.json
{
  "settings": {
    "title": "Settings",
    "theme": "Theme"
  }
}
```

Then immediately available:

```tsx
{
  t('settings.title');
}
```

---

## Best Practices

### ✅ DO

- **Consistent key structure:** `section.subsection.key`
- **Meaningful grouping:** Organize by features/pages
- **Completeness:** Maintain all languages in parallel
- **Use type safety:** TypeScript warns about missing keys
- **Language-independent data:** Don't translate API data

### ❌ DON'T

- Hardcoded text in components
- Inconsistent key naming
- Mix translations in code logic
- Too deep nesting (max. 3-4 levels)

---

## Fallback Mechanism

The `t()` function has built-in fallback:

1. **Primary:** Translation in current language
2. **Fallback:** German translation (default)
3. **Not Found:** Returns key + console warning

```tsx
t('dashboard.title');
// EN: "Dashboard" ✓
// DE: "Dashboard" ✓
// Key missing: "dashboard.title" + Warning
```

---

## Performance

**Optimizations:**

- `useCallback` for `t()` and `setLocale()`
- Lazy loading of JSON files (ES Modules)
- No re-renders on language switch (Context)
- localStorage caching

**Bundle Impact:**

- DE + EN JSON: ~2-3 KB (minified)
- Provider + Config: ~1 KB
- **Total:** ~4 KB for complete i18n

---

## Extension Possibilities

### Date/Time Formatting

```tsx
const { locale } = useI18n();

const formattedDate = new Date().toLocaleDateString(locale, {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
```

### URL-based Language

```tsx
// Extension for /de/dashboard, /en/dashboard
useEffect(() => {
  const urlLang = pathname.split('/')[1] as Locale;
  if (LOCALES.includes(urlLang)) {
    setLocale(urlLang);
  }
}, [pathname]);
```

### Server Components (future)

For Next.js 14+ App Router with Server Components:

- Read language from cookie/header
- Load translations server-side
- Current: Client Components (deliberate choice for this project)

---

## Conclusion

This i18n solution is:

- ✅ **Production-ready** for agency projects
- ✅ **Maintainable** through clear structure
- ✅ **Extensible** without refactoring
- ✅ **Performant** without unnecessary dependencies
- ✅ **TypeScript-safe** with complete typing

Perfect for medium-sized dashboards and portfolio projects that need professional multilingual support without overhead.
