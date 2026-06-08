// ==================================================
// app/combat/validation/validateOutcomeFactors.js
// ==================================================

function validateOutcomeFactors(
    factors
) {

    const errors = [];

    if (
        !Array.isArray(
            factors
        )
    ) {

        return {

            valid: false,

            errors: [
                "[OUTCOME-001] factors must be array"
            ]
        };
    }

    for (
        const factor
        of factors
    ) {

        if (
            typeof factor.factorId !==
            "string"
        ) {

            errors.push(
                "[OUTCOME-002] invalid factorId"
            );
        }

        if (
            typeof factor.score !==
            "number"
        ) {

            errors.push(
                "[OUTCOME-003] invalid score"
            );
        }

        if (
            typeof factor.description !==
            "string"
        ) {

            errors.push(
                "[OUTCOME-004] invalid description"
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
    validateOutcomeFactors;