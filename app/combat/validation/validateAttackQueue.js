// ==================================================
// app/combat/validation/validateAttackQueue.js
// ==================================================

function validateAttackQueue(
    attackQueue
) {

    const errors = [];

    if (
        !Array.isArray(
            attackQueue
        )
    ) {

        return {

            valid: false,

            errors: [
                "[QUEUE-001] attackQueue must be array"
            ]
        };
    }

    for (
        const attack
        of attackQueue
    ) {

        if (
            !attack ||
            typeof attack !==
            "object"
        ) {

            errors.push(
                "[QUEUE-002] attack missing"
            );

            continue;
        }

        // ==========================================
        // ATTACKER
        // ==========================================

        if (
            !attack.attacker
        ) {

            errors.push(
                "[QUEUE-003] attacker missing"
            );

            continue;
        }

        // ==========================================
        // TARGET
        // ==========================================

        if (
            !attack.target
        ) {

            errors.push(
                "[QUEUE-004] target missing"
            );

            continue;
        }

        // ==========================================
        // AVAILABLE TARGETS
        // ==========================================

        if (
            !Array.isArray(
                attack.availableTargets
            )
        ) {

            errors.push(
                "[QUEUE-005] availableTargets missing"
            );
        }

        // ==========================================
        // ATTACKER ALIVE
        // ==========================================

        if (
            attack.attacker
                .remainingHp <= 0
        ) {

            errors.push(

                `[QUEUE-006] attacker destroyed ${attack.attacker.unitTypeId}`
            );
        }

        // ==========================================
        // TARGET ALIVE
        // ==========================================

        if (
            attack.target
                .remainingHp <= 0
        ) {

            errors.push(

                `[QUEUE-007] target destroyed ${attack.target.unitTypeId}`
            );
        }

        // ==========================================
        // SELF TARGET
        // ==========================================

        if (

            attack.attacker
                .runtimeUnitId ===

            attack.target
                .runtimeUnitId

        ) {

            errors.push(

                `[QUEUE-008] self targeting ${attack.attacker.unitTypeId}`
            );
        }

        // ==========================================
        // DEFENSE ATTACKER
        // ==========================================

        if (

            attack.attacker
                .unitCategory ===
            "defense"

        ) {

            errors.push(

                `[QUEUE-009] defense cannot attack (${attack.attacker.unitTypeId})`
            );
        }

        // ==========================================
        // TARGET LIST CONTAINS TARGET
        // ==========================================

        if (
            Array.isArray(
                attack.availableTargets
            )
        ) {

            const targetExists =

                attack.availableTargets.some(

                    target =>

                        target.runtimeUnitId ===

                        attack.target.runtimeUnitId
                );

            if (
                !targetExists
            ) {

                errors.push(

                    `[QUEUE-010] target not found in availableTargets (${attack.target.unitTypeId})`
                );
            }
        }

        // ==========================================
        // ATTACKER DAMAGE
        // ==========================================

        if (

            typeof attack.attacker
                .totalDamage !==
            "number"

        ) {

            errors.push(

                `[QUEUE-011] attacker missing totalDamage (${attack.attacker.unitTypeId})`
            );
        }
    }

    return {

        valid:
            errors.length === 0,

        errors
    };
}

export default
    validateAttackQueue;