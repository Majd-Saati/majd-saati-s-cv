import type { ImageAsset } from '../../types/portfolio';
import { useLanguage } from '../../i18n/useLanguage';
import styles from './ProfilePhoto.module.css';

interface ProfilePhotoProps {
  photo?: ImageAsset;
  /** Accessible name for the monogram placeholder. */
  label: string;
  initials: string;
}

/** Hero portrait slot. Falls back to a monogram until a photo is configured. */
export function ProfilePhoto({ photo, label, initials }: ProfilePhotoProps) {
  const { text } = useLanguage();

  return (
    <div className={styles.frame}>
      {photo ? (
        <img
          className={styles.image}
          src={photo.src}
          alt={text(photo.alt)}
          width={photo.width}
          height={photo.height}
          fetchPriority="high"
          decoding="async"
        />
      ) : (
        <div className={styles.placeholder} role="img" aria-label={label}>
          <span className={styles.initials} aria-hidden="true">
            {initials}
          </span>
        </div>
      )}
    </div>
  );
}
