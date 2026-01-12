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
