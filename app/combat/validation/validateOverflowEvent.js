function validateOverflowEvent(
    overflowEvent
) {
    const errors = [];

    if (
        !overflowEvent ||
        typeof overflowEvent !==
        "object"
    ) {
        return {
            valid: false,
            errors: [
                {
                    field: "overflowEvent",
                    message:
                        "overflowEvent must be an object"
                }
            ]
        };
    }

    if (
        !overflowEvent.sourceDamageEventId ||
        typeof overflowEvent.sourceDamageEventId !==
        "string"
    ) {
        errors.push({
            field:
                "sourceDamageEventId",
            message:
                "sourceDamageEventId must be a non-empty string"
        });
    }

    if (
        !overflowEvent.previousTargetRuntimeUnitId ||
        typeof overflowEvent.previousTargetRuntimeUnitId !==
        "string"
    ) {
        errors.push({
            field:
                "previousTargetRuntimeUnitId",
            message:
                "previousTargetRuntimeUnitId must be a non-empty string"
        });
    }

    if (
        !overflowEvent.newTargetRuntimeUnitId ||
        typeof overflowEvent.newTargetRuntimeUnitId !==
        "string"
    ) {
        errors.push({
            field:
                "newTargetRuntimeUnitId",
            message:
                "newTargetRuntimeUnitId must be a non-empty string"
        });
    }

    if (
        overflowEvent.previousTargetRuntimeUnitId ===
        overflowEvent.newTargetRuntimeUnitId
    ) {
        errors.push({
            field:
                "newTargetRuntimeUnitId",
            message:
                "overflow target must change"
        });
    }

    if (
        typeof overflowEvent.originalOverflowDamage !==
        "number" ||
        overflowEvent.originalOverflowDamage <
        0
    ) {
        errors.push({
            field:
                "originalOverflowDamage",
            message:
                "originalOverflowDamage must be a non-negative number"
        });
    }

    if (
        typeof overflowEvent.overflowLoss !==
        "number" ||
        overflowEvent.overflowLoss < 0
    ) {
        errors.push({
            field: "overflowLoss",
            message:
                "overflowLoss must be a non-negative number"
        });
    }

    if (
        typeof overflowEvent.normalizedOverflowDamage !==
        "number" ||
        overflowEvent.normalizedOverflowDamage <
        0
    ) {
        errors.push({
            field:
                "normalizedOverflowDamage",
            message:
                "normalizedOverflowDamage must be a non-negative number"
        });
    }

    if (
        typeof overflowEvent.previousMultiplierRemoved !==
        "number" ||
        overflowEvent.previousMultiplierRemoved <=
        0
    ) {
        errors.push({
            field:
                "previousMultiplierRemoved",
            message:
                "previousMultiplierRemoved must be greater than 0"
        });
    }

    if (
        typeof overflowEvent.newMultiplierApplied !==
        "number" ||
        overflowEvent.newMultiplierApplied <=
        0
    ) {
        errors.push({
            field:
                "newMultiplierApplied",
            message:
                "newMultiplierApplied must be greater than 0"
        });
    }

    if (
        overflowEvent.overflowLoss >
        overflowEvent.originalOverflowDamage
    ) {
        errors.push({
            field: "overflowLoss",
            message:
                "overflowLoss cannot exceed originalOverflowDamage"
        });
    }

    return {
        valid: errors.length === 0,
        errors
    };
}

module.exports =
    validateOverflowEvent;