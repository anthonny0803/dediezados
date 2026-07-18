import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { siteConfig } from '@/config/site.config';

interface CateringItemContent {
  title: string;
  description: string;
}

export const Catering = () => {
  const t = useTranslations('catering');

  const itemsContent = t.raw('items') as CateringItemContent[];
  const items = siteConfig.catering.map((config, index) => ({
    ...config,
    ...itemsContent[index],
  }));

  return (
    <section id="catering">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            — {t('label')}
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{t('subtitle')}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.title}
              className="group overflow-hidden rounded-2xl border border-border bg-card/50 transition-smooth hover:border-primary/40 hover:bg-card"
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-smooth group-hover:scale-105"
                />
                {item.featured && (
                  <span className="absolute right-3 top-3 rounded-full bg-gradient-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-soft">
                    {t('badge')}
                  </span>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-semibold">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
