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
      <h2 className="section-title" data-aos="fade-up">
        {t('title')}
      </h2>
      <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
        {t('subtitle')}
      </p>
      <div className="catering-grid">
        {items.map((item, index) => (
          <article
            key={index}
            className={`catering-card ${item.featured ? 'destacado' : ''}`}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="catering-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                width="600"
                height="240"
                loading="lazy"
              />
              {item.featured && (
                <div className="catering-badge">{t('badge')}</div>
              )}
            </div>
            <div className="catering-content">
              <h3>{item.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
