import { projectPath } from '../../data/routes';
import { useLanguage } from '../../i18n/useLanguage';
import type { Project } from '../../types/portfolio';
import { AppLink } from '../ui/AppLink';
import { Card } from '../ui/Card';
import { TagList } from '../ui/TagList';
import { TextLink } from '../ui/TextLink';
import { ProjectMedia } from './ProjectMedia';
import styles from './Projects.module.css';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { t, text } = useLanguage();
  const detailsPath = projectPath(project.id);

  return (
    <Card as="li" interactive className={styles.card}>
      <ProjectMedia project={project} index={index} />

      <div className={styles.body}>
        {project.context && <p className={styles.context}>{text(project.context)}</p>}
        <h3 className={styles.name}>
          <AppLink href={detailsPath} className={styles.nameLink}>
            {text(project.name)}
          </AppLink>
        </h3>
        <p className={styles.description}>{text(project.description)}</p>
        <TagList items={project.technologies} variant="accent" />

        <div className={styles.links}>
          <TextLink href={detailsPath} icon="arrowRight">
            {t.projects.viewDetails}
          </TextLink>
          {project.demoUrl && (
            <TextLink href={project.demoUrl} icon="globe" external>
              {t.projects.viewDemo}
            </TextLink>
          )}
          {project.sourceUrl && (
            <TextLink href={project.sourceUrl} icon="github" external>
              {t.projects.viewSource}
            </TextLink>
          )}
        </div>
      </div>
    </Card>
  );
}
