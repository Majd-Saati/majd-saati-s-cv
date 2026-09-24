import { useRef } from 'react';
import { personal } from '../../data/personal';
import { getTechLogo } from '../../data/techLogos';
import { useLanguage } from '../../i18n/useLanguage';
import { cx } from '../../lib/classNames';
import { getContactChannels } from '../../lib/contact';
import { gsap, MOTION_OK, useGSAP } from '../../lib/gsap';
import { getInitials } from '../../lib/text';
import { AnimatedText } from '../ui/AnimatedText';
import { ButtonLink } from '../ui/ButtonLink';
import { Icon } from '../ui/Icon';
import { ProfilePhoto } from '../ui/ProfilePhoto';
import { SocialLinks } from '../ui/SocialLinks';
import { TechLogo } from '../ui/TechLogo';
import styles from './Hero.module.css';

const channels = getContactChannels(personal.contact);
const initials = getInitials(personal.name.en);
const coreStack = personal.coreStack.map((name) => ({ name, logo: getTechLogo(name) }));
/** Logos floating around the portrait (decorative; the stack is also listed as text). */
const floatingBadges = coreStack.filter((tech) => tech.logo).slice(0, 3);

export function Hero() {
  const { t, text } = useLanguage();
  const name = text(personal.name);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const content = contentRef.current;
      const portrait = mediaRef.current;
      if (!content || !portrait) return;

      const media = gsap.matchMedia();
      media.add(MOTION_OK, () => {
        // Entrance: the name rises word by word, the other lines follow in
        // sequence, then the portrait settles.
        const lines = Array.from(content.children).filter((child) => child.tagName !== 'H1');
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from(content.querySelector('[data-greeting]'), { opacity: 0, y: 12, duration: 0.6 })
          .from(content.querySelectorAll('[data-word]'), { yPercent: 110, duration: 0.9, stagger: 0.08 }, 0.1)
          .from(lines, { y: 20, opacity: 0, duration: 0.7, stagger: 0.07 }, 0.25)
          .from(portrait, { scale: 0.94, opacity: 0, duration: 1 }, 0.3);

        // Parallax while scrolling away: content drifts up and fades, portrait lags behind.
        gsap
          .timeline({ scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true } })
          .to(content, { yPercent: -10, opacity: 0.25, ease: 'none' }, 0)
          .to(portrait, { yPercent: 12, ease: 'none' }, 0);
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="home" aria-labelledby="home-title" className={styles.hero}>
      <div className={cx('container', styles.grid)}>
        <div ref={contentRef} className={styles.content}>
          <p className={styles.location}>
            <Icon name="mapPin" size={16} />
            {text(personal.location)}
          </p>

          <h1 id="home-title" className={styles.title}>
            <span className={styles.greeting} data-greeting>
              {t.hero.greeting}
            </span>{' '}
            <AnimatedText text={name} />
          </h1>
          <p className={styles.role}>{text(personal.role)}</p>
          <p className={styles.headline}>{text(personal.headline)}</p>

          <div className={styles.actions}>
            <ButtonLink href="#projects" icon="arrowRight" magnetic>
              {t.hero.viewWork}
            </ButtonLink>
            <ButtonLink href="#contact" variant="secondary" magnetic>
              {t.hero.contactMe}
            </ButtonLink>
            {personal.cvUrl && (
              <ButtonLink href={personal.cvUrl} variant="ghost" icon="download" download>
                {t.hero.downloadCv}
              </ButtonLink>
            )}
          </div>

          {coreStack.length > 0 && (
            <div className={styles.stack}>
              <p className={styles.stackLabel}>{t.hero.coreStack}</p>
              <ul className={styles.stackList}>
                {coreStack.map((tech) => (
                  <li key={tech.name} className={styles.stackItem}>
                    {tech.logo && <TechLogo icon={tech.logo} size={18} />}
                    {tech.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <SocialLinks channels={channels} />
        </div>

        <div ref={mediaRef} className={styles.media}>
          <ProfilePhoto photo={personal.photo} label={name} initials={initials} />
          {floatingBadges.length > 0 && (
            <ul className={styles.badges} aria-hidden="true">
              {floatingBadges.map((tech) => (
                <li key={tech.name} className={styles.badge}>
                  {tech.logo && <TechLogo icon={tech.logo} size={20} />}
                  <span>{tech.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
