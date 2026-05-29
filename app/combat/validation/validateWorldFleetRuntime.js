const VALID_MOVEMENT_STATES = [
    "idle",
    "moving",
    "arrived",
    "returning",
    "destroyed"
];

const VALID_VISIBILITY_STATES = [
    "visible",
    "hidden",
    "stealthed"
];

function validateWorldFleetRuntime(
    fleetRuntime
) {
    const errors = [];

    if (
        !fleetRuntime ||
        typeof fleetRuntime !== "object"
    ) {
        return {
            valid: false,
            errors: [
                {
                    field: "fleetRuntime",
                    message:
                        "fleetRuntime must be an object"
                }
            ]
        };
    }

    if (
        !fleetRuntime.fleetId ||
        typeof fleetRuntime.fleetId !==
        "string"
    ) {
        errors.push({
            field: "fleetId",
            message:
                "fleetId must be a non-empty string"
        });
    }

    if (
        !fleetRuntime.ownerPlayerId ||
        typeof fleetRuntime.ownerPlayerId !==
        "string"
    ) {
        errors.push({
            field: "ownerPlayerId",
            message:
                "ownerPlayerId must be a non-empty string"
        });
    }

    if (
        fleetRuntime.ownerGuildId !==
        undefined &&
        typeof fleetRuntime.ownerGuildId !==
        "string"
    ) {
        errors.push({
            field: "ownerGuildId",
            message:
                "ownerGuildId must be a string"
        });
    }

    if (
        !fleetRuntime.fleetName ||
        typeof fleetRuntime.fleetName !==
        "string"
    ) {
        errors.push({
            field: "fleetName",
            message:
                "fleetName must be a non-empty string"
        });
    }

    if (
        !fleetRuntime.position ||
        typeof fleetRuntime.position !==
        "object"
    ) {
        errors.push({
            field: "position",
            message:
                "position must be an object"
        });
    }

    if (
        !fleetRuntime.targetPosition ||
        typeof fleetRuntime.targetPosition !==
        "object"
    ) {
        errors.push({
            field: "targetPosition",
            message:
                "targetPosition must be an object"
        });
    }

    if (
        !VALID_MOVEMENT_STATES.includes(
            fleetRuntime.movementState
        )
    ) {
        errors.push({
            field: "movementState",
            message:
                "invalid movementState"
        });
    }

    if (
        !VALID_VISIBILITY_STATES.includes(
            fleetRuntime.visibilityState
        )
    ) {
        errors.push({
            field: "visibilityState",
            message:
                "invalid visibilityState"
        });
    }

    if (
        typeof fleetRuntime.departureTimestamp !==
        "number"
    ) {
        errors.push({
            field: "departureTimestamp",
            message:
                "departureTimestamp must be a number"
        });
    }

    if (
        typeof fleetRuntime.arrivalTimestamp !==
        "number"
    ) {
        errors.push({
            field: "arrivalTimestamp",
            message:
                "arrivalTimestamp must be a number"
        });
    }

    if (
        !Array.isArray(fleetRuntime.units)
    ) {
        errors.push({
            field: "units",
            message:
                "units must be an array"
        });
    }

    if (
        typeof fleetRuntime.cargo !==
        "number" ||
        fleetRuntime.cargo < 0
    ) {
        errors.push({
            field: "cargo",
            message:
                "cargo must be a non-negative number"
        });
    }

    if (
        typeof fleetRuntime.fuel !==
        "number" ||
        fleetRuntime.fuel < 0
    ) {
        errors.push({
            field: "fuel",
            message:
                "fuel must be a non-negative number"
        });
    }

    if (
        typeof fleetRuntime.isReturning !==
        "boolean"
    ) {
        errors.push({
            field: "isReturning",
            message:
                "isReturning must be a boolean"
        });
    }

    if (
        typeof fleetRuntime.isDestroyed !==
        "boolean"
    ) {
        errors.push({
            field: "isDestroyed",
            message:
                "isDestroyed must be a boolean"
        });
    }

    return {
        valid: errors.length === 0,
        errors
    };
}

module.exports =
    validateWorldFleetRuntime;