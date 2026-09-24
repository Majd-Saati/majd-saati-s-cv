import { existsSync } from 'node:fs';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { getReferencedPublicFiles } from './src/lib/assets.ts';
import { buildPreferenceScript } from './src/lib/preferences.ts';
import { buildHeadTags, buildRobotsTxt, buildSitemap } from './src/lib/seo.ts';

/** Injects SEO metadata and the no-flash preference script into index.html. */
function portfolioHtml(siteUrl: string | undefined): Plugin {
  return {
    name: 'portfolio-html',
    transformIndexHtml() {
      return [
        { tag: 'script', children: buildPreferenceScript(), injectTo: 'head' },
        ...buildHeadTags(siteUrl).map((tag) => ({ ...tag, injectTo: 'head' as const })),
      ];
    },
    buildStart() {
      for (const file of getReferencedPublicFiles()) {
        if (!existsSync(`public${decodeURI(file)}`)) {
          this.warn(`Missing file public${file} (referenced in src/data). Its link will be broken until the file is added.`);
        }
      }
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: buildRobotsTxt(siteUrl) });
      if (siteUrl) {
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: buildSitemap(siteUrl) });
      }
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const siteUrl = env.VITE_SITE_URL?.trim().replace(/\/+$/, '') || undefined;

  if (!siteUrl && mode === 'production') {
    console.warn('[portfolio] VITE_SITE_URL is not set: canonical URL, og:url, and sitemap.xml are skipped.');
  }

  return {
    plugins: [react(), portfolioHtml(siteUrl)],
    build: {
      rolldownOptions: {
        output: {
          // Vendor code changes rarely; separate chunks stay cached across content updates.
          codeSplitting: {
            groups: [
              { name: 'react', test: /node_modules[\\/](react|react-dom|react-router|scheduler|cookie|set-cookie-parser)[\\/]/ },
              { name: 'gsap', test: /node_modules[\\/](gsap|@gsap)[\\/]/ },
              { name: 'icons', test: /node_modules[\\/](@phosphor-icons|simple-icons)[\\/]/ },
            ],
          },
        },
      },
    },
  };
});
