import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getLessonBySlug, LESSONS } from '@/lib/lessons';
import LessonPageClient from './LessonPageClient';
import Lesson01 from '@/content/lessons/01-birth-of-quantum-information';
import Lesson02 from '@/content/lessons/02-superposition';
import Lesson03 from '@/content/lessons/03-measurement';
import Lesson04 from '@/content/lessons/04-entanglement';
import Lesson05 from '@/content/lessons/05-interference';
import Lesson06 from '@/content/lessons/06-quantum-gates-unitarity';
import Lesson07 from '@/content/lessons/07-bloch-sphere';
import Lesson08 from '@/content/lessons/08-multi-qubit-systems';
import Lesson09 from '@/content/lessons/09-quantum-circuits';
import Lesson10 from '@/content/lessons/10-phase-kickback';

export function generateStaticParams() {
  return LESSONS.filter((l) => !l.upcoming).map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const lesson = getLessonBySlug(params.slug);
  if (!lesson) return { title: 'Lesson Not Found — Quantum Playground' };

  const title = `${lesson.title} — Quantum Playground`;
  const description = `${lesson.objective} Learn quantum computing step by step with interactive circuit simulations.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      siteName: 'Quantum Playground',
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
  'quantum-gates-unitarity': Lesson06,
  'bloch-sphere': Lesson07,
  'multi-qubit-systems': Lesson08,
  'quantum-circuits': Lesson09,
  'phase-kickback': Lesson10,
};

export default function LessonPage({ params }: { params: { slug: string } }) {
  const lesson = getLessonBySlug(params.slug);
  if (!lesson) notFound();

  const Content = LESSON_CONTENT[lesson.slug];
  if (!Content) notFound();

  return <LessonPageClient lesson={lesson}><Content /></LessonPageClient>;
}
