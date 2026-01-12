import { createEmptySystem } from "../core/state";
import { addComponent, removeComponent } from "../core/transitions";
import { applyProposedChange } from "../engine/applyChange";

test("system cannot be broken", () => {
  let system = createEmptySystem();

  // Add two components
  system = addComponent(system, { id: "A", kind: "ui" });
  system = addComponent(system, { id: "B", kind: "logic" });

  // Try to break with AI
  expect(() => {
    applyProposedChange(system, () => ({
      components: [],
      connections: [{ from: "A", to: "A" }],
      version: 99
    }));
  }).toThrow();

  // Remove a core part
  system = removeComponent(system, "B");

  // System should still be valid
  expect(system.components.length).toBe(1);
});
