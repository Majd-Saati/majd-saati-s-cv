import type { Project } from '../types/portfolio.ts';

export const projects: Project[] = [
  {
    id: 'flycham',
    name: { en: 'Fly Cham Website & Booking Platform', ar: 'موقع Fly Cham ومنصة الحجز' },
    description: {
      en: 'Website, booking platform, and admin dashboard with ticket booking and ticket management, built with multi-language and multi-POS support.',
      ar: 'موقع إلكتروني ومنصة حجز ولوحة تحكم إدارية تتضمن حجز التذاكر وإدارتها، مع دعم تعدد اللغات ونقاط البيع (multi-POS).',
    },
    context: { en: 'FlyCham', ar: 'FlyCham' },
    technologies: ['Next.js', 'React.js', 'Node.js', 'MySQL', 'Redux Toolkit', 'React Query', 'i18next'],
  },
  {
    id: 'menwer',
    name: { en: 'Menwer Dashboard', ar: 'Menwer Dashboard' },
    description: {
      en: 'A legal management platform with role-based access control.',
      ar: 'منصة لإدارة الشؤون القانونية مع تحكم بالصلاحيات حسب الأدوار.',
    },
    context: { en: 'Peal', ar: 'Peal' },
    technologies: ['React.js', 'Redux Toolkit', 'MUI'],
    demoUrl: 'https://drive.google.com/file/d/12xyuHRt0V0Dl4TWVUCKUDfoZmy8ZbeGg/view?usp=sharing',
  },
  {
    id: 'miamed',
    name: { en: 'Miamed Dashboard', ar: 'Miamed Dashboard' },
    description: {
      en: 'A healthcare platform for managing medical services and workflows.',
      ar: 'منصة رعاية صحية لإدارة الخدمات الطبية وسير العمل.',
    },
    context: { en: 'Peal', ar: 'Peal' },
    technologies: [],
    demoUrl: 'https://drive.google.com/file/d/1QWzKdUqHgkEKgfL7KfddUxzRrmRln-tF/view?usp=sharing',
  },
  {
    id: 'isuzu',
    name: { en: 'Isuzu Admin Dashboard', ar: 'Isuzu Admin Dashboard' },
    description: {
      en: 'An admin dashboard for managing dealer plans, activities, operational costs, statistics, reports, and role-based access.',
      ar: 'لوحة تحكم إدارية لإدارة خطط الوكلاء والأنشطة والتكاليف التشغيلية والإحصائيات والتقارير والصلاحيات حسب الأدوار.',
    },
    context: { en: 'Freelance', ar: 'عمل حر' },
    technologies: ['REST APIs'],
    demoUrl: 'https://drive.google.com/file/d/10Ii8nUuK-YLp2sVcLsQ1dkOrjTuKWFzE/view?usp=sharing',
  },
];
