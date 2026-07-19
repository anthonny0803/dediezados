'use client';

import { Fragment, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  Heart,
  Cake,
  Crown,
  Briefcase,
  Trophy,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { siteConfig } from '@/config/site.config';

interface EventContent {
  title: string;
  description: string;
  alt: string;
}

const iconMap: Record<string, LucideIcon> = {
  heart: Heart,
  cake: Cake,
  crown: Crown,
  briefcase: Briefcase,
  trophy: Trophy,
  users: Users,
};

export const Events = () => {
  const t = useTranslations('events');
  const itemsContent = t.raw('items') as EventContent[];
  const events = siteConfig.events.map((config, index) => ({
    ...config,
    ...itemsContent[index],
  }));

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="events">
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
          <p className="mt-4 text-lg text-muted-foreground">{t('subtitle')}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="flex flex-col gap-2 lg:col-span-2">
            {events.map((event, index) => {
              const Icon = iconMap[event.icon];
              const isActive = index === activeIndex;
              return (
                <Fragment key={event.title}>
                  <button
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
                      className={`flex h-12 w-12 items-center justify-center rounded-xl transition-smooth ${
                        isActive
                          ? 'bg-gradient-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      {Icon ? <Icon className="h-5 w-5" /> : null}
                    </span>
                    <span className="flex-1 font-display text-xl font-semibold">
                      {event.title}
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
                  {/* Mobile accordion: the detail unfolds right under the
                      tapped item, since the desktop pane sits off-screen. */}
                  {isActive && (
                    <div className="overflow-hidden rounded-2xl border border-border lg:hidden">
                      <div className="relative aspect-video">
                        <Image
                          src={event.image}
                          alt={event.alt}
                          fill
                          sizes="100vw"
                          className="object-cover"
                        />
                      </div>
                      <p className="p-4 text-sm text-muted-foreground">
                        {event.description}
                      </p>
                    </div>
                  )}
                </Fragment>
              );
            })}
          </div>

          <div className="relative hidden overflow-hidden rounded-3xl border border-border shadow-elegant lg:block lg:col-span-3 lg:min-h-[500px]">
            {events.map((event, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={event.title}
                  aria-hidden={!isActive}
                  className={`absolute inset-0 transition-smooth ${
                    isActive
                      ? 'scale-100 opacity-100'
                      : 'pointer-events-none scale-105 opacity-0'
                  }`}
                >
                  <Image
                    src={event.image}
                    alt={event.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="mb-2 font-display text-3xl font-bold text-foreground md:text-4xl">
                      {event.title}
                    </h3>
                    <p className="max-w-md text-muted-foreground">
                      {event.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
