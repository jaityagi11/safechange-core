import { createEmptySystem } from "../core/state";
import { addComponent, removeComponent } from "../core/transitions";
import { renameComponent } from "../ui/src/engine/core/transitions";

test("system invariants always hold", () => {
  let s = createEmptySystem();

  s = addComponent(s, { id: "A", kind: "ui" });
  s = addComponent(s, { id: "B", kind: "logic" });
  s = renameComponent(s, "A", "X");
  s = removeComponent(s, "B");

  expect(s.components.length).toBe(1);
  expect(s.components[0].id).toBe("X");
});
