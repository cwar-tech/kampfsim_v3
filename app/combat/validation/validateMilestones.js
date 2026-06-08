// ==================================================
// app/combat/validation/validateMilestones.js
// ==================================================

function validateMilestones(
    milestones
) {

    const errors = [];

    if (
        !Array.isArray(
            milestones
        )
    ) {

        return {

            valid: false,

            errors: [
                "[MILESTONE-001] milestones must be array"
            ]
        };
    }

    for (
        const milestone
        of milestones
    ) {

        if (
            typeof milestone.milestoneId !==
            "string"
        ) {

            errors.push(
                "[MILESTONE-002] invalid milestoneId"
            );
        }

        if (
            !Number.isInteger(
                milestone.roundNumber
            )
        ) {

            errors.push(
                "[MILESTONE-003] invalid roundNumber"
            );
        }

        if (
            typeof milestone.title !==
            "string"
        ) {

            errors.push(
                "[MILESTONE-004] invalid title"
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
    validateMilestones;