import { Complex, Matrix, Vector } from './math';

export class QuantumState {
  public amplitudes: Vector;
  public numQubits: number;

  constructor(numQubits: number, initialAmplitudes?: Vector) {
    this.numQubits = numQubits;
    const dim = Math.pow(2, numQubits);
    
    if (initialAmplitudes) {
      if (initialAmplitudes.length !== dim) {
        throw new Error(`State vector for ${numQubits} qubits must have length ${dim}`);
      }
      this.amplitudes = initialAmplitudes;
      this.normalize();
    } else {
      // Default to |0...0>
      this.amplitudes = Array(dim).fill(new Complex(0, 0));
      this.amplitudes[0] = new Complex(1, 0);
    }
  }

  normalize() {
    let sumSq = 0;
    for (const amp of this.amplitudes) {
      sumSq += amp.magsq();
    }
    const norm = Math.sqrt(sumSq);
    
    if (norm > 0) {
      this.amplitudes = this.amplitudes.map(amp => amp.scale(1 / norm));
    }
  }

  getProbabilities(): number[] {
    return this.amplitudes.map(amp => amp.magsq());
  }

  applyMatrix(matrix: Matrix) {
    if (matrix.length !== this.amplitudes.length) {
      throw new Error("Matrix dimension mismatch with quantum state");
    }
    
    const newAmplitudes: Vector = [];
    for (let r = 0; r < matrix.length; r++) {
      let sum = new Complex(0, 0);
      for (let c = 0; c < matrix[0].length; c++) {
        sum = sum.add(matrix[r][c].mul(this.amplitudes[c]));
      }
      newAmplitudes.push(sum);
    }
    this.amplitudes = newAmplitudes;
  }
}
