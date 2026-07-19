'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Utensils,
  MapPin,
  PartyPopper,
  Sparkles,
  CalendarCheck,
  Tv,
  ChevronDown,
  type LucideIcon,
} from 'lucide-react';
import { siteConfig } from '@/config/site.config';

interface FaqItemContent {
  question: string;
  answer: string;
}

const iconMap: Record<string, LucideIcon> = {
  utensils: Utensils,
  mapPin: MapPin,
  party: PartyPopper,
  sparkles: Sparkles,
  calendar: CalendarCheck,
  tv: Tv,
};

export const Faq = () => {
  const t = useTranslations('faq');
  const itemsContent = t.raw('items') as FaqItemContent[];
  const items = siteConfig.faq.map((config, index) => ({
    ...config,
    ...itemsContent[index],
  }));

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq">
      <div className="mx-auto max-w-3xl">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            — {t('label')}
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
            {t('title')}
            <span className="block italic leading-tight text-gradient-primary">
              {t('titleAccent')}
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{t('subtitle')}</p>
        </div>

        <div className="flex flex-col gap-1.5">
          {items.map((item, index) => {
            const Icon = iconMap[item.icon];
            const isOpen = index === openIndex;
            return (
              <div
                key={item.question}
                className={`rounded-3xl transition-smooth ${
                  isOpen ? 'bg-card shadow-elegant' : 'hover:bg-secondary/50'
                }`}
              >
                <button
                  type="button"
                  id={`faq-question-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => toggleItem(index)}
                  className="flex w-full appearance-none items-center gap-4 border-0 bg-transparent px-6 py-5 text-left"
                >
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-smooth ${
                      isOpen
                        ? 'bg-gradient-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    {Icon ? <Icon className="h-5 w-5" /> : null}
                  </span>
                  <span className="flex-1 font-display text-lg font-semibold md:text-xl">
                    {item.question}
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className={`h-5 w-5 shrink-0 text-primary transition-smooth ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className={`grid transition-all duration-300 ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-muted-foreground md:pl-[5.5rem] md:pr-12">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
