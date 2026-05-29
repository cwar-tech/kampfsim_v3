function validateDamageEvent(
    damageEvent
) {
    const errors = [];

    if (
        !damageEvent ||
        typeof damageEvent !== "object"
    ) {
        return {
            valid: false,
            errors: [
                {
                    field: "damageEvent",
                    message:
                        "damageEvent must be an object"
                }
            ]
        };
    }

    if (
        !damageEvent.sourceRuntimeUnitId ||
        typeof damageEvent.sourceRuntimeUnitId !==
        "string"
    ) {
        errors.push({
            field:
                "sourceRuntimeUnitId",
            message:
                "sourceRuntimeUnitId must be a non-empty string"
        });
    }

    if (
        !damageEvent.targetRuntimeUnitId ||
        typeof damageEvent.targetRuntimeUnitId !==
        "string"
    ) {
        errors.push({
            field:
                "targetRuntimeUnitId",
            message:
                "targetRuntimeUnitId must be a non-empty string"
        });
    }

    if (
        !damageEvent.sourceUnitTypeId ||
        typeof damageEvent.sourceUnitTypeId !==
        "string"
    ) {
        errors.push({
            field:
                "sourceUnitTypeId",
            message:
                "sourceUnitTypeId must be a non-empty string"
        });
    }

    if (
        !damageEvent.targetUnitTypeId ||
        typeof damageEvent.targetUnitTypeId !==
        "string"
    ) {
        errors.push({
            field:
                "targetUnitTypeId",
            message:
                "targetUnitTypeId must be a non-empty string"
        });
    }

    if (
        typeof damageEvent.baseDamage !==
        "number" ||
        damageEvent.baseDamage < 0
    ) {
        errors.push({
            field: "baseDamage",
            message:
                "baseDamage must be a non-negative number"
        });
    }

    if (
        typeof damageEvent.multiplier !==
        "number" ||
        damageEvent.multiplier <= 0
    ) {
        errors.push({
            field: "multiplier",
            message:
                "multiplier must be greater than 0"
        });
    }

    if (
        typeof damageEvent.appliedDamage !==
        "number" ||
        damageEvent.appliedDamage < 0
    ) {
        errors.push({
            field: "appliedDamage",
            message:
                "appliedDamage must be a non-negative number"
        });
    }

    if (
        typeof damageEvent.overflowDamage !==
        "number" ||
        damageEvent.overflowDamage < 0
    ) {
        errors.push({
            field: "overflowDamage",
            message:
                "overflowDamage must be a non-negative number"
        });
    }

    if (
        damageEvent.appliedDamage <
        damageEvent.overflowDamage
    ) {
        errors.push({
            field: "overflowDamage",
            message:
                "overflowDamage cannot exceed appliedDamage"
        });
    }

    return {
        valid: errors.length === 0,
        errors
    };
}

module.exports =
    validateDamageEvent;