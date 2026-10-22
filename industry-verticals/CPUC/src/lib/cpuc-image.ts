import type { ImageField } from '@sitecore-content-sdk/nextjs';

/** Keep valid CMS images; use bundled demo assets when layout serialization is empty. */
export const cpucImage = (field: ImageField | undefined, src: string, alt: string): ImageField =>
  field?.value?.src ? field : { value: { src, alt } };
