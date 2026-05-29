function calculateLosses({
    combatRuntime,
    roundRuntime
}) {

    if (
        !combatRuntime ||
        typeof combatRuntime !==
        "object"
    ) {
        return null;
    }

    if (
        !roundRuntime ||
        typeof roundRuntime !==
        "object"
    ) {
        return null;
    }

    if (
        !combatRuntime.attackerFleet ||
        !combatRuntime.defenderFleet
    ) {
        return null;
    }

    const attackerDestroyedUnits =
        Array.isArray(
            roundRuntime
                .attackerDestroyedUnits
        )
            ? roundRuntime
                .attackerDestroyedUnits
            : [];

    const defenderDestroyedUnits =
        Array.isArray(
            roundRuntime
                .defenderDestroyedUnits
        )
            ? roundRuntime
                .defenderDestroyedUnits
            : [];

    roundRuntime
        .attackerDestroyedUnits =
        attackerDestroyedUnits;

    roundRuntime
        .defenderDestroyedUnits =
        defenderDestroyedUnits;

    const allUnits = [

        ...combatRuntime
            .attackerFleet
            .units,

        ...combatRuntime
            .defenderFleet
            .units
    ];

    for (
        const unit
        of allUnits
    ) {

        if (
            !unit ||
            typeof unit !==
            "object"
        ) {
            continue;
        }

        if (
            typeof unit.remainingUnits !==
            "number" ||
            unit.remainingUnits < 0
        ) {
            continue;
        }

        if (
            typeof unit.hp !==
            "number" ||
            unit.hp <= 0
        ) {
            continue;
        }

        if (
            typeof unit.hpLastUnit !==
            "number" ||
            unit.hpLastUnit < 0
        ) {
            continue;
        }

        const totalHpBeforeDamage =
            (
                (
                    unit.remainingUnits -
                    1
                ) *
                unit.hp
            ) +
            unit.hpLastUnit;

        const receivedDamage =
            typeof unit.receivedDamage ===
                "number" &&
                unit.receivedDamage > 0
                ? unit.receivedDamage
                : 0;

        const remainingHp =
            Math.max(
                0,
                totalHpBeforeDamage -
                receivedDamage
            );

        // ==========================================
        // COMPLETE DESTRUCTION
        // ==========================================

        if (
            remainingHp === 0
        ) {

            unit.remainingUnits = 0;

            unit.hpLastUnit = 0;

            if (
                combatRuntime
                    .attackerFleet
                    .units
                    .includes(unit)
            ) {

                roundRuntime
                    .attackerDestroyedUnits
                    .push(
                        unit.runtimeUnitId
                    );
            }

            if (
                combatRuntime
                    .defenderFleet
                    .units
                    .includes(unit)
            ) {

                roundRuntime
                    .defenderDestroyedUnits
                    .push(
                        unit.runtimeUnitId
                    );
            }

            continue;
        }

        // ==========================================
        // PARTIAL REMAINING HP
        // ==========================================

        const fullUnits =
            Math.floor(
                remainingHp /
                unit.hp
            );

        const remainingLastHp =
            remainingHp %
            unit.hp;

        if (
            remainingLastHp === 0
        ) {

            unit.remainingUnits =
                fullUnits;

            unit.hpLastUnit =
                unit.hp;
        }
        else {

            unit.remainingUnits =
                fullUnits + 1;

            unit.hpLastUnit =
                remainingLastHp;
        }

        if (
            unit.remainingUnits < 0
        ) {

            unit.remainingUnits = 0;
        }

        if (
            unit.hpLastUnit < 0
        ) {

            unit.hpLastUnit = 0;
        }
    }

    return {
        combatRuntime,
        roundRuntime
    };
}

export default
    calculateLosses;