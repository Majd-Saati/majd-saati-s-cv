import type { Experience } from '../types/portfolio.ts';

const damascus = { en: 'Damascus', ar: 'دمشق' };

export const experience: Experience[] = [
  {
    id: 'flycham',
    role: { en: 'Full-stack Developer', ar: 'مطوّر Full-stack' },
    company: { en: 'FlyCham', ar: 'FlyCham' },
    location: damascus,
    period: { start: '2024-12' },
    responsibilities: [
      {
        en: 'Developed full-stack features for the Fly Cham website and booking platform using Node.js, MySQL, Next.js, and React.js.',
        ar: 'تطوير ميزات متكاملة لموقع Fly Cham ومنصة الحجز باستخدام Node.js وMySQL وNext.js وReact.js.',
      },
      {
        en: 'Built and maintained RESTful APIs, implementing business logic, authentication, validation, and integration with external services.',
        ar: 'بناء وصيانة واجهات RESTful API، مع تنفيذ منطق الأعمال والمصادقة والتحقق من البيانات والتكامل مع الخدمات الخارجية.',
      },
      {
        en: 'Designed and optimized MySQL database schemas, queries, and API endpoints for reliable and scalable data access.',
        ar: 'تصميم وتحسين مخططات قواعد بيانات MySQL والاستعلامات ونقاط الوصول (API endpoints) لضمان وصول موثوق وقابل للتوسّع إلى البيانات.',
      },
      {
        en: 'Implemented a scalable frontend architecture using Redux Toolkit and React Query, with multi-language and multi-POS support using i18next.',
        ar: 'تنفيذ معمارية واجهة أمامية قابلة للتوسّع باستخدام Redux Toolkit وReact Query، مع دعم تعدد اللغات ونقاط البيع (multi-POS) باستخدام i18next.',
      },
    ],
    achievements: [
      {
        en: 'Collaborated with 6+ developers on the website and admin dashboard, including ticket booking and ticket management functionalities.',
        ar: 'التعاون مع أكثر من 6 مطوّرين على الموقع ولوحة التحكم الإدارية، بما في ذلك وظائف حجز التذاكر وإدارتها.',
      },
      {
        en: 'Developed 20+ responsive pages and 30+ dynamic reusable components, focusing on performance and responsiveness.',
        ar: 'تطوير أكثر من 20 صفحة متجاوبة وأكثر من 30 مكوّناً ديناميكياً قابلاً لإعادة الاستخدام، مع التركيز على الأداء والتجاوب.',
      },
    ],
    technologies: ['Node.js', 'MySQL', 'Next.js', 'React.js', 'Redux Toolkit', 'React Query', 'i18next'],
    projectIds: ['flycham'],
  },
  {
    id: 'peal',
    role: { en: 'Frontend Developer', ar: 'مطوّر واجهات أمامية' },
    company: { en: 'Peal', ar: 'Peal' },
    // companyUrl: add the company website here to show it next to the role.
    location: damascus,
    period: { start: '2024-01', end: '2024-11' },
    responsibilities: [
      {
        en: 'Developed reusable React components and integrated REST APIs.',
        ar: 'تطوير مكوّنات React قابلة لإعادة الاستخدام وربطها بواجهات REST API.',
      },
      {
        en: 'Contributed to Miamed Dashboard, a healthcare platform for managing medical services and workflows.',
        ar: 'المساهمة في تطوير Miamed Dashboard، منصة رعاية صحية لإدارة الخدمات الطبية وسير العمل.',
      },
    ],
    achievements: [
      {
        en: 'Led a frontend team of 3+ developers and improved code quality and performance.',
        ar: 'قيادة فريق واجهات أمامية يضم أكثر من 3 مطوّرين، وتحسين جودة الشيفرة والأداء.',
      },
      {
        en: 'Built Menwer Dashboard, a legal management platform with role-based access control using React.js, Redux Toolkit, and MUI.',
        ar: 'بناء Menwer Dashboard، منصة لإدارة الشؤون القانونية مع تحكم بالصلاحيات حسب الأدوار باستخدام React.js وRedux Toolkit وMUI.',
      },
    ],
    technologies: ['React.js', 'Redux Toolkit', 'MUI', 'REST APIs'],
    projectIds: ['menwer', 'miamed'],
  },
  {
    id: 'freelance',
    role: { en: 'Freelance Web Developer', ar: 'مطوّر ويب مستقل' },
    responsibilities: [
      {
        en: 'Developed the Isuzu Admin Dashboard for managing dealer plans, activities, operational costs, statistics, reports, and role-based access, integrating REST APIs with reusable components.',
        ar: 'تطوير لوحة تحكم Isuzu الإدارية لإدارة خطط الوكلاء والأنشطة والتكاليف التشغيلية والإحصائيات والتقارير والصلاحيات حسب الأدوار، مع ربط واجهات REST API بمكوّنات قابلة لإعادة الاستخدام.',
      },
    ],
    achievements: [],
    technologies: ['REST APIs'],
    projectIds: ['isuzu'],
  },
];
