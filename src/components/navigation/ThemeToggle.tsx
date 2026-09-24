import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../i18n/useLanguage';
import { IconButton } from '../ui/IconButton';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';

  return (
    <IconButton
      icon={isDark ? 'sun' : 'moon'}
      label={isDark ? t.a11y.switchToLight : t.a11y.switchToDark}
      onClick={toggleTheme}
    />
  );
}
