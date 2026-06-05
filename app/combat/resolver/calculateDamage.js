// ==================================================
// app/combat/resolver/calculateDamage.js
// ==================================================

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

    // ==========================================
    // VALIDATION
    // ==========================================

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

    // ==========================================
    // TARGET ALREADY DESTROYED
    // ==========================================

    if (
        target.remainingHp <= 0
    ) {

        return {

            baseDamage: 0,

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
    // PENETRATION MULTIPLIER
    // ==========================================

    const penetrationMultiplier =
        typeof attacker
            .penetrationMultiplier ===
            "number"
            ? attacker
                .penetrationMultiplier
            : 1;

    // ==========================================
    // DAMAGE AFTER PENETRATION
    // ==========================================

    const damageAfterPenetration =
        baseDamage *
        penetrationMultiplier;

    // ==========================================
    // ARMOR MULTIPLIER
    // ==========================================

    const armorMultiplier =
        typeof target
            .armorMultiplier ===
            "number"
            ? target
                .armorMultiplier
            : 1;

    // ==========================================
    // FINAL DAMAGE
    // ==========================================

    let finalDamage =
        damageAfterPenetration *
        armorMultiplier;

    // ==========================================
    // SAFETY
    // ==========================================

    finalDamage =
        Math.max(
            0,
            finalDamage
        );

    // ==========================================
    // ROUNDING
    // ==========================================

    finalDamage =
        Math.round(
            finalDamage
        );

    // ==========================================
    // MINIMUM CHIP DAMAGE
    // ==========================================

    if (
        baseDamage > 0 &&
        finalDamage < 1
    ) {

        finalDamage = 1;
    }

    // ==========================================
    // RESULT
    // ==========================================

    return {

        baseDamage,

        damageAfterPenetration,

        armorMultiplier,

        finalDamage
    };
}

export default
    calculateDamage;