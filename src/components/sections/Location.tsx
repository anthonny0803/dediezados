'use client';

import { useTranslations } from 'next-intl';
import { Phone, Mail, MapPin, Clock, type LucideIcon } from 'lucide-react';
import { GoogleMaps } from '@/components/widgets/GoogleMaps';
import { siteConfig } from '@/config/site.config';
import type { PlaceData } from '@/hooks/useGooglePlace';

interface LocationProps {
  placeData: PlaceData | null;
}

interface InfoCard {
  icon: LucideIcon;
  label: string;
  values: string[];
}

export const Location = ({ placeData }: LocationProps) => {
  const t = useTranslations('location');
  const tInfo = useTranslations('contact.info');
  const { contact } = siteConfig;

  const cards: InfoCard[] = [
    {
      icon: Phone,
      label: tInfo('phoneLabel'),
      values: [contact.phone, contact.secondaryPhone],
    },
    {
      icon: Mail,
      label: tInfo('emailLabel'),
      values: [contact.email, contact.secondaryEmail],
    },
    {
      icon: MapPin,
      label: tInfo('addressLabel'),
      values: [contact.address],
    },
    {
      icon: Clock,
      label: tInfo('scheduleLabel'),
      values: [tInfo('schedule')],
    },
  ];

  return (
    <section id="location">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            — {t('label')}
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
            {t('title')}{' '}
            <span className="italic leading-tight text-gradient-primary">
              {t('titleAccent')}
            </span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            {t('description')}
          </p>

          <div className="mt-10 space-y-4">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className="flex items-start gap-4 rounded-xl border border-border bg-card/50 p-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-semibold">{card.label}</div>
                    {card.values.map((value) => (
                      <div key={value} className="text-sm text-muted-foreground">
                        {value}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative aspect-square overflow-hidden rounded-3xl border border-border shadow-elegant lg:aspect-[4/5]">
          <GoogleMaps placeData={placeData} />
        </div>
      </div>
    </section>
  );
};
