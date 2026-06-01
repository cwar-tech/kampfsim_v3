function applyDamage(
    target,
    damage
) {

    if (
        !target ||
        typeof target !== "object"
    ) {
        return null;
    }

    if (
        typeof damage !== "number" ||
        damage < 0
    ) {
        return null;
    }

    const resultTarget =
        JSON.parse(
            JSON.stringify(target)
        );

    if (
        damage === 0
    ) {
        return {

            target:
                resultTarget,

            overflowDamage: 0
        };
    }

    if (
        typeof resultTarget.remainingUnits !==
        "number"
    ) {
        return null;
    }

    if (
        typeof resultTarget.hpLastUnit !==
        "number"
    ) {
        return null;
    }

    const unitHp =
        resultTarget.hpLastUnit;

    let remainingDamage =
        damage;

    // ==========================================
    // DAMAGE LOOP
    // ==========================================

    while (
        remainingDamage > 0 &&
        resultTarget.remainingUnits > 0
    ) {

        // ======================================
        // PARTIAL DAMAGE
        // ======================================

        if (
            remainingDamage <
            resultTarget.hpLastUnit
        ) {

            resultTarget.hpLastUnit -=
                remainingDamage;

            remainingDamage = 0;

            break;
        }

        // ======================================
        // UNIT DESTROYED
        // ======================================

        remainingDamage -=
            resultTarget.hpLastUnit;

        resultTarget.remainingUnits -= 1;

        // ======================================
        // NEXT UNIT
        // ======================================

        if (
            resultTarget.remainingUnits > 0
        ) {

            resultTarget.hpLastUnit =
                unitHp;
        }
        else {

            resultTarget.hpLastUnit = 0;
        }
    }

    return {

        target:
            resultTarget,

        overflowDamage:
            remainingDamage
    };
}

export default
    applyDamage;