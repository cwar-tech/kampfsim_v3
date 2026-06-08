// ==================================================
// app/combat/validation/validateCounterStats.js
// ==================================================

function validateCounterStats(
    counterStats
) {

    const errors = [];

    if (
        !Array.isArray(
            counterStats
        )
    ) {

        return {

            valid: false,

            errors: [
                "[COUNTER-001] counterStats must be array"
            ]
        };
    }

    for (
        const stat
        of counterStats
    ) {

        if (
            typeof stat.attackerTypeId !==
            "string"
        ) {

            errors.push(
                "[COUNTER-002] invalid attackerTypeId"
            );
        }

        if (
            typeof stat.targetTypeId !==
            "string"
        ) {

            errors.push(
                "[COUNTER-003] invalid targetTypeId"
            );
        }

        if (
            typeof stat.attacks !==
            "number"
        ) {

            errors.push(
                "[COUNTER-004] invalid attacks"
            );
        }

        if (
            typeof stat.totalDamage !==
            "number"
        ) {

            errors.push(
                "[COUNTER-005] invalid totalDamage"
            );
        }

        if (
            typeof stat.totalAppliedDamage !==
            "number"
        ) {

            errors.push(
                "[COUNTER-006] invalid totalAppliedDamage"
            );
        }

        if (
            typeof stat.totalOverflowDamage !==
            "number"
        ) {

            errors.push(
                "[COUNTER-007] invalid totalOverflowDamage"
            );
        }

        if (
            typeof stat.averageDamage !==
            "number"
        ) {

            errors.push(
                "[COUNTER-008] invalid averageDamage"
            );
        }

        if (
            typeof stat.averageMultiplier !==
            "number"
        ) {

            errors.push(
                "[COUNTER-009] invalid averageMultiplier"
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
    validateCounterStats;