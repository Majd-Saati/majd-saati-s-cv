import { RouterProvider } from 'react-router';
import { LanguageProvider } from './i18n/LanguageProvider';
import { router } from './router';

export function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  );
}
