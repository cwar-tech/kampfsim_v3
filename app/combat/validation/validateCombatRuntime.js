// ==================================================
// app/combat/validation/validateCombatRuntime.js
// ==================================================

import validateFleetRuntime
    from "./validateFleetRuntime.js";

function validateCombatRuntime(
    runtime
) {

    const errors = [];

    if (
        !runtime ||
        typeof runtime !==
        "object"
    ) {

        return {

            valid: false,

            errors: [
                "[COMBAT-001] runtime missing"
            ]
        };
    }

    // ==========================================
    // COMBAT ID
    // ==========================================

    if (
        typeof runtime.combatId !==
        "string" ||
        runtime.combatId.length === 0
    ) {

        errors.push(
            "[COMBAT-002] invalid combatId"
        );
    }

    // ==========================================
    // CURRENT ROUND
    // ==========================================

    if (
        !Number.isInteger(
            runtime.currentRound
        ) ||
        runtime.currentRound < 0
    ) {

        errors.push(
            "[COMBAT-003] invalid currentRound"
        );
    }

    // ==========================================
    // ATTACKER FLEET
    // ==========================================

    const attackerValidation =
        validateFleetRuntime(
            runtime.attackerFleet
        );

    if (
        !attackerValidation.valid
    ) {

        errors.push(

            ...attackerValidation.errors
        );
    }

    // ==========================================
    // DEFENDER FLEET
    // ==========================================

    const defenderValidation =
        validateFleetRuntime(
            runtime.defenderFleet
        );

    if (
        !defenderValidation.valid
    ) {

        errors.push(

            ...defenderValidation.errors
        );
    }

    // ==========================================
    // FLAGS
    // ==========================================

    if (
        typeof runtime
            .attackerDefeated !==
        "boolean"
    ) {

        errors.push(
            "[COMBAT-004] invalid attackerDefeated"
        );
    }

    if (
        typeof runtime
            .defenderDefeated !==
        "boolean"
    ) {

        errors.push(
            "[COMBAT-005] invalid defenderDefeated"
        );
    }

    if (
        typeof runtime
            .combatFinished !==
        "boolean"
    ) {

        errors.push(
            "[COMBAT-006] invalid combatFinished"
        );
    }

    // ==========================================
    // ROUNDS
    // ==========================================

    if (
        !Array.isArray(
            runtime.rounds
        )
    ) {

        errors.push(
            "[COMBAT-007] rounds must be array"
        );
    }

    else {

        if (
            runtime.rounds.length !==
            runtime.currentRound
        ) {

            errors.push(

                `[COMBAT-008] currentRound mismatch (${runtime.currentRound} != ${runtime.rounds.length})`
            );
        }
    }

    // ==========================================
    // RESULT CONSISTENCY
    // ==========================================

    if (
        runtime.attackerDefeated &&
        runtime.defenderDefeated
    ) {

        errors.push(
            "[COMBAT-009] both fleets defeated"
        );
    }

    if (
        runtime.combatFinished &&
        !runtime.attackerDefeated &&
        !runtime.defenderDefeated
    ) {

        errors.push(
            "[COMBAT-010] combat finished without winner"
        );
    }

    return {

        valid:
            errors.length === 0,

        errors
    };
}

export default
    validateCombatRuntime;