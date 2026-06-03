function validateCombatRuntime(
  runtime
) {

  const errors = [];



  // ==================================================
  // REQUIRED ROOT FIELDS
  // ==================================================

  if (
    typeof runtime !== "object" ||
    runtime == null
  ) {

    return {

      valid: false,

      errors: [
        "runtime missing"
      ]
    };
  }



  if (

    typeof runtime.combatId !==
    "string" ||

    runtime.combatId.trim() === ""
  ) {

    errors.push(
      "invalid combatId"
    );
  }



  if (
    !Number.isInteger(
      runtime.currentRound
    )
  ) {

    errors.push(
      "invalid currentRound"
    );
  }



  if (

    Number.isInteger(
      runtime.currentRound
    ) &&

    runtime.currentRound < 0
  ) {

    errors.push(
      "negative currentRound"
    );
  }



  if (
    runtime.attackerFleet == null
  ) {

    errors.push(
      "missing attackerFleet"
    );
  }



  if (
    runtime.defenderFleet == null
  ) {

    errors.push(
      "missing defenderFleet"
    );
  }



  if (

    runtime.attackerFleet != null &&

    !Array.isArray(
      runtime.attackerFleet.units
    )
  ) {

    errors.push(
      "invalid attackerFleet"
    );
  }



  if (

    runtime.defenderFleet != null &&

    !Array.isArray(
      runtime.defenderFleet.units
    )
  ) {

    errors.push(
      "invalid defenderFleet"
    );
  }



  if (

    runtime.rounds !== undefined &&

    !Array.isArray(
      runtime.rounds
    )
  ) {

    errors.push(
      "invalid rounds"
    );
  }



  if (
    errors.length > 0
  ) {

    return {

      valid: false,

      errors
    };
  }



  // ==================================================
  // GLOBAL UNIT VALIDATION
  // ==================================================

  const allUnits = [

    ...runtime.attackerFleet.units,

    ...runtime.defenderFleet.units
  ];



  for (
    const unit
    of allUnits
  ) {

    if (
      unit.remainingUnits < 0
    ) {

      errors.push(
        "negative remaining units"
      );
    }

    if (
      unit.amount !== undefined &&
      unit.remainingUnits >
      unit.amount
    ) {

      errors.push(
        "remaining units exceed amount"
      );
    }

    if (

      unit.hpLastUnit !== undefined &&

      unit.hpLastUnit < 0
    ) {

      errors.push(
        "negative hpLastUnit"
      );
    }

    if (

      unit.hpLastUnit !== undefined &&

      unit.remainingUnits > 0 &&

      unit.hpLastUnit <= 0
    ) {

      errors.push(
        "living units with zero hp"
      );
    }
  }



  // ==================================================
  // GLOBAL FLEET VALIDATION
  // ==================================================

  const fleets = [

    runtime.attackerFleet,

    runtime.defenderFleet
  ];



  for (
    const fleet
    of fleets
  ) {

    if (
      fleet.totalHp < 0
    ) {

      errors.push(
        "negative fleet hp"
      );
    }

    if (

      fleet.totalUnits === 0 &&

      fleet.totalHp > 0
    ) {

      errors.push(
        "destroyed fleet with hp"
      );
    }
  }



  // ==================================================
  // DUPLICATE RUNTIME IDS
  // ==================================================

  const runtimeIds =
    new Set();

  for (
    const unit
    of allUnits
  ) {

    if (

      unit.runtimeUnitId != null &&

      runtimeIds.has(
        unit.runtimeUnitId
      )
    ) {

      errors.push(
        "duplicate runtimeUnitId"
      );
    }

    runtimeIds.add(
      unit.runtimeUnitId
    );
  }



  // ==================================================
  // COMBAT STATE VALIDATION
  // ==================================================

  if (

    runtime.combatFinished &&

    runtime.combatResult == null
  ) {

    errors.push(
      "finished combat without result"
    );
  }



  if (

    runtime.attackerDefeated &&

    runtime.defenderDefeated &&

    !runtime.combatFinished
  ) {

    errors.push(
      "mutual destruction without combat finish"
    );
  }



  // ==================================================
  // RESULT
  // ==================================================

  return {

    valid:
      errors.length === 0,

    errors
  };
}

export default
  validateCombatRuntime;