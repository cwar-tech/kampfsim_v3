// ==================================================
// app/combat/calculateRound.js
// ==================================================

export function calculateRound(
  attackerFleet,
  defenderFleet
) {

  // ==================================================
  // VALIDATE FLEET STRUCTURE
  // MVP RUNTIME CONTRACT
  // ==================================================

  validateFleet(
    attackerFleet,
    "attackerFleet"
  );

  validateFleet(
    defenderFleet,
    "defenderFleet"
  );


  // ==================================================
  // TOTAL DAMAGE
  // ==================================================

  const attackerDamage =
    attackerFleet.totalDamage;

  const defenderDamage =
    defenderFleet.totalDamage;


  // ==================================================
  // APPLY DAMAGE
  // ==================================================

  const defenderRemainingHp =
    Math.max(
      0,
      defenderFleet.totalHp -
      attackerDamage
    );

  const attackerRemainingHp =
    Math.max(
      0,
      attackerFleet.totalHp -
      defenderDamage
    );


  // ==================================================
  // DESTROYED UNITS
  // MVP V1:
  // einfache HP-Berechnung
  // ==================================================

  const defenderDestroyedUnits =
    Math.floor(
      (
        defenderFleet.totalHp -
        defenderRemainingHp
      )
      /
      defenderFleet.units[0].hpPerUnit
    );

  const attackerDestroyedUnits =
    Math.floor(
      (
        attackerFleet.totalHp -
        attackerRemainingHp
      )
      /
      attackerFleet.units[0].hpPerUnit
    );


  // ==================================================
  // REMAINING UNITS
  // ==================================================

  const defenderRemainingUnits =
    Math.max(
      0,
      defenderFleet.totalUnits -
      defenderDestroyedUnits
    );

  const attackerRemainingUnits =
    Math.max(
      0,
      attackerFleet.totalUnits -
      attackerDestroyedUnits
    );


  // ==================================================
  // DESTROYED VOLUME
  // ==================================================

  const defenderDestroyedVolume =
    defenderDestroyedUnits *
    defenderFleet.units[0].volumePerUnit;

  const attackerDestroyedVolume =
    attackerDestroyedUnits *
    attackerFleet.units[0].volumePerUnit;


  // ==================================================
  // REMAINING VOLUME
  // ==================================================

  const defenderRemainingVolume =
    Math.max(
      0,
      defenderFleet.totalVolume -
      defenderDestroyedVolume
    );

  const attackerRemainingVolume =
    Math.max(
      0,
      attackerFleet.totalVolume -
      attackerDestroyedVolume
    );


  // ==================================================
  // WINNER
  // ==================================================

  let winner = "draw";

  if (
    attackerRemainingHp >
    defenderRemainingHp
  ) {

    winner = "attacker";
  }

  if (
    defenderRemainingHp >
    attackerRemainingHp
  ) {

    winner = "defender";
  }


  // ==================================================
  // COMBAT STATE
  // ==================================================

  let combatState = "ongoing";

  if (
    defenderRemainingUnits <= 0
  ) {

    combatState =
      "attackerVictory";
  }

  if (
    attackerRemainingUnits <= 0
  ) {

    combatState =
      "defenderVictory";
  }

  if (
    attackerRemainingUnits <= 0 &&
    defenderRemainingUnits <= 0
  ) {

    combatState =
      "mutualDestruction";
  }


  // ==================================================
  // ROUND EVENTS
  // ==================================================

  const roundEvents = [

    {
      eventId:
        "round_1_attacker",

      timestamp:
        Date.now(),

      round:
        1,

      attackerRole:
        "attacker",

      defenderRole:
        "defender",

      damageApplied:
        attackerDamage,

      remainingHp:
        defenderRemainingHp,

      remainingVolume:
        defenderRemainingVolume,

      destroyedUnits:
        defenderDestroyedUnits,

      remainingUnits:
        defenderRemainingUnits
    },

    {
      eventId:
        "round_1_defender",

      timestamp:
        Date.now(),

      round:
        1,

      attackerRole:
        "defender",

      defenderRole:
        "attacker",

      damageApplied:
        defenderDamage,

      remainingHp:
        attackerRemainingHp,

      remainingVolume:
        attackerRemainingVolume,

      destroyedUnits:
        attackerDestroyedUnits,

      remainingUnits:
        attackerRemainingUnits
    }
  ];


  // ==================================================
  // UPDATED ATTACKER STATE
  // ==================================================

  const updatedAttackerFleet = {

    ...attackerFleet,

    remainingHp:
      attackerRemainingHp,

    remainingUnits:
      attackerRemainingUnits,

    remainingVolume:
      attackerRemainingVolume,

    destroyedUnits:
      attackerDestroyedUnits,

    destroyedVolume:
      attackerDestroyedVolume,

    receivedDamage:
      defenderDamage
  };


  // ==================================================
  // UPDATED DEFENDER STATE
  // ==================================================

  const updatedDefenderFleet = {

    ...defenderFleet,

    remainingHp:
      defenderRemainingHp,

    remainingUnits:
      defenderRemainingUnits,

    remainingVolume:
      defenderRemainingVolume,

    destroyedUnits:
      defenderDestroyedUnits,

    destroyedVolume:
      defenderDestroyedVolume,

    receivedDamage:
      attackerDamage
  };


  // ==================================================
  // RETURN RESULT
  // ==================================================

  return {

    winner,
    combatState,

    attackerFleet:
      updatedAttackerFleet,

    defenderFleet:
      updatedDefenderFleet,

    roundEvents,

    attackerDestroyedVolume,
    defenderDestroyedVolume
  };
}


// ==================================================
// VALIDATE FLEET
// MVP RUNTIME CONTRACT
// ==================================================

function validateFleet(
  fleet,
  fleetName
) {

  // ==================================================
  // REQUIRED ROOT ATTRIBUTES
  // ==================================================

  const requiredFleetAttributes = [

    "totalDamage",
    "totalHp",
    "totalUnits",
    "totalVolume",
    "units"

  ];

  for (
    const attribute
    of requiredFleetAttributes
  ) {

    if (
      fleet[attribute] === undefined
    ) {

      throw new Error(

        `${fleetName} missing attribute: ${attribute}`

      );
    }
  }


  // ==================================================
  // UNITS ARRAY
  // ==================================================

  if (
    !Array.isArray(fleet.units)
  ) {

    throw new Error(

      `${fleetName}.units must be an array`

    );
  }

  if (
    fleet.units.length < 1
  ) {

    throw new Error(

      `${fleetName}.units must contain at least one unit`

    );
  }


  // ==================================================
  // UNIT ATTRIBUTES
  // ==================================================

  for (
    const unit
    of fleet.units
  ) {

    const requiredUnitAttributes = [

      "dmgPerUnit",
      "hpPerUnit",
      "volumePerUnit"

    ];

    for (
      const attribute
      of requiredUnitAttributes
    ) {

      if (
        unit[attribute] === undefined
      ) {

        throw new Error(

          `${fleetName}.units missing attribute: ${attribute}`

        );
      }
    }
  }
}