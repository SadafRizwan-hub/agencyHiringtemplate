import type { ThemeConfig } from '~/types/config'

/**
 * Serialises theme.config.ts into CSS custom properties.
 * assets/css/main.css maps these `--brand-*` variables onto Tailwind tokens.
 */
export function themeToCss(theme: ThemeConfig): string {
  const vars: Record<string, string> = {
    '--brand-primary': theme.colors.primary,
    '--brand-primary-contrast': theme.colors.primaryContrast,
    '--brand-accent': theme.colors.accent,
    '--brand-surface': theme.colors.surface,
    '--brand-text': theme.colors.text,
    '--brand-muted': theme.colors.muted,
    '--brand-font-latin': theme.fonts.latin,
    '--brand-font-arabic': theme.fonts.arabic,
    '--brand-radius-sm': theme.radius.sm,
    '--brand-radius-md': theme.radius.md,
    '--brand-radius-lg': theme.radius.lg,
    '--brand-radius-full': theme.radius.full,
  }
  const body = Object.entries(vars)
    .map(([name, value]) => `${name}:${value};`)
    .join('')
  return `:root{${body}}`
}
