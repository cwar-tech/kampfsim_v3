// ==================================================
// app/engine.js
// ==================================================

import shipsData from "./ships.json" assert { type: "json" };

import combatInput from
  "./DATA/COMBAT/API/TESTDATA/COMBAT-INPUT-001.json"
  assert { type: "json" };

import { resolveFleet }
  from "./combat/resolveFleet.js";


const attackerFleet = resolveFleet(
  combatInput.attacker,
  shipsData
);

const defenderFleet = resolveFleet(
  combatInput.defender,
  shipsData
);

console.log("ATTACKER FLEET");
console.log(attackerFleet);

console.log("DEFENDER FLEET");
console.log(defenderFleet);