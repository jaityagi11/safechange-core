"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAISuggestions = generateAISuggestions;
var transitions_1 = require("../core/transitions");
function generateAISuggestions(state) {
    var suggestions = [];
    suggestions.push.apply(suggestions, suggestAddMissingKinds(state));
    suggestions.push.apply(suggestions, suggestRemovingOrphans(state));
    return suggestions;
}
function suggestAddMissingKinds(state) {
    var presentKinds = new Set(state.components.map(function (component) { return component.kind; }));
    var targetKinds = [
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
        .filter(function (target) { return !presentKinds.has(target.kind); })
        .map(function (target) { return ({
        id: "add-".concat(target.kind),
        title: target.title,
        description: target.description,
        apply: function (current) {
            return (0, transitions_1.addComponent)(current, {
                id: createComponentId(current, target.prefix),
                kind: target.kind
            });
        }
    }); });
}
function suggestRemovingOrphans(state) {
    var orphanIds = state.components
        .filter(function (component) { return !isComponentConnected(state, component.id); })
        .map(function (component) { return component.id; });
    return orphanIds.map(function (orphanId) { return ({
        id: "remove-orphan-".concat(orphanId),
        title: "Remove unused ".concat(orphanId),
        description: "Remove a component that is not connected to anything else.",
        apply: function (current) {
            if (isComponentConnected(current, orphanId)) {
                return current;
            }
            var exists = current.components.some(function (component) { return component.id === orphanId; });
            return exists ? (0, transitions_1.removeComponent)(current, orphanId) : current;
        }
    }); });
}
function isComponentConnected(state, id) {
    return state.connections.some(function (connection) { return connection.from === id || connection.to === id; });
}
function createComponentId(state, prefix) {
    var existing = new Set(state.components.map(function (component) { return component.id; }));
    var counter = 1;
    var candidate = "".concat(prefix, "-").concat(counter);
    while (existing.has(candidate)) {
        counter += 1;
        candidate = "".concat(prefix, "-").concat(counter);
    }
    return candidate;
}
