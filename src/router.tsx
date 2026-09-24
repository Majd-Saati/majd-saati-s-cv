import { createBrowserRouter } from 'react-router';
import { RootLayout } from './components/layout/RootLayout';
import { ROUTES } from './data/routes';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';

/**
 * App routes. Detail pages are lazy-loaded so the home page's initial bundle
 * stays small. Hosting must serve index.html for unknown paths (SPA fallback)
 * so deep links like /experience/peal work on reload.
 */
export const router = createBrowserRouter([
  {
    path: ROUTES.home,
    Component: RootLayout,
    HydrateFallback: () => null,
    children: [
      { index: true, Component: HomePage },
      {
        path: ROUTES.experience,
        lazy: async () => ({ Component: (await import('./pages/ExperienceDetailsPage')).ExperienceDetailsPage }),
      },
      {
        path: ROUTES.project,
        lazy: async () => ({ Component: (await import('./pages/ProjectDetailsPage')).ProjectDetailsPage }),
      },
      {
        path: ROUTES.course,
        lazy: async () => ({ Component: (await import('./pages/CourseDetailsPage')).CourseDetailsPage }),
      },
      { path: '*', Component: NotFoundPage },
    ],
  },
]);
