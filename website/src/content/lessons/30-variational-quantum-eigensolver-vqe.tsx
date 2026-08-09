'use client';
import { BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson30Content() {
  return (
    <>
      <NotationBox><NotationBox.Item heading="VQE"><NotationBox.Text>VQE estimates a Hamiltonian&apos;s ground-state energy with a parameterized trial state.</NotationBox.Text></NotationBox.Item><NotationBox.Item heading="Objective"><NotationBox.Code><NotationBox.Row math="E(\theta)=\langle\psi(\theta)|H|\psi(\theta)\rangle" label="energy estimate" /></NotationBox.Code></NotationBox.Item></NotationBox>
      <h2>30.1 — A hybrid eigensolver</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80"><strong>Study takeaway:</strong> VQE uses the quantum device for expectation-value measurements and a classical optimizer for parameter updates.</p>
      <p>The variational principle guarantees that the expected energy of any normalized trial state is at least the ground-state energy. VQE chooses an ansatz, measures the terms in H, and adjusts its parameters to lower the estimate.</p>
      <BlockMath math="E(\theta)\ge E_0" />
      <h2>30.2 — Practical limitations</h2>
      <p>Measurement shots create statistical uncertainty, hardware noise biases expectation values, and a poor ansatz can create barren or misleading optimization landscapes. A barren plateau is a region where gradients become uniformly tiny, so a classical optimizer receives almost no useful direction. Good VQE design is as much about measurement and chemistry structure as optimization.</p>
      <TryIt heading="30.3 — Try It: Follow the loop"><p>What information comes from the quantum circuit, and what information comes from the classical optimizer? Why is a lower measured energy not automatically proof of a perfect ground state?</p></TryIt>
    </>
  );
}
