function aggregateDamage(
    damageEvents
) {

    if (
        !Array.isArray(
            damageEvents
        )
    ) {
        return null;
    }

    const aggregation = {};

    for (
        const event
        of damageEvents
    ) {

        if (
            !event ||
            typeof event !== "object"
        ) {
            continue;
        }

        const {
            targetRuntimeUnitId,
            appliedDamage,
            overflowDamage
        } = event;

        if (
            typeof targetRuntimeUnitId !==
            "string"
        ) {
            continue;
        }

        if (
            typeof appliedDamage !==
            "number" ||
            appliedDamage < 0
        ) {
            continue;
        }

        if (
            typeof overflowDamage !==
            "number" ||
            overflowDamage < 0
        ) {
            continue;
        }

        if (
            !aggregation[
            targetRuntimeUnitId
            ]
        ) {

            aggregation[
                targetRuntimeUnitId
            ] = {

                appliedDamage: 0,

                overflowDamage: 0
            };
        }

        aggregation[
            targetRuntimeUnitId
        ].appliedDamage +=
            appliedDamage;

        aggregation[
            targetRuntimeUnitId
        ].overflowDamage +=
            overflowDamage;
    }

    return aggregation;
}

export default
    aggregateDamage;