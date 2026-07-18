'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  Mic,
  Camera,
  Headphones,
  Cake,
  Palette,
  Check,
  type LucideIcon,
} from 'lucide-react';
import { siteConfig } from '@/config/site.config';

interface CateringItemContent {
  title: string;
  description: string;
}

interface ExtraItemContent {
  title: string;
  description: string;
  features: string[];
  recommendedFor: string;
}

const iconMap: Record<string, LucideIcon> = {
  mic: Mic,
  camera: Camera,
  headphones: Headphones,
  cake: Cake,
  palette: Palette,
};

export const CateringExtras = () => {
  const tCatering = useTranslations('catering');
  const tExtras = useTranslations('extras');

  const cateringContent = tCatering.raw('items') as CateringItemContent[];
  const cateringItems = siteConfig.catering.map((config, index) => ({
    ...config,
    ...cateringContent[index],
  }));

  const extrasContent = tExtras.raw('items') as ExtraItemContent[];
  const extras = siteConfig.extras.map((config, index) => ({
    ...config,
    ...extrasContent[index],
  }));

  const [activeIndex, setActiveIndex] = useState(0);
  const activeExtra = extras[activeIndex];

  return (
    <section id="catering">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            — {tCatering('label')}
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl">
            {tCatering('title')}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {tCatering('subtitle')}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {cateringItems.map((item) => (
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
                    {tCatering('badge')}
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

        <div className="mt-24">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h3 className="font-display text-3xl font-bold leading-tight md:text-4xl">
              {tExtras('title')}
            </h3>
            <p className="mt-4 text-lg text-muted-foreground">
              {tExtras('subtitle')}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-5">
            <div className="flex flex-col gap-2 lg:col-span-2">
              {extras.map((extra, index) => {
                const Icon = iconMap[extra.icon];
                const isActive = index === activeIndex;
                return (
                  <button
                    key={extra.title}
                    type="button"
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => setActiveIndex(index)}
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
                      {extra.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`text-2xl text-primary transition-smooth ${
                        isActive
                          ? 'translate-x-0 opacity-100'
                          : '-translate-x-2 opacity-0'
                      }`}
                    >
                      →
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-border bg-card/50 shadow-elegant lg:col-span-3 lg:min-h-[520px]">
              <div className="relative aspect-video lg:absolute lg:inset-0 lg:aspect-auto">
                {extras.map((extra, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <div
                      key={extra.title}
                      aria-hidden={!isActive}
                      className={`absolute inset-0 transition-smooth ${
                        isActive
                          ? 'scale-100 opacity-100'
                          : 'pointer-events-none scale-105 opacity-0'
                      }`}
                    >
                      <Image
                        src={extra.image}
                        alt=""
                        aria-hidden="true"
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="scale-110 object-cover blur-lg"
                      />
                      <Image
                        src={extra.image}
                        alt={extra.title}
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
                  {activeExtra.title}
                </h4>
                <p className="mt-2 text-muted-foreground lg:text-white/85">
                  {activeExtra.description}
                </p>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {activeExtra.features.map((feature) => (
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
                <p className="mt-5 text-sm text-muted-foreground lg:text-white/80">
                  <strong className="font-semibold text-foreground lg:text-white">
                    {tExtras('recommendedForLabel')}
                  </strong>{' '}
                  {activeExtra.recommendedFor}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
