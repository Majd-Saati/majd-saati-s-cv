import { experience } from '../../data/experience';
import { useLanguage } from '../../i18n/useLanguage';
import { Section } from '../ui/Section';
import { ExperienceTimeline } from './ExperienceTimeline';

export function Experience() {
  const { t } = useLanguage();

  return (
    <Section id="experience" title={t.experience.title} description={t.experience.description}>
      <ExperienceTimeline items={experience} />
    </Section>
  );
}
