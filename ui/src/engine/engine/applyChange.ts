import { SystemState } from "../core/state.ts";
import { validateSystem } from "../core/constraints.ts";

export type ProposedChange = (state: SystemState) => SystemState;

export function applyProposedChange(
  state: SystemState,
  change: ProposedChange
): SystemState {
  const proposed = change(state);

  // Gatekeeper checks
  validateSystem(proposed);

  return proposed;
}
