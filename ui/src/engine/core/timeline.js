"use strict";
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
exports.createTimeline = createTimeline;
exports.applyChange = applyChange;
exports.undo = undo;
exports.redo = redo;
function createTimeline(initial) {
    return {
        past: [],
        present: initial,
        future: []
    };
}
function applyChange(timeline, newState) {
    return {
        past: __spreadArray(__spreadArray([], timeline.past, true), [timeline.present], false),
        present: newState,
        future: []
    };
}
function undo(timeline) {
    if (timeline.past.length === 0)
        return timeline;
    var previous = timeline.past[timeline.past.length - 1];
    var past = timeline.past.slice(0, -1);
    return {
        past: past,
        present: previous,
        future: __spreadArray([timeline.present], timeline.future, true)
    };
}
function redo(timeline) {
    if (timeline.future.length === 0)
        return timeline;
    var next = timeline.future[0];
    var future = timeline.future.slice(1);
    return {
        past: __spreadArray(__spreadArray([], timeline.past, true), [timeline.present], false),
        present: next,
        future: future
    };
}
