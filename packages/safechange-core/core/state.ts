export type Component = {
  id: string;
  kind: "ui" | "logic" | "data";
};

export type Connection = {
  from: string;
  to: string;
};

export type SystemState = {
  components: Component[];
  connections: Connection[];
  version: number;
};

export function createEmptySystem(): SystemState {
  return {
    components: [],
    connections: [],
    version: 0
  };
}
import { validateSystem } from "./constraints";

export function exportSystem(state: SystemState): string {
  return JSON.stringify(state);
}

export function importSystem(json: string): SystemState {
  const parsed = JSON.parse(json);
  validateSystem(parsed);
  return parsed;
}
