// ==================================================
// report/validation/validateAdvantageData.js
// ==================================================

function validateAdvantageData(
    data
) {

    if (
        !data ||
        typeof data !==
        "object"
    ) {

        throw new Error(

            "[ADVANTAGE-001] AdvantageData missing"
        );
    }

    if (
        !data.attacker
    ) {

        throw new Error(

            "[ADVANTAGE-002] attacker missing"
        );
    }

    if (
        !data.defender
    ) {

        throw new Error(

            "[ADVANTAGE-003] defender missing"
        );
    }

    return true;
}

export default
    validateAdvantageData;