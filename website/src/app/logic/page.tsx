import type { Metadata } from 'next';
import LogicLabClient from './LogicLabClient';

export const metadata: Metadata = {
  title: 'Classical Logic Lab',
  description: 'Play with AND, OR, NOT, XOR, NAND, NOR and XNOR gates, solve truth-table challenges, and see how classical logic compares with quantum gates.',
};

export default function LogicPage() {
  return <LogicLabClient />;
}
