// ==================================================
// report/validation/validateTechnicalData.js
// ==================================================

function validateTechnicalData(
    data
) {

    if (
        !data ||
        typeof data !==
        "object"
    ) {

        throw new Error(

            "[TECH-001] TechnicalData missing"
        );
    }

    if (
        !Array.isArray(
            data.damageEvents
        )
    ) {

        throw new Error(

            "[TECH-002] damageEvents must be array"
        );
    }

    if (
        !Array.isArray(
            data.overflowEvents
        )
    ) {

        throw new Error(

            "[TECH-003] overflowEvents must be array"
        );
    }

    if (
        !Array.isArray(
            data.resolverData
        )
    ) {

        throw new Error(

            "[TECH-004] resolverData must be array"
        );
    }

    if (
        !Array.isArray(
            data.exports
        )
    ) {

        throw new Error(

            "[TECH-005] exports must be array"
        );
    }

    return true;
}

export default
    validateTechnicalData;