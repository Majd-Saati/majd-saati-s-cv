import type { SkillCategory } from '../types/portfolio.ts';

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: { en: 'Frontend', ar: 'الواجهات الأمامية' },
    icon: 'code',
    skills: [
      'Next.js',
      'React.js',
      'TypeScript',
      'JavaScript (ES6+)',
      'Redux Toolkit',
      'TanStack Query',
      'Tailwind CSS',
      'MUI',
      'Bootstrap',
      'i18next',
    ],
  },
  {
    id: 'backend',
    title: { en: 'Backend', ar: 'الخدمات الخلفية' },
    icon: 'server',
    skills: [
      'Node.js',
      'RESTful APIs',
      { en: 'Authentication & Authorization', ar: 'المصادقة والتفويض' },
      { en: 'Role-based access control', ar: 'التحكم بالصلاحيات حسب الأدوار' },
    ],
  },
  {
    id: 'databases',
    title: { en: 'Databases', ar: 'قواعد البيانات' },
    icon: 'database',
    skills: [
      'MySQL',
      { en: 'Schema design', ar: 'تصميم المخططات' },
      { en: 'Query optimization', ar: 'تحسين الاستعلامات' },
    ],
  },
  {
    id: 'devops',
    title: { en: 'DevOps & Cloud', ar: 'DevOps والحوسبة السحابية' },
    icon: 'cloud',
    skills: [
      'Docker',
      'CI/CD Pipelines',
      { en: 'AWS (basics)', ar: 'AWS (أساسيات)' },
      { en: 'Linux (basics)', ar: 'Linux (أساسيات)' },
      { en: 'Nginx (basics)', ar: 'Nginx (أساسيات)' },
    ],
  },
  {
    id: 'practices',
    title: { en: 'Web Performance & SEO', ar: 'أداء الويب وSEO' },
    icon: 'gauge',
    skills: [
      { en: 'Responsive design', ar: 'التصميم المتجاوب' },
      { en: 'Performance optimization', ar: 'تحسين الأداء' },
      { en: 'Lazy loading', ar: 'التحميل الكسول (Lazy loading)' },
      'SEO',
    ],
  },
  {
    id: 'tools',
    title: { en: 'Tools & Analytics', ar: 'الأدوات والتحليلات' },
    icon: 'wrench',
    skills: ['Git', 'Google Tag Manager (GTM)', 'Google Analytics 4 (GA4)', 'WordPress', 'Elementor'],
  },
  {
    id: 'soft',
    title: { en: 'Soft Skills', ar: 'المهارات الشخصية' },
    icon: 'users',
    skills: [
      { en: 'Problem solving', ar: 'حل المشكلات' },
      { en: 'Teamwork', ar: 'العمل الجماعي' },
      { en: 'Communication', ar: 'التواصل' },
      { en: 'Leadership', ar: 'القيادة' },
      { en: 'Time management', ar: 'إدارة الوقت' },
      { en: 'Analytical thinking', ar: 'التفكير التحليلي' },
    ],
  },
];
