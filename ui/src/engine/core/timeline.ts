import { SystemState } from "./state.ts";

export type Timeline = {
  past: SystemState[];
  present: SystemState;
  future: SystemState[];
};

export function createTimeline(initial: SystemState): Timeline {
  return {
    past: [],
    present: initial,
    future: []
  };
}

export function applyChange(
  timeline: Timeline,
  newState: SystemState
): Timeline {
  return {
    past: [...timeline.past, timeline.present],
    present: newState,
    future: []
  };
}

export function undo(timeline: Timeline): Timeline {
  if (timeline.past.length === 0) return timeline;

  const previous = timeline.past[timeline.past.length - 1];
  const past = timeline.past.slice(0, -1);

  return {
    past,
    present: previous,
    future: [timeline.present, ...timeline.future]
  };
}

export function redo(timeline: Timeline): Timeline {
  if (timeline.future.length === 0) return timeline;

  const next = timeline.future[0];
  const future = timeline.future.slice(1);

  return {
    past: [...timeline.past, timeline.present],
    present: next,
    future
  };
}
