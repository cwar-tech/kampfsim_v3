// ==================================================
// tests/combatResultSchema.test.js
// ==================================================

import { resolveFleet }
  from "../app/combat/resolveFleet.js";

import { calculateRound }
  from "../app/combat/calculateRound.js";

import { validateCombatResult }
  from "../app/schema/validateCombatResult.js";

import shipsData
  from "../app/ships.json"
  assert { type: "json" };

import combatInput
  from "../data/combat-input-001.json"
  assert { type: "json" };



// ==================================================
// CREATE RUNTIME
// ==================================================

const attackerFleet =
  resolveFleet(
    combatInput.attacker,
    shipsData
  );

const defenderFleet =
  resolveFleet(
    combatInput.defender,
    shipsData
  );



// ==================================================
// CREATE RESULT
// ==================================================

const combatResult =
  calculateRound(
    attackerFleet,
    defenderFleet
  );



// ==================================================
// VALIDATE RESULT
// ==================================================

validateCombatResult(
  combatResult
);



// ==================================================
// SUCCESS
// ==================================================

console.log(
  "CombatResult schema valid"
);