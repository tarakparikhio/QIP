import { createPointerEvents } from '@react-three/fiber';

/**
 * react-three-fiber's default pointer-event manager, with a null guard on connect().
 *
 * When a <Canvas> is unmounted during a fast re-render (for example, when the qubit
 * count changes and the Bloch cards re-render), fiber's concurrent root can still run
 * onCreated afterwards and call connect(null), which throws an uncaught TypeError.
 * The Bloch spheres do not rely on mesh pointer events (OrbitControls binds to the
 * canvas element), so skipping the connect call for a detached canvas is safe.
 */
export const safeCanvasEvents: typeof createPointerEvents = (store) => {
  const manager = createPointerEvents(store);
  const connect = manager.connect;
  return {
    ...manager,
    connect: (target: HTMLElement) => {
      if (target) connect?.(target);
    },
  };
};
