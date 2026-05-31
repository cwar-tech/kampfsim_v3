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

    const allUnits = [

        ...attackerUnits,
        ...defenderUnits
    ];

    roundRuntime.destroyedUnits =
        Array.isArray(
            roundRuntime
                .destroyedUnits
        )
            ? roundRuntime
                .destroyedUnits
            : [];

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
            .destroyedUnits
            .push({

                runtimeUnitId:
                    unit.runtimeUnitId
            });
    }

}

export default
    calculateLosses;