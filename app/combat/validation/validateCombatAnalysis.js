// ==================================================
// app/combat/validation/validateCombatAnalysis.js
// ==================================================

function validateCombatAnalysis(
    analysis
) {

    const errors = [];

    if (
        !analysis ||
        typeof analysis !==
        "object"
    ) {

        return {

            valid: false,

            errors: [
                "[ANALYSIS-001] analysis missing"
            ]
        };
    }

    // ==========================================
    // MILESTONES
    // ==========================================

    if (
        !Array.isArray(
            analysis.milestones
        )
    ) {

        errors.push(

            "[ANALYSIS-002] milestones must be array"
        );
    }

    // ==========================================
    // COUNTER STATS
    // ==========================================

    if (
        !Array.isArray(
            analysis.counterStats
        )
    ) {

        errors.push(

            "[ANALYSIS-003] counterStats must be array"
        );
    }

    // ==========================================
    // ROUND HIGHLIGHTS
    // ==========================================

    if (
        !Array.isArray(
            analysis.roundHighlights
        )
    ) {

        errors.push(

            "[ANALYSIS-004] roundHighlights must be array"
        );
    }

    // ==========================================
    // OUTCOME FACTORS
    // ==========================================

    if (
        !Array.isArray(
            analysis.outcomeFactors
        )
    ) {

        errors.push(

            "[ANALYSIS-005] outcomeFactors must be array"
        );
    }

    // ==========================================
    // VOLUME TIMELINE
    // ==========================================

    if (
        !Array.isArray(
            analysis.volumeTimeline
        )
    ) {

        errors.push(

            "[ANALYSIS-006] volumeTimeline must be array"
        );
    }

    return {

        valid:
            errors.length === 0,

        errors
    };
}

export default
    validateCombatAnalysis;