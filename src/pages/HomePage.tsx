import { About } from '../components/sections/About';
import { Contact } from '../components/sections/Contact';
import { Courses } from '../components/sections/Courses';
import { Education } from '../components/sections/Education';
import { Experience } from '../components/sections/Experience';
import { Hero } from '../components/sections/Hero';
import { Projects } from '../components/sections/Projects';
import { Skills } from '../components/sections/Skills';
import { SkillsExplorer } from '../components/sections/SkillsExplorer';
import { ROUTES } from '../data/routes';
import { usePageMeta } from '../hooks/usePageMeta';
import { useLanguage } from '../i18n/useLanguage';
import { getPageDescription, getPageTitle } from '../lib/seo';

export function HomePage() {
  const { language } = useLanguage();
  usePageMeta(getPageTitle(language), getPageDescription(language), ROUTES.home);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <SkillsExplorer />
      <Experience />
      <Projects />
      <Education />
      <Courses />
      <Contact />
    </>
  );
}
