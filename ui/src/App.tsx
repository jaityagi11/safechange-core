import { exportSystem, importSystem } from "../packages/safechange-core/core/state";
import { useCallback, useMemo, useState } from "react";
import ReactFlow, { Background, Controls, type Connection } from "reactflow";
import "reactflow/dist/style.css";

import { createEmptySystem } from "./engine/core/state.ts";
import {
  addComponent,
  removeComponent,
  renameComponent
} from "./engine/core/transitions.ts";
import {
  createTimeline,
  applyChange,
  undo,
  redo
} from "./engine/core/timeline.ts";
import { applyProposedChange } from "./engine/engine/applyChange.ts";
import { generateAISuggestions } from "./engine/engine/aiSuggestions.ts";

export default function App() {
  const [timeline, setTimeline] = useState(() =>
    createTimeline(createEmptySystem())
  );

  const system = timeline.present;

  const commitState = useCallback((producer: (current: typeof system) => typeof system) => {
    setTimeline(previous => applyChange(previous, producer(previous.present)));
  }, []);

  const suggestions = useMemo(() => generateAISuggestions(system), [system]);

  const nodes = useMemo(
    () =>
      system.components.map((component, index) => ({
        id: component.id,
        data: { label: component.id },
        position: { x: index * 150, y: 100 }
      })),
    [system.components]
  );

  const edges = useMemo(
    () =>
      system.connections.map(connection => ({
        id: `${connection.from}-${connection.to}`,
        source: connection.from,
        target: connection.to
      })),
    [system.connections]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      setTimeline(previous => {
        const exists = previous.present.connections.some(
          edge => edge.from === connection.source && edge.to === connection.target
        );
        if (exists || !connection.source || !connection.target) {
          return previous;
        }

        const next = applyProposedChange(previous.present, current => ({
          ...current,
          connections: [
            ...current.connections,
            { from: connection.source as string, to: connection.target as string }
          ],
          version: current.version + 1
        }));

        return applyChange(previous, next);
      });
    },
    []
  );

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>SafeChange</h1>

      <p style={{ maxWidth: 600, fontSize: 16 }}>
        SafeChange is the world’s first <strong>unbreakable software engine</strong>.
        You can add, delete, rename, connect, undo, redo, and even let AI restructure
        your system — and it will never enter an invalid state.
      </p>
      <p>Click around. Try to break it. Even AI can’t.</p>

      <button
        onClick={() =>
          commitState(current =>
            addComponent(current, {
              id: Date.now().toString(),
              kind: "ui"
            })
          )
        }
      >
        Add Component
      </button>

      <div style={{ marginTop: 10 }}>
        <button onClick={() => setTimeline(previous => undo(previous))}>Undo</button>
        <button onClick={() => setTimeline(previous => redo(previous))}>Redo</button>
      </div>

      <button
  style={{ marginTop: 20, background: "red", color: "white" }}
  onClick={() => {
    try {
      const brokenProposal = () => ({
        components: [],
        connections: [{ from: "X", to: "X" }],
        version: system.version + 999
      });

      // This either returns a valid state or throws.
      const safe = applyProposedChange(system, brokenProposal);

      // Only commit if it was valid
      setTimeline(previous => applyChange(previous, safe));
    } catch {
      alert("AI tried to break the system — blocked!");
    }
  }}
>
  🤖 Try to Break Me
</button>

<button onClick={() => {
  const data = exportSystem(system);
  navigator.clipboard.writeText(data);
  alert("System copied!");
}}>
  Copy System
</button>

<button onClick={() => {
  const json = prompt("Paste system:");
  if (!json) return;
  const loaded = importSystem(json);
  setTimeline(createTimeline(loaded));
}}>
  Load System
</button>

      <div style={{ height: 300, marginTop: 20, border: "1px solid #ccccccff" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          nodesDraggable
          onConnect={onConnect}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>

      <p style={{ maxWidth: 600, color: "#555" }}>
        These AI suggestions are not free-form code. Each one is a
        <strong> safe state transition</strong> that must pass the same
        validation rules as everything else.
      </p>

      <section style={{ marginTop: 20 }}>
        <h3>AI Suggestions</h3>
        {suggestions.length === 0 ? (
          <p>No suggestions right now.</p>
        ) : (
          <ul>
            {suggestions.map(suggestion => (
              <li key={suggestion.id} style={{ marginBottom: 10 }}>
                <strong>{suggestion.title}</strong>
                <div style={{ margin: "4px 0" }}>{suggestion.description}</div>
                <button
                  onClick={() =>
                    setTimeline(previous => {
                      const safe = applyProposedChange(previous.present, suggestion.apply);
                      return applyChange(previous, safe);
                    })
                  }
                >
                  Apply Suggestion
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <ul style={{ marginTop: 20 }}>
        {system.components.map(c => {
          const componentId = c.id;

          return (
            <li key={componentId}>
              <input
                value={componentId}
                onChange={e => {
                  const nextId = e.target.value;
                  commitState(current => renameComponent(current, componentId, nextId));
                }}
              />
              <button
                style={{ marginLeft: 10 }}
                onClick={() =>
                  commitState(current => removeComponent(current, componentId))
                }
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
