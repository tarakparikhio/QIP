export class Complex {
  constructor(public re: number, public im: number) {}

  add(other: Complex): Complex {
    return new Complex(this.re + other.re, this.im + other.im);
  }

  sub(other: Complex): Complex {
    return new Complex(this.re - other.re, this.im - other.im);
  }

  mul(other: Complex): Complex {
    return new Complex(
      this.re * other.re - this.im * other.im,
      this.re * other.im + this.im * other.re
    );
  }

  magsq(): number {
    return this.re * this.re + this.im * this.im;
  }

  mag(): number {
    return Math.sqrt(this.magsq());
  }

  conj(): Complex {
    return new Complex(this.re, -this.im);
  }

  scale(scalar: number): Complex {
    return new Complex(this.re * scalar, this.im * scalar);
  }

  toString(): string {
    const sign = this.im < 0 ? "-" : "+";
    return `${this.re.toFixed(4)} ${sign} ${Math.abs(this.im).toFixed(4)}i`;
  }
}

export type Vector = Complex[];
export type Matrix = Complex[][];

/**
 * Tensor product (Kronecker product) of two matrices
 */
export function tensorProductMatrix(A: Matrix, B: Matrix): Matrix {
  const rowsA = A.length;
  const colsA = A[0].length;
  const rowsB = B.length;
  const colsB = B[0].length;

  const result: Matrix = Array(rowsA * rowsB).fill(0).map(() => Array(colsA * colsB).fill(new Complex(0, 0)));

  for (let rA = 0; rA < rowsA; rA++) {
    for (let cA = 0; cA < colsA; cA++) {
      for (let rB = 0; rB < rowsB; rB++) {
        for (let cB = 0; cB < colsB; cB++) {
          result[rA * rowsB + rB][cA * colsB + cB] = A[rA][cA].mul(B[rB][cB]);
        }
      }
    }
  }

  return result;
}

/**
 * Matrix-Vector multiplication
 */
export function multiplyMatrixVector(M: Matrix, V: Vector): Vector {
  const rows = M.length;
  const cols = M[0].length;
  if (cols !== V.length) throw new Error("Matrix dimensions do not match vector length");

  const result: Vector = [];
  for (let r = 0; r < rows; r++) {
    let sum = new Complex(0, 0);
    for (let c = 0; c < cols; c++) {
      sum = sum.add(M[r][c].mul(V[c]));
    }
    result.push(sum);
  }
  return result;
}

export interface BlochVector {
  x: number;
  y: number;
  z: number;
  /** Length of the Bloch vector. 1 = pure state, <1 = mixed (entangled) qubit. */
  purity: number;
}

/**
 * Compute the Bloch vector for each qubit via partial trace (reduced density matrix).
 *
 * Convention: qubit 0 is the most-significant bit in the state index.
 * Bloch vector: x = Tr(σ_x ρ_q), y = Tr(σ_y ρ_q), z = Tr(σ_z ρ_q)
 *   x = 2 Re(ρ_q[0][1])
 *   y = −2 Im(ρ_q[0][1])
 *   z = ρ_q[0][0] − ρ_q[1][1]
 */
export function computeQubitBlochVectors(amplitudes: Complex[], numQubits: number): BlochVector[] {
  const dim = 1 << numQubits;
  const result: BlochVector[] = [];

  for (let q = 0; q < numQubits; q++) {
    const bitPos = numQubits - 1 - q; // qubit 0 = MSB

    let rho00 = 0;
    let rho11 = 0;
    let rho01Re = 0;
    let rho01Im = 0;

    for (let i = 0; i < dim; i++) {
      const qubitVal = (i >> bitPos) & 1;
      const amp_i = amplitudes[i];

      if (qubitVal === 0) {
        rho00 += amp_i.re * amp_i.re + amp_i.im * amp_i.im;
        const j = i | (1 << bitPos);
        const amp_j = amplitudes[j];
        // ρ_q[0][1] += ψ_i · conj(ψ_j)
        rho01Re += amp_i.re * amp_j.re + amp_i.im * amp_j.im;
        rho01Im += amp_i.im * amp_j.re - amp_i.re * amp_j.im;
      } else {
        rho11 += amp_i.re * amp_i.re + amp_i.im * amp_i.im;
      }
    }

    const x = 2 * rho01Re;
    const y = -2 * rho01Im;
    const z = rho00 - rho11;
    const purity = Math.sqrt(x * x + y * y + z * z);

    result.push({ x, y, z, purity });
  }

  return result;
}
