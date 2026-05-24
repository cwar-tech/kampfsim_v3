// ==================================================
// app/combat/resolveFleet.js
// ==================================================

export function resolveFleet(fleetInput, shipsData) {
  const resolvedUnits = fleetInput.units.map(unit => {
    const shipData = shipsData.find(
      ship => ship.name === unit.unitType
    );

    if (!shipData) {
      throw new Error(
        `Unknown unit type: ${unit.unitType}`
      );
    }

    return {
      unitType: shipData.name,

      category: shipData.type,

      amount: unit.amount,

      hpPerUnit: shipData.hp,

      damagePerUnit: shipData.damage,

      armor: shipData.armor,

      penetration: shipData.penetration,

      volumePerUnit: shipData.volume,

      totalHp:
        shipData.hp * unit.amount,

      totalDamage:
        shipData.damage * unit.amount,

      totalVolume:
        shipData.volume * unit.amount
    };
  });

  const totalUnits = resolvedUnits.reduce(
    (sum, unit) => sum + unit.amount,
    0
  );

  const totalHp = resolvedUnits.reduce(
    (sum, unit) => sum + unit.totalHp,
    0
  );

  const totalDamage = resolvedUnits.reduce(
    (sum, unit) => sum + unit.totalDamage,
    0
  );

  const totalVolume = resolvedUnits.reduce(
    (sum, unit) => sum + unit.totalVolume,
    0
  );

  return {
    fleetId: fleetInput.fleetId,

    role: fleetInput.role,

    units: resolvedUnits,

    totalUnits,

    totalHp,

    totalDamage,

    totalVolume
  };
}