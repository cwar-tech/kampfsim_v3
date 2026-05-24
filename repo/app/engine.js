// ==================================================
// app/engine.js
// ==================================================



// ==================================================
// IMPORTS
// ==================================================

import shipsData from "./ships.json"
  assert { type: "json" };

import combatInput from
  "./DATA/COMBAT/API/TESTDATA/COMBAT-INPUT-001.json"
  assert { type: "json" };

import { resolveFleet }
  from "./combat/resolveFleet.js";

import { calculateRound }
  from "./combat/calculateRound.js";



// ==================================================
// COMBAT INITIALIZATION
// ==================================================

console.log("================================");
console.log("COMBAT INITIALIZATION");
console.log("================================");


// ==================================================
// LOAD INPUT DATA
// ==================================================

const attackerInput =
  combatInput.attacker;

const defenderInput =
  combatInput.defender;

console.log("Combat input loaded");



// ==================================================
// RESOLVE RUNTIME FLEETS
// ==================================================

console.log("================================");
console.log("RESOLVE RUNTIME FLEETS");
console.log("================================");


const attackerFleet = resolveFleet(
  attackerInput,
  shipsData
);

const defenderFleet = resolveFleet(
  defenderInput,
  shipsData
);

console.log("Attacker fleet resolved");
console.log(attackerFleet);

console.log("Defender fleet resolved");
console.log(defenderFleet);



// ==================================================
// ROUND 1
// ==================================================

console.log("================================");
console.log("ROUND 1");
console.log("================================");


// ==================================================
// CALCULATE ROUND
// ==================================================

const roundResult = calculateRound(
  attackerFleet,
  defenderFleet
);



// ==================================================
// ROUND RESULT
// ==================================================

console.log("================================");
console.log("ROUND RESULT");
console.log("================================");

console.log(roundResult);



// ==================================================
// COMBAT END
// ==================================================

console.log("================================");
console.log("COMBAT END");
console.log("================================");