import applyDamage
    from "./applyDamage.js";

import recalculateRuntimeState
    from "../runtime/recalculateRuntimeState.js";

function resolveOverflow(
    fleet,
    overflowDamage
) {

    if (
        !Array.isArray(fleet)
    ) {
        return null;
    }

    if (
        typeof overflowDamage !==
        "number" ||
        overflowDamage < 0
    ) {
        return null;
    }

    const targets =
        JSON.parse(
            JSON.stringify(fleet)
        );

    if (
        overflowDamage === 0
    ) {
        return {
            targets,
            remainingOverflow: 0
        };
    }

    let remainingOverflow =
        overflowDamage;

    // ==========================================
    // OVERFLOW CHAIN
    // ==========================================

    for (
        const target
        of targets
    ) {

        if (
            remainingOverflow <= 0
        ) {
            break;
        }

        if (
            !target ||
            typeof target !==
            "object"
        ) {
            continue;
        }

        // ==========================================
        // SKIP DESTROYED TARGETS
        // ==========================================

        if (
            target.remainingHp <= 0
        ) {
            continue;
        }

        // ==========================================
        // APPLY DAMAGE
        // ==========================================

        const result =
            applyDamage(
                target,
                remainingOverflow
            );

        if (
            !result ||
            !result.target
        ) {
            continue;
        }

        // ==========================================
        // SINGLE SOURCE OF TRUTH
        // ==========================================

        target.remainingHp =
            result.target
                .remainingHp;

        // ==========================================
        // DERIVED STATE
        // ==========================================

        recalculateRuntimeState(
            target
        );

        // ==========================================
        // NEXT OVERFLOW
        // ==========================================

        remainingOverflow =
            result.overflowDamage;
    }

    // ==========================================
    // RESULT
    // ==========================================

    return {

        targets,

        remainingOverflow
    };
}

export default
    resolveOverflow;