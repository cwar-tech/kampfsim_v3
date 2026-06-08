// ==================================================
// app/combat/resolver/getDamageMultiplier.js
// ==================================================

function getDamageMultiplier(
    attacker,
    target
) {

    if (
        !attacker ||
        !target
    ) {
        return 1;
    }

    const damageMultipliers =
        attacker.damageMultipliers || [];

    const match =
        damageMultipliers.find(

            entry =>

                entry.targetId ===
                target.unitTypeId
        );

    if (
        !match
    ) {
        return 1;
    }

    return match.multiplier;
}

export default
    getDamageMultiplier;