// ==================================================
// tests/runTests.js
// ==================================================

import "./unit/calculateRound.unit.test.js";

import "./integration/engine.integration.test.js";

import {

  printSummary

} from "./helpers/testRunner.js";



// ==================================================
// PRINT FINAL RESULT
// ==================================================

printSummary();