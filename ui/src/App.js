"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var reactflow_1 = __importStar(require("reactflow"));
require("reactflow/dist/style.css");
var state_1 = require("./engine/core/state");
var transitions_1 = require("./engine/core/transitions");
var timeline_1 = require("./engine/core/timeline");
var applyChange_1 = require("./engine/engine/applyChange");
var aiSuggestions_1 = require("./engine/engine/aiSuggestions");
function App() {
    var _a = (0, react_1.useState)(function () {
        return (0, timeline_1.createTimeline)((0, state_1.createEmptySystem)());
    }), timeline = _a[0], setTimeline = _a[1];
    var system = timeline.present;
    var commitState = (0, react_1.useCallback)(function (producer) {
        setTimeline(function (previous) { return (0, timeline_1.applyChange)(previous, producer(previous.present)); });
    }, []);
    var suggestions = (0, react_1.useMemo)(function () { return (0, aiSuggestions_1.generateAISuggestions)(system); }, [system]);
    var nodes = (0, react_1.useMemo)(function () {
        return system.components.map(function (component, index) { return ({
            id: component.id,
            data: { label: component.id },
            position: { x: index * 150, y: 100 }
        }); });
    }, [system.components]);
    var edges = (0, react_1.useMemo)(function () {
        return system.connections.map(function (connection) { return ({
            id: "".concat(connection.from, "-").concat(connection.to),
            source: connection.from,
            target: connection.to
        }); });
    }, [system.connections]);
    var onConnect = (0, react_1.useCallback)(function (connection) {
        setTimeline(function (previous) {
            var exists = previous.present.connections.some(function (edge) { return edge.from === connection.source && edge.to === connection.target; });
            if (exists || !connection.source || !connection.target) {
                return previous;
            }
            var next = (0, applyChange_1.applyProposedChange)(previous.present, function (current) { return (__assign(__assign({}, current), { connections: __spreadArray(__spreadArray([], current.connections, true), [
                    { from: connection.source, to: connection.target }
                ], false), version: current.version + 1 })); });
            return (0, timeline_1.applyChange)(previous, next);
        });
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { style: { padding: 20, fontFamily: "sans-serif" }, children: [(0, jsx_runtime_1.jsx)("h1", { children: "SafeChange" }), (0, jsx_runtime_1.jsxs)("p", { style: { maxWidth: 600, fontSize: 16 }, children: ["SafeChange is the world\u2019s first ", (0, jsx_runtime_1.jsx)("strong", { children: "unbreakable software engine" }), ". You can add, delete, rename, connect, undo, redo, and even let AI restructure your system \u2014 and it will never enter an invalid state."] }), (0, jsx_runtime_1.jsx)("p", { children: "Click around. Try to break it. Even AI can\u2019t." }), (0, jsx_runtime_1.jsx)("button", { onClick: function () {
                    return commitState(function (current) {
                        return (0, transitions_1.addComponent)(current, {
                            id: Date.now().toString(),
                            kind: "ui"
                        });
                    });
                }, children: "Add Component" }), (0, jsx_runtime_1.jsxs)("div", { style: { marginTop: 10 }, children: [(0, jsx_runtime_1.jsx)("button", { onClick: function () { return setTimeline(function (previous) { return (0, timeline_1.undo)(previous); }); }, children: "Undo" }), (0, jsx_runtime_1.jsx)("button", { onClick: function () { return setTimeline(function (previous) { return (0, timeline_1.redo)(previous); }); }, children: "Redo" })] }), (0, jsx_runtime_1.jsx)("button", { style: { marginTop: 20, background: "red", color: "white" }, onClick: function () {
                    try {
                        var broken_1 = {
                            components: [],
                            connections: [{ from: "X", to: "X" }],
                            version: 999
                        };
                        setTimeline(function (previous) {
                            var safe = (0, applyChange_1.applyProposedChange)(previous.present, function () { return broken_1; });
                            return (0, timeline_1.applyChange)(previous, safe);
                        });
                    }
                    catch (_a) {
                        alert("AI tried to break the system — blocked!");
                    }
                }, children: "\uD83E\uDD16 Try to Break Me" }), (0, jsx_runtime_1.jsx)("div", { style: { height: 300, marginTop: 20, border: "1px solid #ccccccff" }, children: (0, jsx_runtime_1.jsxs)(reactflow_1.default, { nodes: nodes, edges: edges, fitView: true, nodesDraggable: true, onConnect: onConnect, children: [(0, jsx_runtime_1.jsx)(reactflow_1.Background, {}), (0, jsx_runtime_1.jsx)(reactflow_1.Controls, {})] }) }), (0, jsx_runtime_1.jsxs)("p", { style: { maxWidth: 600, color: "#555" }, children: ["These AI suggestions are not free-form code. Each one is a", (0, jsx_runtime_1.jsx)("strong", { children: " safe state transition" }), " that must pass the same validation rules as everything else."] }), (0, jsx_runtime_1.jsxs)("section", { style: { marginTop: 20 }, children: [(0, jsx_runtime_1.jsx)("h3", { children: "AI Suggestions" }), suggestions.length === 0 ? ((0, jsx_runtime_1.jsx)("p", { children: "No suggestions right now." })) : ((0, jsx_runtime_1.jsx)("ul", { children: suggestions.map(function (suggestion) { return ((0, jsx_runtime_1.jsxs)("li", { style: { marginBottom: 10 }, children: [(0, jsx_runtime_1.jsx)("strong", { children: suggestion.title }), (0, jsx_runtime_1.jsx)("div", { style: { margin: "4px 0" }, children: suggestion.description }), (0, jsx_runtime_1.jsx)("button", { onClick: function () {
                                        return setTimeline(function (previous) {
                                            var safe = (0, applyChange_1.applyProposedChange)(previous.present, suggestion.apply);
                                            return (0, timeline_1.applyChange)(previous, safe);
                                        });
                                    }, children: "Apply Suggestion" })] }, suggestion.id)); }) }))] }), (0, jsx_runtime_1.jsx)("ul", { style: { marginTop: 20 }, children: system.components.map(function (c) {
                    var componentId = c.id;
                    return ((0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)("input", { value: componentId, onChange: function (e) {
                                    var nextId = e.target.value;
                                    commitState(function (current) { return (0, transitions_1.renameComponent)(current, componentId, nextId); });
                                } }), (0, jsx_runtime_1.jsx)("button", { style: { marginLeft: 10 }, onClick: function () {
                                    return commitState(function (current) { return (0, transitions_1.removeComponent)(current, componentId); });
                                }, children: "Delete" })] }, componentId));
                }) })] }));
}
