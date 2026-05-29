const WINNERS = Object.freeze([
    "attacker",
    "defender",
    "draw"
]);

const SHIP_TYPES = Object.freeze([
    "ship",
    "defense"
]);

const TARGET_TYPES = Object.freeze([
    "light_fighter",
    "bomber"
]);

const COMBAT_STATES = Object.freeze([
    "running",
    "finished"
]);

function validateEnums() {

    const enumGroups = {

        WINNERS,

        SHIP_TYPES,

        TARGET_TYPES,

        COMBAT_STATES
    };

    for (
        const values
        of Object.values(
            enumGroups
        )
    ) {

        const unique =
            new Set(values);

        if (
            unique.size !==
            values.length
        ) {
            return {
                valid: false,
                errors: [
                    {
                        message:
                            "duplicate enum values detected"
                    }
                ]
            };
        }
    }

    return {
        valid: true,

        errors: [],

        enums:
            enumGroups
    };
}

export default
    validateEnums;