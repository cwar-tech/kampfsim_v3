// ==================================================
// app/combat/resolver/calculateDamage.js
// ==================================================

import getCounterPercent
    from "./getCounterPercent.js";

function calculateDamage({

    attacker,

    target,

    overrideBaseDamage = null

}) {

    if (
        !attacker ||
        typeof attacker !==
        "object"
    ) {
        return null;
    }

    if (
        !target ||
        typeof target !==
        "object"
    ) {
        return null;
    }

    if (
        typeof attacker.remainingHp !==
        "number"
    ) {
        return null;
    }

    if (
        typeof target.remainingHp !==
        "number"
    ) {
        return null;
    }

    if (
        target.remainingHp <= 0
    ) {

        return {

            baseDamage: 0,

            damageMultiplier: 1,

            damageAfterMultiplier: 0,

            damageAfterPenetration: 0,

            armorMultiplier: 0,

            finalDamage: 0
        };
    }

    // ==========================================
    // BASE DAMAGE
    // ==========================================

    const baseDamage =

        typeof overrideBaseDamage ===
            "number"

            ? overrideBaseDamage

            : attacker.totalDamage;

    if (
        typeof baseDamage !==
        "number"
    ) {

        throw new Error(

            `[DMG-001] Invalid baseDamage for ${attacker.unitTypeId}`

        );
    }

    if (
        baseDamage < 0
    ) {

        throw new Error(

            `[DMG-002] Negative baseDamage for ${attacker.unitTypeId}`

        );
    }

    // ==========================================
    // DAMAGE MULTIPLIER
    // ==========================================

    const damageMultiplier =

        getCounterPercent(

            attacker,

            target
        );

    const damageAfterMultiplier =

        baseDamage *

        damageMultiplier;

    // ==========================================
    // PENETRATION
    // ==========================================

    const penetrationPerUnit =

        typeof attacker
            .penetrationPerUnit ===
            "number"

            ? attacker
                .penetrationPerUnit

            : 0;

    const penetrationMultiplier =

        1 +

        (
            penetrationPerUnit /
            100
        );

    const damageAfterPenetration =

        damageAfterMultiplier *

        penetrationMultiplier;

    // ==========================================
    // ARMOR
    // ==========================================

    const armorPerUnit =

        typeof target
            .armorPerUnit ===
            "number"

            ? target
                .armorPerUnit

            : 0;

    const armorMultiplier =

        Math.max(

            0,

            1 -

            (
                armorPerUnit /
                100
            )
        );

    // ==========================================
    // FINAL DAMAGE
    // ==========================================

    let finalDamage =

        damageAfterPenetration *

        armorMultiplier;

    finalDamage =
        Math.max(
            0,
            finalDamage
        );

    finalDamage =
        Math.round(
            finalDamage
        );

    if (
        baseDamage > 0 &&
        finalDamage < 1
    ) {

        finalDamage = 1;
    }

    return {

        baseDamage,

        damageMultiplier,

        damageAfterMultiplier,

        penetrationPerUnit,

        penetrationMultiplier,

        damageAfterPenetration,

        armorPerUnit,

        armorMultiplier,

        finalDamage
    };
}

export default
    calculateDamage;