import { Complex, Matrix, tensorProductMatrix } from './math';
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

export class CircuitRunner {
  public state: QuantumState;
  public numQubits: number;

  constructor(numQubits: number) {
    this.numQubits = numQubits;
    this.state = new QuantumState(numQubits);
  }

  /**
   * Build a global unitary matrix for a single-qubit gate.
   * Assumes Qubit 0 is the MSB / left-most in the tensor product.
   */
  private buildSingleQubitUnitary(targetQubit: number, gateMatrix: Matrix): Matrix {
    let result = targetQubit === 0 ? gateMatrix : Gates.I;
    for (let i = 1; i < this.numQubits; i++) {
      const nextGate = i === targetQubit ? gateMatrix : Gates.I;
      result = tensorProductMatrix(result, nextGate);
    }
    return result;
  }

  /**
   * Build an n-qubit CNOT (permutation matrix) for arbitrary control and target qubits.
   * Qubit 0 = MSB convention.
   */
  private buildCNOTUnitary(control: number, target: number): Matrix {
    const dim = 1 << this.numQubits;
    const controlBitPos = this.numQubits - 1 - control;
    const targetBitPos  = this.numQubits - 1 - target;

    // Initialise dim×dim zero matrix
    const matrix: Matrix = Array.from({ length: dim }, () =>
      Array.from({ length: dim }, () => new Complex(0, 0))
    );

    for (let i = 0; i < dim; i++) {
      const controlIsOne = (i >> controlBitPos) & 1;
      if (controlIsOne) {
        const j = i ^ (1 << targetBitPos); // flip target bit
        matrix[j][i] = new Complex(1, 0);
      } else {
        matrix[i][i] = new Complex(1, 0);
      }
    }
    return matrix;
  }

  /**
   * Build an n-qubit CZ gate for arbitrary control and target.
   * Qubit 0 = MSB convention.
   */
  private buildCZUnitary(control: number, target: number): Matrix {
    const dim = 1 << this.numQubits;
    const controlBitPos = this.numQubits - 1 - control;
    const targetBitPos = this.numQubits - 1 - target;

    const matrix: Matrix = Array.from({ length: dim }, () =>
      Array.from({ length: dim }, () => new Complex(0, 0))
    );

    for (let i = 0; i < dim; i++) {
      const controlIsOne = (i >> controlBitPos) & 1;
      const targetIsOne = (i >> targetBitPos) & 1;
      matrix[i][i] = new Complex(controlIsOne && targetIsOne ? -1 : 1, 0);
    }

    return matrix;
  }

  /**
   * Build an n-qubit SWAP gate for arbitrary qubit pair.
   * Qubit 0 = MSB convention.
   */
  private buildSwapUnitary(firstQubit: number, secondQubit: number): Matrix {
    const dim = 1 << this.numQubits;
    const firstBitPos = this.numQubits - 1 - firstQubit;
    const secondBitPos = this.numQubits - 1 - secondQubit;

    const matrix: Matrix = Array.from({ length: dim }, () =>
      Array.from({ length: dim }, () => new Complex(0, 0))
    );

    for (let i = 0; i < dim; i++) {
      const firstBit = (i >> firstBitPos) & 1;
      const secondBit = (i >> secondBitPos) & 1;

      let j = i;
      if (firstBit !== secondBit) {
        j = i ^ (1 << firstBitPos) ^ (1 << secondBitPos);
      }
      matrix[j][i] = new Complex(1, 0);
    }

    return matrix;
  }

  /**
   * Run a sequence of operations
   */
  public run(operations: GateOperation[]) {
    // Reset state before run
    this.state = new QuantumState(this.numQubits);

    for (const op of operations) {
      if ((op.gateId === 'CNOT' || op.gateId === 'CZ' || op.gateId === 'SWAP') && op.controlQubit !== undefined) {
        const control = op.controlQubit;
        const target  = op.targetQubit;
        if (control === target || control < 0 || target < 0 || control >= this.numQubits || target >= this.numQubits) {
          console.warn(`${op.gateId}: invalid control=${control} target=${target} for numQubits=${this.numQubits}`);
          continue;
        }
        if (op.gateId === 'CNOT') {
          this.state.applyMatrix(this.buildCNOTUnitary(control, target));
        } else if (op.gateId === 'CZ') {
          this.state.applyMatrix(this.buildCZUnitary(control, target));
        } else {
          this.state.applyMatrix(this.buildSwapUnitary(control, target));
        }
      } else {
        // Single qubit gate
        const gateMatrix = Gates[op.gateId];
        if (!gateMatrix) throw new Error(`Gate ${op.gateId} not found`);
        const globalUnitary = this.buildSingleQubitUnitary(op.targetQubit, gateMatrix);
        this.state.applyMatrix(globalUnitary);
      }
    }
  }

  public getProbabilities(): number[] {
    return this.state.getProbabilities();
  }
}
