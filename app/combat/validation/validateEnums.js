const MOVEMENT_STATES = [
    "idle",
    "moving",
    "arrived",
    "returning",
    "destroyed"
];

const VISIBILITY_STATES = [
    "visible",
    "hidden",
    "stealthed"
];

const COMBAT_SIDES = [
    "attacker",
    "defender"
];

const WINNER_SIDES = [
    "attacker",
    "defender",
    "draw"
];

const UNIT_TYPES = [
    "ship",
    "defense"
];

function validateEnum({
    value,
    validValues,
    fieldName
}) {
    if (!validValues.includes(value)) {
        return {
            valid: false,
            error: {
                field: fieldName,
                message:
                    `invalid value '${value}' for ${fieldName}`
            }
        };
    }

    return {
        valid: true,
        error: null
    };
}

module.exports = {
    MOVEMENT_STATES,
    VISIBILITY_STATES,
    COMBAT_SIDES,
    WINNER_SIDES,
    UNIT_TYPES,

    validateEnum
};