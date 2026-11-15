import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { pageCopyValues, sectionPages, type SectionPageKey } from '@/config/pages.config';
import { buildBreadcrumbJsonLd, serializeJsonLd } from '@/lib/json-ld';
import { absoluteUrl } from '@/lib/urls';

interface PageIntroProps {
  locale: string;
  page: SectionPageKey;
}

export const PageIntro = async ({ locale, page }: PageIntroProps) => {
  const t = await getTranslations({ locale, namespace: 'pages' });
  const { pathname, coverImage } = sectionPages[page];
  const title = t(`${page}.title`);
  const paragraphCount = (t.raw(`${page}.paragraphs`) as string[]).length;
  const paragraphs = Array.from({ length: paragraphCount }, (_, index) =>
    t(`${page}.paragraphs.${index}`, pageCopyValues),
  );

  const breadcrumb = buildBreadcrumbJsonLd([
    {
      name: t('breadcrumbHome'),
      url: absoluteUrl(locale, '/'),
    },
    {
      name: title,
      url: absoluteUrl(locale, pathname),
    },
  ]);

  return (
    <>
      <header className="relative flex min-h-[60vh] items-end overflow-hidden">
        <Image
          src={coverImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30"
        />
        <div className="relative mx-auto w-full max-w-4xl px-6 pb-16 pt-32 text-white">
          <nav aria-label={t('breadcrumbLabel')}>
            <ol className="flex flex-wrap items-center gap-2 text-sm text-white/70">
              <li>
                <Link href="/" className="transition-smooth hover:text-primary">
                  {t('breadcrumbHome')}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white">
                {title}
              </li>
            </ol>
          </nav>
          <h1 className="mt-6 font-display text-4xl font-bold leading-tight md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/85">{t(`${page}.lead`, pageCopyValues)}</p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl space-y-6 px-6 py-16 text-lg leading-relaxed text-muted-foreground">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumb) }}
      />
    </>
  );
};
