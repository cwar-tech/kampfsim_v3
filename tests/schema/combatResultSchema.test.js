// ==================================================
// tests/schema/combatResultSchema.test.js
// ==================================================

import fs from "fs";

import { buildFleetRuntime }
  from "../../app/combat/buildFleetRuntime.js";

import { calculateRound }
  from "../../app/combat/calculateRound.js";

import { validateCombatResult }
  from "../../app/schema/validateCombatResult.js";


// ==================================================
// TEST DATA
// ==================================================

const shipsData = JSON.parse(
  fs.readFileSync("./app/ships.json")
);

const combatInput = JSON.parse(
  fs.readFileSync("./scenario/test_001.json")
);


// ==================================================
// JEST SUITE
// ==================================================

describe(
  "CombatResultSchema",
  () => {

    test(
      "validates combat result schema successfully",
      () => {

        // ==================================================
        // CREATE RUNTIME
        // ==================================================

        const attackerFleet =
          buildFleetRuntime(
            combatInput.attacker,
            shipsData
          );

        const defenderFleet =
          buildFleetRuntime(
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

        expect(() => {

          validateCombatResult(
            combatResult
          );

        }).not.toThrow();

      }
    );

  }
);