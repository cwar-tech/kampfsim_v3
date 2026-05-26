// ==================================================
// app/combat/calculateRound.js
// ==================================================

export function calculateRound(
  attackerFleet,
  defenderFleet
) {

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

      attackerRole:
        "attacker",

      defenderRole:
        "defender",

      damage:
        attackerDamage,

      destroyedUnits:
        defenderDestroyedUnits,

      remainingUnits:
        defenderRemainingUnits
    },

    {
      eventId:
        "round_1_defender",

      attackerRole:
        "defender",

      defenderRole:
        "attacker",

      damage:
        defenderDamage,

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

    destroyedUnits:
      attackerDestroyedUnits,

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

    destroyedUnits:
      defenderDestroyedUnits,

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