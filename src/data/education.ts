import type { Course, Education } from '../types/portfolio.ts';

export const education: Education[] = [
  {
    id: 'damascus-university',
    degree: {
      en: "Bachelor's Degree in Communications & Electronics Engineering",
      ar: 'بكالوريوس في هندسة الاتصالات والإلكترونيات',
    },
    institution: { en: 'Damascus University', ar: 'جامعة دمشق' },
    period: { start: '2013-01', end: '2021-01' },
    // File in public/certificates/. Change the name/extension here if yours differs (e.g. .jpg).
    certificateUrl: '/certificates/bachelor-degree.pdf',
  },
];

export const courses: Course[] = [
  {
    id: 'aws-cloud-technical-essentials',
    title: 'AWS Cloud Technical Essentials',
    provider: 'Coursera',
    author: 'Amazon Web Services (AWS)',
    certificateUrl: 'https://www.coursera.org/account/accomplishments/records/YWQLGAJ5ZZJG',
  },
  {
    id: 'node-rest-apis',
    title: 'Node.js: The Complete Guide to Build RESTful APIs',
    provider: 'Udemy',
    author: 'Mosh Hamedani',
    courseUrl: 'https://www.udemy.com/course/nodejs-master-class/',
  },
  {
    id: 'nextjs-react',
    title: 'Next.js 14 & React — The Complete Guide',
    provider: 'Udemy',
    author: 'Maximilian Schwarzmüller',
    courseUrl: 'https://www.udemy.com/course/nextjs-react-the-complete-guide/',
  },
  {
    id: 'typescript',
    title: 'The Ultimate TypeScript Course',
    provider: 'Udemy',
    author: 'Mosh Hamedani',
    // courseUrl: add the course page link here.
  },
];
