import type { ImageLoaderProps } from 'next/image';

const CLOUDINARY_HOST = 'res.cloudinary.com';
const UPLOAD_SEGMENT = '/image/upload/';
const TRANSFORM_PATTERN = /^[a-z]_[^/]+$/;

export function cloudinaryLoader({ src, width, quality }: ImageLoaderProps): string {
  if (!src.includes(CLOUDINARY_HOST) || !src.includes(UPLOAD_SEGMENT)) {
    return src;
  }

  const [base, rest] = src.split(UPLOAD_SEGMENT);
  const segments = rest.split('/');
  const hasExistingTransform = segments.length > 1 && TRANSFORM_PATTERN.test(segments[0]);
  const pathSegments = hasExistingTransform ? segments.slice(1) : segments;
  const transforms = ['f_auto', `q_${quality ?? 'auto'}`, `w_${width}`, 'c_limit'].join(',');

  return `${base}${UPLOAD_SEGMENT}${transforms}/${pathSegments.join('/')}`;
}
