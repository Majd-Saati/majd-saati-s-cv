import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BookOpen,
  Certificate,
  CheckCircle,
  Cloud,
  Code,
  Database,
  DownloadSimple,
  EnvelopeSimple,
  Gauge,
  GithubLogo,
  Globe,
  GraduationCap,
  HardDrives,
  LinkedinLogo,
  List,
  MapPin,
  Moon,
  Phone,
  Stack,
  Sun,
  Trophy,
  UsersThree,
  WhatsappLogo,
  Wrench,
  X,
  type Icon as PhosphorIcon,
  type IconWeight,
} from '@phosphor-icons/react';
import { cx } from '../../lib/classNames';
import { DIRECTIONAL_ICONS, type IconName } from './icons';
import styles from './Icon.module.css';

// Named imports keep the bundle limited to the icons actually used.
const ICONS: Record<IconName, PhosphorIcon> = {
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  arrowUp: ArrowUp,
  arrowUpRight: ArrowUpRight,
  download: DownloadSimple,
  mail: EnvelopeSimple,
  phone: Phone,
  whatsapp: WhatsappLogo,
  mapPin: MapPin,
  github: GithubLogo,
  linkedin: LinkedinLogo,
  globe: Globe,
  sun: Sun,
  moon: Moon,
  menu: List,
  close: X,
  code: Code,
  server: HardDrives,
  database: Database,
  cloud: Cloud,
  wrench: Wrench,
  gauge: Gauge,
  users: UsersThree,
  graduation: GraduationCap,
  book: BookOpen,
  certificate: Certificate,
  trophy: Trophy,
  layers: Stack,
  check: CheckCircle,
};

type AllowedIconWeight = Exclude<IconWeight, 'bold' | 'fill'>;

interface IconProps {
  name: IconName;
  size?: number;
  /**
   * Phosphor weight. `bold` and `fill` are intentionally excluded (design
   * decision); `duotone` suits larger decorative badges.
   */
  weight?: AllowedIconWeight;
  className?: string;
}

/** Decorative Phosphor icon. Always pair with visible text or an accessible label. */
export function Icon({ name, size = 18, weight = 'regular', className }: IconProps) {
  const Component = ICONS[name];

  return (
    <Component
      className={cx(styles.icon, DIRECTIONAL_ICONS.has(name) && styles.directional, className)}
      size={size}
      weight={weight}
      aria-hidden="true"
      focusable="false"
    />
  );
}
