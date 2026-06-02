function calculateDamage({

    attacker,
    target
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
    // DESTROYED CHECK
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

    if (
        attacker.remainingHp <= 0
    ) {

        return {

            baseDamage: 0,

            totalArmor: 0,

            totalPenetration: 0,

            effectiveArmor: 0,

            finalDamage: 0
        };
    }

    if (
        target.remainingHp <= 0
    ) {

        return {

            baseDamage: 0,

            totalArmor: 0,

            totalPenetration: 0,

            effectiveArmor: 0,

            finalDamage: 0
        };
    }



    // ==========================================
    // BASE DAMAGE
    // ==========================================

    const baseDamage =
        typeof attacker.totalDamage ===
            "number"
            ? attacker.totalDamage
            : 0;



    // ==========================================
    // TARGET ARMOR
    // ==========================================

    const armorPerUnit =
        typeof target.armorPerUnit ===
            "number"
            ? target.armorPerUnit
            : 0;

    const targetRemainingUnits =
        typeof target.remainingUnits ===
            "number"
            ? target.remainingUnits
            : 0;

    const totalArmor =
        armorPerUnit *
        targetRemainingUnits;



    // ==========================================
    // ATTACKER PENETRATION
    // ==========================================

    const penetrationPerUnit =
        typeof attacker
            .penetrationPerUnit ===
            "number"
            ? attacker
                .penetrationPerUnit
            : 0;

    const attackerRemainingUnits =
        typeof attacker
            .remainingUnits ===
            "number"
            ? attacker
                .remainingUnits
            : 0;

    const totalPenetration =
        penetrationPerUnit *
        attackerRemainingUnits;



    // ==========================================
    // EFFECTIVE ARMOR
    // ==========================================

    const effectiveArmor =
        Math.max(
            0,
            totalArmor -
            totalPenetration
        );



    // ==========================================
    // FINAL DAMAGE
    // ==========================================

    let finalDamage =
        Math.max(
            0,
            baseDamage -
            effectiveArmor
        );

    // ==========================================
    // MINIMUM CHIP DAMAGE
    // ==========================================

    if (
        baseDamage > 0 &&
        finalDamage === 0
    ) {

        finalDamage = 1;
    }



    return {

        baseDamage,

        totalArmor,

        totalPenetration,

        effectiveArmor,

        finalDamage
    };
}

export default
    calculateDamage;