import { Lesson1QubitVisualizer } from "./qubit-visualizer";
import { Lesson2SuperpositionExplorer } from "./superposition-explorer";
import { MeasurementBasic } from "./measurement-basic";
import { MeasurementDeep } from "./measurement-deep";
import { Lesson4EntanglementVisualizer } from "./entanglement-visualizer";
import { Lesson5InterferenceVisualizer } from "./interference-visualizer";
import { Lesson6GateSelector } from "./gate-selector";
import { Lesson7RotationController } from "./rotation-controller";
import { Lesson8BlochSphereInteractive } from "./bloch-sphere-interactive";
import { ProductStateBuilder } from "./product-state-builder";
import { EntanglementBuilder } from "./entanglement-builder";
import { Lesson10TensorProductExplainer } from "./tensor-product-explainer";
import { Lesson11DecoherenceSimulator } from "./decoherence-simulator";
import { Lesson12NoiseChannelSimulator } from "./noise-channel-simulator";
import { Lesson13ChannelVisualizer } from "./channel-visualizer";
import { Lesson14HamiltonianSimulator } from "./hamiltonian-simulator";
import { TrotterSimulator } from "./trotter-simulator";
import { Lesson15EigenstateAnalyzer } from "./eigenstate-finder";
import { CommutatorCalculator } from "./commutator-calculator";
import { UnitaryEvolutionExplorer } from "./unitary-evolution-explorer";
import { BraKetNotationVisualizer } from "./braket-notation-visualizer";
import { VectorSpaceExplorer } from "./vector-space-explorer";
import { OperatorMatrixExplorer } from "./operator-matrix-explorer";
import { UniversalGateDecomposer } from "./universal-gate-decomposer";
import { ControlledGateVisualizer } from "./controlled-gate-visualizer";

// Batch 4 Widgets - Advanced Algorithms and Protocols
import { QuantumFourierTransformDemo } from "./quantum-fourier-transform-demo";
import { GroversAlgorithmDemo } from "./grovers-algorithm-demo";
import { QuantumParallelismDemo } from "./quantum-parallelism-demo";
import { QuantumPhaseDemo } from "./quantum-phase-demo";
import { QuantumErrorCorrectionDemo } from "./quantum-error-correction-demo";
import { QuantumTeleportationDemo } from "./quantum-teleportation-demo";
import { QFTCircuitImplementationDemo } from "./qft-circuit-implementation-demo";
import { PhaseEstimationDemo } from "./phase-estimation-demo";
import { VQEDemo } from "./vqe-demo";
import { QAOADemo } from "./qaoa-demo";
import { QuantumAnnealingDemo } from "./quantum-annealing-demo";
import { AdiabaticComputationDemo } from "./adiabatic-computation-demo";
import { PhaseKickbackDemo } from "./phase-kickback-demo";

import type React from "react";

export {
  Lesson1QubitVisualizer,
  Lesson2SuperpositionExplorer,
  MeasurementBasic,
  MeasurementDeep,
  Lesson4EntanglementVisualizer,
  Lesson5InterferenceVisualizer,
  Lesson6GateSelector,
  Lesson7RotationController,
  Lesson8BlochSphereInteractive,
  ProductStateBuilder,
  EntanglementBuilder,
  Lesson10TensorProductExplainer,
  Lesson11DecoherenceSimulator,
  Lesson12NoiseChannelSimulator,
  Lesson13ChannelVisualizer,
  Lesson14HamiltonianSimulator,
  TrotterSimulator,
  Lesson15EigenstateAnalyzer,
  CommutatorCalculator,
  UnitaryEvolutionExplorer,
  BraKetNotationVisualizer,
  VectorSpaceExplorer,
  OperatorMatrixExplorer,
  UniversalGateDecomposer,
  ControlledGateVisualizer,
  // Batch 4 Advanced Widgets
  QuantumFourierTransformDemo,
  GroversAlgorithmDemo,
  QuantumParallelismDemo,
  QuantumPhaseDemo,
  QuantumErrorCorrectionDemo,
  QuantumTeleportationDemo,
  QFTCircuitImplementationDemo,
  // Batch 5 Advanced Algorithms Widgets
  PhaseEstimationDemo,
  VQEDemo,
  QAOADemo,
  QuantumAnnealingDemo,
  AdiabaticComputationDemo,
  PhaseKickbackDemo,
};

export const lessonWidgets: Record<number, React.ComponentType> = {
  1: Lesson1QubitVisualizer,
  2: Lesson2SuperpositionExplorer,
  3: MeasurementBasic,
  4: Lesson4EntanglementVisualizer,
  5: Lesson5InterferenceVisualizer,
  6: Lesson6GateSelector,
  7: Lesson7RotationController,
  8: Lesson8BlochSphereInteractive,
  9: ProductStateBuilder,
  10: Lesson10TensorProductExplainer,
  11: Lesson11DecoherenceSimulator,
  12: Lesson12NoiseChannelSimulator,
  13: Lesson13ChannelVisualizer,
  14: Lesson14HamiltonianSimulator,
  15: Lesson15EigenstateAnalyzer,
  16: CommutatorCalculator,
  17: UnitaryEvolutionExplorer,
  18: BraKetNotationVisualizer,
  19: VectorSpaceExplorer,
  20: OperatorMatrixExplorer,
  21: Lesson7RotationController,
  22: ControlledGateVisualizer,
  23: EntanglementBuilder,
  24: UniversalGateDecomposer,
  25: MeasurementDeep,
  26: QuantumFourierTransformDemo,
  27: QFTCircuitImplementationDemo,
  28: PhaseEstimationDemo,
  29: TrotterSimulator,
  30: VQEDemo,
  31: QAOADemo,
  32: QuantumAnnealingDemo,
  33: AdiabaticComputationDemo,
  34: PhaseKickbackDemo,
  35: QuantumPhaseDemo,
};

export function getLessonWidget(lessonId: number) {
  return lessonWidgets[lessonId] ?? null;
}
