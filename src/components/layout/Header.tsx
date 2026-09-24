import { useRef, useState, type KeyboardEvent } from 'react';
import { Link, useLocation } from 'react-router';
import { personal } from '../../data/personal';
import { getNavSectionForPath, ROUTES } from '../../data/routes';
import { SECTION_IDS, toNavSection } from '../../data/sections';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useLanguage } from '../../i18n/useLanguage';
import { cx } from '../../lib/classNames';
import { getInitials } from '../../lib/text';
import { LanguageSwitcher } from '../navigation/LanguageSwitcher';
import { NavLinks } from '../navigation/NavLinks';
import { ThemeToggle } from '../navigation/ThemeToggle';
import { IconButton } from '../ui/IconButton';
import styles from './Header.module.css';

const MOBILE_NAV_ID = 'mobile-navigation';
const initials = getInitials(personal.name.en);

export function Header() {
  const { t, text } = useLanguage();
  const { pathname } = useLocation();
  const isHome = pathname === ROUTES.home;
  const sectionInView = useActiveSection(SECTION_IDS, isHome, pathname);
  // On a detail page, highlight the home section it belongs to.
  const activeId = isHome ? toNavSection(sectionInView) : getNavSectionForPath(pathname);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => setIsMenuOpen(false);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Escape' || !isMenuOpen) return;
    closeMenu();
    menuButtonRef.current?.focus();
  };

  return (
    <header className={styles.header} onKeyDown={handleKeyDown}>
      <a href="#main" className={styles.skipLink}>
        {t.a11y.skipToContent}
      </a>

      <div className={cx('container', styles.bar)}>
        <Link to={{ pathname: ROUTES.home, hash: '#home' }} className={styles.brand} onClick={closeMenu}>
          <span className={styles.logo} aria-hidden="true">
            {initials}
          </span>
          <span className={styles.brandName}>{text(personal.name)}</span>
        </Link>

        <nav aria-label={t.a11y.mainNavigation} className={styles.desktopNav}>
          <NavLinks activeId={activeId} />
        </nav>

        <div className={styles.actions}>
          <LanguageSwitcher />
          <ThemeToggle />
          <IconButton
            ref={menuButtonRef}
            className={styles.menuButton}
            icon={isMenuOpen ? 'close' : 'menu'}
            label={isMenuOpen ? t.a11y.closeMenu : t.a11y.openMenu}
            aria-expanded={isMenuOpen}
            aria-controls={MOBILE_NAV_ID}
            onClick={() => setIsMenuOpen((open) => !open)}
          />
        </div>
      </div>

      <nav id={MOBILE_NAV_ID} aria-label={t.a11y.mainNavigation} className={styles.mobileNav} hidden={!isMenuOpen}>
        <div className="container">
          <NavLinks activeId={activeId} orientation="vertical" onNavigate={closeMenu} />
        </div>
      </nav>
    </header>
  );
}
