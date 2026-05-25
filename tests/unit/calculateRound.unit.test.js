// ==================================================
// UNIT TEST
// calculateRound
// ==================================================

import {

  runTest,
  assertExists,
  assertType

} from "../helpers/testRunner.js";

import { calculateRound }
  from "../../app/combat/calculateRound.js";



// ==================================================
// MOCK DATA
// ==================================================

const attackerFleet = {

  totalDamage: 5000,

  totalHp: 10000,

  totalUnits: 100,

  units: [
    {
      hpPerUnit: 100,
      volumePerUnit: 10
    }
  ]
};


const defenderFleet = {

  totalDamage: 3000,

  totalHp: 8000,

  totalUnits: 80,

  units: [
    {
      hpPerUnit: 100,
      volumePerUnit: 10
    }
  ]
};



// ==================================================
// TEST
// ==================================================

runTest({

  level:
    "UNIT",

  module:
    "calculateRound",

  name:
    "returns combat result",

  test: () => {

    const result =
      calculateRound(
        attackerFleet,
        defenderFleet
      );

    assertExists(
      result,
      "Result missing"
    );

    assertType(
      result.winner,
      "string",
      "Winner invalid"
    );

    assertType(
      result.combatState,
      "string",
      "Combat state invalid"
    );
  }
});