function recalculateRuntimeState(
    runtime
) {

    if (
        !runtime ||
        typeof runtime !==
        "object"
    ) {
        throw new Error(
            "[STATE-001] Runtime missing"
        );
    }

    if (
        typeof runtime.remainingHp !==
        "number"
    ) {
        throw new Error(
            `[STATE-002] remainingHp invalid (${runtime.unitTypeId})`
        );
    }

    if (
        typeof runtime.hpPerUnit !==
        "number"
    ) {
        throw new Error(
            `[STATE-003] hpPerUnit invalid (${runtime.unitTypeId})`
        );
    }

    if (
        typeof runtime.unitCount !==
        "number"
    ) {
        throw new Error(
            `[STATE-004] unitCount invalid (${runtime.unitTypeId})`
        );
    }

    if (
        typeof runtime.dmgPerUnit !==
        "number"
    ) {
        throw new Error(
            `[STATE-005] dmgPerUnit invalid (${runtime.unitTypeId})`
        );
    }

    if (
        typeof runtime.volumePerUnit !==
        "number"
    ) {
        throw new Error(
            `[STATE-006] volumePerUnit invalid (${runtime.unitTypeId})`
        );
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
    // HP LAST UNIT
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

    // ==========================================
    // DERIVED VALUES
    // ==========================================

    runtime.totalDamage =

        runtime.remainingUnits *
        runtime.dmgPerUnit;

    runtime.remainingVolume =

        runtime.remainingUnits *
        runtime.volumePerUnit;

    // ==========================================
    // RUNTIME INTEGRITY
    // ==========================================

    if (
        runtime.remainingUnits < 0
    ) {
        throw new Error(

            `[STATE-021] Negative unit count (${runtime.unitTypeId})`

        );
    }

    if (
        runtime.remainingHp < 0
    ) {
        throw new Error(

            `[STATE-022] Negative HP (${runtime.unitTypeId})`

        );
    }

    if (
        runtime.totalDamage < 0
    ) {
        throw new Error(

            `[STATE-023] Negative damage (${runtime.unitTypeId})`

        );
    }

    if (
        runtime.remainingVolume < 0
    ) {
        throw new Error(

            `[STATE-024] Negative volume (${runtime.unitTypeId})`

        );
    }

    if (
        runtime.remainingUnits === 0 &&
        runtime.totalDamage > 0
    ) {
        throw new Error(

            `[STATE-025] Destroyed unit still has damage (${runtime.unitTypeId})`

        );
    }

    if (
        runtime.remainingUnits === 0 &&
        runtime.remainingVolume > 0
    ) {
        throw new Error(

            `[STATE-026] Destroyed unit still has volume (${runtime.unitTypeId})`

        );
    }

    return runtime;
}

export default
    recalculateRuntimeState;