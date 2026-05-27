// ==================================================
// app/combat/resolveFleet.js
// ==================================================

export function resolveFleet(
  fleetInput,
  shipsData
) {

  // ==================================================
  // VALIDATE INPUT
  // ==================================================

  if (
    !fleetInput ||
    !Array.isArray(fleetInput.units)
  ) {

    throw new Error(
      "Invalid fleet input"
    );
  }


  // ==================================================
  // TOTAL VALUES
  // ==================================================

  let totalDamage = 0;
  let totalHp = 0;
  let totalUnits = 0;
  let totalVolume = 0;

  const units = [];


  // ==================================================
  // RESOLVE UNITS
  // ==================================================

  for (
    const entry
    of fleetInput.units
  ) {

    // ==================================================
    // INPUT VALUES
    // ==================================================

    const unitType =
      entry.unitType;

    const amount =
      entry.amount;


    // ==================================================
    // VALIDATE ENTRY
    // ==================================================

    if (!unitType) {

      throw new Error(
        "unitType missing"
      );
    }

    if (
      amount === undefined
    ) {

      throw new Error(
        `amount missing for ${unitType}`
      );
    }


    // ==================================================
    // FIND SHIP DATA
    // ==================================================

    const ship =
      shipsData.find(

        s =>
          s.name === unitType
      );


    // ==================================================
    // SHIP VALIDATION
    // ==================================================

    if (!ship) {

      throw new Error(

        `Ship not found: ${unitType}`
      );
    }


    // ==================================================
    // UNIT ATTRIBUTES
    // ==================================================

    const dmgPerUnit =
      ship.damage;

    const hpPerUnit =
      ship.hp;

    const volumePerUnit =
      ship.volume;


    // ==================================================
    // TOTAL CALCULATION
    // ==================================================

    totalDamage +=
      dmgPerUnit * amount;

    totalHp +=
      hpPerUnit * amount;

    totalUnits +=
      amount;

    totalVolume +=
      volumePerUnit * amount;


    // ==================================================
    // STORE UNIT GROUP
    // ==================================================

    units.push({

      unitType,

      amount,

      dmgPerUnit,
      hpPerUnit,
      volumePerUnit

    });
  }


  // ==================================================
  // RETURN RESOLVED FLEET
  // ==================================================

  return {

    totalDamage,
    totalHp,
    totalUnits,
    totalVolume,

    units
  };
}