import { useTranslations } from 'next-intl';
import { Phone, Mail, MapPin } from 'lucide-react';
import { siteConfig } from '@/config/site.config';
import { FooterNav } from './FooterNav';

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
    aria-hidden="true"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const Footer = () => {
  const t = useTranslations('footer');
  const tRoot = useTranslations();
  const year = new Date().getFullYear();
  const { contact, social } = siteConfig;

  return (
    <footer id="footer">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div data-aos="fade-up">
          <div className="footer-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={siteConfig.logo.url}
              alt={tRoot('logoAlt')}
              className="logo-white"
              data-theme-variant="dark"
              width={siteConfig.logo.width}
              height={siteConfig.logo.height}
              loading="lazy"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={siteConfig.logo.urlLight}
              alt={tRoot('logoAlt')}
              className="logo-white"
              data-theme-variant="light"
              width={siteConfig.logo.width}
              height={siteConfig.logo.height}
              loading="lazy"
            />
            <div className="logo-underline"></div>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            {t('tagline')}
          </p>
        </div>

        <div data-aos="fade-up" data-aos-delay="100">
          <div className="mb-3 font-semibold text-foreground">
            {t('contactTitle')}
          </div>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span className="flex flex-col">
                <a
                  href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                  className="transition-smooth hover:text-primary"
                >
                  {contact.phone}
                </a>
                <a
                  href={`tel:${contact.secondaryPhone.replace(/\s+/g, '')}`}
                  className="transition-smooth hover:text-primary"
                >
                  {contact.secondaryPhone}
                </a>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span className="flex flex-col">
                <a
                  href={`mailto:${contact.email}`}
                  className="break-all transition-smooth hover:text-primary"
                >
                  {contact.email}
                </a>
                <a
                  href={`mailto:${contact.secondaryEmail}`}
                  className="break-all transition-smooth hover:text-primary"
                >
                  {contact.secondaryEmail}
                </a>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{contact.address}</span>
            </li>
          </ul>
        </div>

        <div data-aos="fade-up" data-aos-delay="200">
          <div className="mb-3 font-semibold text-foreground">
            {t('exploreTitle')}
          </div>
          <FooterNav />
        </div>

        <div data-aos="fade-up" data-aos-delay="300">
          <div className="mb-3 font-semibold text-foreground">
            {t('socialTitle')}
          </div>
          <div className="flex gap-3">
            <a
              href={social.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('instagramAria')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-smooth hover:border-primary hover:text-primary"
            >
              <InstagramIcon />
            </a>
            <a
              href={social.facebook.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('facebookAria')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-smooth hover:border-primary hover:text-primary"
            >
              <FacebookIcon />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-border pt-8">
        <div
          className="flex flex-col gap-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between"
          data-aos="fade-up"
        >
          <div className="space-y-1">
            <p>{t('copyright', { year })}</p>
            <p>{t('legal')}</p>
          </div>
          <p className="font-display italic sm:text-right">{t('slogan')}</p>
        </div>

        <p className="mt-6 text-[0.7rem] leading-relaxed text-muted-foreground/60">
          {t('keywords')}
        </p>

        <div className="mt-4 flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            {t('partnersIntro')}{' '}
            <a
              href={siteConfig.partners.capifix}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary transition-smooth hover:opacity-80"
            >
              {t('partnerCapifix')}
            </a>
          </p>

          <div className="flex items-center gap-2">
            <span>{t('devLabel')}</span>
            <a
              href={siteConfig.developer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono font-semibold transition-smooth hover:text-primary"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                className="rounded"
              >
                <defs>
                  <linearGradient id="footerLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
                <rect width="200" height="200" rx="16" fill="#000" />
                <rect x="2" y="2" width="196" height="196" rx="14" fill="none" stroke="#1e293b" strokeWidth="2" />
                <path d="M 38 40 L 26 40 L 26 88 L 16 100 L 26 112 L 26 160 L 38 160" stroke="#4ade80" strokeWidth="4" fill="none" strokeLinecap="square" />
                <path d="M 162 40 L 174 40 L 174 88 L 184 100 L 174 112 L 174 160 L 162 160" stroke="#4ade80" strokeWidth="4" fill="none" strokeLinecap="square" />
                <line x1="75" y1="55" x2="100" y2="95" stroke="url(#footerLogoGrad)" strokeWidth="5" strokeLinecap="round" />
                <path d="M 130 42 Q 118 75 100 95" stroke="url(#footerLogoGrad)" strokeWidth="5" fill="none" strokeLinecap="round" />
                <line x1="100" y1="95" x2="75" y2="158" stroke="url(#footerLogoGrad)" strokeWidth="5" strokeLinecap="round" />
                <rect x="67" y="47" width="16" height="16" rx="3" fill="#000" stroke="url(#footerLogoGrad)" strokeWidth="2.5" />
                <rect x="122" y="34" width="16" height="16" rx="3" fill="#000" stroke="url(#footerLogoGrad)" strokeWidth="2.5" />
                <rect x="91" y="86" width="18" height="18" rx="3" fill="url(#footerLogoGrad)" />
                <rect x="67" y="150" width="16" height="16" rx="3" fill="#000" stroke="url(#footerLogoGrad)" strokeWidth="2.5" />
              </svg>
              {siteConfig.developer.name}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
