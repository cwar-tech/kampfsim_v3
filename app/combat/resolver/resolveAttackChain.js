// ==================================================
// app/combat/resolver/resolveAttackChain.js
// ==================================================

import calculateDamage
    from "./calculateDamage.js";

import applyDamage
    from "./applyDamage.js";

import findBestTarget
    from "./findBestTarget.js";

import recalculateRuntimeState
    from "../runtime/recalculateRuntimeState.js";

function resolveAttackChain({

    attacker,

    initialTarget,

    availableTargets,

    damageEvents = [],

    overflowEvents = []

}) {

    console.log(
        "ATTACK:",
        attacker?.unitTypeId,
        "->",
        initialTarget?.unitTypeId
    );

    if (
        !attacker
    ) {

        throw new Error(

            "[CHAIN-001] attacker missing"

        );
    }

    if (
        !initialTarget
    ) {

        throw new Error(

            "[CHAIN-002] initialTarget missing"

        );
    }



    // ==========================================
    // DAMAGE VALIDATION
    // ==========================================

    if (
        typeof attacker.totalDamage !==
        "number"
    ) {

        throw new Error(

            `[CHAIN-003] totalDamage missing for ${attacker.unitTypeId}`

        );
    }

    if (
        attacker.totalDamage <= 0
    ) {

        throw new Error(

            `[CHAIN-004] totalDamage must be > 0 for ${attacker.unitTypeId}`

        );
    }



    // ==========================================
    // ORIGINAL DAMAGE
    // ==========================================

    const originalBaseDamage =
        attacker.totalDamage;

    let currentBaseDamage =
        originalBaseDamage;

    let currentTarget =
        initialTarget;

    let targetChanges =
        0;

    console.log(
        "BASE DAMAGE:",
        currentBaseDamage
    );



    // ==========================================
    // ATTACK CHAIN
    // ==========================================

    while (

        currentTarget &&
        currentBaseDamage > 0
    ) {

        console.log(
            "CHAIN TARGET:",
            currentTarget.unitTypeId,
            "HP:",
            currentTarget.remainingHp
        );



        // ==========================================
        // DAMAGE
        // ==========================================

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

                `[CHAIN-005] calculateDamage returned null for ${attacker.unitTypeId}`

            );
        }

        console.log(
            "FINAL DAMAGE:",
            damageResult.finalDamage
        );



        // ==========================================
        // APPLY DAMAGE
        // ==========================================

        const result =
            applyDamage(

                currentTarget,

                damageResult
                    .finalDamage
            );

        if (
            !result
        ) {

            throw new Error(

                `[CHAIN-006] applyDamage returned null for ${attacker.unitTypeId}`

            );
        }

        if (
            !result.target
        ) {

            throw new Error(

                `[CHAIN-007] applyDamage target missing for ${attacker.unitTypeId}`

            );
        }



        // ==========================================
        // UPDATE TARGET
        // ==========================================

        currentTarget.remainingHp =
            result.target
                .remainingHp;

        recalculateRuntimeState(
            currentTarget
        );



        // ==========================================
        // DAMAGE EVENT
        // ==========================================

        damageEvents.push({

            sourceRuntimeUnitId:
                attacker.runtimeUnitId,

            targetRuntimeUnitId:
                currentTarget.runtimeUnitId,

            counterPercent:
                damageResult.counterPercent,

            baseDamage:
                currentBaseDamage,

            appliedDamage:
                result.appliedDamage,

            finalDamage:
                damageResult.finalDamage,

            targetDestroyed:
                currentTarget.remainingHp <= 0
        });

        console.log(
            "DAMAGE EVENT CREATED"
        );



        // ==========================================
        // TARGET SURVIVED
        // ==========================================

        if (
            currentTarget.remainingHp > 0
        ) {

            console.log(
                "TARGET SURVIVED:",
                currentTarget.remainingHp
            );

            break;
        }



        // ==========================================
        // TARGET DESTROYED
        // ==========================================

        targetChanges += 1;

        console.log(
            "TARGET DESTROYED:",
            currentTarget.unitTypeId
        );



        overflowEvents.push({

            sourceRuntimeUnitId:
                attacker.runtimeUnitId,

            previousTargetRuntimeUnitId:
                currentTarget.runtimeUnitId,

            targetChanges,

            destroyedTarget:
                true
        });



        // ==========================================
        // 5% DAMAGE LOSS
        // ==========================================

        currentBaseDamage =

            Math.floor(

                originalBaseDamage *

                Math.pow(
                    0.95,
                    targetChanges
                )
            );

        console.log(
            "OVERFLOW DAMAGE:",
            currentBaseDamage
        );



        // ==========================================
        // FIND NEXT TARGET
        // ==========================================

        const nextTargetData =

            findBestTarget(

                attacker,

                availableTargets
            );

        if (
            !nextTargetData
        ) {

            console.log(
                "NO NEXT TARGET FOUND"
            );

            break;
        }

        currentTarget =
            nextTargetData.target;
    }
}

export default
    resolveAttackChain;