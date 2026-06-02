function calculateLosses(
    combatRuntime,
    roundRuntime
) {

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

    const attackerUnits =
        Array.isArray(
            combatRuntime
                ?.attackerFleet
                ?.units
        )
            ? combatRuntime
                .attackerFleet
                .units
            : [];

    const defenderUnits =
        Array.isArray(
            combatRuntime
                ?.defenderFleet
                ?.units
        )
            ? combatRuntime
                .defenderFleet
                .units
            : [];

    roundRuntime
        .attackerDestroyedUnits =
        Array.isArray(
            roundRuntime
                .attackerDestroyedUnits
        )
            ? roundRuntime
                .attackerDestroyedUnits
            : [];

    roundRuntime
        .defenderDestroyedUnits =
        Array.isArray(
            roundRuntime
                .defenderDestroyedUnits
        )
            ? roundRuntime
                .defenderDestroyedUnits
            : [];



    // ==========================================
    // ATTACKER LOSSES
    // ==========================================

    for (
        const unit
        of attackerUnits
    ) {

        if (
            !unit ||
            typeof unit !==
            "object"
        ) {
            continue;
        }

        if (
            typeof unit.remainingHp !==
            "number"
        ) {
            continue;
        }

        if (
            unit.remainingHp > 0
        ) {
            continue;
        }

        if (
            roundRuntime
                .attackerDestroyedUnits
                .includes(
                    unit.runtimeUnitId
                )
        ) {
            continue;
        }

        roundRuntime
            .attackerDestroyedUnits
            .push(
                unit.runtimeUnitId
            );
    }



    // ==========================================
    // DEFENDER LOSSES
    // ==========================================

    for (
        const unit
        of defenderUnits
    ) {

        if (
            !unit ||
            typeof unit !==
            "object"
        ) {
            continue;
        }

        if (
            typeof unit.remainingHp !==
            "number"
        ) {
            continue;
        }

        if (
            unit.remainingHp > 0
        ) {
            continue;
        }

        if (
            roundRuntime
                .defenderDestroyedUnits
                .includes(
                    unit.runtimeUnitId
                )
        ) {
            continue;
        }

        roundRuntime
            .defenderDestroyedUnits
            .push(
                unit.runtimeUnitId
            );
    }

    return roundRuntime;
}

export default
    calculateLosses;