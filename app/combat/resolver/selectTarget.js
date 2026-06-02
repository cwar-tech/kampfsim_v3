function selectTarget(
    attackerUnit,
    targets
) {

    if (
        !attackerUnit ||
        typeof attackerUnit !==
        "object"
    ) {
        return null;
    }

    if (
        !Array.isArray(targets)
    ) {
        return null;
    }

    const validTargets =
        targets.filter(
            (target) => {

                if (
                    !target ||
                    typeof target !==
                    "object"
                ) {
                    return false;
                }

                // ==========================================
                // NEVER TARGET SELF
                // ==========================================

                if (
                    target.runtimeUnitId ===
                    attackerUnit.runtimeUnitId
                ) {
                    return false;
                }

                // ==========================================
                // SINGLE SOURCE OF TRUTH
                // ==========================================

                if (
                    typeof target.remainingHp !==
                    "number"
                ) {
                    return false;
                }

                if (
                    target.remainingHp <= 0
                ) {
                    return false;
                }

                return true;
            }
        );

    if (
        validTargets.length === 0
    ) {
        return null;
    }

    // ==========================================
    // CURRENT TARGETING RULE
    // ==========================================
    // MVP:
    // first valid target
    // ==========================================

    return validTargets[0];
}

export default
    selectTarget;