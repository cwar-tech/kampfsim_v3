// ==================================================
// app/combat/resolver/executeAttackQueue.js
// ==================================================

import calculateDamage
    from "./calculateDamage.js";

import applyDamage
    from "./applyDamage.js";

import recalculateRuntimeState
    from "../runtime/recalculateRuntimeState.js";

function executeAttackQueue(
    queue
) {

    if (
        !Array.isArray(queue)
    ) {
        return {

            damageEvents: [],

            overflowCandidates: []
        };
    }

    const damageEvents = [];

    const overflowCandidates = [];



    // ==========================================
    // EXECUTE IN PRIORITY ORDER
    // ==========================================

    for (
        const attack
        of queue
    ) {

        if (
            !attack
        ) {
            continue;
        }

        const attacker =
            attack.attacker;

        const target =
            attack.target;



        // ==========================================
        // ROUND START RULE
        // ==========================================
        // attacker may already be dead
        // but still fires
        // ==========================================

        if (
            !attacker ||
            !target
        ) {
            continue;
        }



        // ==========================================
        // TARGET MAY ALREADY BE DEAD
        // ==========================================

        if (
            target.remainingHp <= 0
        ) {

            overflowCandidates.push({

                attacker,

                previousTarget:
                    target,

                reason:
                    "TARGET_ALREADY_DESTROYED"
            });

            continue;
        }



        // ==========================================
        // DAMAGE
        // ==========================================

        const damageResult =
            calculateDamage({

                attacker,

                target
            });

        if (
            !damageResult
        ) {
            continue;
        }



        // ==========================================
        // APPLY DAMAGE
        // ==========================================

        const result =
            applyDamage(

                target,

                damageResult
                    .finalDamage
            );

        if (
            !result
        ) {
            continue;
        }



        // ==========================================
        // UPDATE TARGET
        // ==========================================

        target.remainingHp =
            result.target
                .remainingHp;

        recalculateRuntimeState(
            target
        );



        // ==========================================
        // DAMAGE EVENT
        // ==========================================

        damageEvents.push({

            sourceRuntimeUnitId:
                attacker.runtimeUnitId,

            targetRuntimeUnitId:
                target.runtimeUnitId,

            baseDamage:
                damageResult
                    .baseDamage,

            finalDamage:
                damageResult
                    .finalDamage,

            appliedDamage:
                result
                    .appliedDamage,

            overflowDamage:
                result
                    .overflowDamage
        });



        // ==========================================
        // OVERFLOW CANDIDATE
        // ==========================================

        if (
            result.overflowDamage > 0
        ) {

            overflowCandidates.push({

                attacker,

                previousTarget:
                    target,

                overflowDamage:
                    result
                        .overflowDamage
            });
            if (
                damageResult.finalDamage < 0
            ) {

                throw new Error(

                    `[DMG-001] Negative damage calculated`

                );
            }

            if (
                damageResult.finalDamage === 0 &&
                currentBaseDamage > 0
            ) {

                throw new Error(

                    `[DMG-002] Damage collapsed to zero`

                );
            }
        }
    }



    return {

        damageEvents,

        overflowCandidates
    };
}

export default
    executeAttackQueue;