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
