'use client';

import { useState } from 'react';
import CodeBlock from '@/components/CodeBlock';
import type { GateOperation } from '@/lib/quantum-engine/run';

type Props = {
  numQubits: number;
  operations: GateOperation[];
};

type CodeTab = 'local' | 'ibm';

function operationToQiskit(operation: GateOperation): string {
  const target = operation.targetQubit;
  const control = operation.controlQubit;

  switch (operation.gateId) {
    case 'CNOT':
      return `circuit.cx(${control}, ${target})`;
    case 'CZ':
      return `circuit.cz(${control}, ${target})`;
    case 'SWAP':
      return `circuit.swap(${control}, ${target})`;
    case 'RX':
      return `circuit.rx(pi / 2, ${target})`;
    case 'RY':
      return `circuit.ry(pi / 2, ${target})`;
    case 'RZ':
      return `circuit.rz(pi / 2, ${target})`;
    default:
      return `circuit.${operation.gateId.toLowerCase()}(${target})`;
  }
}

function buildCircuitBody(operations: GateOperation[]): string {
  return operations.length > 0
    ? operations.map(operationToQiskit).join('\n')
    : '# Add gates in the Playground to generate circuit code';
}

function buildCode(numQubits: number, operations: GateOperation[], tab: CodeTab): string {
  const body = buildCircuitBody(operations);

  if (tab === 'local') {
    return `from math import pi
from qiskit import QuantumCircuit
from qiskit.primitives import StatevectorSampler

circuit = QuantumCircuit(${numQubits})
${body}
circuit.measure_all()

sampler = StatevectorSampler()
result = sampler.run([circuit], shots=1024).result()[0]
print(circuit)
print(result.data.meas.get_counts())`;
  }

  return `import os
from math import pi
from qiskit import QuantumCircuit, transpile
from qiskit_ibm_runtime import QiskitRuntimeService, SamplerV2 as Sampler

service = QiskitRuntimeService(
    channel="ibm_quantum_platform",
    token=os.environ["IBM_QUANTUM_TOKEN"],
    instance=os.environ["IBM_QUANTUM_INSTANCE"],
)
backend = service.least_busy(
    operational=True,
    simulator=False,
    min_num_qubits=${numQubits},
)

circuit = QuantumCircuit(${numQubits})
${body}
circuit.measure_all()

isa_circuit = transpile(circuit, backend=backend)
sampler = Sampler(mode=backend)
job = sampler.run([isa_circuit], shots=1024)
print(f"Backend: {backend.name}")
print(f"Job ID: {job.job_id()}")
print(job.result()[0].data.meas.get_counts())`;
}

export default function QuantumCodePanel({ numQubits, operations }: Props) {
  const [tab, setTab] = useState<CodeTab>('local');
  const code = buildCode(numQubits, operations, tab);

  return (
    <section className="border-t border-border/30 pt-5" aria-labelledby="view-code-heading">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-primary">Export circuit</p>
          <h2 id="view-code-heading" className="mt-1 text-lg font-semibold">View code</h2>
          <p className="mt-1 text-sm text-muted">Copy this Qiskit code to run the circuit locally or on IBM Quantum hardware.</p>
        </div>
        <div className="flex rounded-lg border border-border/60 p-0.5" role="tablist" aria-label="Code target">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'local'}
            onClick={() => setTab('local')}
            className={`rounded-md px-3 py-1.5 text-xs font-mono transition ${tab === 'local' ? 'bg-primary/15 text-primary' : 'text-muted hover:text-foreground'}`}
          >
            Local sampler
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'ibm'}
            onClick={() => setTab('ibm')}
            className={`rounded-md px-3 py-1.5 text-xs font-mono transition ${tab === 'ibm' ? 'bg-accent/15 text-accent' : 'text-muted hover:text-foreground'}`}
          >
            IBM Quantum
          </button>
        </div>
      </div>
      <CodeBlock code={code} label={tab === 'local' ? 'qiskit_local.py' : 'run_on_ibm.py'} />
      {tab === 'ibm' && (
        <p className="mt-2 text-xs leading-relaxed text-muted/70">
          Before running, set <code className="text-primary">IBM_QUANTUM_TOKEN</code> and <code className="text-primary">IBM_QUANTUM_INSTANCE</code> in your terminal. Never put your token in this code.
        </p>
      )}
    </section>
  );
}