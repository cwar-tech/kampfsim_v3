// ==================================================
// tests/runTests.js
// ==================================================

import "./unit/calculateRound.unit.test.js";

import "./integration/engine.integration.test.js";

import {

  printSummary

} from "./helpers/testRunner.js";



// ==================================================
// START TEST RUN
// ==================================================

console.log("================================");
console.log("START GLOBAL TEST RUN");
console.log("================================");

console.log("\n");



// ==================================================
// PRINT SUMMARY
// ==================================================

printSummary();

console.log("\n");

console.log("================================");
console.log("END GLOBAL TEST RUN");
console.log("================================");