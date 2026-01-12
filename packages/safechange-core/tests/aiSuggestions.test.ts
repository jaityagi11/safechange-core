import { createEmptySystem } from "../core/state";
import { applyProposedChange } from "../engine/applyChange";
import { generateAISuggestions } from "../engine/aiSuggestions";

it("keeps AI suggestions within validated transitions", () => {
  const base = createEmptySystem();
  const suggestions = generateAISuggestions(base);

  expect(suggestions.length).toBeGreaterThan(0);

  for (const suggestion of suggestions) {
    expect(() => applyProposedChange(base, suggestion.apply)).not.toThrow();
  }
});
