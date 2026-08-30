import type { MetadataRoute } from 'next';
import { LESSONS } from '@/lib/lessons';
import { siteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];

  return [
    { url: siteUrl, lastModified: new Date() },
    { url: `${siteUrl}/lessons`, lastModified: new Date() },
    { url: `${siteUrl}/playground`, lastModified: new Date() },
    { url: `${siteUrl}/gates`, lastModified: new Date() },
    { url: `${siteUrl}/roadmap`, lastModified: new Date() },
    { url: `${siteUrl}/run-on-ibm`, lastModified: new Date() },
    { url: `${siteUrl}/updates`, lastModified: new Date() },
    { url: `${siteUrl}/about`, lastModified: new Date() },
    { url: `${siteUrl}/sources`, lastModified: new Date() },
    ...LESSONS.filter((lesson) => !lesson.upcoming).map((lesson) => ({
      url: `${siteUrl}/lessons/${lesson.slug}`,
      lastModified: new Date(),
    })),
  ];
}