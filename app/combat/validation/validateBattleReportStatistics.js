// ==================================================
// app/combat/validation/validateBattleReportStatistics.js
// ==================================================

function validateBattleReportStatistics(
    statistics
) {

    const errors = [];

    if (
        !statistics
    ) {

        return {

            valid: false,

            errors: [
                "[STATS-001] statistics missing"
            ]
        };
    }

    const fields = [

        "attackerDamage",
        "defenderDamage",
        "attackerLosses",
        "defenderLosses"
    ];

    for (
        const field
        of fields
    ) {

        if (
            typeof statistics[field] !==
            "number"
        ) {

            errors.push(

                `[STATS-002] invalid ${field}`
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
    validateBattleReportStatistics;