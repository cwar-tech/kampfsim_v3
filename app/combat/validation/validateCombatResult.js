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
                    field: "combatResult",
                    message:
                        "combatResult must be an object"
                }
            ]
        };
    }

    if (
        !combatResult.combatId ||
        typeof combatResult.combatId !==
        "string"
    ) {
        errors.push({
            field: "combatId",
            message:
                "combatId must be a non-empty string"
        });
    }

    const VALID_WINNER_SIDES = [
        "attacker",
        "defender",
        "draw"
    ];

    if (
        !VALID_WINNER_SIDES.includes(
            combatResult.winnerSide
        )
    ) {
        errors.push({
            field: "winnerSide",
            message:
                "invalid winnerSide"
        });
    }

    if (
        typeof combatResult.totalRounds !==
        "number" ||
        !Number.isInteger(
            combatResult.totalRounds
        ) ||
        combatResult.totalRounds < 0
    ) {
        errors.push({
            field: "totalRounds",
            message:
                "totalRounds must be a non-negative integer"
        });
    }

    if (
        typeof combatResult.attackerFleetDestroyed !==
        "boolean"
    ) {
        errors.push({
            field:
                "attackerFleetDestroyed",
            message:
                "attackerFleetDestroyed must be a boolean"
        });
    }

    if (
        typeof combatResult.defenderFleetDestroyed !==
        "boolean"
    ) {
        errors.push({
            field:
                "defenderFleetDestroyed",
            message:
                "defenderFleetDestroyed must be a boolean"
        });
    }

    if (
        !Array.isArray(
            combatResult.attackerRemainingUnits
        )
    ) {
        errors.push({
            field:
                "attackerRemainingUnits",
            message:
                "attackerRemainingUnits must be an array"
        });
    }

    if (
        !Array.isArray(
            combatResult.defenderRemainingUnits
        )
    ) {
        errors.push({
            field:
                "defenderRemainingUnits",
            message:
                "defenderRemainingUnits must be an array"
        });
    }

    if (
        !Array.isArray(
            combatResult.attackerLostUnits
        )
    ) {
        errors.push({
            field:
                "attackerLostUnits",
            message:
                "attackerLostUnits must be an array"
        });
    }

    if (
        !Array.isArray(
            combatResult.defenderLostUnits
        )
    ) {
        errors.push({
            field:
                "defenderLostUnits",
            message:
                "defenderLostUnits must be an array"
        });
    }

    if (
        !Array.isArray(
            combatResult.rounds
        )
    ) {
        errors.push({
            field: "rounds",
            message:
                "rounds must be an array"
        });
    }

    if (
        combatResult.winnerSide ===
        "attacker" &&
        !combatResult.defenderFleetDestroyed
    ) {
        errors.push({
            field:
                "defenderFleetDestroyed",
            message:
                "defender fleet must be destroyed when attacker wins"
        });
    }

    if (
        combatResult.winnerSide ===
        "defender" &&
        !combatResult.attackerFleetDestroyed
    ) {
        errors.push({
            field:
                "attackerFleetDestroyed",
            message:
                "attacker fleet must be destroyed when defender wins"
        });
    }

    return {
        valid: errors.length === 0,
        errors
    };
}

module.exports =
    validateCombatResult;