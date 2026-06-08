// ==================================================
// app/combat/validation/validateUnitRuntime.js
// ==================================================

function validateUnitRuntime(
    unit
) {

    const errors = [];

    if (
        !unit ||
        typeof unit !== "object"
    ) {

        return {

            valid: false,

            errors: [
                "[UNIT-001] unit missing"
            ]
        };
    }

    // ==========================================
    // IDS
    // ==========================================

    if (
        typeof unit.runtimeUnitId !==
        "string" ||
        unit.runtimeUnitId.length === 0
    ) {

        errors.push(
            "[UNIT-002] invalid runtimeUnitId"
        );
    }

    if (
        typeof unit.shipTemplateId !==
        "string" ||
        unit.shipTemplateId.length === 0
    ) {

        errors.push(
            "[UNIT-003] invalid shipTemplateId"
        );
    }

    if (
        typeof unit.unitTypeId !==
        "string" ||
        unit.unitTypeId.length === 0
    ) {

        errors.push(
            "[UNIT-004] invalid unitTypeId"
        );
    }

    // ==========================================
    // COUNTS
    // ==========================================

    if (
        !Number.isInteger(
            unit.unitCount
        ) ||
        unit.unitCount < 0
    ) {

        errors.push(
            "[UNIT-005] invalid unitCount"
        );
    }

    if (
        !Number.isInteger(
            unit.remainingUnits
        ) ||
        unit.remainingUnits < 0
    ) {

        errors.push(
            "[UNIT-006] invalid remainingUnits"
        );
    }

    if (
        unit.remainingUnits >
        unit.unitCount
    ) {

        errors.push(
            "[UNIT-007] remainingUnits exceeds unitCount"
        );
    }

    // ==========================================
    // HP
    // ==========================================

    if (
        typeof unit.hpPerUnit !==
        "number" ||
        unit.hpPerUnit <= 0
    ) {

        errors.push(
            "[UNIT-008] invalid hpPerUnit"
        );
    }

    if (
        typeof unit.totalHp !==
        "number" ||
        unit.totalHp < 0
    ) {

        errors.push(
            "[UNIT-009] invalid totalHp"
        );
    }

    if (
        typeof unit.remainingHp !==
        "number" ||
        unit.remainingHp < 0
    ) {

        errors.push(
            "[UNIT-010] invalid remainingHp"
        );
    }

    if (
        unit.remainingHp >
        unit.totalHp
    ) {

        errors.push(
            "[UNIT-011] remainingHp exceeds totalHp"
        );
    }

    // ==========================================
    // DAMAGE
    // ==========================================

    if (
        typeof unit.dmgPerUnit !==
        "number" ||
        unit.dmgPerUnit < 0
    ) {

        errors.push(
            "[UNIT-012] invalid dmgPerUnit"
        );
    }

    if (
        typeof unit.totalDamage !==
        "number" ||
        unit.totalDamage < 0
    ) {

        errors.push(
            "[UNIT-013] invalid totalDamage"
        );
    }

    // ==========================================
    // VOLUME
    // ==========================================

    if (
        typeof unit.volumePerUnit !==
        "number" ||
        unit.volumePerUnit < 0
    ) {

        errors.push(
            "[UNIT-014] invalid volumePerUnit"
        );
    }

    if (
        typeof unit.remainingVolume !==
        "number" ||
        unit.remainingVolume < 0
    ) {

        errors.push(
            "[UNIT-015] invalid remainingVolume"
        );
    }

    // ==========================================
    // DAMAGE TRACKING
    // ==========================================

    if (
        typeof unit.receivedDamage !==
        "number" ||
        unit.receivedDamage < 0
    ) {

        errors.push(
            "[UNIT-016] invalid receivedDamage"
        );
    }

    // ==========================================
    // DESTROYED STATE
    // ==========================================

    if (
        typeof unit.destroyed !==
        "boolean"
    ) {

        errors.push(
            "[UNIT-017] invalid destroyed flag"
        );
    }

    if (
        unit.destroyed &&
        unit.remainingHp > 0
    ) {

        errors.push(
            "[UNIT-018] destroyed unit still has hp"
        );
    }

    if (
        unit.destroyed &&
        unit.remainingUnits > 0
    ) {

        errors.push(
            "[UNIT-019] destroyed unit still has units"
        );
    }

    return {

        valid:
            errors.length === 0,

        errors
    };
}

export default
    validateUnitRuntime;