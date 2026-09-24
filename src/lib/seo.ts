import { DEFAULT_LANGUAGE, LANGUAGES } from '../i18n/config.ts';
import { courses, education } from '../data/education.ts';
import { experience } from '../data/experience.ts';
import { personal } from '../data/personal.ts';
import { projects } from '../data/projects.ts';
import { coursePath, experiencePath, projectPath, ROUTES } from '../data/routes.ts';
import { skillCategories } from '../data/skills.ts';
import { site } from '../data/site.ts';

/**
 * Build-time SEO helpers. They run inside the Vite config (see
 * `vite.config.ts`) so crawlers receive complete metadata in the static HTML,
 * generated from the same data files the UI renders.
 */

export interface HeadTag {
  tag: string;
  attrs?: Record<string, string>;
  children?: string;
}

const lang = DEFAULT_LANGUAGE;

export function getPageTitle(language = lang): string {
  return `${personal.name[language]} — ${personal.role[language]}`;
}

export function getPageDescription(language = lang): string {
  return personal.headline[language];
}

function meta(key: 'name' | 'property', name: string, content: string): HeadTag {
  return { tag: 'meta', attrs: { [key]: name, content } };
}

function buildStructuredData(siteUrl?: string) {
  const { contact } = personal;
  const sameAs = [contact.linkedin, contact.github, contact.website].filter(Boolean);
  const technical = skillCategories.filter((category) => category.id !== 'soft');

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personal.name[lang],
    jobTitle: personal.role[lang],
    description: personal.summary[lang],
    ...(siteUrl && { url: siteUrl }),
    ...(contact.email && { email: `mailto:${contact.email}` }),
    ...(sameAs.length > 0 && { sameAs }),
    homeLocation: { '@type': 'Place', name: personal.location[lang] },
    alumniOf: education.map((item) => ({ '@type': 'CollegeOrUniversity', name: item.institution[lang] })),
    knowsLanguage: personal.spokenLanguages.map((language) => language[lang]),
    knowsAbout: technical.flatMap((category) =>
      category.skills.map((skill) => (typeof skill === 'string' ? skill : skill[lang])),
    ),
    hasCredential: courses
      .filter((course) => course.certificateUrl)
      .map((course) => ({
        '@type': 'EducationalOccupationalCredential',
        name: course.title,
        url: course.certificateUrl,
        recognizedBy: { '@type': 'Organization', name: course.author ?? course.provider },
      })),
  };
}

export function buildHeadTags(siteUrl?: string): HeadTag[] {
  const title = getPageTitle();
  const description = getPageDescription();
  const ogImage = site.ogImage && siteUrl ? `${siteUrl}${site.ogImage}` : undefined;
  const alternateLocales = Object.entries(LANGUAGES)
    .filter(([code]) => code !== lang)
    .map(([, config]) => meta('property', 'og:locale:alternate', config.ogLocale));

  return [
    { tag: 'title', children: title },
    meta('name', 'description', description),
    meta('name', 'author', personal.name[lang]),
    { tag: 'meta', attrs: { name: 'theme-color', media: '(prefers-color-scheme: light)', content: site.themeColor.light } },
    { tag: 'meta', attrs: { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: site.themeColor.dark } },
    ...(siteUrl ? [{ tag: 'link', attrs: { rel: 'canonical', href: `${siteUrl}/` } }] : []),
    meta('property', 'og:type', 'profile'),
    meta('property', 'og:title', title),
    meta('property', 'og:description', description),
    meta('property', 'og:locale', LANGUAGES[lang].ogLocale),
    ...alternateLocales,
    ...(siteUrl ? [meta('property', 'og:url', `${siteUrl}/`)] : []),
    ...(ogImage ? [meta('property', 'og:image', ogImage), meta('name', 'twitter:image', ogImage)] : []),
    meta('name', 'twitter:card', ogImage ? 'summary_large_image' : 'summary'),
    meta('name', 'twitter:title', title),
    meta('name', 'twitter:description', description),
    {
      tag: 'script',
      attrs: { type: 'application/ld+json' },
      children: JSON.stringify(buildStructuredData(siteUrl)).replace(/</g, '\\u003c'),
    },
  ];
}

export function buildRobotsTxt(siteUrl?: string): string {
  const lines = ['User-agent: *', 'Allow: /'];
  if (siteUrl) lines.push('', `Sitemap: ${siteUrl}/sitemap.xml`);
  return `${lines.join('\n')}\n`;
}

export function buildSitemap(siteUrl: string): string {
  const paths = [
    ROUTES.home,
    ...experience.map((item) => experiencePath(item.id)),
    ...projects.map((project) => projectPath(project.id)),
    ...courses.map((course) => coursePath(course.id)),
  ];
  const urls = paths.map((path) => `  <url><loc>${siteUrl}${path}</loc></url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}
