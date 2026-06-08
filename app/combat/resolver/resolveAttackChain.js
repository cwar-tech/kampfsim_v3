// ==================================================
// app/combat/resolver/resolveAttackChain.js
// ==================================================

import calculateDamage
    from "./calculateDamage.js";

function resolveAttackChain({

    attacker,

    initialTarget,

    damageEvents = []

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

    // ==========================================
    // DAMAGE CALCULATION
    // ==========================================

    const baseDamage =
        attacker.totalDamage;

    const damageResult =
        calculateDamage({

            attacker,

            target:
                initialTarget,

            overrideBaseDamage:
                baseDamage
        });

    if (
        !damageResult
    ) {

        throw new Error(

            `[CHAIN-006] calculateDamage returned null for ${attacker.unitTypeId}`
        );
    }

    if (
        typeof damageResult.finalDamage !==
        "number"
    ) {

        throw new Error(

            `[CHAIN-007] invalid finalDamage for ${attacker.unitTypeId}`
        );
    }

    console.log(
        "BASE DAMAGE:",
        baseDamage
    );

    console.log(
        "TARGET:",
        initialTarget.unitTypeId,
        "HP:",
        initialTarget.remainingHp
    );

    console.log(
        "FINAL DAMAGE:",
        damageResult.finalDamage
    );

    // ==========================================
    // DAMAGE EVENT
    // ==========================================

    damageEvents.push({

        damageEventId:
            crypto.randomUUID(),

        sourceRuntimeUnitId:
            attacker.runtimeUnitId,

        targetRuntimeUnitId:
            initialTarget.runtimeUnitId,

        baseDamage:
            baseDamage,

        finalDamage:
            damageResult.finalDamage
    });

    console.log(
        "DAMAGE EVENT CREATED"
    );
}

export default
    resolveAttackChain;