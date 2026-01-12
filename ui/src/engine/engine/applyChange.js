"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyProposedChange = applyProposedChange;
var constraints_1 = require("../core/constraints");
function applyProposedChange(state, change) {
    var proposed = change(state);
    // Gatekeeper checks
    (0, constraints_1.validateSystem)(proposed);
    return proposed;
}
