function calculateLosses(
    combatRuntime,
    roundRuntime
) {

    if (
        !combatRuntime ||
        typeof combatRuntime !==
        "object"
    ) {
        return;
    }

    if (
        !roundRuntime ||
        typeof roundRuntime !==
        "object"
    ) {
        return;
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
            typeof unit.remainingUnits !==
            "number"
        ) {
            continue;
        }

        if (
            unit.remainingUnits > 0
        ) {
            continue;
        }

        roundRuntime
            .attackerDestroyedUnits
            .push(
                unit.runtimeUnitId
            );
    }

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
            typeof unit.remainingUnits !==
            "number"
        ) {
            continue;
        }

        if (
            unit.remainingUnits > 0
        ) {
            continue;
        }

        roundRuntime
            .defenderDestroyedUnits
            .push(
                unit.runtimeUnitId
            );
    }
}

export default
    calculateLosses;