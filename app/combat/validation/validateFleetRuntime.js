// ==================================================
// app/combat/validation/validateFleetRuntime.js
// ==================================================

import validateUnitRuntime
    from "./validateUnitRuntime.js";

function validateFleetRuntime(
    fleet
) {

    const errors = [];

    if (
        !fleet ||
        typeof fleet !== "object"
    ) {

        return {

            valid: false,

            errors: [
                "[FLEET-001] fleet missing"
            ]
        };
    }

    // ==========================================
    // BASIC FIELDS
    // ==========================================

    if (
        typeof fleet.totalUnits !==
        "number"
    ) {

        errors.push(
            "[FLEET-002] invalid totalUnits"
        );
    }

    if (
        typeof fleet.totalHp !==
        "number"
    ) {

        errors.push(
            "[FLEET-003] invalid totalHp"
        );
    }

    if (
        typeof fleet.totalDamage !==
        "number"
    ) {

        errors.push(
            "[FLEET-004] invalid totalDamage"
        );
    }

    if (
        typeof fleet.totalVolume !==
        "number"
    ) {

        errors.push(
            "[FLEET-005] invalid totalVolume"
        );
    }

    if (
        !Array.isArray(
            fleet.units
        )
    ) {

        errors.push(
            "[FLEET-006] units must be array"
        );
    }

    if (
        errors.length > 0
    ) {

        return {

            valid: false,

            errors
        };
    }

    // ==========================================
    // UNIT VALIDATION
    // ==========================================

    const runtimeIds =
        new Set();

    let calculatedUnits = 0;

    let calculatedHp = 0;

    let calculatedDamage = 0;

    let calculatedVolume = 0;

    for (
        const unit
        of fleet.units
    ) {

        const result =
            validateUnitRuntime(
                unit
            );

        if (
            !result.valid
        ) {

            errors.push(
                ...result.errors
            );
        }

        // ==========================
        // DUPLICATE IDS
        // ==========================

        if (
            runtimeIds.has(
                unit.runtimeUnitId
            )
        ) {

            errors.push(

                `[FLEET-007] duplicate runtimeUnitId ${unit.runtimeUnitId}`
            );
        }

        runtimeIds.add(
            unit.runtimeUnitId
        );

        // ==========================
        // SUMS
        // ==========================

        calculatedUnits +=
            unit.remainingUnits;

        calculatedHp +=
            unit.remainingHp;

        calculatedDamage +=
            unit.totalDamage;

        calculatedVolume +=
            unit.remainingVolume;
    }

    // ==========================================
    // FLEET TOTALS
    // ==========================================

    if (
        calculatedUnits !==
        fleet.totalUnits
    ) {

        errors.push(

            `[FLEET-008] totalUnits mismatch (${fleet.totalUnits} != ${calculatedUnits})`
        );
    }

    if (
        calculatedHp !==
        fleet.totalHp
    ) {

        errors.push(

            `[FLEET-009] totalHp mismatch (${fleet.totalHp} != ${calculatedHp})`
        );
    }

    if (
        calculatedDamage !==
        fleet.totalDamage
    ) {

        errors.push(

            `[FLEET-010] totalDamage mismatch (${fleet.totalDamage} != ${calculatedDamage})`
        );
    }

    if (
        calculatedVolume !==
        fleet.totalVolume
    ) {

        errors.push(

            `[FLEET-011] totalVolume mismatch (${fleet.totalVolume} != ${calculatedVolume})`
        );
    }

    return {

        valid:
            errors.length === 0,

        errors
    };
}

export default
    validateFleetRuntime;