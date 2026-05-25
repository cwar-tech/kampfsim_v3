// ==================================================
// INTEGRATION TEST
// ENGINE PIPELINE
// ==================================================

import {

  runTest,
  assertExists

} from "../helpers/testRunner.js";

import { resolveFleet }
  from "../../app/combat/resolveFleet.js";

import { calculateRound }
  from "../../app/combat/calculateRound.js";

import shipsData
  from "../../app/ships.json"
  assert { type: "json" };

import combatInput
  from "../../data/combat-input-001.json"
  assert { type: "json" };



// ==================================================
// TEST
// ==================================================

runTest({

  level:
    "INTEGRATION",

  module:
    "engine",

  name:
    "full combat pipeline",

  test: () => {

    // ==================================================
    // INPUT
    // ==================================================

    assertExists(
      combatInput.attacker,
      "Missing attacker"
    );

    assertExists(
      combatInput.defender,
      "Missing defender"
    );


    // ==================================================
    // RESOLVE
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


    assertExists(
      attackerFleet.totalHp,
      "Attacker hp missing"
    );

    assertExists(
      defenderFleet.totalHp,
      "Defender hp missing"
    );


    // ==================================================
    // ROUND
    // ==================================================

    const roundResult =
      calculateRound(
        attackerFleet,
        defenderFleet
      );


    assertExists(
      roundResult.winner,
      "Winner missing"
    );

    assertExists(
      roundResult.combatState,
      "Combat state missing"
    );

    assertExists(
      roundResult.roundEvents,
      "Round events missing"
    );
  }
});