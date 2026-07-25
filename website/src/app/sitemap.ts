import type { MetadataRoute } from 'next';
import { LESSONS } from '@/lib/lessons';
import { siteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];

  return [
    { url: siteUrl, lastModified: new Date() },
    { url: `${siteUrl}/lessons`, lastModified: new Date() },
    { url: `${siteUrl}/playground`, lastModified: new Date() },
    { url: `${siteUrl}/about`, lastModified: new Date() },
    ...LESSONS.filter((lesson) => !lesson.upcoming).map((lesson) => ({
      url: `${siteUrl}/lessons/${lesson.slug}`,
      lastModified: new Date(),
    })),
  ];
}
