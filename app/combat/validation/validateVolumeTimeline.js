// ==================================================
// app/combat/validation/validateVolumeTimeline.js
// ==================================================

function validateVolumeTimeline(
    timeline
) {

    const errors = [];

    if (
        !Array.isArray(
            timeline
        )
    ) {

        return {

            valid: false,

            errors: [
                "[TIMELINE-001] timeline must be array"
            ]
        };
    }

    for (
        const entry
        of timeline
    ) {

        if (
            !Number.isInteger(
                entry.roundNumber
            )
        ) {

            errors.push(
                "[TIMELINE-002] invalid roundNumber"
            );
        }

        if (
            typeof entry.attackerVolume !==
            "number"
        ) {

            errors.push(
                "[TIMELINE-003] invalid attackerVolume"
            );
        }

        if (
            typeof entry.defenderVolume !==
            "number"
        ) {

            errors.push(
                "[TIMELINE-004] invalid defenderVolume"
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
    validateVolumeTimeline;