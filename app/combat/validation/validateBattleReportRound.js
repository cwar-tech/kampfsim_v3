// ==================================================
// app/combat/validation/validateBattleReportRound.js
// ==================================================

function validateBattleReportRound(
    round
) {

    const errors = [];

    if (
        !round
    ) {

        return {

            valid: false,

            errors: [
                "[REPORT-ROUND-001] round missing"
            ]
        };
    }

    if (
        !Number.isInteger(
            round.roundNumber
        )
    ) {

        errors.push(

            "[REPORT-ROUND-002] invalid roundNumber"
        );
    }

    if (
        !Array.isArray(
            round.highlights
        )
    ) {

        errors.push(

            "[REPORT-ROUND-003] highlights missing"
        );
    }

    if (
        !Array.isArray(
            round.damageEvents
        )
    ) {

        errors.push(

            "[REPORT-ROUND-004] damageEvents missing"
        );
    }

    if (
        !Array.isArray(
            round.destroyedUnits
        )
    ) {

        errors.push(

            "[REPORT-ROUND-005] destroyedUnits missing"
        );
    }

    return {

        valid:
            errors.length === 0,

        errors
    };
}

export default
    validateBattleReportRound;