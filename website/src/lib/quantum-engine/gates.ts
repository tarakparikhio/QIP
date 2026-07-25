import { Complex, Matrix } from './math';

const C = (re: number, im: number = 0) => new Complex(re, im);
const invSqrt2 = 1 / Math.sqrt(2);
const cosPiOver4 = Math.cos(Math.PI / 4);
const sinPiOver4 = Math.sin(Math.PI / 4);

export const Gates: Record<string, Matrix> = {
  // Identity
  I: [
    [C(1), C(0)],
    [C(0), C(1)]
  ],
  // Pauli-X (NOT)
  X: [
    [C(0), C(1)],
    [C(1), C(0)]
  ],
  // Pauli-Y
  Y: [
    [C(0), C(0, -1)],
    [C(0, 1), C(0)]
  ],
  // Pauli-Z
  Z: [
    [C(1), C(0)],
    [C(0), C(-1)]
  ],
  // Hadamard
  H: [
    [C(invSqrt2), C(invSqrt2)],
    [C(invSqrt2), C(-invSqrt2)]
  ],
  // S / Phase Gate
  S: [
    [C(1), C(0)],
    [C(0), C(0, 1)]
  ],
  // T Gate  (π/8 gate): [[1, 0], [0, e^(iπ/4)]] where e^(iπ/4) = (1+i)/√2
  T: [
    [C(1), C(0)],
    [C(0), C(invSqrt2, invSqrt2)]
  ],
  // RX(π/2)
  RX: [
    [C(cosPiOver4), C(0, -sinPiOver4)],
    [C(0, -sinPiOver4), C(cosPiOver4)]
  ],
  // RY(π/2)
  RY: [
    [C(cosPiOver4), C(-sinPiOver4)],
    [C(sinPiOver4), C(cosPiOver4)]
  ],
  // RZ(π/2)
  RZ: [
    [C(cosPiOver4, -sinPiOver4), C(0)],
    [C(0), C(cosPiOver4, sinPiOver4)]
  ]
};

// Common Multi-Qubit Gates
export const MultiGates: Record<string, Matrix> = {
  // CNOT (Control-0, Target-1)
  CNOT: [
    [C(1), C(0), C(0), C(0)],
    [C(0), C(1), C(0), C(0)],
    [C(0), C(0), C(0), C(1)],
    [C(0), C(0), C(1), C(0)]
  ],
  // Controlled-Z
  CZ: [
    [C(1), C(0), C(0), C(0)],
    [C(0), C(1), C(0), C(0)],
    [C(0), C(0), C(1), C(0)],
    [C(0), C(0), C(0), C(-1)]
  ],
  // SWAP
  SWAP: [
    [C(1), C(0), C(0), C(0)],
    [C(0), C(0), C(1), C(0)],
    [C(0), C(1), C(0), C(0)],
    [C(0), C(0), C(0), C(1)]
  ]
};
