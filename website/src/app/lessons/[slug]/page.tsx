import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getLessonBySlug, LESSONS } from '@/lib/lessons';
import LessonPageClient from './LessonPageClient';
import Lesson01 from '@/content/lessons/01-birth-of-quantum-information';
import Lesson02 from '@/content/lessons/02-superposition';
import Lesson03 from '@/content/lessons/03-measurement';
import Lesson04 from '@/content/lessons/04-entanglement';
import Lesson05 from '@/content/lessons/05-interference';

export function generateStaticParams() {
  return LESSONS.filter((l) => !l.upcoming).map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const lesson = getLessonBySlug(params.slug);
  if (!lesson) return { title: 'Lesson Not Found — QC Path' };

  const title = `${lesson.title} — QC Path`;
  const description = `${lesson.objective} Learn quantum computing step by step with interactive circuit simulations.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      siteName: 'QC Path',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}

const LESSON_CONTENT: Record<string, React.ComponentType> = {
  'birth-of-quantum-information': Lesson01,
  'superposition': Lesson02,
  'measurement': Lesson03,
  'entanglement': Lesson04,
  'interference': Lesson05,
};

export default function LessonPage({ params }: { params: { slug: string } }) {
  const lesson = getLessonBySlug(params.slug);
  if (!lesson) notFound();

  const Content = LESSON_CONTENT[lesson.slug];
  if (!Content) notFound();

  return <LessonPageClient lesson={lesson}><Content /></LessonPageClient>;
}
