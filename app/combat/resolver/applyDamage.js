function applyDamage({
    combatRuntime,
    roundRuntime,
    damageEvent
}) {
    const allUnits = [
        ...combatRuntime.attackerFleet.units,
        ...combatRuntime.defenderFleet.units
    ];

    const targetUnit =
        allUnits.find(
            (unit) =>
                unit.runtimeUnitId ===
                damageEvent.targetRuntimeUnitId
        );

    if (!targetUnit) {
        return;
    }

    targetUnit.receivedDamage =
        (targetUnit.receivedDamage || 0) +
        damageEvent.appliedDamage;
}

module.exports = applyDamage;