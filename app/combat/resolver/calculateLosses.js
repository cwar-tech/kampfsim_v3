function calculateLosses({
    combatRuntime,
    roundRuntime
}) {
    const allUnits = [
        ...combatRuntime.attackerFleet.units,
        ...combatRuntime.defenderFleet.units
    ];

    for (const unit of allUnits) {
        const totalHpBeforeDamage =
            ((unit.remainingUnits - 1) *
                unit.hp) +
            unit.hpLastUnit;

        const remainingHp =
            Math.max(
                0,
                totalHpBeforeDamage -
                (unit.receivedDamage || 0)
            );

        if (remainingHp === 0) {
            unit.remainingUnits = 0;
            unit.hpLastUnit = 0;

            if (
                combatRuntime.attackerFleet.units.includes(
                    unit
                )
            ) {
                roundRuntime.attackerDestroyedUnits.push(
                    unit.runtimeUnitId
                );
            }

            if (
                combatRuntime.defenderFleet.units.includes(
                    unit
                )
            ) {
                roundRuntime.defenderDestroyedUnits.push(
                    unit.runtimeUnitId
                );
            }

            continue;
        }

        const fullUnits =
            Math.floor(
                remainingHp / unit.hp
            );

        const remainingLastHp =
            remainingHp % unit.hp;

        if (remainingLastHp === 0) {
            unit.remainingUnits = fullUnits;
            unit.hpLastUnit = unit.hp;
        } else {
            unit.remainingUnits =
                fullUnits + 1;

            unit.hpLastUnit =
                remainingLastHp;
        }
    }
}

module.exports = calculateLosses;