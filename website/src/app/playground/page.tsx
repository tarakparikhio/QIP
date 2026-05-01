import type { Metadata } from 'next';
import PlaygroundClient from './PlaygroundClient';

export const metadata: Metadata = {
  title: 'Playground — QC Path',
  description: 'Full quantum circuit simulator with up to 10 qubits, all gates, Bloch spheres, and state vector.',
};

export default function PlaygroundPage() {
  return <PlaygroundClient />;
}
