import { useState } from 'react';
import { ScrollTrigger, useGSAP } from '../lib/gsap';

/**
 * Returns the id of the section currently crossing the middle of the viewport.
 * Uses ScrollTrigger so it shares measurements (and refreshes after layout
 * changes such as a language switch) with the rest of the scroll effects.
 *
 * @param ids stable (module-level) list of section ids
 * @param enabled whether the sections exist on the current page
 * @param pageKey changes when the page changes, so triggers are rebuilt
 */
export function useActiveSection<T extends string>(ids: readonly T[], enabled: boolean, pageKey: string): T | undefined {
  const [activeId, setActiveId] = useState<T>();

  useGSAP(
    () => {
      if (!enabled) return;
      for (const id of ids) {
        const section = document.getElementById(id);
        if (!section) continue;
        ScrollTrigger.create({
          trigger: section,
          start: 'top 50%',
          end: 'bottom 50%',
          onToggle: ({ isActive }) => {
            if (isActive) setActiveId(id);
          },
        });
      }
    },
    { dependencies: [ids, enabled, pageKey], revertOnUpdate: true },
  );

  return enabled ? activeId : undefined;
}
