#!/usr/bin/env node

/**
 * Audit Script: Check Widget Coverage for All Lessons
 * Verifies that each lesson (1-35) has an appropriate widget assigned
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read lessons data
const lessonsPath = path.join(__dirname, "../data/lessons.json");
const lessonsData = JSON.parse(fs.readFileSync(lessonsPath, "utf-8"));

// Read widget index
const indexPath = path.join(__dirname, "../components/lesson-widgets/index.ts");
const indexContent = fs.readFileSync(indexPath, "utf-8");

// Extract widget mappings from index.ts
const widgetMappingMatch = indexContent.match(/export const lessonWidgets:.*?\{([\s\S]*?)\};/);
const widgetMapping = {};

if (widgetMappingMatch) {
  const mappingContent = widgetMappingMatch[1];
  const lines = mappingContent.split("\n");
  lines.forEach((line) => {
    const match = line.match(/(\d+):\s*(\w+),/);
    if (match) {
      widgetMapping[parseInt(match[1])] = match[2];
    }
  });
}

console.log("\n================================================================");
console.log("LESSON WIDGET AUDIT - BATCHES 1-5 (Lessons 1-35)");
console.log("================================================================\n");

// Categories
const categories = {
  foundation: [],
  intermediate: [],
  advanced: [],
};

// Widget appropriateness guide
const widgetGuide = {
  1: "Lesson1QubitVisualizer - Bloch sphere for single qubit",
  2: "Lesson2SuperpositionExplorer - Visual superposition",
  3: "Lesson3MeasurementCollapse - Collapse visualization",
  4: "Lesson4EntanglementVisualizer - Bell states & entanglement",
  5: "Lesson5InterferenceVisualizer - Interference patterns",
  6: "Lesson6GateSelector - Interactive gate selection",
  7: "Lesson7RotationController - Rx/Ry/Rz rotations",
  8: "Lesson8BlochSphereInteractive - Interactive Bloch",
  9: "Lesson9MultiQubitConstructor - Multi-qubit states",
  10: "Lesson10TensorProductExplainer - Tensor products",
  11: "Lesson11DecoherenceSimulator - Decoherence dynamics",
  12: "Lesson12NoiseChannelSimulator - Noise channels",
  13: "Lesson13ChannelVisualizer - Channel visualization",
  14: "Lesson14HamiltonianSimulator - Hamiltonian evolution",
  15: "Lesson15EigenstateAnalyzer - Eigenstate analysis",
  16: "CommutatorCalculator - Commutator relationships",
  17: "UnitaryEvolutionExplorer - Time evolution",
  18: "BraKetNotationVisualizer - Dirac notation",
  19: "VectorSpaceExplorer - Vector space operations",
  20: "OperatorMatrixExplorer - Operator matrices",
  21: "Lesson7RotationController - Single-qubit rotations",
  22: "ControlledGateVisualizer - CNOT, CZ, Toffoli",
  23: "Lesson9MultiQubitConstructor - Multi-qubit gates",
  24: "OperatorMatrixExplorer - Gate matrices & universality",
  25: "Lesson3MeasurementCollapse - Measurement in basis",
  26: "QuantumFourierTransformDemo - QFT transform intuition",
  27: "QFTCircuitImplementationDemo - QFT decomposition circuit",
  28: "PhaseEstimationDemo - Binary phase extraction",
  29: "Lesson14HamiltonianSimulator - Time-evolution simulation",
  30: "VQEDemo - Hybrid variational optimization",
  31: "QAOADemo - Alternating cost/mixer layers",
  32: "QuantumAnnealingDemo - Annealing schedule interpolation",
  33: "AdiabaticComputationDemo - Gap-dependent adiabatic condition",
  34: "PhaseKickbackDemo - Controlled-U phase transfer",
  35: "QuantumPhaseDemo - Advanced phase/interference view",
};

// Analyze each lesson
console.log("📋 LESSON COVERAGE ANALYSIS:\n");

let coverageCount = 0;
let missingCount = 0;
let mismatchCount = 0;

lessonsData.slice(0, 35).forEach((lesson) => {
  const lessonId = lesson.lesson_id;
  const hasWidget = lessonId in widgetMapping;
  const widget = widgetMapping[lessonId] || "❌ MISSING";
  const stage = lesson.learning_order.stage || "UNKNOWN";
  const title = lesson.title;

  // Categorize
  if (!categories[stage]) {
    categories[stage] = [];
  }
  categories[stage].push({
    id: lessonId,
    title,
    widget,
    hasWidget,
  });

  if (hasWidget) {
    coverageCount++;
    const recommended = widgetGuide[lessonId] || "";
    const expectedWidget = recommended.split(" - ")[0];
    const isCorrect = expectedWidget ? expectedWidget === widget : true;
    if (!isCorrect) {
      mismatchCount++;
    }
    const status = isCorrect ? "✅" : "⚠️";
    console.log(
      `${status} Lesson ${lessonId.toString().padStart(2)} | ${title.padEnd(50)} | ${widget}`
    );
  } else {
    missingCount++;
    console.log(
      `❌ Lesson ${lessonId.toString().padStart(2)} | ${title.padEnd(50)} | MISSING WIDGET`
    );
  }
});

// Summary by stage
console.log("\n\n📊 COVERAGE BY STAGE:\n");

Object.entries(categories).forEach(([stage, lessons]) => {
  if (lessons.length > 0) {
    const covered = lessons.filter((l) => l.hasWidget).length;
    const percentage = ((covered / lessons.length) * 100).toFixed(0);
    console.log(`${stage.toUpperCase().padEnd(15)} : ${covered}/${lessons.length} (${percentage}%)`);
  }
});

// Overall statistics
console.log("\n\n📈 OVERALL STATISTICS:\n");
console.log(`Total Lessons (1-35):        ${lessonsData.slice(0, 35).length}`);
console.log(`Lessons with Widgets:        ${coverageCount}`);
console.log(`Lessons Missing Widgets:     ${missingCount}`);
console.log(`Concept Mismatches:          ${mismatchCount}`);
console.log(`Coverage:                    ${((coverageCount / 35) * 100).toFixed(1)}%`);

// Widget recommendations for missing ones
if (missingCount > 0) {
  console.log("\n\n💡 RECOMMENDED WIDGETS FOR MISSING LESSONS:\n");
  lessonsData.slice(0, 35).forEach((lesson) => {
    const lessonId = lesson.lesson_id;
    if (!(lessonId in widgetMapping)) {
      const recommended = widgetGuide[lessonId] || "No specific recommendation";
      console.log(`Lesson ${lessonId}: ${recommended}`);
    }
  });
}

// Audit Results
console.log("\n\n✨ AUDIT RESULTS:\n");
if (coverageCount === 35 && missingCount === 0 && mismatchCount === 0) {
  console.log("✅ ALL LESSONS HAVE WIDGETS ASSIGNED!");
  console.log("✅ ALL LESSONS HAVE CONCEPTUALLY MATCHED WIDGETS.\n");
} else {
  console.log(`⚠️  Missing widgets: ${missingCount}`);
  console.log(`⚠️  Concept mismatches: ${mismatchCount}`);
  console.log("Please add or correct mappings before release.\n");
}

console.log("----------------------------------------------------------------\n");
