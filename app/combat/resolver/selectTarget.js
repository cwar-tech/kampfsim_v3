function selectTarget(
    attackerUnit,
    targets
) {

    if (
        !attackerUnit ||
        !Array.isArray(targets)
    ) {
        return null;
    }

    const validTargets =
        targets.filter(
            (target) => {

                if (
                    !target ||
                    typeof target !== "object"
                ) {
                    return false;
                }

                if (
                    target.runtimeUnitId ===
                    attackerUnit.runtimeUnitId
                ) {
                    return false;
                }

                if (
                    typeof target.remainingUnits !==
                    "number" ||
                    target.remainingUnits <= 0
                ) {
                    return false;
                }

                if (
                    typeof target.hpLastUnit !==
                    "number" ||
                    target.hpLastUnit <= 0
                ) {
                    return false;
                }

                return true;
            }
        );

    if (
        validTargets.length === 0
    ) {
        return null;
    }

    return validTargets[0];
}

export default
    selectTarget;