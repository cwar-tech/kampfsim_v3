// ==================================================
// report/validation/validateCombatAnalysisData.js
// ==================================================

function validateCombatAnalysisData(
    data
) {

    if (
        !data ||
        typeof data !==
        "object"
    ) {

        throw new Error(

            "[ANALYSIS-001] CombatAnalysisData missing"
        );
    }

    if (
        !Array.isArray(
            data.outcomeFactors
        )
    ) {

        throw new Error(

            "[ANALYSIS-002] outcomeFactors must be array"
        );
    }

    if (
        !Array.isArray(
            data.counterStats
        )
    ) {

        throw new Error(

            "[ANALYSIS-003] counterStats must be array"
        );
    }

    if (
        !Array.isArray(
            data.milestones
        )
    ) {

        throw new Error(

            "[ANALYSIS-004] milestones must be array"
        );
    }

    if (
        !Array.isArray(
            data.highlights
        )
    ) {

        throw new Error(

            "[ANALYSIS-005] highlights must be array"
        );
    }

    return true;
}

export default
    validateCombatAnalysisData;