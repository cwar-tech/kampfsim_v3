function validateOverflowEvent(
    overflowEvent
) {
    const errors = [];

    if (
        !overflowEvent ||
        typeof overflowEvent !== "object"
    ) {
        return {
            valid: false,
            errors: [
                {
                    field:
                        "overflowEvent",

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
        !overflowEvent.sourceRuntimeUnitId ||
        typeof overflowEvent.sourceRuntimeUnitId !==
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
        !overflowEvent.targetRuntimeUnitId ||
        typeof overflowEvent.targetRuntimeUnitId !==
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
        typeof overflowEvent.overflowDamage !==
        "number" ||
        !Number.isInteger(
            overflowEvent.overflowDamage
        ) ||
        overflowEvent.overflowDamage <= 0
    ) {
        errors.push({
            field:
                "overflowDamage",

            message:
                "overflowDamage must be a positive integer"
        });
    }

    if (
        typeof overflowEvent.chainDepth !==
        "number" ||
        !Number.isInteger(
            overflowEvent.chainDepth
        ) ||
        overflowEvent.chainDepth < 0
    ) {
        errors.push({
            field:
                "chainDepth",

            message:
                "chainDepth must be a non-negative integer"
        });
    }

    if (
        typeof overflowEvent.maxChainDepth !==
        "number" ||
        !Number.isInteger(
            overflowEvent.maxChainDepth
        ) ||
        overflowEvent.maxChainDepth < 0
    ) {
        errors.push({
            field:
                "maxChainDepth",

            message:
                "maxChainDepth must be a non-negative integer"
        });
    }

    if (
        overflowEvent.chainDepth >
        overflowEvent.maxChainDepth
    ) {
        errors.push({
            field:
                "chainDepth",

            message:
                "chainDepth cannot exceed maxChainDepth"
        });
    }

    if (
        overflowEvent.sourceRuntimeUnitId ===
        overflowEvent.targetRuntimeUnitId
    ) {
        errors.push({
            field:
                "runtimeUnitId",

            message:
                "source and target runtime ids cannot be identical"
        });
    }

    return {
        valid:
            errors.length === 0,

        errors
    };
}

export default
    validateOverflowEvent;