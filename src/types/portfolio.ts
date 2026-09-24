import type { Language } from '../i18n/config.ts';
import type { IconName } from '../components/ui/icons.ts';

/** A string translated into every supported language. */
export type Localized = Record<Language, string>;

/**
 * Text that is either language-neutral (e.g. a technology name such as
 * "React.js") or translated per language.
 */
export type LocalizedText = string | Localized;

/** Month precision date in `YYYY-MM` format. */
export type YearMonth = `${number}-${number}${number}`;

export interface DateRange {
  start: YearMonth;
  /** Omit for an ongoing period ("Present"). */
  end?: YearMonth;
}

export interface ImageAsset {
  /** Path relative to `/public`, e.g. `/images/profile.webp`. */
  src: string;
  alt: Localized;
  width: number;
  height: number;
}

export interface ContactDetails {
  email?: string;
  /** International format, e.g. `+963935387582`. */
  phone?: string;
  /** WhatsApp number in international format; the wa.me link is derived. */
  whatsapp?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface Highlight {
  id: string;
  value: string;
  label: Localized;
}

export interface PersonalInfo {
  name: Localized;
  role: Localized;
  location: Localized;
  /** Short introduction shown in the hero. */
  headline: Localized;
  /** Longer professional summary shown in the About section. */
  summary: Localized;
  background: Localized;
  careerFocus: Localized[];
  /** Primary technologies, highlighted in the hero. */
  coreStack: string[];
  highlights: Highlight[];
  spokenLanguages: Localized[];
  photo?: ImageAsset;
  /** Public path of the downloadable CV. */
  cvUrl?: string;
  contact: ContactDetails;
}

export type ProjectId = string;

export interface Project {
  id: ProjectId;
  name: Localized;
  description: Localized;
  /** Where / for whom the project was built. */
  context?: Localized;
  technologies: string[];
  image?: ImageAsset;
  demoUrl?: string;
  sourceUrl?: string;
}

export interface Experience {
  id: string;
  role: Localized;
  company?: Localized;
  companyUrl?: string;
  location?: Localized;
  period?: DateRange;
  responsibilities: Localized[];
  achievements: Localized[];
  technologies: string[];
  /** Projects (from `data/projects.ts`) delivered in this role. */
  projectIds?: ProjectId[];
}

export interface SkillCategory {
  id: string;
  title: Localized;
  icon: IconName;
  skills: LocalizedText[];
}

export interface Education {
  id: string;
  degree: Localized;
  institution: Localized;
  period?: DateRange;
  /**
   * Degree certificate: an online URL or a file under `/public`
   * (e.g. `/certificates/bachelor.pdf`). The button is hidden when absent.
   */
  certificateUrl?: string;
}

export interface Course {
  id: string;
  title: string;
  /** Learning platform, e.g. Udemy or Coursera. */
  provider: string;
  /** Instructor or organization that authored the course. */
  author?: string;
  courseUrl?: string;
  /** Link to a verifiable certificate of completion. */
  certificateUrl?: string;
  /** Optional summary for the course details page (hidden when absent). */
  description?: Localized;
  /** Optional topics covered, shown as tags on the details page. */
  topics?: string[];
}
