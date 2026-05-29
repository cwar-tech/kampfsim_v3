function aggregateDamage({
    combatRuntime,
    roundRuntime
}) {
    const allUnits = [
        ...combatRuntime.attackerFleet.units,
        ...combatRuntime.defenderFleet.units
    ];

    const sortedDamageEvents =
        [...roundRuntime.damageEvents].sort(
            (a, b) => {
                if (
                    a.targetRuntimeUnitId !==
                    b.targetRuntimeUnitId
                ) {
                    return a.targetRuntimeUnitId.localeCompare(
                        b.targetRuntimeUnitId
                    );
                }

                return a.sourceRuntimeUnitId.localeCompare(
                    b.sourceRuntimeUnitId
                );
            }
        );

    for (const unit of allUnits) {
        unit.receivedDamage = 0;
        unit.dealtDamage = 0;
    }

    for (const damageEvent of sortedDamageEvents) {
        const sourceUnit =
            allUnits.find(
                (unit) =>
                    unit.runtimeUnitId ===
                    damageEvent.sourceRuntimeUnitId
            );

        const targetUnit =
            allUnits.find(
                (unit) =>
                    unit.runtimeUnitId ===
                    damageEvent.targetRuntimeUnitId
            );

        if (sourceUnit) {
            sourceUnit.dealtDamage +=
                damageEvent.appliedDamage;
        }

        if (targetUnit) {
            targetUnit.receivedDamage +=
                damageEvent.appliedDamage;
        }
    }

    roundRuntime.attackerDamageDealt =
        combatRuntime.attackerFleet.units.reduce(
            (sum, unit) =>
                sum + (unit.dealtDamage || 0),
            0
        );

    roundRuntime.defenderDamageDealt =
        combatRuntime.defenderFleet.units.reduce(
            (sum, unit) =>
                sum + (unit.dealtDamage || 0),
            0
        );

    roundRuntime.attackerDamageReceived =
        combatRuntime.attackerFleet.units.reduce(
            (sum, unit) =>
                sum + (unit.receivedDamage || 0),
            0
        );

    roundRuntime.defenderDamageReceived =
        combatRuntime.defenderFleet.units.reduce(
            (sum, unit) =>
                sum + (unit.receivedDamage || 0),
            0
        );
}

module.exports = aggregateDamage;