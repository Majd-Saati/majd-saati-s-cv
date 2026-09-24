import {
  siBootstrap,
  siCoursera,
  siDocker,
  siElementor,
  siGit,
  siGoogleanalytics,
  siGoogletagmanager,
  siI18next,
  siJavascript,
  siLinux,
  siMui,
  siMysql,
  siNextdotjs,
  siNginx,
  siNodedotjs,
  siReact,
  siReactquery,
  siRedux,
  siTailwindcss,
  siTypescript,
  siUdemy,
  siWordpress,
  type SimpleIcon,
} from 'simple-icons';

/**
 * Brand logos (Simple Icons, CC0) keyed by technology / platform name as it
 * appears in the data files. Qualifiers in parentheses are ignored, so
 * "Linux (basics)" and "Linux (أساسيات)" both resolve to the Linux logo.
 * Import icons individually to keep the bundle tree-shaken.
 */
const LOGOS: Record<string, SimpleIcon> = {
  'Next.js': siNextdotjs,
  'React.js': siReact,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  'Redux Toolkit': siRedux,
  'TanStack Query': siReactquery,
  'React Query': siReactquery,
  'Tailwind CSS': siTailwindcss,
  MUI: siMui,
  Bootstrap: siBootstrap,
  i18next: siI18next,
  'Node.js': siNodedotjs,
  MySQL: siMysql,
  Docker: siDocker,
  Linux: siLinux,
  Nginx: siNginx,
  Git: siGit,
  'Google Tag Manager': siGoogletagmanager,
  'Google Analytics 4': siGoogleanalytics,
  WordPress: siWordpress,
  Elementor: siElementor,
  Udemy: siUdemy,
  Coursera: siCoursera,
};

export function getTechLogo(name: string): SimpleIcon | undefined {
  return LOGOS[name] ?? LOGOS[name.replace(/\s*\(.*\)\s*$/, '')];
}

/** First known technology mentioned in free text, e.g. a course title. */
export function findTechLogoInText(text: string): SimpleIcon | undefined {
  const lower = text.toLowerCase();
  const name = Object.keys(LOGOS).find((key) => lower.includes(key.toLowerCase()));
  return name ? LOGOS[name] : undefined;
}
