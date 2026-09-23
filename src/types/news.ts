/**
 * News contract shared by the config feed, the widget hooks and the UI.
 *
 * Items carry structure only: the media to play and, optionally, a call to
 * action. Every visible string lives in the `news` namespace and is matched by
 * key, not by array position, so a locale missing an item drops that item
 * instead of breaking the feed.
 */

export type NewsMedia =
  | { kind: 'image'; url: string; width: number; height: number }
  | { kind: 'cloudinaryVideo'; src: string; poster: string; width: number; height: number }
  | { kind: 'youtube'; videoId: string; poster: string };

export interface NewsCta {
  href: string;
  external?: boolean;
}

export interface NewsItemConfig {
  /** Unique across the feed. Also the default key under `news.items`. */
  id: string;
  /** Set when several items share one text, as a photo series does. */
  contentKey?: string;
  media: NewsMedia;
  cta?: NewsCta;
}

/** Shape of the `news.items.<id>` block in the messages. */
export interface NewsItemContent {
  title: string;
  body: string;
  alt: string;
  ctaLabel?: string;
}

/** Config merged with its translation: what the components consume. */
export interface NewsItem extends NewsItemConfig {
  content: NewsItemContent;
}
