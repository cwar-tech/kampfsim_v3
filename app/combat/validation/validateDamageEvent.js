// ==================================================
// app/combat/validation/validateDamageEvent.js
// ==================================================

function validateDamageEvent(
    event
) {

    const errors = [];

    if (
        !event ||
        typeof event !==
        "object"
    ) {

        return {

            valid: false,

            errors: [
                "[DMG-EVENT-001] event missing"
            ]
        };
    }

    if (
        typeof event.damageEventId !==
        "string"
    ) {

        errors.push(
            "[DMG-EVENT-002] invalid damageEventId"
        );
    }

    if (
        typeof event.sourceRuntimeUnitId !==
        "string"
    ) {

        errors.push(
            "[DMG-EVENT-003] invalid sourceRuntimeUnitId"
        );
    }

    if (
        typeof event.targetRuntimeUnitId !==
        "string"
    ) {

        errors.push(
            "[DMG-EVENT-004] invalid targetRuntimeUnitId"
        );
    }

    const numericFields = [

        "baseDamage",
        "damageMultiplier",
        "finalDamage",
        "appliedDamage",
        "overflowDamage"
    ];

    for (
        const field
        of numericFields
    ) {

        if (
            typeof event[field] !==
            "number"
        ) {

            errors.push(
                `[DMG-EVENT-005] invalid ${field}`
            );
        }
    }

    if (
        typeof event.targetDestroyed !==
        "boolean"
    ) {

        errors.push(
            "[DMG-EVENT-006] invalid targetDestroyed"
        );
    }

    return {

        valid:
            errors.length === 0,

        errors
    };
}

export default
    validateDamageEvent;