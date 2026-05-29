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

    // ==================================================
    // PARTIAL DAMAGE
    // ==================================================

    if (
        damage <
        resultTarget.hpLastUnit
    ) {

        resultTarget.hpLastUnit -=
            damage;

        return {
            target:
                resultTarget,

            overflowDamage: 0
        };
    }

    // ==================================================
    // EXACT KILL
    // ==================================================

    if (
        damage ===
        resultTarget.hpLastUnit
    ) {

        resultTarget.remainingUnits -= 1;

        if (
            resultTarget.remainingUnits > 0
        ) {

            resultTarget.hpLastUnit =
                target.hpLastUnit;
        }
        else {

            resultTarget.hpLastUnit = 0;
        }

        return {
            target:
                resultTarget,

            overflowDamage: 0
        };
    }

    // ==================================================
    // OVERKILL
    // ==================================================

    const overflowDamage =
        damage -
        resultTarget.hpLastUnit;

    resultTarget.remainingUnits -= 1;

    if (
        resultTarget.remainingUnits > 0
    ) {

        resultTarget.hpLastUnit =
            target.hpLastUnit;
    }
    else {

        resultTarget.hpLastUnit = 0;
    }

    if (
        resultTarget.remainingUnits < 0
    ) {

        resultTarget.remainingUnits = 0;
    }

    return {
        target:
            resultTarget,

        overflowDamage
    };
}

export default
    applyDamage;