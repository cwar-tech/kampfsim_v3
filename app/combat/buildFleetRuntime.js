// ==================================================
// app/combat/buildFleetRuntime.js
// ==================================================

export function buildFleetRuntime(
  fleetInput,
  shipsData
) {

  // ==========================================
  // VALIDATE INPUT
  // ==========================================

  if (
    !Array.isArray(
      fleetInput
    )
  ) {

    throw new Error(

      "[FLEET-001] Expected fleet array"

    );
  }



  // ==========================================
  // FLEET TOTALS
  // ==========================================

  let totalDamage = 0;

  let totalHp = 0;

  let totalUnits = 0;

  let totalVolume = 0;

  const units = [];



  // ==========================================
  // BUILD UNIT RUNTIMES
  // ==========================================

  for (
    const entry
    of fleetInput
  ) {

    const unitTypeId =
      entry.unitTypeId;

    const count =
      entry.count;



    // ==========================================
    // VALIDATE ENTRY
    // ==========================================

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



    // ==========================================
    // FIND TEMPLATE
    // ==========================================

    const ship =
      shipsData.find(

        s =>
          s.id === unitTypeId
      );



    if (
      !ship
    ) {

      throw new Error(

        `[FLEET-004] Ship not found: ${unitTypeId}`

      );
    }



    // ==========================================
    // BASE VALUES
    // ==========================================
    const hpPerUnit =
      ship.hp;

    const dmgPerUnit =
      ship.damage;

    const armorPerUnit =
      ship.armor;

    const penetrationPerUnit =
      ship.penetration;

    const volumePerUnit =
      ship.volume;

    const totalUnitHp =
      hpPerUnit * count;

    const totalUnitDamage =
      dmgPerUnit * count;

    const totalUnitVolume =
      volumePerUnit * count;


    // ==========================================
    // VALIDATE TEMPLATE DATA
    // ==========================================

    if (
      typeof hpPerUnit !==
      "number"
    ) {

      throw new Error(

        `[RUNTIME-001] hp missing for ${unitTypeId}`

      );
    }

    if (
      hpPerUnit <= 0
    ) {

      throw new Error(

        `[RUNTIME-002] hp must be > 0 for ${unitTypeId}`

      );
    }



    if (
      typeof dmgPerUnit !==
      "number"
    ) {

      throw new Error(

        `[RUNTIME-003] damage missing for ${unitTypeId}`

      );
    }

    if (
      dmgPerUnit <= 0
    ) {

      throw new Error(

        `[RUNTIME-004] damage must be > 0 for ${unitTypeId}`

      );
    }



    if (
      typeof armorPerUnit !==
      "number"
    ) {

      throw new Error(

        `[RUNTIME-005] armor missing for ${unitTypeId}`

      );
    }



    if (
      armorPerUnit < 0
    ) {

      throw new Error(

        `[RUNTIME-006] armor cannot be negative for ${unitTypeId}`

      );
    }



    if (
      typeof penetrationPerUnit !==
      "number"
    ) {

      throw new Error(

        `[RUNTIME-007] penetration missing for ${unitTypeId}`

      );
    }



    if (
      penetrationPerUnit < 0
    ) {

      throw new Error(

        `[RUNTIME-008] penetration cannot be negative for ${unitTypeId}`

      );
    }

    if (
      typeof volumePerUnit !==
      "number"
    ) {

      throw new Error(

        `[RUNTIME-011] volume missing for ${unitTypeId}`

      );
    }

    if (
      volumePerUnit <= 0
    ) {

      throw new Error(

        `[RUNTIME-012] volume must be > 0 for ${unitTypeId}`

      );
    }
    // ==========================================
    // BUILD UNIT RUNTIME
    // ==========================================

    units.push({

      runtimeUnitId:

        `${unitTypeId}_${crypto.randomUUID()}`,

      shipTemplateId:
        ship.id,

      unitTypeId:
        ship.id,

      unitCategory:
        ship.type ||
        "ship",

      damageMultipliers:
        ship.damageMultipliers ||
        {},

      unitCount:
        count,

      remainingUnits:
        count,

      hpPerUnit,

      dmgPerUnit,

      armorPerUnit,

      penetrationPerUnit,

      volumePerUnit,

      repairDuration:
        ship.repairDuration || 0,

      totalHp:
        totalUnitHp,

      remainingHp:
        totalUnitHp,

      totalDamage:
        totalUnitDamage,

      totalVolume:
        totalUnitVolume,

      remainingVolume:
        totalUnitVolume,

      receivedDamage:
        0,

      destroyed:
        false,

      damageMultipliers:
        []
    });



    // ==========================================
    // FLEET TOTALS
    // ==========================================

    totalDamage +=
      totalUnitDamage;

    totalHp +=
      totalUnitHp;

    totalUnits +=
      count;

    totalVolume +=
      totalUnitVolume;
  }



  // ==========================================
  // RETURN FLEET RUNTIME
  // ==========================================

  return {

    totalDamage,

    totalHp,

    totalUnits,

    totalVolume,

    units
  };

}