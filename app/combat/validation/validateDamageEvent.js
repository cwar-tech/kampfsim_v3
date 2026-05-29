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
        typeof damageEvent.baseDamage !==
        "number" ||
        !Number.isInteger(
            damageEvent.baseDamage
        ) ||
        damageEvent.baseDamage < 0
    ) {
        errors.push({
            field:
                "baseDamage",

            message:
                "baseDamage must be a non-negative integer"
        });
    }

    if (
        typeof damageEvent.multiplier !==
        "number" ||
        damageEvent.multiplier < 0
    ) {
        errors.push({
            field:
                "multiplier",

            message:
                "multiplier must be a non-negative number"
        });
    }

    if (
        typeof damageEvent.appliedDamage !==
        "number" ||
        !Number.isInteger(
            damageEvent.appliedDamage
        ) ||
        damageEvent.appliedDamage < 0
    ) {
        errors.push({
            field:
                "appliedDamage",

            message:
                "appliedDamage must be a non-negative integer"
        });
    }

    if (
        typeof damageEvent.overflowDamage !==
        "number" ||
        !Number.isInteger(
            damageEvent.overflowDamage
        ) ||
        damageEvent.overflowDamage < 0
    ) {
        errors.push({
            field:
                "overflowDamage",

            message:
                "overflowDamage must be a non-negative integer"
        });
    }

    if (
        damageEvent.sourceRuntimeUnitId ===
        damageEvent.targetRuntimeUnitId
    ) {
        errors.push({
            field:
                "runtimeUnitId",

            message:
                "source and target runtime ids cannot be identical"
        });
    }

    if (
        damageEvent.appliedDamage >
        (
            damageEvent.baseDamage *
            damageEvent.multiplier
        )
    ) {
        errors.push({
            field:
                "appliedDamage",

            message:
                "appliedDamage cannot exceed multiplied baseDamage"
        });
    }

    if (
        damageEvent.overflowDamage >
        damageEvent.appliedDamage
    ) {
        errors.push({
            field:
                "overflowDamage",

            message:
                "overflowDamage cannot exceed appliedDamage"
        });
    }

    return {
        valid:
            errors.length === 0,

        errors
    };
}

export default
    validateDamageEvent;