const VALID_WINNERS = [
    "attacker",
    "defender",
    "draw"
];

function validateCombatResult(
    combatResult
) {
    const errors = [];

    if (
        !combatResult ||
        typeof combatResult !== "object"
    ) {
        return {
            valid: false,
            errors: [
                {
                    field:
                        "combatResult",

                    message:
                        "combatResult must be an object"
                }
            ]
        };
    }

    if (
        !VALID_WINNERS.includes(
            combatResult.winner
        )
    ) {
        errors.push({
            field:
                "winner",

            message:
                "winner must be attacker, defender or draw"
        });
    }

    if (
        typeof combatResult.roundsPlayed !==
        "number" ||
        !Number.isInteger(
            combatResult.roundsPlayed
        ) ||
        combatResult.roundsPlayed < 0
    ) {
        errors.push({
            field:
                "roundsPlayed",

            message:
                "roundsPlayed must be a non-negative integer"
        });
    }

    if (
        typeof combatResult.attackerLosses !==
        "number" ||
        !Number.isInteger(
            combatResult.attackerLosses
        ) ||
        combatResult.attackerLosses < 0
    ) {
        errors.push({
            field:
                "attackerLosses",

            message:
                "attackerLosses must be a non-negative integer"
        });
    }

    if (
        typeof combatResult.defenderLosses !==
        "number" ||
        !Number.isInteger(
            combatResult.defenderLosses
        ) ||
        combatResult.defenderLosses < 0
    ) {
        errors.push({
            field:
                "defenderLosses",

            message:
                "defenderLosses must be a non-negative integer"
        });
    }

    if (
        typeof combatResult.draw !==
        "boolean"
    ) {
        errors.push({
            field:
                "draw",

            message:
                "draw must be a boolean"
        });
    }

    if (
        combatResult.winner ===
        "attacker" &&
        combatResult.attackerDestroyed
    ) {
        errors.push({
            field:
                "winner",

            message:
                "attacker cannot win while destroyed"
        });
    }

    if (
        combatResult.winner ===
        "defender" &&
        combatResult.defenderDestroyed
    ) {
        errors.push({
            field:
                "winner",

            message:
                "defender cannot win while destroyed"
        });
    }

    if (
        combatResult.winner ===
        "draw" &&
        !combatResult.draw
    ) {
        errors.push({
            field:
                "draw",

            message:
                "draw winner requires draw=true"
        });
    }

    return {
        valid:
            errors.length === 0,

        errors
    };
}

export default
    validateCombatResult;