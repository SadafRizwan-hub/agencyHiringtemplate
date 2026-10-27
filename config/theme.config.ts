import type { ThemeConfig } from '../types/config'

/**
 * Per-client theme tokens. Emitted as CSS variables on :root
 * (see utils/theme.ts) and mapped to Tailwind in assets/css/main.css.
 */
const themeConfig: ThemeConfig = {
  colors: {
    primary: '#1f4e79',
    primaryContrast: '#ffffff',
    accent: '#d98e04',
    surface: '#f5f6f8',
    text: '#1a1a1a',
    muted: '#5f6b7a',
  },
  fonts: {
    latin: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    arabic: 'Tahoma, "Segoe UI", system-ui, sans-serif',
  },
  radius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    full: '9999px',
  },
}

export default themeConfig
