"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSystem = validateSystem;
function validateSystem(state) {
    var ids = state.components.map(function (c) { return c.id; });
    // Rule 1: No duplicate components
    if (new Set(ids).size !== ids.length) {
        throw new Error("Duplicate component IDs are not allowed");
    }
    // Rule 2: All connections must point to real components
    for (var _i = 0, _a = state.connections; _i < _a.length; _i++) {
        var conn = _a[_i];
        if (!ids.includes(conn.from) || !ids.includes(conn.to)) {
            throw new Error("Connection refers to missing component");
        }
    }
    // Rule 3: No component can connect to itself
    for (var _b = 0, _c = state.connections; _b < _c.length; _b++) {
        var conn = _c[_b];
        if (conn.from === conn.to) {
            throw new Error("A component cannot connect to itself");
        }
    }
}
