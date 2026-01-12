import { SystemState, Component } from "./state.ts";
import { validateSystem } from "./constraints.ts";

export function addComponent(
  state: SystemState,
  component: Component
): SystemState {
  const newState: SystemState = {
    components: [...state.components, component],
    connections: [...state.connections],
    version: state.version + 1
  };

  validateSystem(newState);
  return newState;
}

export function removeComponent(
  state: SystemState,
  componentId: string
): SystemState {
  const components = state.components.filter(c => c.id !== componentId);

  const connections = state.connections.filter(
    c => c.from !== componentId && c.to !== componentId
  );

  const newState: SystemState = {
    components,
    connections,
    version: state.version + 1
  };

  validateSystem(newState);
  return newState;
}
export function renameComponent(
  state: SystemState,
  id: string,
  newId: string
): SystemState {
  const components = state.components.map(c =>
    c.id === id ? { ...c, id: newId } : c
  );

  const connections = state.connections.map(conn => ({
    from: conn.from === id ? newId : conn.from,
    to: conn.to === id ? newId : conn.to
  }));

  const newState: SystemState = {
    components,
    connections,
    version: state.version + 1
  };

  validateSystem(newState);
  return newState;
}
