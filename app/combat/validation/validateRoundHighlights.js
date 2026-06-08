// ==================================================
// app/combat/validation/validateRoundHighlights.js
// ==================================================

function validateRoundHighlights(
    highlights
) {

    const errors = [];

    if (
        !Array.isArray(
            highlights
        )
    ) {

        return {

            valid: false,

            errors: [
                "[HIGHLIGHT-001] highlights must be array"
            ]
        };
    }

    for (
        const highlight
        of highlights
    ) {

        if (
            !Number.isInteger(
                highlight.roundNumber
            )
        ) {

            errors.push(
                "[HIGHLIGHT-002] invalid roundNumber"
            );
        }

        if (
            typeof highlight.highlightType !==
            "string"
        ) {

            errors.push(
                "[HIGHLIGHT-003] invalid highlightType"
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
    validateRoundHighlights;