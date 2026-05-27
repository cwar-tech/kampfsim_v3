// ==================================================
// tests/combatResultSchema.test.js
// ==================================================

import fs from "fs";

import { resolveFleet }
  from "../app/combat/resolveFleet.js";

import { calculateRound }
  from "../app/combat/calculateRound.js";

import { validateCombatResult }
  from "../app/schema/validateCombatResult.js";

const shipsData = JSON.parse(
  fs.readFileSync("./app/ships.json")
);

const combatInput = JSON.parse(
  fs.readFileSync("./data/combat-input-001.json")
);


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