# Internationalisierung (i18n) – Client Dashboard

> 🌍 **Deutsche Version** (du bist hier) | **[English Version](./README.md)**

## Übersicht

Dieses Dashboard nutzt eine **maßgeschneiderte i18n-Lösung** ohne externe Libraries (wie i18next oder next-intl). Die Implementierung ist speziell für React/Next.js optimiert und bietet volle TypeScript-Unterstützung.

### Unterstützte Sprachen

- **Deutsch (de)** – Standard
- **Englisch (en)**

---

## Architektur

### Warum diese Lösung?

**1. Keine externen Abhängigkeiten**

- Reduziert Bundle-Size
- Vermeidet Breaking Changes durch Library-Updates
- Volle Kontrolle über die Implementierung

**2. React Context für State Management**

- Globaler Zugriff ohne Prop-Drilling
- Optimierte Performance durch `useCallback`
- Automatische Persistenz via `localStorage`

**3. TypeScript-First**

- Vollständige Typsicherheit für Translation Keys
- Autocomplete in der IDE
- Compile-Zeit-Fehler bei falschen Keys

**4. Einfache Erweiterbarkeit**

- Neue Sprachen: JSON-Datei hinzufügen + Config erweitern
- Neue Keys: In JSON eintragen, sofort verfügbar
- Klare, flache Struktur

---

## Struktur

```
/i18n
├── de.json              # Deutsche Übersetzungen
├── en.json              # Englische Übersetzungen
├── i18n.config.ts       # Sprach-Konfiguration & Types
└── I18nProvider.tsx     # React Context Provider
```

### Dateiübersicht

**`de.json` / `en.json`**

- Enthalten alle Übersetzungen in verschachtelter Struktur
- Identischer Aufbau für alle Sprachen
- Dot-Notation für Zugriff: `dashboard.title`

**`i18n.config.ts`**

- Definiert verfügbare Sprachen (`Locale`)
- Standardsprache (`DEFAULT_LOCALE`)
- TypeScript-Typen für Übersetzungen

**`I18nProvider.tsx`**

- React Context für Sprachverwaltung
- `useI18n()` Hook für Komponenten
- `t('key')` Funktion für Übersetzungen
- localStorage-Integration

---

## Verwendung

### 1. In Komponenten

```tsx
'use client';

import { useI18n } from '@/i18n/I18nProvider';

export const MyComponent = () => {
  const { t, locale, setLocale } = useI18n();

  return (
    <div>
      <h1>{t('dashboard.title')}</h1>
      <p>{t('dashboard.subtitle')}</p>
      <span>Aktuelle Sprache: {locale}</span>
    </div>
  );
};
```

### 2. Language Switcher

Der `LanguageSwitcher` ist bereits implementiert und in der Navigation integriert:

```tsx
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

// In Navigation.tsx bereits verwendet
<LanguageSwitcher />;
```

### 3. Dynamische Werte

Für Pluralisierung oder dynamische Texte:

```tsx
const { t } = useI18n();
const count = posts.length;

// Pluralisierung
const text =
  count === 1
    ? t('userDetail.posts.count') // "Beitrag"
    : t('userDetail.posts.countPlural'); // "Beiträge"

// Mit Werten kombinieren
<p>
  {count} {text}
</p>; // "5 Beiträge"
```

---

## Übersetzungen hinzufügen

### Neue Sprache hinzufügen

**1. JSON-Datei erstellen:**

```
/i18n/es.json  # Beispiel: Spanische Übersetzungen
```

**2. Config erweitern:**

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

### Neue Übersetzungskeys hinzufügen

Einfach in **allen** Sprach-Dateien ergänzen:

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

Dann sofort verfügbar:

```tsx
{
  t('settings.title');
}
```

---

## Best Practices

### ✅ DO

- **Konsistente Key-Struktur:** `bereich.unterbereich.key`
- **Sinnvolle Gruppierung:** Nach Features/Seiten organisieren
- **Vollständigkeit:** Alle Sprachen parallel pflegen
- **Typsicherheit nutzen:** TypeScript warnt bei fehlenden Keys
- **Sprachunabhängige Daten:** API-Daten nicht übersetzen

### ❌ DON'T

- Hardcoded Texte in Komponenten
- Inkonsistente Key-Namen
- Übersetzungen in Code-Logik mischen
- Zu tiefe Verschachtelung (max. 3-4 Ebenen)

---

## Fallback-Mechanismus

Die `t()`-Funktion hat eingebauten Fallback:

1. **Primär:** Übersetzung in aktueller Sprache
2. **Fallback:** Deutsche Übersetzung (Standard)
3. **Not Found:** Gibt Key zurück + Console Warning

```tsx
t('dashboard.title');
// EN: "Dashboard" ✓
// DE: "Dashboard" ✓
// Key fehlt: "dashboard.title" + Warning
```

---

## Performance

**Optimierungen:**

- `useCallback` für `t()` und `setLocale()`
- Lazy Loading der JSON-Dateien (ES Modules)
- Keine Re-Renders bei Language Switch (Context)
- localStorage-Caching

**Bundle Impact:**

- DE + EN JSON: ~2-3 KB (minified)
- Provider + Config: ~1 KB
- **Total:** ~4 KB für vollständige i18n

---

## Erweiterungsmöglichkeiten

### Datum/Zeit-Formatierung

```tsx
const { locale } = useI18n();

const formattedDate = new Date().toLocaleDateString(locale, {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
```

### URL-basierte Sprache

```tsx
// Erweiterung für /de/dashboard, /en/dashboard
useEffect(() => {
  const urlLang = pathname.split('/')[1] as Locale;
  if (LOCALES.includes(urlLang)) {
    setLocale(urlLang);
  }
}, [pathname]);
```

### Server Components (zukünftig)

Für Next.js 14+ App Router mit Server Components:

- Sprache aus Cookie/Header lesen
- Übersetzungen serverseitig laden
- Aktuell: Client Components (bewusste Wahl für dieses Projekt)

---

## Fazit

Diese i18n-Lösung ist:

- ✅ **Production-ready** für Agenturprojekte
- ✅ **Wartbar** durch klare Struktur
- ✅ **Erweiterbar** ohne Refactoring
- ✅ **Performant** ohne unnötige Abhängigkeiten
- ✅ **TypeScript-sicher** mit vollständiger Typisierung

Perfekt geeignet für mittelgroße Dashboards und Portfolioprojekte, die professionelle Mehrsprachigkeit ohne Overhead benötigen.
