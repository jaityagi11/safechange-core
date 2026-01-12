import { SystemState } from "../core/state";
import { validateSystem } from "../core/constraints";

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
