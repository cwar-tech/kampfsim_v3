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
    !Array.isArray(
      fleetInput
    )
  ) {

    throw new Error(

      "[FLEET-001] Expected fleet array"

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
    of fleetInput
  ) {

    const unitTypeId =
      entry.unitTypeId;

    const count =
      entry.count;


    // ==================================================
    // VALIDATE ENTRY
    // ==================================================

    if (
      !unitTypeId
    ) {

      throw new Error(

        "[FLEET-002] unitTypeId missing"

      );
    }

    if (
      count === undefined
    ) {

      throw new Error(

        `[FLEET-003] count missing for ${unitTypeId}`

      );
    }


    // ==================================================
    // FIND SHIP DATA
    // ==================================================

    const ship =
      shipsData.find(

        s =>
          s.id === unitTypeId
      );


    // ==================================================
    // SHIP VALIDATION
    // ==================================================

    if (!ship) {

      throw new Error(

        `[FLEET-004] Ship not found: ${unitTypeId}`

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
    // TOTALS
    // ==================================================

    totalDamage +=
      dmgPerUnit * count;

    totalHp +=
      hpPerUnit * count;

    totalUnits +=
      count;

    totalVolume +=
      volumePerUnit * count;


    // ==================================================
    // STORE UNIT
    // ==================================================

    units.push({

      unitTypeId,

      count,

      dmgPerUnit,
      hpPerUnit,
      volumePerUnit
    });
  }


  // ==================================================
  // RESULT
  // ==================================================

  return {

    totalDamage,
    totalHp,
    totalUnits,
    totalVolume,

    units
  };
}