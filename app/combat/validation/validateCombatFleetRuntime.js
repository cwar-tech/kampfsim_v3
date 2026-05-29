const VALID_SIDES = [
    "attacker",
    "defender"
];

function validateCombatFleetRuntime(
    combatFleetRuntime
) {
    const errors = [];

    if (
        !combatFleetRuntime ||
        typeof combatFleetRuntime !==
        "object"
    ) {
        return {
            valid: false,
            errors: [
                {
                    field: "combatFleetRuntime",
                    message:
                        "combatFleetRuntime must be an object"
                }
            ]
        };
    }

    if (
        !combatFleetRuntime.combatFleetId ||
        typeof combatFleetRuntime.combatFleetId !==
        "string"
    ) {
        errors.push({
            field: "combatFleetId",
            message:
                "combatFleetId must be a non-empty string"
        });
    }

    if (
        !combatFleetRuntime.worldFleetId ||
        typeof combatFleetRuntime.worldFleetId !==
        "string"
    ) {
        errors.push({
            field: "worldFleetId",
            message:
                "worldFleetId must be a non-empty string"
        });
    }

    if (
        !combatFleetRuntime.ownerPlayerId ||
        typeof combatFleetRuntime.ownerPlayerId !==
        "string"
    ) {
        errors.push({
            field: "ownerPlayerId",
            message:
                "ownerPlayerId must be a non-empty string"
        });
    }

    if (
        combatFleetRuntime.ownerGuildId !==
        undefined &&
        typeof combatFleetRuntime.ownerGuildId !==
        "string"
    ) {
        errors.push({
            field: "ownerGuildId",
            message:
                "ownerGuildId must be a string"
        });
    }

    if (
        !VALID_SIDES.includes(
            combatFleetRuntime.side
        )
    ) {
        errors.push({
            field: "side",
            message:
                "invalid combat side"
        });
    }

    if (
        !Array.isArray(
            combatFleetRuntime.units
        )
    ) {
        errors.push({
            field: "units",
            message:
                "units must be an array"
        });
    }

    if (
        typeof combatFleetRuntime.totalDamage !==
        "number" ||
        combatFleetRuntime.totalDamage < 0
    ) {
        errors.push({
            field: "totalDamage",
            message:
                "totalDamage must be a non-negative number"
        });
    }

    if (
        typeof combatFleetRuntime.totalVolume !==
        "number" ||
        combatFleetRuntime.totalVolume < 0
    ) {
        errors.push({
            field: "totalVolume",
            message:
                "totalVolume must be a non-negative number"
        });
    }

    if (
        typeof combatFleetRuntime.receivedDamage !==
        "number" ||
        combatFleetRuntime.receivedDamage < 0
    ) {
        errors.push({
            field: "receivedDamage",
            message:
                "receivedDamage must be a non-negative number"
        });
    }

    if (
        typeof combatFleetRuntime.dealtDamage !==
        "number" ||
        combatFleetRuntime.dealtDamage < 0
    ) {
        errors.push({
            field: "dealtDamage",
            message:
                "dealtDamage must be a non-negative number"
        });
    }

    if (
        typeof combatFleetRuntime.defeated !==
        "boolean"
    ) {
        errors.push({
            field: "defeated",
            message:
                "defeated must be a boolean"
        });
    }

    return {
        valid: errors.length === 0,
        errors
    };
}

module.exports =
    validateCombatFleetRuntime;