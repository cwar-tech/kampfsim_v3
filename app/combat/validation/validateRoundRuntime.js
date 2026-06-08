// ==================================================
// app/combat/validation/validateRoundRuntime.js
// ==================================================

import validateDamageEvent
    from "./validateDamageEvent.js";

function validateRoundRuntime(
    roundRuntime
) {

    const errors = [];

    if (
        !roundRuntime ||
        typeof roundRuntime !==
        "object"
    ) {

        return {

            valid: false,

            errors: [
                "[ROUND-VALIDATION-001] roundRuntime missing"
            ]
        };
    }

    // ==========================================
    // ROUND NUMBER
    // ==========================================

    if (
        !Number.isInteger(
            roundRuntime.roundNumber
        )
    ) {

        errors.push(

            "[ROUND-VALIDATION-002] invalid roundNumber"
        );
    }

    // ==========================================
    // ARRAYS
    // ==========================================

    if (
        !Array.isArray(
            roundRuntime.damageEvents
        )
    ) {

        errors.push(

            "[ROUND-VALIDATION-003] damageEvents must be array"
        );
    }

    if (
        !Array.isArray(
            roundRuntime.overflowEvents
        )
    ) {

        errors.push(

            "[ROUND-VALIDATION-004] overflowEvents must be array"
        );
    }

    if (
        !Array.isArray(
            roundRuntime.attackerDestroyedUnits
        )
    ) {

        errors.push(

            "[ROUND-VALIDATION-005] attackerDestroyedUnits must be array"
        );
    }

    if (
        !Array.isArray(
            roundRuntime.defenderDestroyedUnits
        )
    ) {

        errors.push(

            "[ROUND-VALIDATION-006] defenderDestroyedUnits must be array"
        );
    }

    if (
        !Array.isArray(
            roundRuntime.milestones
        )
    ) {

        errors.push(

            "[ROUND-VALIDATION-007] milestones must be array"
        );
    }

    // ==========================================
    // NUMBERS
    // ==========================================

    const numericFields = [

        "attackerDamageDealt",

        "defenderDamageDealt",

        "attackerDamageReceived",

        "defenderDamageReceived"
    ];

    for (
        const field
        of numericFields
    ) {

        if (
            typeof roundRuntime[field] !==
            "number"
        ) {

            errors.push(

                `[ROUND-VALIDATION-008] invalid ${field}`
            );
        }
    }

    // ==========================================
    // DAMAGE EVENT VALIDATION
    // ==========================================

    let totalAppliedDamage =
        0;

    for (
        const event
        of (
            roundRuntime.damageEvents ||
            []
        )
    ) {

        const result =
            validateDamageEvent(
                event
            );

        if (
            !result.valid
        ) {

            errors.push(
                ...result.errors
            );
        }

        totalAppliedDamage +=
            event.appliedDamage || 0;
    }

    // ==========================================
    // DAMAGE CONSISTENCY
    // ==========================================

    const totalDamageDealt =

        (
            roundRuntime
                .attackerDamageDealt || 0
        )

        +

        (
            roundRuntime
                .defenderDamageDealt || 0
        );

    if (
        totalDamageDealt !==
        totalAppliedDamage
    ) {

        errors.push(

            `[ROUND-VALIDATION-009] damage mismatch (${totalDamageDealt} != ${totalAppliedDamage})`
        );
    }

    // ==========================================
    // RECEIVED CONSISTENCY
    // ==========================================

    const totalDamageReceived =

        (
            roundRuntime
                .attackerDamageReceived || 0
        )

        +

        (
            roundRuntime
                .defenderDamageReceived || 0
        );

    if (
        totalDamageReceived !==
        totalAppliedDamage
    ) {

        errors.push(

            `[ROUND-VALIDATION-010] received damage mismatch (${totalDamageReceived} != ${totalAppliedDamage})`
        );
    }

    // ==========================================
    // ATTACKER VS DEFENDER
    // ==========================================

    if (

        roundRuntime.attackerDamageDealt !==

        roundRuntime.defenderDamageReceived

    ) {

        errors.push(

            "[ROUND-VALIDATION-011] attackerDamageDealt != defenderDamageReceived"
        );
    }

    if (

        roundRuntime.defenderDamageDealt !==

        roundRuntime.attackerDamageReceived

    ) {

        errors.push(

            "[ROUND-VALIDATION-012] defenderDamageDealt != attackerDamageReceived"
        );
    }

    return {

        valid:
            errors.length === 0,

        errors
    };
}

export default
    validateRoundRuntime;