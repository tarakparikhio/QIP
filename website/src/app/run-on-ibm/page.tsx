import type { Metadata } from 'next';
import Link from 'next/link';
import CodeBlock from '@/components/CodeBlock';

export const metadata: Metadata = {
  title: 'Run Qiskit on IBM Quantum',
  description: 'A step-by-step Qiskit 2.x guide for running a quantum circuit locally and on an IBM Quantum system.',
};

const installCode = `python -m venv .venv

# macOS / Linux
source .venv/bin/activate

# Windows PowerShell: .venv\\Scripts\\Activate.ps1

python -m pip install --upgrade pip
python -m pip install "qiskit>=2.0,<3" "qiskit-ibm-runtime>=0.40"`;

const localCode = `from qiskit import QuantumCircuit
from qiskit.primitives import StatevectorSampler

circuit = QuantumCircuit(2)
circuit.h(0)
circuit.cx(0, 1)
circuit.measure_all()

sampler = StatevectorSampler()
job = sampler.run([circuit], shots=1024)
result = job.result()[0]
counts = result.data.meas.get_counts()

print(circuit)
print(counts)`;

const saveCredentialsCode = `import os
from qiskit_ibm_runtime import QiskitRuntimeService

QiskitRuntimeService.save_account(
    channel="ibm_quantum_platform",
    token=os.environ["IBM_QUANTUM_TOKEN"],
    instance=os.environ["IBM_QUANTUM_INSTANCE"],
    set_as_default=True,
    overwrite=True,
)

print("IBM Quantum credentials saved locally")`;

const hardwareCode = `import os
from qiskit import QuantumCircuit, transpile
from qiskit_ibm_runtime import QiskitRuntimeService, SamplerV2 as Sampler

service = QiskitRuntimeService(channel="ibm_quantum_platform")
backend = service.least_busy(
    operational=True,
    simulator=False,
    min_num_qubits=2,
)

circuit = QuantumCircuit(2)
circuit.h(0)
circuit.cx(0, 1)
circuit.measure_all()

isa_circuit = transpile(circuit, backend=backend)
sampler = Sampler(mode=backend)
job = sampler.run([isa_circuit], shots=1024)

print(f"Backend: {backend.name}")
print(f"Job ID: {job.job_id()}")
print("Submitted. The hardware may queue this job.")`;

const resultsCode = `result = job.result()[0]
counts = result.data.meas.get_counts()

print(counts)
# A Bell-state experiment should mostly contain 00 and 11.
# Real hardware can also produce 01 and 10 because of noise.`;

const experimentCode = `# Change one thing at a time and predict the result.
circuit = QuantumCircuit(2)
circuit.h(0)
circuit.cx(0, 1)
# circuit.x(0)             # try this
# circuit.barrier()        # make the circuit easier to read
circuit.measure_all()`;

export default function RunOnIBMPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-12 max-w-3xl">
        <p className="mb-4 text-xs font-mono uppercase tracking-[0.2em] text-primary">External lab guide</p>
        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Run your first Qiskit circuit on IBM Quantum.</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          Use this page beside a terminal. You will build a Bell-state circuit, test it locally, then submit the same idea to real IBM Quantum hardware.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <a href="https://quantum.cloud.ibm.com/" target="_blank" rel="noreferrer" className="rounded-lg bg-primary px-4 py-2 font-semibold text-white transition hover:bg-primary/90">Open IBM Quantum</a>
          <Link href="/lessons/entanglement" className="rounded-lg border border-border px-4 py-2 text-muted transition hover:border-primary/50 hover:text-foreground">Review entanglement</Link>
        </div>
      </div>

      <div className="mb-10 grid gap-3 border-y border-border/60 py-5 text-sm sm:grid-cols-3">
        <div><p className="font-mono text-primary">01</p><p className="mt-1 text-muted">Install Qiskit 2.x</p></div>
        <div><p className="font-mono text-primary">02</p><p className="mt-1 text-muted">Test locally</p></div>
        <div><p className="font-mono text-primary">03</p><p className="mt-1 text-muted">Submit to hardware</p></div>
      </div>

      <div className="space-y-12">
        <section>
          <p className="mb-2 text-xs font-mono uppercase tracking-widest text-primary">Before you start</p>
          <h2 className="text-2xl font-semibold">What you need</h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-foreground/80">
            <li>Python 3.9 or newer and a terminal.</li>
            <li>A free IBM Quantum account and API token.</li>
            <li>A little patience: real hardware jobs may wait in a queue and produce noisy results.</li>
          </ul>
          <div className="mt-5 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm leading-relaxed text-amber-100">
            Never paste your IBM token into a public notebook, Git repository, or browser code block. Keep it in an environment variable or a local credential store.
          </div>
        </section>

        <section>
          <p className="mb-2 text-xs font-mono uppercase tracking-widest text-primary">Step 1</p>
          <h2 className="text-2xl font-semibold">Create a clean Python environment</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">Run this from a new project folder. The virtual environment keeps Qiskit dependencies separate from other Python projects.</p>
          <div className="mt-5"><CodeBlock code={installCode} label="Terminal" /></div>
        </section>

        <section>
          <p className="mb-2 text-xs font-mono uppercase tracking-widest text-primary">Step 2</p>
          <h2 className="text-2xl font-semibold">Run the circuit locally first</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">Save this as <code className="rounded bg-card px-1.5 py-0.5 text-primary">bell_local.py</code>, then run <code className="rounded bg-card px-1.5 py-0.5 text-primary">python bell_local.py</code>. The two qubits should usually be measured as <code className="text-primary">00</code> or <code className="text-primary">11</code>.</p>
          <div className="mt-5"><CodeBlock code={localCode} label="bell_local.py" /></div>
          <p className="mt-4 text-sm leading-relaxed text-muted">The local sampler is idealized: it helps you check your circuit logic before hardware noise and queue time enter the picture.</p>
        </section>

        <section>
          <p className="mb-2 text-xs font-mono uppercase tracking-widest text-primary">Step 3</p>
          <h2 className="text-2xl font-semibold">Create an IBM Quantum account</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-foreground/80">
            <li>Open <a href="https://quantum.cloud.ibm.com/" target="_blank" rel="noreferrer" className="text-primary hover:underline">IBM Quantum</a> and sign in or create an account.</li>
            <li>On the dashboard, create an API key. Copy it somewhere safe: it is shown only once.</li>
            <li>Open the Instances page and copy your instance&apos;s CRN (a long identifier starting with <code className="text-primary">crn:</code>). The free Open Plan includes a limited amount of hardware time each month.</li>
          </ol>
          <p className="mt-4 text-sm leading-relaxed text-muted">Set the values in your terminal. Replace the placeholder values only on your own machine:</p>
          <div className="mt-4"><CodeBlock code={`export IBM_QUANTUM_TOKEN="paste-your-token-here"\nexport IBM_QUANTUM_INSTANCE="crn:v1:your-instance-crn"`} label="Terminal" /></div>
        </section>

        <section>
          <p className="mb-2 text-xs font-mono uppercase tracking-widest text-primary">Step 4</p>
          <h2 className="text-2xl font-semibold">Save credentials locally</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">Save this as <code className="rounded bg-card px-1.5 py-0.5 text-primary">save_ibm_account.py</code> and run it once. The token is read from your environment instead of being stored in your source file.</p>
          <div className="mt-5"><CodeBlock code={saveCredentialsCode} label="save_ibm_account.py" /></div>
        </section>

        <section>
          <p className="mb-2 text-xs font-mono uppercase tracking-widest text-primary">Step 5</p>
          <h2 className="text-2xl font-semibold">Submit the circuit to real hardware</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">Save this as <code className="rounded bg-card px-1.5 py-0.5 text-primary">bell_hardware.py</code>. Transpilation rewrites the abstract circuit into gates supported by the selected backend.</p>
          <div className="mt-5"><CodeBlock code={hardwareCode} label="bell_hardware.py" /></div>
          <div className="mt-5 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm leading-relaxed text-foreground/80">The job ID is your receipt. Keep it if you want to inspect the job later in IBM Quantum or retrieve it again with <code className="text-primary">service.job(job_id)</code>.</div>
        </section>

        <section>
          <p className="mb-2 text-xs font-mono uppercase tracking-widest text-primary">Step 6</p>
          <h2 className="text-2xl font-semibold">Read the hardware result</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">Add this after <code className="text-primary">job = sampler.run(...)</code>, or place it in a separate script after restoring the job. Hardware results are sampled counts, not exact amplitudes.</p>
          <div className="mt-5"><CodeBlock code={resultsCode} label="Read counts" /></div>
        </section>

        <section>
          <p className="mb-2 text-xs font-mono uppercase tracking-widest text-primary">Step 7</p>
          <h2 className="text-2xl font-semibold">Make one experiment</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">Change exactly one operation, predict how the counts should change, run locally, then submit to hardware. Try adding the X gate below and explain the new correlations.</p>
          <div className="mt-5"><CodeBlock code={experimentCode} label="Experiment" /></div>
        </section>

        <section className="border-t border-border/60 pt-8">
          <h2 className="text-2xl font-semibold">What to notice</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border/50 bg-card/40 p-4"><p className="font-semibold">Local simulator</p><p className="mt-2 text-sm leading-relaxed text-muted">Fast, repeatable, and useful for checking logic.</p></div>
            <div className="rounded-xl border border-border/50 bg-card/40 p-4"><p className="font-semibold">Transpiled circuit</p><p className="mt-2 text-sm leading-relaxed text-muted">Adapted to a device&apos;s native gates and connectivity.</p></div>
            <div className="rounded-xl border border-border/50 bg-card/40 p-4"><p className="font-semibold">Hardware counts</p><p className="mt-2 text-sm leading-relaxed text-muted">Finite samples shaped by calibration, noise, and readout error.</p></div>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-muted">This page targets Qiskit 2.x and the IBM Quantum Runtime primitives interface. IBM may change account screens, backend availability, or runtime package details over time; when that happens, use the official IBM Quantum documentation linked from your account page.</p>
          <div className="mt-6 rounded-xl border border-border/50 bg-card/30 p-5">
            <h3 className="font-semibold">Ecosystem note</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">Quantum Playground is an independent educational project, not an IBM product and not affiliated with IBM. Qiskit and IBM Quantum are one path into quantum programming; other active ecosystems include PennyLane, Cirq, Amazon Braket, Azure Quantum, CUDA-Q, and hardware providers such as Quantinuum and IonQ. The concepts transfer, but APIs, backends, pricing, and account requirements differ.</p>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs">
              <a href="https://quantum.cloud.ibm.com/docs" target="_blank" rel="noreferrer" className="text-primary hover:underline">IBM Quantum docs</a>
              <a href="https://qiskit.qotlabs.org/" target="_blank" rel="noreferrer" className="text-primary hover:underline">Qiskit docs</a>
              <a href="https://pennylane.ai/" target="_blank" rel="noreferrer" className="text-primary hover:underline">PennyLane</a>
              <a href="https://quantumai.google/cirq" target="_blank" rel="noreferrer" className="text-primary hover:underline">Cirq</a>
              <a href="https://aws.amazon.com/braket/" target="_blank" rel="noreferrer" className="text-primary hover:underline">Amazon Braket</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
