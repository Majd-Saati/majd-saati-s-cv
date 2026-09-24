import type { PersonalInfo } from '../types/portfolio.ts';

export const personal: PersonalInfo = {
  name: { en: 'Majd Saati', ar: 'مجد ساعاتي' },
  role: { en: 'Full-stack Developer', ar: 'مطوّر Full-stack' },
  location: { en: 'Damascus, Syria', ar: 'دمشق، سوريا' },
  headline: {
    en: 'I design and build scalable web applications with Node.js, React.js, Next.js, TypeScript, and MySQL — from frontend interfaces to backend services.',
    ar: 'أصمّم وأبني تطبيقات ويب قابلة للتوسّع باستخدام Node.js وReact.js وNext.js وTypeScript وMySQL، من واجهات المستخدم وصولاً إلى الخدمات الخلفية.',
  },
  summary: {
    en: 'Full-stack Developer specializing in Node.js, React.js, Next.js, TypeScript, and MySQL. Proficient in REST API development, database design, authentication, role-based access control, reusable component architecture, and performance optimization — delivering reliable, maintainable solutions in collaborative Agile environments.',
    ar: 'مطوّر Full-stack متخصص في Node.js وReact.js وNext.js وTypeScript وMySQL. أمتلك خبرة في تطوير واجهات REST API، وتصميم قواعد البيانات، والمصادقة، والتحكم بالصلاحيات حسب الأدوار، وبناء معمارية مكوّنات قابلة لإعادة الاستخدام، وتحسين الأداء، مع تقديم حلول موثوقة وسهلة الصيانة ضمن فرق عمل تعاونية تتبع منهجية Agile.',
  },
  background: {
    en: "I hold a Bachelor's degree in Communications & Electronics Engineering from Damascus University. My work spans a booking platform, legal and healthcare management dashboards, and admin tools — from leading a frontend team to building full-stack features end to end.",
    ar: 'حاصل على درجة البكالوريوس في هندسة الاتصالات والإلكترونيات من جامعة دمشق. تشمل أعمالي منصة حجز، ولوحات تحكم لإدارة الشؤون القانونية والرعاية الصحية، وأدوات إدارية، بدءاً من قيادة فريق واجهات أمامية وصولاً إلى بناء ميزات متكاملة من البداية حتى النهاية.',
  },
  careerFocus: [
    {
      en: 'Scalable full-stack web applications',
      ar: 'تطبيقات ويب متكاملة قابلة للتوسّع',
    },
    {
      en: 'REST APIs, authentication, and role-based access control',
      ar: 'واجهات REST API والمصادقة والتحكم بالصلاحيات حسب الأدوار',
    },
    {
      en: 'Reusable component architecture and performance optimization',
      ar: 'معمارية مكوّنات قابلة لإعادة الاستخدام وتحسين الأداء',
    },
    {
      en: 'Reliable, maintainable code in collaborative Agile teams',
      ar: 'شيفرة موثوقة وسهلة الصيانة ضمن فرق Agile تعاونية',
    },
  ],
  coreStack: ['Next.js', 'React.js', 'TypeScript', 'Node.js', 'MySQL'],
  highlights: [
    { id: 'pages', value: '20+', label: { en: 'Responsive pages built', ar: 'صفحة متجاوبة' } },
    { id: 'components', value: '30+', label: { en: 'Reusable components', ar: 'مكوّناً قابلاً لإعادة الاستخدام' } },
    { id: 'collaborators', value: '6+', label: { en: 'Developers collaborated with', ar: 'مطوّرين تعاونت معهم' } },
    { id: 'team', value: '3+', label: { en: 'Developers led', ar: 'مطوّرين تحت قيادتي' } },
  ],
  spokenLanguages: [
    { en: 'Arabic', ar: 'العربية' },
    { en: 'English', ar: 'الإنجليزية' },
  ],
  // Remove this field to fall back to the monogram placeholder.
  photo: {
    src: '/images/majd-saati.webp',
    alt: { en: 'Portrait of Majd Saati', ar: 'صورة شخصية لمجد ساعاتي' },
    width: 400,
    height: 400,
  },
  cvUrl: '/cv/majd-saati-cv.pdf',
  contact: {
    email: 'mhdmajdsaati@gmail.com',
    phone: '+963935387582',
    whatsapp: '+963935387582',
    linkedin: 'https://www.linkedin.com/in/majd-saati-636929336',
    github: 'https://github.com/Majd-Saati',
  },
};
