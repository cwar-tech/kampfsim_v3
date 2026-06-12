// ==================================================
// app/combat/resolver/resolveAttackChain.js
// ==================================================

import calculateDamage
    from "./calculateDamage.js";

import findBestTarget
    from "./findBestTarget.js";

function resolveAttackChain({

    attacker,

    initialTarget,

    availableTargets = [],

    damageEvents = [],

    overflowEvents = []

}) {

    // ==========================================
    // VALIDATION
    // ==========================================

    if (
        !attacker ||
        typeof attacker !==
        "object"
    ) {

        throw new Error(

            "[CHAIN-001] attacker missing"
        );
    }

    if (
        !initialTarget ||
        typeof initialTarget !==
        "object"
    ) {

        throw new Error(

            "[CHAIN-002] initialTarget missing"
        );
    }

    if (
        typeof attacker.totalDamage !==
        "number"
    ) {

        throw new Error(

            `[CHAIN-003] totalDamage missing for ${attacker.unitTypeId}`
        );
    }

    if (
        typeof initialTarget.remainingHp !==
        "number"
    ) {

        throw new Error(

            `[CHAIN-004] remainingHp missing for ${initialTarget.unitTypeId}`
        );
    }

    if (
        !Array.isArray(
            damageEvents
        )
    ) {

        throw new Error(

            "[CHAIN-005] damageEvents must be an array"
        );
    }

    if (
        !Array.isArray(
            overflowEvents
        )
    ) {

        throw new Error(

            "[CHAIN-006] overflowEvents must be an array"
        );
    }

    // ==========================================
    // ATTACK CHAIN
    // ==========================================

    let currentTarget =
        initialTarget;

    let currentBaseDamage =
        attacker.totalDamage;

    let attackChainStep =
        1;

    while (

        currentTarget &&

        currentBaseDamage > 0
    ) {

        const damageResult =
            calculateDamage({

                attacker,

                target:
                    currentTarget,

                overrideBaseDamage:
                    currentBaseDamage
            });

        if (
            !damageResult
        ) {

            throw new Error(

                `[CHAIN-007] calculateDamage returned null for ${attacker.unitTypeId}`
            );
        }

        if (
            typeof damageResult.finalDamage !==
            "number"
        ) {

            throw new Error(

                `[CHAIN-008] invalid finalDamage for ${attacker.unitTypeId}`
            );
        }

        if (
            typeof damageResult.damageMultiplier !==
            "number"
        ) {

            throw new Error(

                `[CHAIN-009] invalid damageMultiplier for ${attacker.unitTypeId}`
            );
        }
        const targetHpBefore =
            currentTarget.remainingHp;

        const appliedDamage =

            Math.min(

                currentTarget.remainingHp,

                damageResult.finalDamage
            );

        const overflowDamage =

            damageResult.finalDamage -

            appliedDamage;

        const targetRemainingHp =

            Math.max(

                0,

                currentTarget.remainingHp -

                appliedDamage
            );

        console.log(
            "BASE DAMAGE:",
            currentBaseDamage
        );

        console.log(
            "TARGET:",
            currentTarget.unitTypeId,
            "HP:",
            currentTarget.remainingHp
        );

        console.log(
            "MULTIPLIER:",
            damageResult.damageMultiplier
        );

        console.log(
            "FINAL DAMAGE:",
            damageResult.finalDamage
        );
        console.log(
            "CHAIN STEP:",
            attackChainStep
        );
        damageEvents.push({

            damageEventId:
                crypto.randomUUID(),

            sourceRuntimeUnitId:
                attacker.runtimeUnitId,

            targetRuntimeUnitId:
                currentTarget.runtimeUnitId,

            sourceUnitTypeId:
                attacker.unitTypeId,

            targetUnitTypeId:
                currentTarget.unitTypeId,

            baseDamage:
                currentBaseDamage,

            damageMultiplier:
                damageResult.damageMultiplier,

            finalDamage:
                damageResult.finalDamage,

            appliedDamage,

            overflowDamage,

            targetDestroyed:
                targetRemainingHp <= 0,

            targetRemainingHp,

            targetHpBefore,

            attackChainStep,

            targetPriority: {

                level:
                    attackChainStep,

                reason:
                    "counter_target"
            },

            damageExplain:
                damageResult.damageExplain
        });

        currentTarget.remainingHp =
            targetRemainingHp;

        console.log(
            "DAMAGE EVENT CREATED"
        );

        // ======================================
        // NO OVERFLOW
        // ======================================

        if (
            overflowDamage <= 0
        ) {
            break;
        }

        // ======================================
        // BASIS OVERFLOW DAMAGE
        // ======================================

        const basisOverflowDamage =

            Math.floor(

                overflowDamage /

                damageResult.damageMultiplier
            );

        if (
            basisOverflowDamage <= 0
        ) {
            break;
        }

        // ======================================
        // 5% OVERFLOW LOSS
        // ======================================

        const overflowAfterLoss =

            Math.floor(

                basisOverflowDamage *

                0.95
            );

        if (
            overflowAfterLoss <= 0
        ) {
            break;
        }

        overflowEvents.push({

            sourceRuntimeUnitId:
                attacker.runtimeUnitId,

            targetRuntimeUnitId:
                currentTarget.runtimeUnitId,

            overflowDamage,

            basisOverflowDamage,

            overflowAfterLoss
        });

        // ======================================
        // NEXT TARGET
        // ======================================

        const nextTargetData =

            findBestTarget(

                attacker,

                availableTargets.filter(

                    target =>

                        target.runtimeUnitId !==
                        currentTarget.runtimeUnitId
                )
            );

        if (
            !nextTargetData
        ) {
            break;
        }

        currentTarget =
            nextTargetData.target;

        currentBaseDamage =
            overflowAfterLoss;
        attackChainStep++;
    }
}

export default
    resolveAttackChain;