import { Outlet } from 'react-router';
import { BackToTop } from './BackToTop';
import { Footer } from './Footer';
import { Header } from './Header';
import { ScrollManager } from './ScrollManager';
import { ScrollReset } from './ScrollReset';

/** Shared chrome for every page. Order matters: see ScrollReset / ScrollManager. */
export function RootLayout() {
  return (
    <>
      <Header />
      <ScrollReset />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      <ScrollManager />
    </>
  );
}
