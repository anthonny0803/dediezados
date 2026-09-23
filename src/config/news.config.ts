import type { NewsItemConfig } from '@/types/news';

/**
 * News feed shown by the floating widget.
 *
 * Structure only, no visible text: every title, body and alt lives in
 * `news.items.<key>` of the messages, where the key is `contentKey` when the
 * item declares one and its `id` otherwise.
 *
 * Publishing checklist:
 * 1. Upload the media to Cloudinary and build the URL with the transformations
 *    below, so it is delivered optimised like the rest of the site.
 * 2. Set `width`/`height` to the source size so the frame matches the asset and
 *    nothing gets cropped. Cloudinary reports it at
 *    `.../image/upload/fl_getinfo/v<version>/<public_id>.jpg`.
 * 3. Add the key to `news.items` in the nine `src/i18n/messages/*.json`.
 * 4. Bump `NEWS_RELEASE_ID` so the modal opens again for everyone.
 *
 * Media URL shapes (cloud `dk5kc8pu3`):
 * - image            `/image/upload/f_auto,q_auto,w_1080/v<version>/<public_id>.jpg`
 * - cloudinaryVideo  `/video/upload/f_auto,q_auto/v<version>/<public_id>.mp4`
 *   with a poster at `/video/upload/so_0,f_auto,q_auto/v<version>/<public_id>.jpg`
 * - youtube          `{ kind: 'youtube', videoId: '<id>', poster: '<Cloudinary image URL>' }`
 *
 * Never ask for a width above the source width: Cloudinary upscales and the
 * file grows instead of shrinking. The clips here are 576px wide and the review
 * screenshot 979px, so both are delivered without a `w_` transformation.
 */

/** Bump only for genuinely new content: it reopens the modal for every visitor. */
export const NEWS_RELEASE_ID = '2026-09-reapertura-escenario';

export const NEWS_STORAGE_KEY = 'dediezados:news:release';

/**
 * Lets the visitor take in the hero and understand what the venue is before
 * the modal covers it. Long enough not to feel like a pop-up ambush.
 */
export const NEWS_AUTO_OPEN_DELAY_MS = 3000;

/** Horizontal travel that turns a touch gesture into a slide change. */
export const NEWS_SWIPE_THRESHOLD_PX = 50;

const CLOUDINARY = 'https://res.cloudinary.com/dk5kc8pu3';

const stagePhoto = (version: string, publicId: string): NewsItemConfig['media'] => ({
  kind: 'image',
  url: `${CLOUDINARY}/image/upload/f_auto,q_auto,w_1080/${version}/${publicId}.jpg`,
  width: 1200,
  height: 1600,
});

/**
 * Copy is provisional until the client approves it.
 *
 * The two reopening items open the feed, then the stage series. All four stage
 * photos share the `escenario` text: one message, four views of it.
 */
export const newsItems: NewsItemConfig[] = [
  {
    id: 'reapertura',
    media: {
      kind: 'cloudinaryVideo',
      src: `${CLOUDINARY}/video/upload/f_auto,q_auto/v1790149330/WhatsApp_Video_2026-09-21_at_13.06.40_owufi9.mp4`,
      poster: `${CLOUDINARY}/video/upload/so_0,f_auto,q_auto/v1790149330/WhatsApp_Video_2026-09-21_at_13.06.40_owufi9.jpg`,
      width: 576,
      height: 1024,
    },
  },
  {
    id: 'puertasAbiertas',
    media: {
      kind: 'image',
      url: `${CLOUDINARY}/image/upload/f_auto,q_auto,w_1080/v1790149330/WhatsApp_Image_2026-09-21_at_13.07.25_1_ygrssk.jpg`,
      width: 1200,
      height: 1600,
    },
  },
  {
    id: 'resena',
    media: {
      kind: 'image',
      url: `${CLOUDINARY}/image/upload/f_auto,q_auto/v1790151662/WhatsApp_Image_2026-09-21_at_12.42.34_ld7hm7.jpg`,
      width: 979,
      height: 1268,
    },
  },
  {
    id: 'escenario1',
    contentKey: 'escenario',
    media: stagePhoto('v1790149746', 'WhatsApp_Image_2026-09-18_at_21.10.58_sktlsr'),
    cta: { href: '#contact' },
  },
  {
    id: 'escenario2',
    contentKey: 'escenario',
    media: stagePhoto('v1790149746', 'WhatsApp_Image_2026-09-18_at_21.10.59_igzjmv'),
    cta: { href: '#contact' },
  },
  {
    id: 'escenario3',
    contentKey: 'escenario',
    media: stagePhoto('v1790149747', 'WhatsApp_Image_2026-09-18_at_21.10.59_2_znqbht'),
    cta: { href: '#contact' },
  },
  {
    id: 'escenario4',
    contentKey: 'escenario',
    media: stagePhoto('v1790149747', 'WhatsApp_Image_2026-09-18_at_21.10.59_3_pc7wic'),
    cta: { href: '#contact' },
  },
];
