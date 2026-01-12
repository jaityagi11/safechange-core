import { SystemState, Component } from "./state";
import { validateSystem } from "./constraints";

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
