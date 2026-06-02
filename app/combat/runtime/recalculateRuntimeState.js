function recalculateRuntimeState(
    runtime
) {

    if (
        !runtime ||
        typeof runtime !==
        "object"
    ) {
        return null;
    }

    if (
        typeof runtime.remainingHp !==
        "number"
    ) {
        return null;
    }

    if (
        typeof runtime.hpPerUnit !==
        "number"
    ) {
        return null;
    }

    if (
        typeof runtime.unitCount !==
        "number"
    ) {
        return null;
    }

    // ==========================================
    // TOTAL HP
    // ==========================================

    const totalHp =
        runtime.unitCount *
        runtime.hpPerUnit;

    // ==========================================
    // HP CLAMPING
    // ==========================================

    runtime.remainingHp =
        Math.max(
            0,
            Math.round(
                runtime.remainingHp
            )
        );

    runtime.remainingHp =
        Math.min(
            runtime.remainingHp,
            totalHp
        );

    // ==========================================
    // DESTROYED
    // ==========================================

    runtime.destroyed =
        runtime.remainingHp <= 0;

    // ==========================================
    // REMAINING UNITS
    // ==========================================

    if (
        runtime.destroyed
    ) {

        runtime.remainingUnits = 0;
    }
    else {

        runtime.remainingUnits =
            Math.ceil(

                runtime.remainingHp /
                runtime.hpPerUnit
            );
    }

    // ==========================================
    // TEMPORARY COMPATIBILITY FIELD
    // TODO REMOVE hpLastUnit
    // ==========================================

    if (
        runtime.destroyed
    ) {

        runtime.hpLastUnit = 0;
    }
    else {

        const remainder =
            runtime.remainingHp %
            runtime.hpPerUnit;

        runtime.hpLastUnit =
            remainder === 0
                ? runtime.hpPerUnit
                : remainder;
    }

    return runtime;
}

export default
    recalculateRuntimeState;