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
    !combatRuntime.attackerFleet ||
    typeof combatRuntime.attackerFleet !==
    "object"
  ) {
    errors.push({
      field: "attackerFleet",
      message:
        "attackerFleet must be an object"
    });
  }

  if (
    !combatRuntime.defenderFleet ||
    typeof combatRuntime.defenderFleet !==
    "object"
  ) {
    errors.push({
      field: "defenderFleet",
      message:
        "defenderFleet must be an object"
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

  if (
    typeof combatRuntime.attackerDefeated !==
    "boolean"
  ) {
    errors.push({
      field: "attackerDefeated",
      message:
        "attackerDefeated must be a boolean"
    });
  }

  if (
    typeof combatRuntime.defenderDefeated !==
    "boolean"
  ) {
    errors.push({
      field: "defenderDefeated",
      message:
        "defenderDefeated must be a boolean"
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
    combatRuntime.attackerDefeated &&
    combatRuntime.defenderDefeated &&
    !combatRuntime.combatFinished
  ) {
    errors.push({
      field: "combatFinished",
      message:
        "combatFinished must be true when both fleets are defeated"
    });
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

module.exports =
  validateCombatRuntime;