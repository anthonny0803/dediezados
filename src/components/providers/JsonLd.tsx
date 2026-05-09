import { buildJsonLdGraph } from '@/lib/json-ld';

interface JsonLdProps {
  locale: string;
}

const LINE_SEPARATORS = new RegExp('[\\u2028\\u2029]', 'g');

const escapeJsonLd = (json: string) =>
  json
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(LINE_SEPARATORS, (char) => `\\u${char.charCodeAt(0).toString(16).padStart(4, '0')}`);

export const JsonLd = ({ locale }: JsonLdProps) => {
  const graph = buildJsonLdGraph(locale);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: escapeJsonLd(JSON.stringify(graph)) }}
    />
  );
};
