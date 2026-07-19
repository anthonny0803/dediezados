'use client';

import { Fragment, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  Building2,
  Music,
  Utensils,
  Wine,
  Users,
  Mic,
  Camera,
  Headphones,
  Cake,
  Palette,
  Check,
  type LucideIcon,
} from 'lucide-react';
import { siteConfig } from '@/config/site.config';

interface IncludedContent {
  title: string;
  description: string;
  features: string[];
}

interface ExtraContent {
  title: string;
  description: string;
  features: string[];
  recommendedFor: string;
}

interface ServiceItem {
  icon: string;
  image: string;
  title: string;
  description: string;
  features: string[];
  recommendedFor?: string;
}

const iconMap: Record<string, LucideIcon> = {
  building: Building2,
  music: Music,
  utensils: Utensils,
  wine: Wine,
  users: Users,
  mic: Mic,
  camera: Camera,
  headphones: Headphones,
  cake: Cake,
  palette: Palette,
};

export const Services = () => {
  const t = useTranslations('services');
  const tExtras = useTranslations('extras');

  const includedContent = t.raw('included') as IncludedContent[];
  const included: ServiceItem[] = siteConfig.services.included.map(
    (config, index) => ({ ...config, ...includedContent[index] }),
  );
  const extrasContent = tExtras.raw('items') as ExtraContent[];
  const extras: ServiceItem[] = siteConfig.extras.map((config, index) => ({
    ...config,
    ...extrasContent[index],
  }));
  const items = [...included, ...extras];

  const [activeItem, setActiveItem] = useState(0);
  const activeService = items[activeItem];

  const renderItem = (item: ServiceItem, index: number) => {
    const Icon = iconMap[item.icon];
    const isActive = index === activeItem;
    return (
      <Fragment key={item.title}>
        <button
          type="button"
          onMouseEnter={() => setActiveItem(index)}
          onClick={() => setActiveItem(index)}
          aria-pressed={isActive}
          className={`group flex items-center gap-4 rounded-2xl border p-5 text-left transition-smooth ${
            isActive
              ? 'border-primary/50 bg-primary/5 shadow-soft'
              : 'border-border hover:border-primary/30 hover:bg-card/50'
          }`}
        >
          <span
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-smooth ${
              isActive
                ? 'bg-gradient-primary text-primary-foreground'
                : 'bg-muted text-foreground'
            }`}
          >
            {Icon ? <Icon className="h-5 w-5" /> : null}
          </span>
          <span className="flex-1 font-display text-xl font-semibold">
            {item.title}
          </span>
          <span
            aria-hidden="true"
            className={`text-2xl text-primary transition-smooth ${
              isActive ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'
            }`}
          >
            →
          </span>
        </button>
        {/* Mobile accordion: the detail unfolds right under the tapped item,
            since the desktop pane sits off-screen. */}
        {isActive && (
          <div className="overflow-hidden rounded-2xl border border-border bg-card/50 lg:hidden">
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={item.image}
                alt=""
                aria-hidden="true"
                fill
                sizes="100vw"
                className="scale-110 object-cover blur-lg"
              />
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <div className="p-5">
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
              <ul className="mt-4 grid gap-2">
                {item.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              {item.recommendedFor && (
                <p className="mt-4 text-sm text-muted-foreground">
                  <strong className="font-semibold text-foreground">
                    {tExtras('recommendedForLabel')}
                  </strong>{' '}
                  {item.recommendedFor}
                </p>
              )}
            </div>
          </div>
        )}
      </Fragment>
    );
  };

  return (
    <section id="services">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            — {t('label')}
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl">
            {t('title')}
            <span className="block italic leading-tight text-gradient-primary">
              {t('titleAccent')}
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t('description')}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="flex flex-col gap-2 lg:col-span-2">
            <h3 className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-primary">
              {t('includedTitle')}
            </h3>
            {included.map((item, index) => renderItem(item, index))}
            <h3 className="mb-2 mt-6 text-xs font-medium uppercase tracking-[0.2em] text-primary">
              {tExtras('title')}
            </h3>
            {extras.map((item, index) =>
              renderItem(item, included.length + index),
            )}
          </div>

          <div className="relative hidden overflow-hidden rounded-3xl border border-border bg-card/50 shadow-elegant lg:block lg:col-span-3 lg:min-h-[520px]">
            <div className="lg:absolute lg:inset-0">
              {items.map((item, index) => {
                const isActive = index === activeItem;
                return (
                  <div
                    key={item.title}
                    aria-hidden={!isActive}
                    className={`absolute inset-0 transition-smooth ${
                      isActive
                        ? 'scale-100 opacity-100'
                        : 'pointer-events-none scale-105 opacity-0'
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt=""
                      aria-hidden="true"
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="scale-110 object-cover blur-lg"
                    />
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-contain"
                    />
                    <div className="absolute inset-0 hidden bg-gradient-to-t from-black/90 via-black/55 via-45% to-transparent to-85% lg:block" />
                  </div>
                );
              })}
            </div>

            <div className="p-6 md:p-8 lg:absolute lg:inset-x-0 lg:bottom-0">
              <h4 className="font-display text-2xl font-bold md:text-3xl lg:text-white">
                {activeService.title}
              </h4>
              <p className="mt-2 text-muted-foreground lg:text-white/85">
                {activeService.description}
              </p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {activeService.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm lg:text-white/90"
                  >
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              {activeService.recommendedFor && (
                <p className="mt-5 text-sm text-muted-foreground lg:text-white/80">
                  <strong className="font-semibold text-foreground lg:text-white">
                    {tExtras('recommendedForLabel')}
                  </strong>{' '}
                  {activeService.recommendedFor}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
