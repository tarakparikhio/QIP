import { Complex, Matrix } from './math';
import { QuantumState } from './state';
import { Gates } from './gates';

export type GateOperation = {
  gateId: string; // 'H', 'X', 'Y', 'Z', etc.
  targetQubit: number;
  controlQubit?: number; // For multi-qubit gates like CNOT
};

export function sampleMeasurementCounts(probabilities: number[], shots: number): number[] {
  const counts = probabilities.map(() => 0);
  const totalProbability = probabilities.reduce((sum, probability) => sum + probability, 0);
  if (totalProbability <= 0 || shots <= 0) return counts;

  for (let shot = 0; shot < shots; shot += 1) {
    let threshold = Math.random() * totalProbability;
    for (let index = 0; index < probabilities.length; index += 1) {
      threshold -= probabilities[index];
      if (threshold <= 0 || index === probabilities.length - 1) {
        counts[index] += 1;
        break;
      }
    }
  }

  return counts;
}

const CONTROLLED_GATES = new Set(['CNOT', 'CZ', 'SWAP']);

/**
 * Ideal state-vector simulator.
 *
 * Convention: qubit 0 is the most-significant bit of the basis-state index
 * (the left-most label in |q0 q1 ... >), matching the playground display.
 *
 * Gates are applied directly to the amplitude arrays in O(2^n) time per gate,
 * instead of building a dense 2^n x 2^n matrix for every operation.
 */
export class CircuitRunner {
  public state: QuantumState;
  public numQubits: number;

  constructor(numQubits: number) {
    this.numQubits = numQubits;
    this.state = new QuantumState(numQubits);
  }

  private bitMask(qubit: number): number {
    return 1 << (this.numQubits - 1 - qubit);
  }

  private applySingleQubit(re: Float64Array, im: Float64Array, target: number, gate: Matrix) {
    const mask = this.bitMask(target);
    const [[g00, g01], [g10, g11]] = gate;
    for (let i = 0; i < re.length; i++) {
      if (i & mask) continue; // visit each |..0..>, |..1..> pair once
      const j = i | mask;
      const aRe = re[i], aIm = im[i], bRe = re[j], bIm = im[j];
      re[i] = g00.re * aRe - g00.im * aIm + g01.re * bRe - g01.im * bIm;
      im[i] = g00.re * aIm + g00.im * aRe + g01.re * bIm + g01.im * bRe;
      re[j] = g10.re * aRe - g10.im * aIm + g11.re * bRe - g11.im * bIm;
      im[j] = g10.re * aIm + g10.im * aRe + g11.re * bIm + g11.im * bRe;
    }
  }

  private applyCNOT(re: Float64Array, im: Float64Array, control: number, target: number) {
    const c = this.bitMask(control), t = this.bitMask(target);
    for (let i = 0; i < re.length; i++) {
      if (!(i & c) || (i & t)) continue; // control = 1, target = 0: swap with target = 1
      const j = i | t;
      [re[i], re[j]] = [re[j], re[i]];
      [im[i], im[j]] = [im[j], im[i]];
    }
  }

  private applyCZ(re: Float64Array, im: Float64Array, control: number, target: number) {
    const both = this.bitMask(control) | this.bitMask(target);
    for (let i = 0; i < re.length; i++) {
      if ((i & both) === both) { re[i] = -re[i]; im[i] = -im[i]; }
    }
  }

  private applySwap(re: Float64Array, im: Float64Array, first: number, second: number) {
    const a = this.bitMask(first), b = this.bitMask(second);
    for (let i = 0; i < re.length; i++) {
      if (!(i & a) || (i & b)) continue; // first = 1, second = 0 <-> first = 0, second = 1
      const j = (i & ~a) | b;
      [re[i], re[j]] = [re[j], re[i]];
      [im[i], im[j]] = [im[j], im[i]];
    }
  }

  /**
   * Run a sequence of operations from |0...0>.
   */
  public run(operations: GateOperation[]) {
    const dim = 1 << this.numQubits;
    const re = new Float64Array(dim);
    const im = new Float64Array(dim);
    re[0] = 1;

    for (const op of operations) {
      if (CONTROLLED_GATES.has(op.gateId) && op.controlQubit !== undefined) {
        const control = op.controlQubit;
        const target = op.targetQubit;
        if (control === target || control < 0 || target < 0 || control >= this.numQubits || target >= this.numQubits) {
          console.warn(`${op.gateId}: invalid control=${control} target=${target} for numQubits=${this.numQubits}`);
          continue;
        }
        if (op.gateId === 'CNOT') this.applyCNOT(re, im, control, target);
        else if (op.gateId === 'CZ') this.applyCZ(re, im, control, target);
        else this.applySwap(re, im, control, target);
      } else {
        const gateMatrix = Gates[op.gateId];
        if (!gateMatrix) throw new Error(`Gate ${op.gateId} not found`);
        if (op.targetQubit < 0 || op.targetQubit >= this.numQubits) {
          console.warn(`${op.gateId}: invalid target=${op.targetQubit} for numQubits=${this.numQubits}`);
          continue;
        }
        this.applySingleQubit(re, im, op.targetQubit, gateMatrix);
      }
    }

    this.state = new QuantumState(this.numQubits, Array.from(re, (value, index) => new Complex(value, im[index])));
  }

  public getProbabilities(): number[] {
    return this.state.getProbabilities();
  }
}
