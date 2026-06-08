// ==================================================
// app/combat/validation/validateBattleReportHeader.js
// ==================================================

function validateBattleReportHeader(
    header
) {

    const errors = [];

    if (
        !header
    ) {

        return {

            valid: false,

            errors: [
                "[HEADER-001] header missing"
            ]
        };
    }

    if (
        typeof header.combatId !==
        "string"
    ) {

        errors.push(
            "[HEADER-002] invalid combatId"
        );
    }

    if (
        typeof header.combatResult !==
        "string"
    ) {

        errors.push(
            "[HEADER-003] invalid combatResult"
        );
    }

    if (
        !Number.isInteger(
            header.roundCount
        )
    ) {

        errors.push(
            "[HEADER-004] invalid roundCount"
        );
    }

    return {

        valid:
            errors.length === 0,

        errors
    };
}

export default
    validateBattleReportHeader;