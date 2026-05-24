// ==================================================
// app/combat/calculateRound.js
// ==================================================

export function calculateRound(
  attackerFleet,
  defenderFleet
) {
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
      defenderFleet.totalHp - attackerDamage
    );

  const attackerRemainingHp =
    Math.max(
      0,
      attackerFleet.totalHp - defenderDamage
    );


  // ==================================================
  // DESTROYED UNITS
  // MVP V1:
  // einfache HP-Berechnung
  // ==================================================

  const defenderDestroyedUnits =
    Math.floor(
      (defenderFleet.totalHp -
        defenderRemainingHp)
      /
      defenderFleet.units[0].hpPerUnit
    );

  const attackerDestroyedUnits =
    Math.floor(
      (attackerFleet.totalHp -
        attackerRemainingHp)
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
  // ROUND EVENTS
  // ==================================================

  const roundEvents = [
    {
      eventId: "round_1_attacker",

      attackerRole: "attacker",

      defenderRole: "defender",

      damage: attackerDamage,

      destroyedUnits:
        defenderDestroyedUnits,

      remainingUnits:
        defenderRemainingUnits
    },

    {
      eventId: "round_1_defender",

      attackerRole: "defender",

      defenderRole: "attacker",

      damage: defenderDamage,

      destroyedUnits:
        attackerDestroyedUnits,

      remainingUnits:
        attackerRemainingUnits
    }
  ];


  // ==================================================
  // UPDATED STATES
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


  return {
    attackerFleet:
      updatedAttackerFleet,

    defenderFleet:
      updatedDefenderFleet,

    roundEvents
  };
}