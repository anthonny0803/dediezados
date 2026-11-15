import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { pageCopyValues, type SectionPageKey } from '@/config/pages.config';
import { buildSectionPageMetadata } from '@/lib/metadata';

export interface SectionPageProps {
  params: Promise<{ locale: string }>;
}

export const createSectionPageMetadata =
  (page: SectionPageKey) =>
  async ({ params }: SectionPageProps): Promise<Metadata> => {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: `pages.${page}` });
    return buildSectionPageMetadata(locale, page, {
      title: t('metaTitle'),
      description: t('metaDescription', pageCopyValues),
    });
  };
