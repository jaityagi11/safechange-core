import { SystemState } from "../core/state.ts";
import { addComponent, removeComponent } from "../core/transitions.ts";
import { ProposedChange } from "./applyChange.ts";

type ComponentKind = "ui" | "logic" | "data";

export type AISuggestion = {
  id: string;
  title: string;
  description: string;
  apply: ProposedChange;
};

export function generateAISuggestions(state: SystemState): AISuggestion[] {
  const suggestions: AISuggestion[] = [];

  suggestions.push(...suggestAddMissingKinds(state));
  suggestions.push(...suggestRemovingOrphans(state));

  return suggestions;
}

function suggestAddMissingKinds(state: SystemState): AISuggestion[] {
  const presentKinds = new Set(state.components.map(component => component.kind));
  const targetKinds: Array<{ kind: ComponentKind; title: string; description: string; prefix: string }> = [
    {
      kind: "data",
      title: "Add data source",
      description: "Introduce a data component so other parts of the system have something to consume.",
      prefix: "data"
    },
    {
      kind: "logic",
      title: "Add logic unit",
      description: "Add a logic component to process inputs from UI or data nodes.",
      prefix: "logic"
    }
  ];

  return targetKinds
    .filter(target => !presentKinds.has(target.kind))
    .map(target => ({
      id: `add-${target.kind}`,
      title: target.title,
      description: target.description,
      apply: current =>
        addComponent(current, {
          id: createComponentId(current, target.prefix),
          kind: target.kind
        })
    }));
}

function suggestRemovingOrphans(state: SystemState): AISuggestion[] {
  const orphanIds = state.components
    .filter(component => !isComponentConnected(state, component.id))
    .map(component => component.id);

  return orphanIds.map(orphanId => ({
    id: `remove-orphan-${orphanId}`,
    title: `Remove unused ${orphanId}`,
    description: "Remove a component that is not connected to anything else.",
    apply: current => {
      if (isComponentConnected(current, orphanId)) {
        return current;
      }

      const exists = current.components.some(component => component.id === orphanId);
      return exists ? removeComponent(current, orphanId) : current;
    }
  }));
}

function isComponentConnected(state: SystemState, id: string): boolean {
  return state.connections.some(connection => connection.from === id || connection.to === id);
}

function createComponentId(state: SystemState, prefix: string): string {
  const existing = new Set(state.components.map(component => component.id));
  let counter = 1;
  let candidate = `${prefix}-${counter}`;

  while (existing.has(candidate)) {
    counter += 1;
    candidate = `${prefix}-${counter}`;
  }

  return candidate;
}
