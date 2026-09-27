'use client';
import { InlineMath, BlockMath } from '@/components/math';
import { NotationBox, TryIt } from '@/components/lesson';

export default function Lesson38Content() {
  return (
    <>
      <NotationBox>
        <NotationBox.Item heading="From algorithm to device">
          <NotationBox.Text>
            A compiler (in Qiskit, the <em>transpiler</em>) rewrites an abstract circuit into one the target device can run, while keeping the overall unitary the same, or within a chosen approximation error.
          </NotationBox.Text>
          <NotationBox.Formula math="U_{\text{target}} \approx G_m G_{m-1}\cdots G_1, \quad G_i \in \text{native gates}" />
        </NotationBox.Item>
        <NotationBox.Item heading="Key terms">
          <NotationBox.List items={[
            { term: 'ISA circuit', description: 'A circuit that uses only the device’s instruction set architecture: its native gates, on qubit pairs that are physically connected.' },
            { term: 'Layout', description: 'The assignment of the algorithm’s logical qubits to physical qubits.' },
            { term: 'Routing', description: 'Inserting SWAPs so that every two-qubit gate acts on connected qubits.' },
            { term: 'Depth', description: 'The number of time steps, counting gates that run in parallel once.' },
          ]} />
        </NotationBox.Item>
      </NotationBox>

      <h2>38.1 - Native Gates and Decomposition</h2>
      <p className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/80">
        <strong>Study takeaway:</strong> compilation translates gates, places qubits, routes interactions, and simplifies, all while trading off gate count, depth, and error. Two mathematically identical circuits can succeed with very different probabilities on hardware.
      </p>
      <p>
        Devices implement only a few operations directly, for example one type of two-qubit gate plus single-qubit rotations. Everything else is decomposed. A Toffoli gate becomes 6 CNOTs and several single-qubit gates; an arbitrary rotation angle may be expressed through the device&apos;s native rotation. The result of compilation is an <strong>ISA circuit</strong>: one written entirely in the device&apos;s own instruction set, on connected qubit pairs. Hardware providers such as IBM require ISA circuits as input to their runtime services, so this step is mandatory, not an optimization.
      </p>

      <h2>38.2 - SWAPs and Routing</h2>
      <p>
        If two qubits that must interact are not connected, the compiler moves their states next to each other. A SWAP costs three CNOTs:
      </p>
      <BlockMath math="\text{SWAP}_{01} = \text{CNOT}_{0\to1}\,\text{CNOT}_{1\to0}\,\text{CNOT}_{0\to1}" />
      <p>
        Worked example: qubits in a line, 0–1–2–3–4, and a CNOT needed between 0 and 4. Three SWAPs move qubit 0&apos;s state to position 3, next to qubit 4, and then the CNOT runs: <InlineMath math="3 \times 3 + 1 = 10" /> CNOTs instead of 1. At 99% per CNOT, the success probability of that step falls from 0.99 to <InlineMath math="0.99^{10} \approx 0.90" />. A better layout that places the two logical qubits next to each other from the start avoids this entirely, which is why layout is often the single most important compiler decision.
      </p>

      <h2>38.3 - Optimization Passes</h2>
      <p>
        After translation, the compiler simplifies. Common steps:
      </p>
      <ol>
        <li><strong>Cancellation:</strong> adjacent inverse pairs (H·H, CNOT·CNOT on the same qubits) are removed.</li>
        <li><strong>Merging:</strong> consecutive rotations about the same axis are combined into one.</li>
        <li><strong>Resynthesis:</strong> a block acting on two qubits is replaced by an optimal equivalent. Any two-qubit unitary needs at most 3 CNOTs.</li>
        <li><strong>Scheduling:</strong> independent gates are run in parallel to reduce depth, which also reduces idle time during which qubits decohere.</li>
      </ol>
      <p>
        Because calibration data changes daily, a good compiler also prefers the best-performing qubits and couplers at the time of the run, making compilation part of each execution rather than a one-off step.
      </p>

      <h2>38.4 - Measuring Compiler Quality</h2>
      <p>
        A compiled circuit is judged by the success probability it achieves, which depends on the number and quality of the gates it uses: roughly <InlineMath math="\prod_i F_i" /> over its operations. Two-qubit gate count and depth are the usual proxies. Compilers are heuristic, since finding the truly optimal layout and routing is computationally hard in general, so it can pay to compile the same circuit several times with different random seeds and keep the one with the fewest two-qubit gates.
      </p>

      <TryIt heading="38.5 - Try It: Cancel and Count">
        <p>
          Build H → CNOT → H → H → CNOT → H on two qubits and write down its gate count and depth. Then cancel the adjacent H·H pair and the resulting adjacent CNOT·CNOT pair. What is left, and does the state vector change? This is exactly what a cancellation pass does.
        </p>
      </TryIt>
    </>
  );
}
