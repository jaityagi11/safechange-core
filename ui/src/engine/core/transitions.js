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
exports.addComponent = addComponent;
exports.removeComponent = removeComponent;
exports.renameComponent = renameComponent;
var constraints_1 = require("./constraints");
function addComponent(state, component) {
    var newState = {
        components: __spreadArray(__spreadArray([], state.components, true), [component], false),
        connections: __spreadArray([], state.connections, true),
        version: state.version + 1
    };
    (0, constraints_1.validateSystem)(newState);
    return newState;
}
function removeComponent(state, componentId) {
    var components = state.components.filter(function (c) { return c.id !== componentId; });
    var connections = state.connections.filter(function (c) { return c.from !== componentId && c.to !== componentId; });
    var newState = {
        components: components,
        connections: connections,
        version: state.version + 1
    };
    (0, constraints_1.validateSystem)(newState);
    return newState;
}
function renameComponent(state, id, newId) {
    var components = state.components.map(function (c) {
        return c.id === id ? __assign(__assign({}, c), { id: newId }) : c;
    });
    var connections = state.connections.map(function (conn) { return ({
        from: conn.from === id ? newId : conn.from,
        to: conn.to === id ? newId : conn.to
    }); });
    var newState = {
        components: components,
        connections: connections,
        version: state.version + 1
    };
    (0, constraints_1.validateSystem)(newState);
    return newState;
}
