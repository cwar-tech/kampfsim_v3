// ==================================================
// report/validation/validateOverviewData.js
// ==================================================

function validateOverviewData(
    data
) {

    if (
        !data ||
        typeof data !==
        "object"
    ) {

        throw new Error(

            "[OVERVIEW-001] OverviewData missing"
        );
    }

    if (
        typeof data.combatId !==
        "string"
    ) {

        throw new Error(

            "[OVERVIEW-002] combatId missing"
        );
    }

    if (
        typeof data.winner !==
        "string"
    ) {

        throw new Error(

            "[OVERVIEW-003] winner missing"
        );
    }

    if (
        !data.attacker
    ) {

        throw new Error(

            "[OVERVIEW-004] attacker missing"
        );
    }

    if (
        !data.defender
    ) {

        throw new Error(

            "[OVERVIEW-005] defender missing"
        );
    }

    if (
        !Array.isArray(
            data.highlights
        )
    ) {

        throw new Error(

            "[OVERVIEW-006] highlights must be array"
        );
    }

    return true;
}

export default
    validateOverviewData;