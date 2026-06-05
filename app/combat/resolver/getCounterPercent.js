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

    const counters =
        attacker.counters || {};

    const targetTypeId =
        target.unitTypeId;

    if (
        !targetTypeId
    ) {
        return 100;
    }

    const counterPercent =
        counters[
        targetTypeId
        ];

    if (
        typeof counterPercent ===
        "number"
    ) {
        return counterPercent;
    }

    return 100;
}

export default
    getCounterPercent;