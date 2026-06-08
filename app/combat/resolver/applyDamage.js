// ==================================================
// app/combat/resolver/applyDamage.js
// ==================================================

import recalculateRuntimeState
    from "../runtime/recalculateRuntimeState.js";

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

    if (
        typeof target.remainingHp !==
        "number"
    ) {
        return null;
    }

    const resultTarget =
        JSON.parse(
            JSON.stringify(target)
        );

    const oldRemainingHp =
        resultTarget.remainingHp;

    // ==========================================
    // APPLY DAMAGE
    // ==========================================

    resultTarget.remainingHp -=
        damage;

    resultTarget.remainingHp =
        Math.max(
            0,
            resultTarget.remainingHp
        );

    // ==========================================
    // RUNTIME STATE
    // ==========================================

    recalculateRuntimeState(
        resultTarget
    );

    // ==========================================
    // REAL APPLIED DAMAGE
    // ==========================================

    const appliedDamage =
        oldRemainingHp -
        resultTarget.remainingHp;

    // ==========================================
    // OVERFLOW
    // ==========================================

    const overflowDamage =
        Math.max(
            0,
            damage -
            oldRemainingHp
        );

    // ==========================================
    // RESULT
    // ==========================================

    return {

        target:
            resultTarget,

        appliedDamage,

        overflowDamage
    };
}

export default
    applyDamage;