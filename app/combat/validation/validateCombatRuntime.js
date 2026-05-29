import validateCombatFleetRuntime
  from "./validateCombatFleetRuntime.js";

function validateCombatRuntime(
  combatRuntime
) {
  const errors = [];

  if (
    !combatRuntime ||
    typeof combatRuntime !== "object"
  ) {
    return {
      valid: false,
      errors: [
        {
          field: "combatRuntime",
          message:
            "combatRuntime must be an object"
        }
      ]
    };
  }

  if (
    !combatRuntime.combatId ||
    typeof combatRuntime.combatId !==
    "string"
  ) {
    errors.push({
      field: "combatId",
      message:
        "combatId must be a non-empty string"
    });
  }

  if (
    typeof combatRuntime.currentRound !==
    "number" ||
    !Number.isInteger(
      combatRuntime.currentRound
    ) ||
    combatRuntime.currentRound < 0
  ) {
    errors.push({
      field: "currentRound",
      message:
        "currentRound must be a non-negative integer"
    });
  }

  if (
    typeof combatRuntime.combatFinished !==
    "boolean"
  ) {
    errors.push({
      field: "combatFinished",
      message:
        "combatFinished must be a boolean"
    });
  }

  if (
    !Array.isArray(
      combatRuntime.rounds
    )
  ) {
    errors.push({
      field: "rounds",
      message:
        "rounds must be an array"
    });
  }

  const attackerValidation =
    validateCombatFleetRuntime(
      combatRuntime.attackerFleet
    );

  if (
    !attackerValidation.valid
  ) {
    return attackerValidation;
  }

  const defenderValidation =
    validateCombatFleetRuntime(
      combatRuntime.defenderFleet
    );

  if (
    !defenderValidation.valid
  ) {
    return defenderValidation;
  }

  if (
    combatRuntime.attackerDefeated &&
    combatRuntime.defenderDefeated &&
    !combatRuntime.combatFinished
  ) {
    errors.push({
      field:
        "combatFinished",

      message:
        "combat cannot remain unfinished when both fleets are defeated"
    });
  }

  if (
    combatRuntime.combatFinished &&
    !combatRuntime.combatResult
  ) {
    errors.push({
      field:
        "combatResult",

      message:
        "combatFinished requires combatResult"
    });
  }

  return {
    valid:
      errors.length === 0,

    errors
  };
}

export default
  validateCombatRuntime;