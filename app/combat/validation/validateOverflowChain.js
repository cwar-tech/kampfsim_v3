// ==================================================
// app/combat/validation/validateOverflowChain.js
// ==================================================

function validateOverflowChain(
    overflowEvent
) {

    const errors = [];

    if (
        !overflowEvent ||
        typeof overflowEvent !==
        "object"
    ) {

        return {

            valid: false,

            errors: [
                "[OVERFLOW-001] overflowEvent missing"
            ]
        };
    }

    // ==========================================
    // SOURCE
    // ==========================================

    if (
        typeof overflowEvent
            .sourceRuntimeUnitId !==
        "string"
    ) {

        errors.push(

            "[OVERFLOW-002] invalid sourceRuntimeUnitId"
        );
    }

    // ==========================================
    // TARGET
    // ==========================================

    if (
        typeof overflowEvent
            .targetRuntimeUnitId !==
        "string"
    ) {

        errors.push(

            "[OVERFLOW-003] invalid targetRuntimeUnitId"
        );
    }

    // ==========================================
    // OVERFLOW DAMAGE
    // ==========================================

    if (
        typeof overflowEvent
            .overflowDamage !==
        "number"
    ) {

        errors.push(

            "[OVERFLOW-004] invalid overflowDamage"
        );
    }

    // ==========================================
    // BASIS OVERFLOW
    // ==========================================

    if (
        typeof overflowEvent
            .basisOverflowDamage !==
        "number"
    ) {

        errors.push(

            "[OVERFLOW-005] invalid basisOverflowDamage"
        );
    }

    // ==========================================
    // OVERFLOW AFTER LOSS
    // ==========================================

    if (
        typeof overflowEvent
            .overflowAfterLoss !==
        "number"
    ) {

        errors.push(

            "[OVERFLOW-006] invalid overflowAfterLoss"
        );
    }

    // ==========================================
    // NEGATIVE VALUES
    // ==========================================

    if (
        overflowEvent
            .overflowDamage < 0
    ) {

        errors.push(

            "[OVERFLOW-007] negative overflowDamage"
        );
    }

    if (
        overflowEvent
            .basisOverflowDamage < 0
    ) {

        errors.push(

            "[OVERFLOW-008] negative basisOverflowDamage"
        );
    }

    if (
        overflowEvent
            .overflowAfterLoss < 0
    ) {

        errors.push(

            "[OVERFLOW-009] negative overflowAfterLoss"
        );
    }

    // ==========================================
    // 5% RULE
    // ==========================================

    const expectedOverflow =

        Math.floor(

            overflowEvent
                .basisOverflowDamage *

            0.95
        );

    if (

        overflowEvent
            .overflowAfterLoss !==

        expectedOverflow

    ) {

        errors.push(

            `[OVERFLOW-010] overflowAfterLoss mismatch (${overflowEvent.overflowAfterLoss} != ${expectedOverflow})`
        );
    }

    return {

        valid:
            errors.length === 0,

        errors
    };
}

export default
    validateOverflowChain;