import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
const path = require('path');

const nextConfig: NextConfig = {
  // Enable Turbopack file system caching for faster dev startup (beta)
  // See: https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },

  turbopack: {
    resolveAlias: {
      // Bootstrap's `@import "progress"` otherwise hits the npm `progress` package.
      progress: path.join(process.cwd(), 'node_modules/bootstrap/scss/_progress.scss').replace(/\\/g, '/'),
    },
  },

  // use this configuration to ensure that only images from the whitelisted domains
  // can be served from the Next.js Image Optimization API
  // see https://nextjs.org/docs/app/api-reference/components/image#remotepatterns
  images: {
    remotePatterns: [
	  {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // use this configuration to serve the sitemap.xml and robots.txt files from the API route handlers
  rewrites: async () => {
    return [
      {
        source: '/sitemap:id([\\w-]{0,}).xml',
        destination: '/api/sitemap',
        locale: false,
      },
      {
        source: '/robots.txt',
        destination: '/api/robots',
        locale: false,
      },
    ];
  },

  sassOptions: {
    loadPaths: [
      // Bootstrap must come before node_modules so `@import "progress"`
      // resolves to bootstrap/scss/_progress.scss, not the npm `progress` package.
      path.join(process.cwd(), 'node_modules/bootstrap/scss'),
      process.cwd(),
      path.join(process.cwd(), 'src/assets/sass/abstracts'),
      path.join(process.cwd(), 'node_modules'),
    ],
    // temporary measure until new versions of bootstrap and font-awesome released
    quietDeps: true,
    silenceDeprecations: ['import', 'legacy-js-api'],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
