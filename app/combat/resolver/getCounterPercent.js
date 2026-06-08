// ==================================================
// app/combat/resolver/getCounterPercent.js
// ==================================================

function getCounterPercent(
    attacker,
    target
) {

    if (
        !attacker ||
        !target
    ) {
        return 100;
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
        return 100;
    }

    return (
        match.multiplier *
        100
    );
}

export default
    getCounterPercent;