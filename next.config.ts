import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async redirects() {
    return [
      // The default .vercel.app production alias serves the full site without
      // noindex: consolidate it into the canonical host so Google never sees
      // a duplicate. Preview deployments use unique subdomains and are not
      // matched, so branch previews keep working.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'dediezados.vercel.app' }],
        destination: 'https://www.dediezados.com/:path*',
        permanent: true,
      },
      {
        source: '/',
        destination: '/es',
        permanent: true,
      },
      // Legacy WordPress portfolio routes — migrated domain, no equivalent pages
      {
        source: '/projects_cat/:slug*',
        destination: '/es',
        permanent: true,
      },
      {
        source: '/projects_tag/:slug*',
        destination: '/es',
        permanent: true,
      },
      {
        source: '/projects/:slug*',
        destination: '/es',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
