import type { Metadata } from 'next';
import RoadmapClient from './RoadmapClient';

export const metadata: Metadata = {
  title: 'Quantum Computing Roadmap',
  description: 'A self-paced, checklist-driven roadmap from quantum foundations to entry-level quantum computing practice.',
};

export default function RoadmapPage() {
  return <RoadmapClient />;
}
