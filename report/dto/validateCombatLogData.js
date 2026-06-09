// ==================================================
// report/validation/validateCombatLogData.js
// ==================================================

function validateCombatLogData(
    data
) {

    if (
        !data ||
        typeof data !==
        "object"
    ) {

        throw new Error(

            "[LOG-001] CombatLogData missing"
        );
    }

    if (
        !Array.isArray(
            data.rounds
        )
    ) {

        throw new Error(

            "[LOG-002] rounds must be array"
        );
    }

    return true;
}

export default
    validateCombatLogData;