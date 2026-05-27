// ==================================================
// ENGINE INTEGRATION TEST
// ==================================================

import fs from "fs";

import {

  runTest,

  assertExists,
  assertType,
  assertArray,
  assertGreaterThan

} from "../helpers/testRunner.js";

import { resolveFleet }
  from "../../app/combat/resolveFleet.js";

import { calculateRound }
  from "../../app/combat/calculateRound.js";

const shipsData = JSON.parse(
  fs.readFileSync("./app/ships.json")
);

const combatInput = JSON.parse(
  fs.readFileSync("./data/combat-input-001.json")
);


// ==================================================
// JEST SUITE
// ==================================================

describe(
  "EngineIntegration",
  () => {

    test(
      "runs full combat pipeline successfully",
      () => {

        runTest({

          level:
            "INTEGRATION",

          module:
            "ENGINE",

          name:
            "FULL COMBAT PIPELINE",


          context: {

            shipsData,

            combatInput
          },


          test: () => {

            // ==================================================
            // INPUT VALIDATION
            // ==================================================

            assertExists({

              value:
                combatInput.attacker,

              field:
                "combatInput.attacker",

              message:
                "Attacker input missing"
            });


            assertExists({

              value:
                combatInput.defender,

              field:
                "combatInput.defender",

              message:
                "Defender input missing"
            });


            // ==================================================
            // RESOLVE FLEETS
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
            // RESOLVED FLEET VALIDATION
            // ==================================================

            assertExists({

              value:
                attackerFleet.totalHp,

              field:
                "attackerFleet.totalHp",

              message:
                "Attacker HP missing"
            });


            assertExists({

              value:
                defenderFleet.totalHp,

              field:
                "defenderFleet.totalHp",

              message:
                "Defender HP missing"
            });


            // ==================================================
            // CALCULATE ROUND
            // ==================================================

            const roundResult =
              calculateRound(
                attackerFleet,
                defenderFleet
              );


            // ==================================================
            // RESULT VALIDATION
            // ==================================================

            assertType({

              value:
                roundResult.winner,

              expectedType:
                "string",

              field:
                "roundResult.winner",

              message:
                "Winner invalid"
            });


            assertType({

              value:
                roundResult.combatState,

              expectedType:
                "string",

              field:
                "roundResult.combatState",

              message:
                "Combat state invalid"
            });


            assertArray({

              value:
                roundResult.roundEvents,

              field:
                "roundResult.roundEvents",

              message:
                "Round events invalid"
            });


            assertGreaterThan({

              actual:
                roundResult.attackerFleet.totalDamage,

              minimum:
                0,

              field:
                "attackerFleet.totalDamage",

              message:
                "Attacker damage invalid"
            });


            assertGreaterThan({

              actual:
                roundResult.defenderFleet.totalDamage,

              minimum:
                0,

              field:
                "defenderFleet.totalDamage",

              message:
                "Defender damage invalid"
            });

          }
        });

      }
    );

  }
);