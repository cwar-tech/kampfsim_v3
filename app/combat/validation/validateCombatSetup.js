// ==================================================
// app/combat/validation/validateCombatSetup.js
// ==================================================

function validateCombatSetup({

    attacker = [],
    defender = []

}) {

    const errors = [];

    // ==========================================
    // ARRAYS
    // ==========================================

    if (
        !Array.isArray(attacker)
    ) {

        errors.push(
            "[SETUP-001] attacker must be an array"
        );
    }

    if (
        !Array.isArray(defender)
    ) {

        errors.push(
            "[SETUP-002] defender must be an array"
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
    // EMPTY FLEETS
    // ==========================================

    if (
        attacker.length === 0
    ) {

        errors.push(
            "[SETUP-003] attacker fleet is empty"
        );
    }

    if (
        defender.length === 0
    ) {

        errors.push(
            "[SETUP-004] defender fleet is empty"
        );
    }

    // ==========================================
    // ATTACKER DEFENSE CHECK
    // ==========================================

    const attackerHasDefense =

        attacker.some(

            unit =>

                unit.unitTypeId?.startsWith(
                    "def_"
                )
        );

    if (
        attackerHasDefense
    ) {

        errors.push(
            "[SETUP-005] defense units cannot attack"
        );
    }

    // ==========================================
    // COUNTS
    // ==========================================

    for (
        const unit
        of [
            ...attacker,
            ...defender
        ]
    ) {

        if (
            typeof unit.count !==
            "number"
        ) {

            errors.push(

                `[SETUP-006] count missing for ${unit.unitTypeId}`
            );

            continue;
        }

        if (
            unit.count <= 0
        ) {

            errors.push(

                `[SETUP-007] invalid count for ${unit.unitTypeId}`
            );
        }
    }

    return {

        valid:
            errors.length === 0,

        errors
    };
}

export default
    validateCombatSetup;