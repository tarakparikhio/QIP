import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getLessonBySlug, LESSONS } from '@/lib/lessons';
import LessonPageClient from './LessonPageClient';
import Lesson01 from '@/content/lessons/01-birth-of-quantum-information';
import Lesson02 from '@/content/lessons/02-superposition';
import Lesson03 from '@/content/lessons/03-measurement';
import Lesson04 from '@/content/lessons/08-entanglement';
import Lesson05 from '@/content/lessons/05-interference';
import Lesson06 from '@/content/lessons/04-quantum-gates-unitarity';
import Lesson07 from '@/content/lessons/06-bloch-sphere';
import Lesson08 from '@/content/lessons/07-multi-qubit-systems';
import Lesson09 from '@/content/lessons/09-quantum-circuits';
import Lesson10 from '@/content/lessons/12-phase-kickback';
import Lesson11 from '@/content/lessons/13-decoherence';
import Lesson12 from '@/content/lessons/14-quantum-noise-and-errors';
import Lesson13 from '@/content/lessons/19-deutsch-jozsa';
import Lesson14 from '@/content/lessons/20-simons-algorithm';
import Lesson15 from '@/content/lessons/27-shors-algorithm';
import Lesson16 from '@/content/lessons/18-quantum-error-correction';
import Lesson17 from '@/content/lessons/10-quantum-teleportation';
import Lesson18 from '@/content/lessons/15-density-matrices';
import Lesson19 from '@/content/lessons/28-quantum-complexity';
import Lesson20 from '@/content/lessons/29-variational-quantum-algorithms';
import Lesson21 from '@/content/lessons/22-quantum-fourier-transform';
import Lesson22 from '@/content/lessons/25-phase-estimation';
import Lesson23 from '@/content/lessons/32-hamiltonian-simulation';
import Lesson24 from '@/content/lessons/17-universal-gate-sets';
import Lesson25 from '@/content/lessons/16-measurement-theory-deep';
import Lesson26 from '@/content/lessons/23-quantum-fourier-transform-qft';
import Lesson27 from '@/content/lessons/24-qft-circuit-implementation';
import Lesson28 from '@/content/lessons/26-phase-estimation-deep';
import Lesson29 from '@/content/lessons/33-hamiltonian-simulation-deep';
import Lesson30 from '@/content/lessons/30-variational-quantum-eigensolver-vqe';
import Lesson31 from '@/content/lessons/31-quantum-approximate-optimization-algorithm-qaoa';
import Lesson32 from '@/content/lessons/34-quantum-annealing';
import Lesson33 from '@/content/lessons/35-adiabatic-quantum-computation';
import Lesson34 from '@/content/lessons/39-phase-kickback-advanced';
import Lesson35 from '@/content/lessons/40-phase-amplitude-and-interference-advanced-view';
import Lesson36 from '@/content/lessons/11-no-cloning-theorem';
import Lesson37 from '@/content/lessons/21-grovers-search-algorithm';
import Lesson38 from '@/content/lessons/36-quantum-cryptography-bb84';
import Lesson39 from '@/content/lessons/37-quantum-hardware-platforms';
import Lesson40 from '@/content/lessons/38-quantum-compilation-and-transpilation';

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
  'decoherence': Lesson11,
  'quantum-noise-and-errors': Lesson12,
  'deutsch-jozsa': Lesson13,
  'simons-algorithm': Lesson14,
  'shors-algorithm': Lesson15,
  'quantum-error-correction': Lesson16,
  'quantum-teleportation': Lesson17,
  'density-matrices': Lesson18,
  'quantum-complexity': Lesson19,
  'variational-quantum-algorithms': Lesson20,
  'quantum-fourier-transform': Lesson21,
  'phase-estimation': Lesson22,
  'hamiltonian-simulation': Lesson23,
  'universal-gate-sets': Lesson24,
  'measurement-theory-deep': Lesson25,
  'quantum-fourier-transform-qft': Lesson26,
  'qft-circuit-implementation': Lesson27,
  'phase-estimation-deep': Lesson28,
  'hamiltonian-simulation-deep': Lesson29,
  'variational-quantum-eigensolver-vqe': Lesson30,
  'quantum-approximate-optimization-algorithm-qaoa': Lesson31,
  'quantum-annealing': Lesson32,
  'adiabatic-quantum-computation': Lesson33,
  'phase-kickback-advanced': Lesson34,
  'phase-amplitude-and-interference-advanced-view': Lesson35,
  'no-cloning-theorem': Lesson36,
  'grovers-search-algorithm': Lesson37,
  'quantum-cryptography-bb84': Lesson38,
  'quantum-hardware-platforms': Lesson39,
  'quantum-compilation-and-transpilation': Lesson40,
};

export default function LessonPage({ params }: { params: { slug: string } }) {
  const lesson = getLessonBySlug(params.slug);
  if (!lesson) notFound();

  const Content = LESSON_CONTENT[lesson.slug];
  if (!Content) notFound();

  return <LessonPageClient lesson={lesson}><Content /></LessonPageClient>;
}
