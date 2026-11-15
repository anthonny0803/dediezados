import { buildJsonLdGraph, serializeJsonLd } from '@/lib/json-ld';

interface JsonLdProps {
  locale: string;
}

export const JsonLd = ({ locale }: JsonLdProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildJsonLdGraph(locale)) }}
  />
);
