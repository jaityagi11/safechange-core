import { SystemState } from "./state.ts";

export function validateSystem(state: SystemState) {
  const ids = state.components.map(c => c.id);

  // Rule 1: No duplicate components
  if (new Set(ids).size !== ids.length) {
    throw new Error("Duplicate component IDs are not allowed");
  }

  // Rule 2: All connections must point to real components
  for (const conn of state.connections) {
    if (!ids.includes(conn.from) || !ids.includes(conn.to)) {
      throw new Error("Connection refers to missing component");
    }
  }

  // Rule 3: No component can connect to itself
  for (const conn of state.connections) {
    if (conn.from === conn.to) {
      throw new Error("A component cannot connect to itself");
    }
  }
}
