import { createEmptySystem } from "../core/state";
import { addComponent } from "../core/transitions";
import { applyProposedChange, ProposedChange } from "../engine/applyChange";

describe("AI stress attempts", () => {
  it("rejects 100 malicious proposals", () => {
    let system = createEmptySystem();
    system = addComponent(system, { id: "ui-root", kind: "ui" });
    system = addComponent(system, { id: "logic-core", kind: "logic" });

    const breakingMoves: ProposedChange[] = [
      current => ({
        ...current,
        components: [...current.components, current.components[0]],
        version: current.version + 1
      }),
      current => ({
        ...current,
        connections: [
          ...current.connections,
          { from: "missing-source", to: current.components[0].id }
        ],
        version: current.version + 1
      }),
      current => ({
        ...current,
        connections: [
          ...current.connections,
          { from: current.components[0].id, to: current.components[0].id }
        ],
        version: current.version + 1
      })
    ];

    for (let attempt = 0; attempt < 100; attempt += 1) {
      const move = breakingMoves[attempt % breakingMoves.length];
      expect(() => applyProposedChange(system, move)).toThrow();
    }
  });
});
